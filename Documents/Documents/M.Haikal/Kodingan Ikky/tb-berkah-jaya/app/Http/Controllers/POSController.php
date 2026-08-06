<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Transaction;
use App\Models\TransactionDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class POSController extends Controller
{
    // POS interface
    public function index()
    {
        $todayDate = now()->toDateString();
        $todayDrawer = \App\Models\PosCashDrawer::whereDate('date', $todayDate)
            ->orWhereDate('created_at', $todayDate)
            ->latest('id')
            ->first();

        $openingCash = 0;
        if ($todayDrawer) {
            $openingCash = (float)$todayDrawer->opening_cash;
            session(['opening_drawer_cash' => $openingCash]);
        } else {
            $openingCash = (float)session('opening_drawer_cash', 0);
        }

        return view('pos.index', compact('openingCash'));
    }

    // Save opening drawer cash to database (shared between Kasir & Admin)
    public function saveOpeningCash(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:0'
        ]);

        $amount = (float)$request->amount;
        $todayDate = now()->toDateString();

        $drawer = \App\Models\PosCashDrawer::whereDate('date', $todayDate)->first();
        if ($drawer) {
            $drawer->update([
                'user_id' => Auth::id(),
                'opening_cash' => $amount,
            ]);
        } else {
            \App\Models\PosCashDrawer::create([
                'user_id' => Auth::id(),
                'date' => $todayDate,
                'opening_cash' => $amount,
            ]);
        }

        session(['opening_drawer_cash' => $amount]);

        return redirect()->back()->with('success', 'Saldo awal laci berhasil disimpan dan disinkronkan secara global untuk Kasir & Admin.');
    }

    // AJAX API to search products for autocomplete
    public function searchProducts(Request $request)
    {
        $search = $request->get('query');
        $categoryId = $request->get('category_id');

        if (!$search && !$categoryId) {
            return response()->json([]);
        }

        $query = Product::with('conversions');

        if ($categoryId) {
            $query->where('category_id', $categoryId);
        }

        if ($search) {
            $query->where(function($q) use ($search) {
                $q->where('code', '=', $search)
                  ->orWhere('code', 'like', "%{$search}%")
                  ->orWhere('name', 'like', "%{$search}%");
            });
        }

        $products = $query->limit(15)->get();

        $formatted = [];
        foreach ($products as $p) {
            $units = [
                [
                    'name' => $p->base_unit,
                    'factor' => 1.00,
                    'price' => (float)$p->selling_price
                ]
            ];

            foreach ($p->conversions as $c) {
                $units[] = [
                    'name' => $c->unit_name,
                    'factor' => (float)$c->value_in_base_unit,
                    'price' => (float)($p->selling_price * $c->value_in_base_unit)
                ];
            }

            $formatted[] = [
                'id' => $p->id,
                'code' => $p->code,
                'name' => $p->name,
                'base_unit' => $p->base_unit,
                'stock' => (float)$p->stock,
                'units' => $units,
                'stock_badge' => $p->stock_badge
            ];
        }

        return response()->json($formatted);
    }

    // POS Checkout transaction
    public function store(Request $request)
    {
        $request->validate([
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|numeric|min:0.01',
            'items.*.unit_name' => 'required|string',
            'items.*.conversion_factor' => 'required|numeric|min:0.01',
            'items.*.price' => 'required|numeric|min:0',
            'discount_amount' => 'required|numeric|min:0',
            'payment_method' => 'required|in:cash,bank_transfer,qris',
            'paid_amount' => 'required|numeric|min:0',
        ]);

        try {
            $transaction = DB::transaction(function() use ($request) {
                $todayDate = now()->format('Ymd');
                $countToday = Transaction::whereDate('created_at', now()->toDateString())->count();
                $invoiceNumber = 'INV-' . $todayDate . '-' . str_pad($countToday + 1, 4, '0', STR_PAD_LEFT);

                $totalAmount = 0.00;

                $detailsData = [];
                foreach ($request->items as $item) {
                    $product = Product::where('id', $item['product_id'])->lockForUpdate()->first();

                    $qtyInBaseUnit = (float)$item['quantity'] * (float)$item['conversion_factor'];

                    if ($product->stock < $qtyInBaseUnit) {
                        throw new \Exception("Stok barang '{$product->name}' tidak cukup. Sisa stok: " . (float)$product->stock . " {$product->base_unit}. Diminta: {$qtyInBaseUnit} {$product->base_unit}.");
                    }

                    $product->decrement('stock', $qtyInBaseUnit);

                    $subtotal = (float)$item['price'] * (float)$item['quantity'];
                    $totalAmount += $subtotal;

                    $detailsData[] = new TransactionDetail([
                        'product_id' => $product->id,
                        'quantity' => (float)$item['quantity'],
                        'unit_name' => $item['unit_name'],
                        'conversion_factor' => (float)$item['conversion_factor'],
                        'price' => (float)$item['price'],
                        'subtotal' => $subtotal
                    ]);
                }

                $netAmount = $totalAmount - (float)$request->discount_amount;
                if ($netAmount < 0) $netAmount = 0;

                $changeAmount = (float)$request->paid_amount - $netAmount;
                if ($changeAmount < 0) $changeAmount = 0;

                $transaction = Transaction::create([
                    'invoice_number' => $invoiceNumber,
                    'user_id' => Auth::id(),
                    'total_amount' => $netAmount,
                    'discount_amount' => (float)$request->discount_amount,
                    'payment_method' => $request->payment_method,
                    'paid_amount' => (float)$request->paid_amount,
                    'change_amount' => $changeAmount,
                ]);

                $transaction->details()->saveMany($detailsData);

                return $transaction;
            });

            return response()->json([
                'success' => true,
                'message' => 'Transaksi POS berhasil disimpan.',
                'transaction_id' => $transaction->id
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 422);
        }
    }

    // Render receipt view ready for auto-printing
    public function printReceipt(Transaction $transaction)
    {
        $transaction->load(['details.product', 'user']);
        return view('pos.receipt', compact('transaction'));
    }

    // Render sales detail page (Invoicing view similar to penjualan_detail.php)
    public function show(Transaction $transaction)
    {
        $transaction->load(['details.product', 'user']);
        return view('pos.show', compact('transaction'));
    }

    // Cancel / Delete sales transaction & restore stock (Admin only)
    public function destroy(Transaction $transaction)
    {
        if (Auth::user()->role !== 'admin') {
            return redirect()->back()->with('error', 'Akses ditolak! Hanya Admin yang dapat membatalkan/menghapus transaksi.');
        }

        try {
            DB::transaction(function() use ($transaction) {
                $transaction->load('details.product');

                // 1. Restore product stock for each item & log mutation
                foreach ($transaction->details as $detail) {
                    $qtyToRestore = (float)$detail->quantity * (float)$detail->conversion_factor;
                    if ($detail->product) {
                        $detail->product->increment('stock', $qtyToRestore);
                        
                        \App\Models\StockMutation::create([
                            'product_id' => $detail->product_id,
                            'user_id' => Auth::id(),
                            'type' => 'return',
                            'quantity' => $qtyToRestore,
                            'notes' => "Pengembalian stok pembatalan transaksi #{$transaction->invoice_number}",
                        ]);
                    }
                }

                // 2. Delete detail items
                $transaction->details()->delete();

                // 3. Delete main transaction
                $invoiceNumber = $transaction->invoice_number;
                $transaction->delete();

                session()->flash('success', "Transaksi {$invoiceNumber} berhasil dibatalkan dan dihapus. Stok barang telah dikembalikan.");
            });

            return redirect()->route('pos.history');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal membatalkan transaksi: ' . $e->getMessage());
        }
    }

    // Render sales history page with search filters
    public function history(Request $request)
    {
        $query = Transaction::with(['user', 'details.product']);

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where('invoice_number', 'like', "%{$search}%");
        }

        if ($request->filled('date')) {
            $query->whereDate('created_at', $request->date);
        }

        if ($request->filled('payment_method')) {
            $query->where('payment_method', $request->payment_method);
        }

        $transactions = $query->latest()->paginate(15)->withQueryString();

        return view('pos.history', compact('transactions'));
    }
}


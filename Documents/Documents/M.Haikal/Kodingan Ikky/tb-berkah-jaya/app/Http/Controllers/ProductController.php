<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\ProductConversion;
use App\Models\StockMutation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    // Admin list view with CRUD options
    public function index(Request $request)
    {
        $query = Product::with(['category.parent', 'conversions']);

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('code', 'like', "%{$search}%")
                  ->orWhere('name', 'like', "%{$search}%");
            });
        }

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->filled('stock_status')) {
            $status = $request->stock_status;
            if ($status === 'habis') {
                $query->where('stock', '<=', 0);
            } elseif ($status === 'kritis') {
                $query->where('stock', '>', 0)
                      ->whereRaw('stock <= (min_stock / 2)');
            } elseif ($status === 'menipis') {
                $query->whereRaw('stock > (min_stock / 2) AND stock <= min_stock');
            } elseif ($status === 'aman') {
                $query->whereRaw('stock > min_stock');
            }
        }

        $products = $query->latest()->paginate(15)->withQueryString();
        $categories = Category::with('subcategories')->get();

        return view('products.index', compact('products', 'categories'));
    }

    // Page to add a product
    public function create()
    {
        $categories = Category::with('subcategories')->whereNull('parent_id')->get();
        $allCategories = Category::with('parent')->get();
        return view('products.create', compact('categories', 'allCategories'));
    }

    // Save product and conversions
    public function store(Request $request)
    {
        $request->validate([
            'code' => 'required|string|unique:products,code',
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'base_unit' => 'required|string|max:50',
            'purchase_price' => 'required|numeric|min:0',
            'selling_price' => 'required|numeric|min:0',
            'stock' => 'required|numeric|min:0',
            'min_stock' => 'required|numeric|min:0',
            'conversion_units' => 'nullable|array',
            'conversion_values' => 'nullable|array',
        ]);

        DB::transaction(function() use ($request) {
            $product = Product::create($request->only([
                'code', 'name', 'category_id', 'base_unit', 
                'purchase_price', 'selling_price', 'stock', 'min_stock'
            ]));

            if ($product->stock > 0) {
                StockMutation::create([
                    'product_id' => $product->id,
                    'user_id' => Auth::id(),
                    'type' => 'restock',
                    'quantity' => $product->stock,
                    'notes' => 'Stok awal barang baru didaftarkan.',
                ]);
            }

            if ($request->has('conversion_units') && $request->has('conversion_values')) {
                foreach ($request->conversion_units as $index => $unitName) {
                    $value = $request->conversion_values[$index] ?? null;
                    if ($unitName && $value > 0) {
                        ProductConversion::create([
                            'product_id' => $product->id,
                            'unit_name' => $unitName,
                            'value_in_base_unit' => $value,
                        ]);
                    }
                }
            }
        });

        return redirect()->route('products.index')->with('success', 'Produk berhasil didaftarkan.');
    }

    // Page to edit a product
    public function edit(Product $product)
    {
        $product->load('conversions');
        $categories = Category::with('subcategories')->whereNull('parent_id')->get();
        $allCategories = Category::with('parent')->get();
        return view('products.edit', compact('product', 'categories', 'allCategories'));
    }

    // Update product and conversions
    public function update(Request $request, Product $product)
    {
        $request->validate([
            'code' => 'required|string|unique:products,code,' . $product->id,
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'base_unit' => 'required|string|max:50',
            'purchase_price' => 'required|numeric|min:0',
            'selling_price' => 'required|numeric|min:0',
            'min_stock' => 'required|numeric|min:0',
            'conversion_units' => 'nullable|array',
            'conversion_values' => 'nullable|array',
        ]);

        DB::transaction(function() use ($request, $product) {
            $product->update($request->only([
                'code', 'name', 'category_id', 'base_unit', 
                'purchase_price', 'selling_price', 'min_stock'
            ]));

            if ($request->filled('add_stock') && (float)$request->add_stock > 0) {
                $addQty = (float)$request->add_stock;
                $product->increment('stock', $addQty);
                StockMutation::create([
                    'product_id' => $product->id,
                    'user_id' => Auth::id(),
                    'type' => 'restock',
                    'quantity' => $addQty,
                    'notes' => 'Restock barang masuk via halaman edit produk.',
                ]);
            }

            $product->conversions()->delete();
            if ($request->has('conversion_units') && $request->has('conversion_values')) {
                foreach ($request->conversion_units as $index => $unitName) {
                    $value = $request->conversion_values[$index] ?? null;
                    if ($unitName && $value > 0) {
                        ProductConversion::create([
                            'product_id' => $product->id,
                            'unit_name' => $unitName,
                            'value_in_base_unit' => $value,
                        ]);
                    }
                }
            }
        });

        return redirect()->route('products.index')->with('success', 'Data produk & stok berhasil diperbarui.');
    }

    // Delete product
    public function destroy(Product $product)
    {
        try {
            $product->delete();
            return redirect()->route('products.index')->with('success', 'Produk berhasil dihapus.');
        } catch (\Exception $e) {
            return redirect()->route('products.index')->with('error', 'Produk tidak dapat dihapus karena sudah memiliki riwayat transaksi.');
        }
    }

    // Manual stock mutations (restock, return, damage)
    public function mutate(Request $request, Product $product)
    {
        $request->validate([
            'type' => 'required|in:restock,damage,return',
            'qty' => 'required|numeric|min:0.01',
            'notes' => 'nullable|string',
        ]);

        $qty = (float) $request->qty;
        $notes = $request->notes;

        DB::transaction(function() use ($product, $request, $qty, $notes) {
            if ($request->type === 'restock') {
                $product->increment('stock', $qty);
                $finalQty = $qty;
            } else {
                $product->decrement('stock', $qty);
                $finalQty = -$qty;
            }

            StockMutation::create([
                'product_id' => $product->id,
                'user_id' => Auth::id(),
                'type' => $request->type,
                'quantity' => $finalQty,
                'notes' => $notes,
            ]);
        });

        return redirect()->back()->with('success', 'Mutasi stok berhasil dicatat.');
    }

    // Pegawai Search stock (read-only)
    public function search(Request $request)
    {
        $query = Product::with(['category.parent', 'conversions']);

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('code', 'like', "%{$search}%")
                  ->orWhere('name', 'like', "%{$search}%");
            });
        }

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        $products = $query->latest()->paginate(15)->withQueryString();
        $categories = Category::with('subcategories')->get();

        return view('products.search', compact('products', 'categories'));
    }
}

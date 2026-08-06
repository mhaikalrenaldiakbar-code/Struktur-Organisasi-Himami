<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Transaction;
use App\Models\Attendance;
use App\Models\Payroll;
use App\Models\User;
use App\Exports\InventoryExport;
use App\Exports\TransactionsExport;
use App\Exports\AttendanceExport;
use App\Exports\PayrollExport;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Carbon;

class ExportController extends Controller
{
    public function index(Request $request)
    {
        $periodType = $request->get('period_type', 'monthly');
        $date = $request->get('date', now()->toDateString());
        $month = $request->get('month', now()->format('Y-m'));
        $year = $request->get('year', now()->format('Y'));

        $query = Transaction::query();
        if ($periodType === 'daily') {
            $query->whereDate('created_at', $date);
        } elseif ($periodType === 'weekly') {
            $query->whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()]);
        } elseif ($periodType === 'yearly') {
            $query->whereYear('created_at', $year);
        } else {
            list($y, $m) = explode('-', $month);
            $query->whereYear('created_at', $y)->whereMonth('created_at', $m);
        }

        $salesCount = (clone $query)->count();
        $totalGross = (clone $query)->sum('total_amount');
        $totalDiscount = (clone $query)->sum('discount_amount');
        $cashSales = (clone $query)->where('payment_method', 'cash')->sum('total_amount');
        $qrisSales = (clone $query)->where('payment_method', 'qris')->sum('total_amount');
        $transferSales = (clone $query)->where('payment_method', 'bank_transfer')->sum('total_amount');

        $payrolls = Payroll::with('user')->get();

        return view('exports.index', compact(
            'periodType', 'date', 'month', 'year',
            'salesCount', 'totalGross', 'totalDiscount',
            'cashSales', 'qrisSales', 'transferSales', 'payrolls'
        ));
    }

    public function inventoryExcel()
    {
        return Excel::download(new InventoryExport, 'inventori-stok-' . now()->format('Y-m-d') . '.xlsx');
    }

    public function transactionsExcel(Request $request)
    {
        $month = $request->get('month', now()->format('Y-m'));
        return Excel::download(new TransactionsExport($month), 'rekap-transaksi-' . $month . '.xlsx');
    }

    public function attendanceExcel(Request $request)
    {
        $month = $request->get('month', now()->format('Y-m'));
        return Excel::download(new AttendanceExport($month), 'rekap-absensi-' . $month . '.xlsx');
    }

    public function payrollExcel(Request $request)
    {
        $month = $request->get('month', now()->format('Y-m'));
        return Excel::download(new PayrollExport($month), 'rekap-payroll-' . $month . '.xlsx');
    }

    public function inventoryPdf()
    {
        $products = Product::with('category')->get();
        $pdf = Pdf::loadView('exports.inventory-pdf', compact('products'))
                  ->setPaper('a4', 'portrait');

        return $pdf->download('stok-opname-' . now()->format('Y-m-d') . '.pdf');
    }

    public function transactionsPdf(Request $request)
    {
        $month = $request->get('month', now()->format('Y-m'));
        list($year, $monthNum) = explode('-', $month);

        $transactions = Transaction::with('user')
            ->whereYear('created_at', $year)
            ->whereMonth('created_at', $monthNum)
            ->get();

        $totalRevenue = $transactions->sum('total_amount');
        $totalDiscount = $transactions->sum('discount_amount');
        $invoiceCount = $transactions->count();

        $cashiers = Transaction::with('user')
            ->whereYear('created_at', $year)
            ->whereMonth('created_at', $monthNum)
            ->select('user_id', \DB::raw('count(*) as count'), \DB::raw('sum(total_amount) as total'))
            ->groupBy('user_id')
            ->get();

        $pdf = Pdf::loadView('exports.transactions-pdf', compact('transactions', 'month', 'totalRevenue', 'totalDiscount', 'invoiceCount', 'cashiers'))
                  ->setPaper('a4', 'portrait');

        return $pdf->download('laporan-bulanan-penjualan-' . $month . '.pdf');
    }

    public function attendancePdf(Request $request)
    {
        $month = $request->get('month', now()->format('Y-m'));
        list($year, $monthNum) = explode('-', $month);

        $attendances = Attendance::with('user')
            ->whereYear('date', $year)
            ->whereMonth('date', $monthNum)
            ->get();

        $pdf = Pdf::loadView('exports.attendance-pdf', compact('attendances', 'month'))
                  ->setPaper('a4', 'portrait');

        return $pdf->download('laporan-kehadiran-' . $month . '.pdf');
    }

    public function payrollPdf(Payroll $payroll)
    {
        $payroll->load('user');
        $pdf = Pdf::loadView('exports.payroll-pdf', compact('payroll'))
                  ->setPaper([0, 0, 420, 595], 'portrait');

        return $pdf->download('slip-gaji-' . $payroll->user->name . '-' . $payroll->month . '.pdf');
    }
}

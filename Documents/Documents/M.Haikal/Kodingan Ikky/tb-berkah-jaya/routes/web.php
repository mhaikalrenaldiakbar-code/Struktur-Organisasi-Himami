<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\WhitelistController;
use App\Http\Controllers\POSController;
use App\Http\Controllers\KasbonController;
use App\Http\Controllers\PayrollController;
use App\Http\Controllers\ExportController;
use App\Http\Controllers\EmployeeController;
use App\Models\Product;
use App\Models\Category;
use App\Models\Transaction;
use App\Models\TransactionDetail;
use App\Models\StockMutation;
use App\Models\Attendance;
use App\Models\Payroll;
use App\Models\User;
use Illuminate\Support\Facades\Route;

// Public welcome portal page - absolute sidebar menu
Route::get('/', function () {
    return view('welcome');
})->name('home');

// Public Webcam scanner absensi mandiri gate (PRD Section 2.1 - No Login Required)
Route::get('/attendances/scan', [AttendanceController::class, 'scan'])->name('attendances.scan');
Route::post('/attendances/scan', [AttendanceController::class, 'handleScan'])->name('attendances.handle-scan');

// Dashboard with financials
Route::get('/dashboard', function () {
    $productCount = Product::count();
    $categoryCount = Category::count();
    $salesCount = Transaction::whereDate('created_at', now()->toDateString())->count();
    
    // Revenue today
    $revenueToday = (float) Transaction::whereDate('created_at', now()->toDateString())->sum('total_amount');

    // Barang Masuk Hari Ini: Sum of restock mutations today
    $incomingCount = (float) StockMutation::where('type', 'restock')
        ->whereDate('created_at', now()->toDateString())
        ->sum('quantity');

    // Barang Keluar Hari Ini: Sum of sales details created today + damage/return mutations today
    $salesQtyToday = (float) TransactionDetail::whereHas('transaction', function($q) {
        $q->whereDate('created_at', now()->toDateString());
    })->sum(\DB::raw('quantity * conversion_factor'));
    
    $damagesQtyToday = (float) abs(StockMutation::whereIn('type', ['damage', 'return'])
        ->whereDate('created_at', now()->toDateString())
        ->sum('quantity'));
        
    $outgoingCount = $salesQtyToday + $damagesQtyToday;

    // Fetch low stock items (min_stock alert)
    $lowStockProducts = Product::whereRaw('stock <= min_stock')->with('category')->get();

    // Live Feed Logs
    $recentTransactions = Transaction::with('user')->latest()->limit(5)->get();
    $recentAttendances = Attendance::with('user')->whereNotNull('check_in')->latest()->limit(5)->get();

    // Chart.js data: sales for the last 7 days
    $chartLabels = [];
    $chartData = [];
    for ($i = 6; $i >= 0; $i--) {
        $date = now()->subDays($i);
        $chartLabels[] = $date->translatedFormat('d M');
        $chartData[] = (float) Transaction::whereDate('created_at', $date->toDateString())->sum('total_amount');
    }

    return view('dashboard', compact(
        'productCount', 'categoryCount', 'salesCount', 'revenueToday', 
        'incomingCount', 'outgoingCount', 'lowStockProducts', 'recentTransactions', 'recentAttendances',
        'chartLabels', 'chartData'
    ));
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // POS/Kasir - accessible by both admin and kasir
    Route::get('/pos', [POSController::class, 'index'])->name('pos.index');
    Route::post('/pos', [POSController::class, 'store'])->name('pos.store');
    Route::post('/pos/opening-cash', [POSController::class, 'saveOpeningCash'])->name('pos.opening-cash');
    Route::get('/pos/history', [POSController::class, 'history'])->name('pos.history');
    Route::get('/pos/receipt/{transaction}', [POSController::class, 'printReceipt'])->name('pos.receipt');
    Route::get('/pos/show/{transaction}', [POSController::class, 'show'])->name('pos.show');
    Route::delete('/pos/transactions/{transaction}', [POSController::class, 'destroy'])->name('pos.destroy');
    Route::get('/pos/search-products', [POSController::class, 'searchProducts'])->name('pos.search-products');

    // Pegawai checking inventory stock (read-only)
    Route::get('/products/search', [ProductController::class, 'search'])->name('products.search');

    // Pegawai applying kasbon loans
    Route::get('/kasbons/apply', [KasbonController::class, 'apply'])->name('kasbons.apply');
    Route::post('/kasbons/apply', [KasbonController::class, 'store'])->name('kasbons.store');
});

// Admin-only operations
Route::middleware(['auth', 'role:admin'])->group(function () {
    // Categories Taksonomi
    Route::resource('categories', CategoryController::class)->except(['create', 'show', 'edit']);

    // Products CRUD & mutation adjustment
    Route::resource('products', ProductController::class)->except(['show']);
    Route::post('/products/{product}/mutate', [ProductController::class, 'mutate'])->name('products.mutate');

    // IP Whitelist
    Route::resource('whitelists', WhitelistController::class)->only(['index', 'store', 'destroy']);

    // Attendance Log audits & manual input
    Route::get('/attendances', [AttendanceController::class, 'index'])->name('attendances.index');
    Route::post('/attendances/manual', [AttendanceController::class, 'storeManual'])->name('attendances.manual');
    Route::delete('/attendances/{attendance}', [AttendanceController::class, 'destroy'])->name('attendances.destroy');

    // Employee management (CRUD + QR Generation + Profiles)
    Route::resource('employees', EmployeeController::class);
    Route::post('/employees/{employee}/regenerate', [EmployeeController::class, 'regenerateToken'])->name('employees.regenerate');
    Route::get('/employees/{user}/profile', [EmployeeController::class, 'employeeProfile'])->name('employees.profile');

    // Kasbon manager
    Route::get('/kasbons', [KasbonController::class, 'index'])->name('kasbons.index');
    Route::post('/kasbons/admin', [KasbonController::class, 'storeAdmin'])->name('kasbons.storeAdmin');
    Route::post('/kasbons/{kasbon}/toggle-paid', [KasbonController::class, 'togglePaid'])->name('kasbons.toggle-paid');

    // Payroll
    Route::get('/payrolls', [PayrollController::class, 'index'])->name('payrolls.index');
    Route::post('/payrolls/generate', [PayrollController::class, 'generate'])->name('payrolls.generate');
    Route::post('/payrolls/{payroll}/approve', [PayrollController::class, 'approve'])->name('payrolls.approve');

    // Multi-format exports (Excel / PDF) - Consolidated Menu Laporan
    Route::get('/reports', [ExportController::class, 'index'])->name('exports.index');
    Route::get('/exports/inventory/excel', [ExportController::class, 'inventoryExcel'])->name('exports.inventory.excel');
    Route::get('/exports/inventory/pdf', [ExportController::class, 'inventoryPdf'])->name('exports.inventory.pdf');
    Route::get('/exports/transactions/excel', [ExportController::class, 'transactionsExcel'])->name('exports.transactions.excel');
    Route::get('/exports/transactions/pdf', [ExportController::class, 'transactionsPdf'])->name('exports.transactions.pdf');
    Route::get('/exports/attendance/excel', [ExportController::class, 'attendanceExcel'])->name('exports.attendance.excel');
    Route::get('/exports/attendance/pdf', [ExportController::class, 'attendancePdf'])->name('exports.attendance.pdf');
    Route::get('/exports/payroll/excel', [ExportController::class, 'payrollExcel'])->name('exports.payroll.excel');
    Route::get('/exports/payroll/{payroll}/pdf', [ExportController::class, 'payrollPdf'])->name('exports.payroll.pdf');
});

require __DIR__.'/auth.php';

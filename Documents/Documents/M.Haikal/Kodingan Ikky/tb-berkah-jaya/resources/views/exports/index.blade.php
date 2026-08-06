@extends('layouts.app')

@section('title', 'Menu Laporan Management & Dual-Format Export')

@section('content')
<div class="container-fluid p-0">
    <div class="d-flex align-items-center justify-content-between mb-4">
        <div>
            <h3 class="fw-bold text-dark mb-1"><i class="bi bi-file-earmark-bar-graph-fill text-warning me-2"></i>Konsolidasi Menu Laporan Manajemen</h3>
            <p class="text-secondary mb-0">Dual-Format Export (Baku PDF Berlogo Toko & Mentahan Excel .xlsx) - PRD Section 4</p>
        </div>
    </div>

    <!-- Global Time Period Filter Card -->
    <div class="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-dark text-white">
        <form method="GET" action="{{ route('exports.index') }}" class="row g-3 align-items-center">
            <div class="col-md-3">
                <label class="form-label text-white-50 small fw-bold">Struktur Filter Waktu</label>
                <select name="period_type" id="periodTypeSelect" class="form-select bg-secondary text-white border-0 fw-bold" onchange="this.form.submit()">
                    <option value="daily" {{ $periodType === 'daily' ? 'selected' : '' }}>Filter Harian (Per Tanggal)</option>
                    <option value="weekly" {{ $periodType === 'weekly' ? 'selected' : '' }}>Filter Mingguan (Minggu Ini)</option>
                    <option value="monthly" {{ $periodType === 'monthly' ? 'selected' : '' }}>Filter Bulanan (Per Bulan)</option>
                    <option value="yearly" {{ $periodType === 'yearly' ? 'selected' : '' }}>Filter Tahunan (Per Tahun)</option>
                </select>
            </div>

            <div class="col-md-4">
                @if($periodType === 'daily')
                    <label class="form-label text-white-50 small fw-bold">Pilih Tanggal Spesifik</label>
                    <input type="date" name="date" class="form-control bg-secondary text-white border-0" value="{{ $date }}" onchange="this.form.submit()">
                @elseif($periodType === 'weekly')
                    <label class="form-label text-white-50 small fw-bold">Periode Minggu Berjalan</label>
                    <input type="text" class="form-control bg-secondary text-white border-0" value="{{ now()->startOfWeek()->format('d M') }} s/d {{ now()->endOfWeek()->format('d M Y') }}" readonly>
                @elseif($periodType === 'yearly')
                    <label class="form-label text-white-50 small fw-bold">Pilih Tahun</label>
                    <select name="year" class="form-select bg-secondary text-white border-0" onchange="this.form.submit()">
                        @for($y = now()->year; $y >= 2024; $y--)
                            <option value="{{ $y }}" {{ $year == $y ? 'selected' : '' }}>Tahun {{ $y }}</option>
                        @endfor
                    </select>
                @else
                    <label class="form-label text-white-50 small fw-bold">Pilih Bulan & Tahun</label>
                    <input type="month" name="month" class="form-control bg-secondary text-white border-0" value="{{ $month }}" onchange="this.form.submit()">
                @endif
            </div>

            <div class="col-md-5 text-end">
                <div class="badge bg-warning text-dark px-3 py-2 fs-6">
                    <i class="bi bi-info-circle me-1"></i> Data Real-time Terkonsolidasi
                </div>
            </div>
        </form>
    </div>

    <!-- 4 Submenu Report Export Cards (PRD Section 4.2) -->
    <div class="row g-4">
        
        <!-- Submenu 1: Laporan Penjualan & Finansial -->
        <div class="col-md-6">
            <div class="card border-0 shadow-sm rounded-4 p-4 h-100 border-start border-primary border-4">
                <div class="d-flex align-items-center gap-3 mb-3">
                    <div class="bg-primary bg-opacity-10 p-3 rounded-circle text-primary">
                        <i class="bi bi-currency-dollar fs-2"></i>
                    </div>
                    <div>
                        <h5 class="fw-bold mb-0 text-dark">1. Laporan Penjualan & Finansial</h5>
                        <small class="text-muted">Omzet Kotor, Diskon, Rincian Tunai/QRIS, Profit</small>
                    </div>
                </div>
                <div class="bg-light p-3 rounded-3 mb-3 small">
                    <div class="d-flex justify-content-between mb-1">
                        <span>Total Invoice Penjualan:</span>
                        <strong class="text-dark">{{ $salesCount }} Transaksi</strong>
                    </div>
                    <div class="d-flex justify-content-between mb-1">
                        <span>Omzet Kotor Terakumulasi:</span>
                        <strong class="text-success">Rp {{ number_format($totalGross, 0, ',', '.') }}</strong>
                    </div>
                    <div class="d-flex justify-content-between">
                        <span>Pecahan Payment (Tunai / QRIS):</span>
                        <strong class="text-primary">Rp {{ number_format($cashSales, 0, ',', '.') }} / Rp {{ number_format($qrisSales, 0, ',', '.') }}</strong>
                    </div>
                </div>
                <div class="d-flex gap-2 mt-auto">
                    <a href="{{ route('exports.transactions.pdf', ['month' => $month]) }}" class="btn btn-danger fw-bold flex-grow-1 rounded-3">
                        <i class="bi bi-file-earmark-pdf me-1"></i> Unduh PDF
                    </a>
                    <a href="{{ route('exports.transactions.excel', ['month' => $month]) }}" class="btn btn-success fw-bold flex-grow-1 rounded-3">
                        <i class="bi bi-file-earmark-excel me-1"></i> Unduh Excel
                    </a>
                </div>
            </div>
        </div>

        <!-- Submenu 2: Laporan Stok & Inventori Barang -->
        <div class="col-md-6">
            <div class="card border-0 shadow-sm rounded-4 p-4 h-100 border-start border-info border-4">
                <div class="d-flex align-items-center gap-3 mb-3">
                    <div class="bg-info bg-opacity-10 p-3 rounded-circle text-info">
                        <i class="bi bi-boxes fs-2"></i>
                    </div>
                    <div>
                        <h5 class="fw-bold mb-0 text-dark">2. Laporan Stok & Inventori Barang</h5>
                        <small class="text-muted">Rekap Kuantiat Material Gudang untuk Stock Opname</small>
                    </div>
                </div>
                <p class="text-secondary small mb-4">
                    Menyajikan rekap sisa kuantitas seluruh aset material bangunan fisik gudang, nilai total modal persediaan, dan deteksi stok kritis.
                </p>
                <div class="d-flex gap-2 mt-auto">
                    <a href="{{ route('exports.inventory.pdf') }}" class="btn btn-danger fw-bold flex-grow-1 rounded-3">
                        <i class="bi bi-file-earmark-pdf me-1"></i> Unduh PDF
                    </a>
                    <a href="{{ route('exports.inventory.excel') }}" class="btn btn-success fw-bold flex-grow-1 rounded-3">
                        <i class="bi bi-file-earmark-excel me-1"></i> Unduh Excel
                    </a>
                </div>
            </div>
        </div>

        <!-- Submenu 3: Laporan Kehadiran & Rekap Absensi Pegawai -->
        <div class="col-md-6">
            <div class="card border-0 shadow-sm rounded-4 p-4 h-100 border-start border-warning border-4">
                <div class="d-flex align-items-center gap-3 mb-3">
                    <div class="bg-warning bg-opacity-10 p-3 rounded-circle text-warning-emphasis">
                        <i class="bi bi-clock-history fs-2"></i>
                    </div>
                    <div>
                        <h5 class="fw-bold mb-0 text-dark">3. Laporan Kehadiran & Rekap Absensi</h5>
                        <small class="text-muted">Akumulasi Kehadiran Bulanan Pegawai Toko</small>
                    </div>
                </div>
                <p class="text-secondary small mb-4">
                    Rekapitulasi log jam datang, jam pulang, serta akumulasi menit keterlambatan pegawai yang ditarik langsung dari terminal QR code scanner.
                </p>
                <div class="d-flex gap-2 mt-auto">
                    <a href="{{ route('exports.attendance.pdf', ['month' => $month]) }}" class="btn btn-danger fw-bold flex-grow-1 rounded-3">
                        <i class="bi bi-file-earmark-pdf me-1"></i> Unduh PDF
                    </a>
                    <a href="{{ route('exports.attendance.excel', ['month' => $month]) }}" class="btn btn-success fw-bold flex-grow-1 rounded-3">
                        <i class="bi bi-file-earmark-excel me-1"></i> Unduh Excel
                    </a>
                </div>
            </div>
        </div>

        <!-- Submenu 4: Laporan Penggajian & Payroll Karyawan -->
        <div class="col-md-6">
            <div class="card border-0 shadow-sm rounded-4 p-4 h-100 border-start border-success border-4">
                <div class="d-flex align-items-center gap-3 mb-3">
                    <div class="bg-success bg-opacity-10 p-3 rounded-circle text-success">
                        <i class="bi bi-journal-check fs-2"></i>
                    </div>
                    <div>
                        <h5 class="fw-bold mb-0 text-dark">4. Laporan Penggajian & Payroll Karyawan</h5>
                        <small class="text-muted">Slip Gaji Individu & Pengeluaran Gaji Internal</small>
                    </div>
                </div>
                <p class="text-secondary small mb-4">
                    Rekap slip gaji komprehensif, nominal potongan kasbon otomatis berjalan, serta total pengeluaran kas internal toko untuk pos gaji pegawai.
                </p>
                <div class="d-flex gap-2 mt-auto">
                    @if($payrolls->count() > 0)
                        <a href="{{ route('exports.payroll.pdf', $payrolls->first()->id) }}" class="btn btn-danger fw-bold flex-grow-1 rounded-3">
                            <i class="bi bi-file-earmark-pdf me-1"></i> Unduh PDF Slip
                        </a>
                    @else
                        <button class="btn btn-danger fw-bold flex-grow-1 rounded-3" disabled>Unduh PDF Slip</button>
                    @endif
                    <a href="{{ route('exports.payroll.excel', ['month' => $month]) }}" class="btn btn-success fw-bold flex-grow-1 rounded-3">
                        <i class="bi bi-file-earmark-excel me-1"></i> Unduh Excel Rekap
                    </a>
                </div>
            </div>
        </div>

    </div>
</div>
@endsection

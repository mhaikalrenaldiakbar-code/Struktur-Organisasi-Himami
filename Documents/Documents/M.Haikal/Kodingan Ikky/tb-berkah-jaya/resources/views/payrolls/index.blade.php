@extends('layouts.app')

@section('title', 'Payroll Gaji Mingguan (4x Sebulan)')

@section('content')
<div class="container-fluid p-0">
    <div class="d-flex align-items-center justify-content-between mb-4">
        <div>
            <h3 class="fw-bold text-dark mb-1"><i class="bi bi-calendar-range text-primary me-2"></i>Payroll Gaji Mingguan Karyawan</h3>
            <p class="text-secondary mb-0">Penggajian Mingguan (4x Sebulan) Berdasarkan Presensi Hadir × Rp 50.000/Hari</p>
        </div>
        <button class="btn btn-primary fw-bold rounded-3 shadow-sm" data-bs-toggle="modal" data-bs-target="#generatePayrollModal">
            <i class="bi bi-calculator me-1"></i> Hitung Payroll Mingguan Baru
        </button>
    </div>

    <!-- Period Filter Form -->
    <div class="card border-0 shadow-sm rounded-4 p-3 mb-4">
        <form method="GET" action="{{ route('payrolls.index') }}" class="row g-2 align-items-center">
            <div class="col-md-4">
                <label class="form-label fw-medium small text-muted mb-1">Filter Periode Bulan</label>
                <input type="month" name="month" class="form-control bg-light" value="{{ $month }}" onchange="this.form.submit()">
            </div>
            <div class="col-md-4">
                <label class="form-label fw-medium small text-muted mb-1">Filter Minggu Penggajian</label>
                <select name="week_number" class="form-select bg-light" onchange="this.form.submit()">
                    <option value="">-- Semua Minggu (Minggu 1 s/d 4) --</option>
                    <option value="1" {{ $weekNumber == '1' ? 'selected' : '' }}>Minggu Ke-1 (Tanggal 01 - 07)</option>
                    <option value="2" {{ $weekNumber == '2' ? 'selected' : '' }}>Minggu Ke-2 (Tanggal 08 - 14)</option>
                    <option value="3" {{ $weekNumber == '3' ? 'selected' : '' }}>Minggu Ke-3 (Tanggal 15 - 21)</option>
                    <option value="4" {{ $weekNumber == '4' ? 'selected' : '' }}>Minggu Ke-4 (Tanggal 22 - Akhir Bulan)</option>
                </select>
            </div>
            <div class="col-md-4 d-grid align-self-end">
                <button type="submit" class="btn btn-dark fw-bold"><i class="bi bi-filter me-1"></i> Terapkan Filter Riwayat</button>
            </div>
        </form>
    </div>

    <!-- Payroll Table List -->
    <div class="card border-0 shadow-sm rounded-4 p-0 overflow-hidden">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
                <thead class="table-dark">
                    <tr>
                        <th>Bulan Periode</th>
                        <th>Minggu Penggajian</th>
                        <th>Nama Pegawai</th>
                        <th>Gaji Kehadiran (Rp 50rb/Hari)</th>
                        <th>Tunjangan Mingguan</th>
                        <th>Potongan Kasbon</th>
                        <th>Gaji Bersih Mingguan (THP)</th>
                        <th>Status Approval</th>
                        <th class="text-end">Cetak Slip</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($payrolls as $pay)
                        <tr>
                            <td><span class="badge bg-secondary font-monospace fs-6">{{ $pay->month }}</span></td>
                            <td>
                                <span class="badge bg-primary text-uppercase fs-6">
                                    Minggu Ke-{{ $pay->week_number ?? 1 }}
                                </span>
                            </td>
                            <td><div class="fw-bold text-dark">{{ $pay->user ? $pay->user->name : '-' }}</div></td>
                            <td><span class="fw-bold text-dark">Rp {{ number_format($pay->basic_salary, 0, ',', '.') }}</span></td>
                            <td><span class="text-secondary">Rp {{ number_format($pay->total_allowance, 0, ',', '.') }}</span></td>
                            <td><span class="text-danger fw-bold">- Rp {{ number_format($pay->kasbon_deduction, 0, ',', '.') }}</span></td>
                            <td><span class="fw-bold text-success fs-5">Rp {{ number_format($pay->net_salary, 0, ',', '.') }}</span></td>
                            <td>
                                @if($pay->status === 'approved')
                                    <span class="badge bg-success"><i class="bi bi-check-circle me-1"></i> APPROVED</span>
                                @else
                                    <span class="badge bg-warning text-dark"><i class="bi bi-clock me-1"></i> DRAFT</span>
                                @endif
                            </td>
                            <td class="text-end">
                                @if($pay->status !== 'approved')
                                    <form action="{{ route('payrolls.approve', $pay->id) }}" method="POST" class="d-inline">
                                        @csrf
                                        <button type="submit" class="btn btn-sm btn-success me-1 fw-bold">Approve</button>
                                    </form>
                                @endif
                                <a href="{{ route('exports.payroll.pdf', $pay->id) }}" class="btn btn-sm btn-outline-danger">
                                    <i class="bi bi-file-earmark-pdf me-1"></i> Slip PDF
                                </a>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="9" class="text-center py-5 text-muted">
                                <i class="bi bi-journal-x display-4 d-block mb-2"></i>
                                Belum ada riwayat penggajian mingguan untuk filter periode ini. Klik tombol di atas untuk hitung payroll baru.
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
</div>

<!-- Modal Generate Weekly Payroll -->
<div class="modal fade" id="generatePayrollModal" tabindex="-1">
    <div class="modal-dialog">
        <form action="{{ route('payrolls.generate') }}" method="POST" class="modal-content rounded-4 border-0">
            @csrf
            <div class="modal-header border-0 pb-0">
                <h5 class="modal-title fw-bold">Hitung Payroll Mingguan Pegawai (4x / Bulan)</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <label class="form-label fw-medium small">Pilih Periode Bulan</label>
                    <input type="month" name="month" class="form-control" value="{{ now()->format('Y-m') }}" required>
                </div>

                <div class="mb-3">
                    <label class="form-label fw-medium small">Pilih Minggu Penggajian</label>
                    <select name="week_number" class="form-select" required>
                        <option value="1">Minggu Ke-1 (Tanggal 01 - 07)</option>
                        <option value="2">Minggu Ke-2 (Tanggal 08 - 14)</option>
                        <option value="3">Minggu Ke-3 (Tanggal 15 - 21)</option>
                        <option value="4">Minggu Ke-4 (Tanggal 22 - Akhir Bulan)</option>
                    </select>
                </div>

                <div class="mb-3">
                    <label class="form-label fw-medium small">Nominal Upah Per Hari Presensi Hadir (Rp)</label>
                    <div class="input-group">
                        <span class="input-group-text bg-light fw-bold">Rp</span>
                        <input type="number" name="daily_rate" class="form-control fw-bold text-primary" value="50000" required min="0">
                        <span class="input-group-text">/ Hari</span>
                    </div>
                    <small class="text-muted">Standard Toko: Rp 50.000 per hari kerja</small>
                </div>

                <div class="alert alert-info border-0 rounded-3 mb-0 small">
                    <i class="bi bi-info-circle me-1"></i> Sistem akan otomatis menghitung jumlah hari hadir pegawai pada minggu terpilih dari data absensi scanner.
                </div>
            </div>
            <div class="modal-footer border-0">
                <button type="button" class="btn btn-light" data-bs-dismiss="modal">Batal</button>
                <button type="submit" class="btn btn-primary fw-bold">Proses Hitung Payroll Mingguan</button>
            </div>
        </form>
    </div>
</div>
@endsection

@extends('layouts.app')

@section('title', 'Log Kehadiran Pegawai')

@section('content')
<div class="container-fluid p-0">
    <div class="d-flex align-items-center justify-content-between mb-4">
        <div>
            <h3 class="fw-bold text-dark mb-1"><i class="bi bi-clock-history text-info me-2"></i>Log Presensi & Kehadiran Pegawai</h3>
            <p class="text-secondary mb-0">Audit Riwayat Check-In & Check-Out Scan QR Code & Absen Manual Admin</p>
        </div>
        <button class="btn btn-primary fw-bold rounded-3 shadow-sm" data-bs-toggle="modal" data-bs-target="#manualAttendanceModal">
            <i class="bi bi-pencil-square me-1"></i> Input Absen Manual
        </button>
    </div>

    <!-- Metric Badges Row -->
    <div class="row g-3 mb-4">
        <div class="col-md-3">
            <div class="card border-0 shadow-sm rounded-4 p-3 bg-white border-start border-primary border-4">
                <small class="text-muted fw-bold">TOTAL RECORD TERDAFTAR</small>
                <h3 class="fw-bold text-dark my-1">{{ number_format($attendances->total()) }}</h3>
                <small class="text-muted">Total Presensi Filtered</small>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card border-0 shadow-sm rounded-4 p-3 bg-white border-start border-success border-4">
                <small class="text-muted fw-bold">PEGAWAI TERDAFTAR</small>
                <h3 class="fw-bold text-success my-1">{{ count($employees) }}</h3>
                <small class="text-muted">Staf Operasional</small>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card border-0 shadow-sm rounded-4 p-3 bg-white border-start border-warning border-4">
                <small class="text-muted fw-bold">PERIODE LOG</small>
                <h3 class="fw-bold text-warning-emphasis my-1">{{ request('month', now()->format('Y-m')) }}</h3>
                <small class="text-muted">Bulan Berjalan</small>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card border-0 shadow-sm rounded-4 p-3 bg-white border-start border-info border-4">
                <small class="text-muted fw-bold">STATUS SCANNER</small>
                <h3 class="fw-bold text-info my-1">AKTIF</h3>
                <small class="text-muted">Webcam Terminal Ready</small>
            </div>
        </div>
    </div>

    <!-- Search & Filter Form -->
    <div class="card border-0 shadow-sm rounded-4 p-3 mb-4">
        <form method="GET" action="{{ route('attendances.index') }}" class="row g-2 align-items-center">
            <div class="col-md-4">
                <label class="form-label fw-medium small text-muted mb-1">Filter Periode Bulan</label>
                <input type="month" name="month" class="form-control bg-light" value="{{ request('month', now()->format('Y-m')) }}">
            </div>
            <div class="col-md-5">
                <label class="form-label fw-medium small text-muted mb-1">Filter Spesifik Pegawai</label>
                <select name="user_id" class="form-select bg-light">
                    <option value="">-- Semua Pegawai (Seluruh Staf) --</option>
                    @foreach($employees as $emp)
                        <option value="{{ $emp->id }}" {{ request('user_id') == $emp->id ? 'selected' : '' }}>
                            {{ $emp->name }} ({{ strtoupper($emp->role) }})
                        </option>
                    @endforeach
                </select>
            </div>
            <div class="col-md-3 d-grid align-self-end">
                <button type="submit" class="btn btn-dark fw-bold py-2"><i class="bi bi-filter me-1"></i> Terapkan Filter</button>
            </div>
        </form>
    </div>

    <!-- Attendance Table -->
    <div class="card border-0 shadow-sm rounded-4 p-0 overflow-hidden">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
                <thead class="table-dark">
                    <tr>
                        <th>Tanggal Presensi</th>
                        <th>Nama Pegawai</th>
                        <th>Jam Check-In</th>
                        <th>Jam Check-Out</th>
                        <th>Keterlambatan</th>
                        <th>Status Kehadiran</th>
                        <th>IP Connections</th>
                        <th class="text-end">Aksi Audit</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($attendances as $att)
                        <tr>
                            <td><div class="fw-bold text-dark">{{ \Carbon\Carbon::parse($att->date)->format('d F Y') }}</div></td>
                            <td>
                                <div class="fw-bold text-dark">{{ $att->user ? $att->user->name : '-' }}</div>
                                <small class="text-muted">{{ $att->user ? $att->user->email : '' }}</small>
                            </td>
                            <td>
                                @if($att->check_in)
                                    <span class="badge bg-success-subtle text-success border border-success fs-6">{{ \Carbon\Carbon::parse($att->check_in)->format('H:i:s') }}</span>
                                @else
                                    <span class="text-muted">-</span>
                                @endif
                            </td>
                            <td>
                                @if($att->check_out)
                                    <span class="badge bg-primary-subtle text-primary border border-primary fs-6">{{ \Carbon\Carbon::parse($att->check_out)->format('H:i:s') }}</span>
                                @else
                                    <span class="badge bg-warning-subtle text-warning border border-warning">Belum Checkout</span>
                                @endif
                            </td>
                            <td>
                                @if($att->minutes_late > 0)
                                    <span class="text-danger fw-bold"><i class="bi bi-clock me-1"></i> {{ $att->minutes_late }} Menit</span>
                                @else
                                    <span class="text-success"><i class="bi bi-check-circle me-1"></i> Tepat Waktu</span>
                                @endif
                            </td>
                            <td>
                                @if($att->status === 'present')
                                    <span class="badge bg-success">HADIR</span>
                                @elseif($att->status === 'late')
                                    <span class="badge bg-warning text-dark">TERLAMBAT</span>
                                @elseif($att->status === 'sick')
                                    <span class="badge bg-info">SAKIT</span>
                                @elseif($att->status === 'permit')
                                    <span class="badge bg-secondary">IZIN</span>
                                @else
                                    <span class="badge bg-danger">ALPHA</span>
                                @endif
                            </td>
                            <td><code>{{ $att->ip_address }}</code></td>
                            <td class="text-end">
                                <button class="btn btn-sm btn-outline-danger" title="Hapus Log" onclick="if(confirm('Hapus log presensi ini?')) document.getElementById('delete-att-{{ $att->id }}').submit();">
                                    <i class="bi bi-trash"></i>
                                </button>
                                <form id="delete-att-{{ $att->id }}" action="{{ route('attendances.destroy', $att->id) }}" method="POST" class="d-none">
                                    @csrf
                                    @method('DELETE')
                                </form>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="8" class="text-center py-5 text-muted">
                                <i class="bi bi-calendar-x display-4 d-block mb-2"></i>
                                Belum ada riwayat log presensi pegawai untuk filter ini.
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>

    <!-- Pagination -->
    <div class="mt-3">
        {{ $attendances->links() }}
    </div>
</div>

<!-- Modal Input Absen Manual -->
<div class="modal fade" id="manualAttendanceModal" tabindex="-1">
    <div class="modal-dialog">
        <form action="{{ route('attendances.manual') }}" method="POST" class="modal-content rounded-4 border-0">
            @csrf
            <div class="modal-header border-0 pb-0">
                <div>
                    <h5 class="modal-title fw-bold mb-0">Input Presensi Manual Admin</h5>
                    <small class="text-muted">Gunakan opsi ini jika pegawai lupa membawa ID Card QR / kendala kamera scanner.</small>
                </div>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <label class="form-label fw-medium small">Pilih Pegawai</label>
                    <select name="user_id" class="form-select" required>
                        @foreach($employees as $emp)
                            <option value="{{ $emp->id }}">{{ $emp->name }} ({{ strtoupper($emp->role) }})</option>
                        @endforeach
                    </select>
                </div>

                <div class="mb-3">
                    <label class="form-label fw-medium small">Tanggal Presensi</label>
                    <input type="date" name="date" class="form-control" value="{{ now()->toDateString() }}" required>
                </div>

                <div class="row g-2 mb-3">
                    <div class="col-6">
                        <label class="form-label fw-medium small">Jam Masuk (Check-In)</label>
                        <input type="time" name="check_in" class="form-control" value="08:00">
                    </div>
                    <div class="col-6">
                        <label class="form-label fw-medium small">Jam Pulang (Check-Out)</label>
                        <input type="time" name="check_out" class="form-control" value="17:00">
                    </div>
                </div>

                <div class="mb-3">
                    <label class="form-label fw-medium small">Status Kehadiran</label>
                    <select name="status" class="form-select" required>
                        <option value="present">Hadir Tepat Waktu</option>
                        <option value="late">Terlambat</option>
                        <option value="sick">Sakit</option>
                        <option value="permit">Izin</option>
                        <option value="alpha">Alpha / Tanpa Keterangan</option>
                    </select>
                </div>
            </div>
            <div class="modal-footer border-0">
                <button type="button" class="btn btn-light" data-bs-dismiss="modal">Batal</button>
                <button type="submit" class="btn btn-primary fw-bold">Simpan Absensi Manual</button>
            </div>
        </form>
    </div>
</div>
@endsection

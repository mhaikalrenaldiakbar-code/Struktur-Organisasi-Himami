@extends('layouts.app')

@section('title', 'Form Pengajuan Kasbon')

@section('content')
<div class="container-fluid p-0">
    <div class="d-flex align-items-center justify-content-between mb-4">
        <div>
            <h3 class="fw-bold text-dark mb-1">Pengajuan Kasbon Karyawan</h3>
            <p class="text-secondary mb-0">Form Pengajuan Pinjaman Kasbon Internal Toko TB Berkah Jaya</p>
        </div>
    </div>

    <div class="row g-4">
        <div class="col-lg-5">
            <div class="card border-0 shadow-sm rounded-4 p-4">
                <div class="alert alert-info border-0 rounded-3 mb-3">
                    <small class="fw-bold d-block"><i class="bi bi-info-circle me-1"></i> Ketentuan Limit Kasbon Anda:</small>
                    <small class="d-block mt-1">Batas Limit Maksimal: <strong>Rp {{ number_format(auth()->user()->kasbon_limit, 0, ',', '.') }}</strong></small>
                    <small class="d-block">Sisa Kasbon Belum Lunas: <strong class="text-danger">Rp {{ number_format($unpaidKasbonSum, 0, ',', '.') }}</strong></small>
                    <small class="d-block">Sisa Plafon Tersedia: <strong class="text-success">Rp {{ number_format($remainingLimit, 0, ',', '.') }}</strong></small>
                </div>

                <form action="{{ route('kasbons.store') }}" method="POST">
                    @csrf
                    <div class="mb-3">
                        <label class="form-label fw-medium small">Nominal Pengajuan (Rp)</label>
                        <input type="number" name="amount" class="form-control form-control-lg text-danger fw-bold" placeholder="0" max="{{ $remainingLimit }}" min="10000" required>
                    </div>

                    <div class="mb-4">
                        <label class="form-label fw-medium small">Alasan Pengajuan Kasbon</label>
                        <textarea name="reason" class="form-control" rows="3" placeholder="Contoh: Kebutuhan mendesak biaya sekolah anak" required></textarea>
                    </div>

                    <button type="submit" class="btn btn-primary btn-lg w-100 fw-bold rounded-3 shadow-sm" {{ $remainingLimit <= 0 ? 'disabled' : '' }}>
                        <i class="bi bi-send me-1"></i> Ajukan Kasbon Sekarang
                    </button>
                </form>
            </div>
        </div>

        <div class="col-lg-7">
            <div class="card border-0 shadow-sm rounded-4 p-0 overflow-hidden">
                <div class="p-3 bg-light fw-bold border-bottom">Riwayat Kasbon Saya</div>
                <div class="table-responsive">
                    <table class="table table-hover align-middle mb-0">
                        <thead class="table-light">
                            <tr>
                                <th>Tanggal</th>
                                <th>Nominal</th>
                                <th>Alasan</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse($myKasbons as $k)
                                <tr>
                                    <td><small class="text-muted">{{ $k->created_at->format('d/m/Y H:i') }}</small></td>
                                    <td><span class="fw-bold text-danger">Rp {{ number_format($k->amount, 0, ',', '.') }}</span></td>
                                    <td><small class="text-secondary">{{ $k->reason }}</small></td>
                                    <td>
                                        @if($k->is_paid)
                                            <span class="badge bg-success">LUNAS</span>
                                        @else
                                            <span class="badge bg-warning text-dark">BELUM LUNAS</span>
                                        @endif
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="4" class="text-center py-4 text-muted">Belum ada riwayat pengajuan kasbon</td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

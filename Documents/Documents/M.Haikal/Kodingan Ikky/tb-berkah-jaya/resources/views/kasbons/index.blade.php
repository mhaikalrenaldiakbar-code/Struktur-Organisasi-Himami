@extends('layouts.app')

@section('title', 'Kelola Kasbon Karyawan')

@section('content')
<div class="container-fluid p-0">
    <div class="d-flex align-items-center justify-content-between mb-4">
        <div>
            <h3 class="fw-bold text-dark mb-1">Kelola Kasbon Pinjaman Karyawan</h3>
            <p class="text-secondary mb-0">Pencatatan, Tambah Kasbon Baru, & Pelunasan Kasbon Pegawai Toko (PRD Section 2.2)</p>
        </div>
        <button class="btn btn-primary fw-bold rounded-3 shadow-sm" data-bs-toggle="modal" data-bs-target="#addKasbonModal">
            <i class="bi bi-plus-circle me-1"></i> Tambah Catatan Kasbon
        </button>
    </div>

    <div class="card border-0 shadow-sm rounded-4 p-0 overflow-hidden">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
                <thead class="table-light">
                    <tr>
                        <th>Tanggal Pengajuan</th>
                        <th>Karyawan Pemohon</th>
                        <th>Nominal Kasbon</th>
                        <th>Alasan Pinjaman</th>
                        <th>Status Pelunasan</th>
                        <th class="text-end">Tandai Lunas</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($kasbons as $k)
                        <tr>
                            <td><small class="text-muted">{{ $k->created_at->format('d/m/Y H:i') }}</small></td>
                            <td><div class="fw-bold text-dark">{{ $k->user ? $k->user->name : '-' }}</div></td>
                            <td><span class="fw-bold text-danger fs-6">Rp {{ number_format($k->amount, 0, ',', '.') }}</span></td>
                            <td><small class="text-secondary">{{ $k->reason ?: '-' }}</small></td>
                            <td>
                                @if($k->is_paid)
                                    <span class="badge bg-success"><i class="bi bi-check-circle me-1"></i> LUNAS</span>
                                @else
                                    <span class="badge bg-warning text-dark"><i class="bi bi-clock me-1"></i> BELUM LUNAS</span>
                                @endif
                            </td>
                            <td class="text-end">
                                <form action="{{ route('kasbons.toggle-paid', $k->id) }}" method="POST">
                                    @csrf
                                    <button type="submit" class="btn btn-sm {{ $k->is_paid ? 'btn-outline-secondary' : 'btn-success fw-bold' }}">
                                        {{ $k->is_paid ? 'Tandai Belum Lunas' : 'Tandai Lunas' }}
                                    </button>
                                </form>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="6" class="text-center py-5 text-muted">Belum ada riwayat kasbon karyawan terdaftar. Klik tombol di atas untuk menambah kasbon.</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
</div>

<!-- Modal Tambah Kasbon Pegawai (Admin) -->
<div class="modal fade" id="addKasbonModal" tabindex="-1">
    <div class="modal-dialog">
        <form action="{{ route('kasbons.storeAdmin') }}" method="POST" class="modal-content rounded-4 border-0">
            @csrf
            <div class="modal-header border-0 pb-0">
                <h5 class="modal-title fw-bold">Tambah Catatan Kasbon Pegawai</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <label class="form-label fw-medium small">Pilih Pegawai Pemohon</label>
                    <select name="user_id" class="form-select" required>
                        <option value="">-- Pilih Pegawai --</option>
                        @foreach($employees as $emp)
                            <option value="{{ $emp->id }}">{{ $emp->name }} (Plafon Limit: Rp {{ number_format($emp->kasbon_limit ?? 1000000, 0, ',', '.') }})</option>
                        @endforeach
                    </select>
                </div>

                <div class="mb-3">
                    <label class="form-label fw-medium small">Nominal Pinjaman Kasbon (Rp)</label>
                    <input type="number" name="amount" class="form-control fw-bold text-danger" placeholder="0" min="1000" required>
                </div>

                <div class="mb-3">
                    <label class="form-label fw-medium small">Alasan / Catatan Kasbon</label>
                    <textarea name="reason" class="form-control" rows="3" placeholder="Contoh: Pinjaman dana kebutuhan keluarga mendesak" required></textarea>
                </div>
            </div>
            <div class="modal-footer border-0">
                <button type="button" class="btn btn-light" data-bs-dismiss="modal">Batal</button>
                <button type="submit" class="btn btn-primary fw-bold">Simpan Catatan Kasbon</button>
            </div>
        </form>
    </div>
</div>
@endsection

@extends('layouts.app')

@section('title', 'IP Whitelist Network Lock')

@section('content')
<div class="container-fluid p-0">
    <div class="d-flex align-items-center justify-content-between mb-4">
        <div>
            <h3 class="fw-bold text-dark mb-1"><i class="bi bi-wifi text-primary me-2"></i>Lock IP Wi-Fi Toko (Anti-Fraud)</h3>
            <p class="text-secondary mb-0">Pengaturan Pembatasan Alamat IP Perangkat Terminal Presensi Pegawai (PRD Section 3.4)</p>
        </div>
    </div>

    <div class="row g-4">
        <div class="col-lg-5">
            <div class="card border-0 shadow-sm rounded-4 p-4">
                <h5 class="fw-bold mb-3 text-dark">Tambah Alamat IP Whitelist</h5>
                <form action="{{ route('whitelists.store') }}" method="POST">
                    @csrf
                    <div class="mb-3">
                        <label class="form-label fw-medium small">Alamat IP (Internet Protocol)</label>
                        <input type="text" name="ip_address" class="form-control" placeholder="Contoh: 127.0.0.1 atau 192.168.1.10" value="{{ request()->ip() }}" required>
                        <small class="text-muted">IP Anda Saat Ini: <code>{{ request()->ip() }}</code></small>
                    </div>

                    <div class="mb-4">
                        <label class="form-label fw-medium small">Keterangan Nama Perangkat / Wi-Fi</label>
                        <input type="text" name="label" class="form-control" placeholder="Contoh: Wi-Fi Kasir Toko Berkah Jaya" required>
                    </div>

                    <button type="submit" class="btn btn-primary fw-bold w-100 py-2.5 rounded-3">
                        <i class="bi bi-plus-circle me-1"></i> Daftarkan IP Toko
                    </button>
                </form>
            </div>
        </div>

        <div class="col-lg-7">
            <div class="card border-0 shadow-sm rounded-4 p-0 overflow-hidden">
                <div class="table-responsive">
                    <table class="table table-hover align-middle mb-0">
                        <thead class="table-light">
                            <tr>
                                <th>Alamat IP Registered</th>
                                <th>Label Wi-Fi / Lokasi</th>
                                <th>Waktu Pendaftaran</th>
                                <th class="text-end">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse($whitelists as $ip)
                                <tr>
                                    <td><span class="badge bg-dark font-monospace fs-6">{{ $ip->ip_address }}</span></td>
                                    <td><div class="fw-bold text-dark">{{ $ip->label }}</div></td>
                                    <td><small class="text-muted">{{ $ip->created_at->format('d/m/Y H:i') }}</small></td>
                                    <td class="text-end">
                                        <button class="btn btn-sm btn-outline-danger" onclick="if(confirm('Hapus IP whitelist ini?')) document.getElementById('delete-ip-{{ $ip->id }}').submit();">
                                            <i class="bi bi-trash"></i>
                                        </button>
                                        <form id="delete-ip-{{ $ip->id }}" action="{{ route('whitelists.destroy', $ip->id) }}" method="POST" class="d-none">
                                            @csrf
                                            @method('DELETE')
                                        </form>
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="4" class="text-center py-4 text-muted">Belum ada IP terdaftar. Terminal absen akan menolak presensi.</td>
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

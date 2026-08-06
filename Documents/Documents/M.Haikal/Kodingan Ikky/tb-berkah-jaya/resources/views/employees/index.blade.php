@extends('layouts.app')

@section('title', 'Data Karyawan & SDM')

@section('content')
<div class="container-fluid p-0">
    <div class="d-flex align-items-center justify-content-between mb-4">
        <div>
            <h3 class="fw-bold text-dark mb-1"><i class="bi bi-people-fill text-primary me-2"></i>Manajemen Data Pegawai</h3>
            <p class="text-secondary mb-0">Kelola Profil Karyawan, Single Akun Kasir Login, Presensi Barcode, Plafon Kasbon, & ID Cards</p>
        </div>
        <a href="{{ route('employees.create') }}" class="btn btn-primary fw-bold rounded-3 shadow">
            <i class="bi bi-person-plus me-1"></i> Tambah Pegawai / Kasir
        </a>
    </div>

    <div class="card border-0 shadow-sm rounded-4 p-0 overflow-hidden">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
                <thead class="table-dark">
                    <tr>
                        <th>Nama Pegawai & Email</th>
                        <th>Peran System & Hak Akses</th>
                        <th>Standard Upah Presensi</th>
                        <th>Plafon Limit Kasbon</th>
                        <th>Token ID Card Barcode</th>
                        <th class="text-end">Aksi Detail</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($employees as $emp)
                        <tr>
                            <td>
                                <div class="fw-bold text-dark fs-6">{{ $emp->name }}</div>
                                <small class="text-muted"><i class="bi bi-envelope me-1"></i>{{ $emp->email }}</small>
                            </td>
                            <td>
                                @if($emp->role === 'kasir')
                                    <span class="badge bg-success text-uppercase px-2.5 py-1.5 fs-6">
                                        <i class="bi bi-key-fill me-1"></i> KASIR OPERASIONAL (AKUN LOGIN POS)
                                    </span>
                                @elseif($emp->role === 'admin')
                                    <span class="badge bg-primary text-uppercase px-2.5 py-1.5 fs-6">ADMINISTRATOR</span>
                                @else
                                    <span class="badge bg-secondary text-uppercase px-2.5 py-1.5">
                                        PEGAWAI BIASA (PRESENSI & GAJI)
                                    </span>
                                @endif
                            </td>
                            <td><span class="fw-bold text-success">Rp 50.000 <small class="text-muted fw-normal">/ Hari Hadir</small></span></td>
                            <td><span class="text-danger fw-bold">Rp {{ number_format($emp->kasbon_limit ?? 1000000, 0, ',', '.') }}</span></td>
                            <td><code class="fw-bold text-primary">{{ $emp->qr_code_token }}</code></td>
                            <td class="text-end">
                                <a href="{{ route('employees.profile', $emp->id) }}" class="btn btn-sm btn-outline-info me-1" title="Lihat Profil">
                                    <i class="bi bi-eye"></i> Profil
                                </a>
                                <a href="{{ route('employees.edit', $emp->id) }}" class="btn btn-sm btn-outline-warning me-1" title="Edit Data">
                                    <i class="bi bi-pencil"></i> Edit
                                </a>
                                @if($emp->id !== auth()->id())
                                    <button class="btn btn-sm btn-outline-danger" onclick="if(confirm('Hapus profil karyawan ini?')) document.getElementById('delete-emp-{{ $emp->id }}').submit();">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                    <form id="delete-emp-{{ $emp->id }}" action="{{ route('employees.destroy', $emp->id) }}" method="POST" class="d-none">
                                        @csrf
                                        @method('DELETE')
                                    </form>
                                @endif
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="6" class="text-center py-5 text-muted">Belum ada pegawai terdaftar</td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>

    <!-- Pagination -->
    <div class="mt-3">
        {{ $employees->links() }}
    </div>
</div>
@endsection

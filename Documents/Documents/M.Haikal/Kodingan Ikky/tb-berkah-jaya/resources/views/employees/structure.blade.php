@extends('layouts.app')

@section('title', 'Bagan Struktur Organisasi')

@section('content')
<div class="container-fluid p-0">
    <div class="d-flex align-items-center justify-content-between mb-4">
        <div>
            <h3 class="fw-bold text-dark mb-1"><i class="bi bi-diagram-3-fill text-primary me-2"></i>Bagan Struktur Organisasi Toko</h3>
            <p class="text-secondary mb-0">Skema Hierarki & Pembagian Tugas Tim Operasional TB Berkah Jaya Citapen (PRD Section 3.5)</p>
        </div>
        <a href="{{ route('employees.index') }}" class="btn btn-outline-primary fw-bold">
            <i class="bi bi-people me-1"></i> Kelola Data Karyawan
        </a>
    </div>

    <!-- Tree Architecture Diagram -->
    <div class="card border-0 shadow-sm rounded-4 p-5 text-center bg-white">
        <!-- Top Management: Admin / Pemilik -->
        <div class="mb-5">
            <span class="badge bg-primary px-4 py-2 fs-6 rounded-pill text-uppercase mb-3"><i class="bi bi-crown me-1"></i> Manajemen Tingkat Atas (Pemilik / Manajer Toko)</span>
            <div class="d-flex justify-content-center gap-4 flex-wrap mt-2">
                @foreach($admins as $admin)
                    <div class="card border-primary border-2 shadow-sm rounded-4 p-3" style="width: 260px; background-color: #f0f9ff;">
                        <div class="bg-primary text-white rounded-circle mx-auto d-flex align-items-center justify-content-center mb-2" style="width: 50px; height: 50px; font-weight: bold; font-size: 1.25rem;">
                            {{ strtoupper(substr($admin->name, 0, 1)) }}
                        </div>
                        <h6 class="fw-bold text-dark mb-0">{{ $admin->name }}</h6>
                        <small class="text-primary fw-bold">ADMIN / MANAJER</small>
                        <hr class="my-2">
                        <small class="text-muted d-block"><i class="bi bi-envelope me-1"></i> {{ $admin->email }}</small>
                    </div>
                @endforeach
            </div>
        </div>

        <div class="d-flex justify-content-center my-3">
            <div style="width: 2px; height: 40px; background-color: #cbd5e1;"></div>
        </div>

        <!-- Operational Level: Staf / Kasir -->
        <div>
            <span class="badge bg-success px-4 py-2 fs-6 rounded-pill text-uppercase mb-3"><i class="bi bi-shop me-1"></i> Tim Operasional Lapangan & Kasir (Staf Toko)</span>
            <div class="d-flex justify-content-center gap-4 flex-wrap mt-2">
                @forelse($pegawais as $pegawai)
                    <div class="card border-success border-2 shadow-sm rounded-4 p-3" style="width: 260px; background-color: #f0fdf4;">
                        <div class="bg-success text-white rounded-circle mx-auto d-flex align-items-center justify-content-center mb-2" style="width: 50px; height: 50px; font-weight: bold; font-size: 1.25rem;">
                            {{ strtoupper(substr($pegawai->name, 0, 1)) }}
                        </div>
                        <h6 class="fw-bold text-dark mb-0">{{ $pegawai->name }}</h6>
                        <small class="text-success fw-bold">STAF OPERASIONAL & KASIR</small>
                        <hr class="my-2">
                        <small class="text-muted d-block mb-1">Gaji Pokok: Rp {{ number_format($pegawai->base_salary, 0, ',', '.') }}</small>
                        <a href="{{ route('employees.profile', $pegawai->id) }}" class="btn btn-sm btn-outline-success rounded-pill mt-1" style="font-size: 0.75rem;">
                            <i class="bi bi-person-badge me-1"></i> Lihat Profil Full
                        </a>
                    </div>
                @empty
                    <div class="text-muted">Belum ada pegawai operasional yang didaftarkan.</div>
                @endforelse
            </div>
        </div>
    </div>
</div>
@endsection

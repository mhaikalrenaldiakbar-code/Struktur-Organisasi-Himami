@extends('layouts.app')

@section('title', 'Edit Data Karyawan')

@section('content')
<div class="container-fluid p-0">
    <div class="d-flex align-items-center justify-content-between mb-4">
        <div>
            <h3 class="fw-bold text-dark mb-1">Edit Karyawan: {{ $employee->name }}</h3>
            <p class="text-secondary mb-0">Perbarui Peran Peran Akses, Kontak, Plafon Kasbon, & Sandi Login</p>
        </div>
        <a href="{{ route('employees.index') }}" class="btn btn-outline-secondary">
            <i class="bi bi-arrow-left me-1"></i> Kembali
        </a>
    </div>

    <form action="{{ route('employees.update', $employee->id) }}" method="POST" class="card border-0 shadow-sm rounded-4 p-4">
        @csrf
        @method('PUT')
        <div class="row g-3">
            <div class="col-md-6">
                <label class="form-label fw-medium small">Peran Karyawan (Role)</label>
                <select name="role" class="form-select fw-bold" required>
                    <option value="pegawai" {{ $employee->role === 'pegawai' ? 'selected' : '' }}>Pegawai Biasa (Staf Lapangan - Tanpa Akses Login Sistem)</option>
                    <option value="kasir" {{ $employee->role === 'kasir' ? 'selected' : ($hasKasir ? 'disabled' : '') }}>
                        Kasir Operasional {{ $employee->role !== 'kasir' && $hasKasir ? '(SUDAH ADA 1 KASIR TERDAFTAR)' : '(Akses Login POS - Max 1 Akun)' }}
                    </option>
                </select>
                <small class="text-muted d-block mt-1">
                    <i class="bi bi-info-circle me-1"></i>
                    Pegawai Biasa hanya didaftarkan untuk presensi barcode & penggajian.
                </small>
            </div>

            <div class="col-md-6">
                <label class="form-label fw-medium small">Nama Lengkap Karyawan</label>
                <input type="text" name="name" class="form-control" value="{{ old('name', $employee->name) }}" required>
            </div>

            <div class="col-md-6">
                <label class="form-label fw-medium small">Email Identitas</label>
                <input type="email" name="email" class="form-control" value="{{ old('email', $employee->email) }}" required>
            </div>

            <div class="col-md-6">
                <label class="form-label fw-medium small">Nomor HP / WhatsApp</label>
                <input type="text" name="phone" class="form-control" value="{{ old('phone', $employee->phone) }}">
            </div>

            <div class="col-md-6">
                <label class="form-label fw-medium small">Ubah Kata Sandi (Khusus Akun Kasir / Opsional)</label>
                <input type="password" name="password" class="form-control" placeholder="Kosongkan jika tidak diubah">
            </div>

            <div class="col-md-6">
                <label class="form-label fw-medium small">Konfirmasi Kata Sandi Baru</label>
                <input type="password" name="password_confirmation" class="form-control" placeholder="Kosongkan jika tidak diubah">
            </div>

            <hr class="my-3">

            <div class="col-md-6">
                <label class="form-label fw-medium small">Upah Standard Per Hari Hadir (Rp)</label>
                <div class="input-group">
                    <span class="input-group-text bg-light fw-bold">Rp</span>
                    <input type="number" class="form-control fw-bold text-success" value="50000" disabled>
                    <span class="input-group-text">/ Hari</span>
                </div>
            </div>

            <div class="col-md-6">
                <label class="form-label fw-medium small">Plafon Limit Pinjaman Kasbon (Rp)</label>
                <input type="number" name="kasbon_limit" class="form-control" value="{{ old('kasbon_limit', $employee->kasbon_limit) }}" min="0">
            </div>
        </div>

        <div class="mt-4 text-end">
            <button type="submit" class="btn btn-warning btn-lg fw-bold px-4 rounded-3 shadow">
                <i class="bi bi-check-circle me-1"></i> Perbarui Data Karyawan
            </button>
        </div>
    </form>
</div>
@endsection

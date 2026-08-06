@extends('layouts.app')

@section('title', 'Tambah Karyawan Baru')

@section('content')
<div class="container-fluid p-0">
    <div class="d-flex align-items-center justify-content-between mb-4">
        <div>
            <h3 class="fw-bold text-dark mb-1">Pendaftaran Pegawai & Staf Kasir</h3>
            <p class="text-secondary mb-0">Registrasi Pegawai Baru untuk Absensi QR Code, Perhitungan Gaji, & Akun Kasir Single System</p>
        </div>
        <a href="{{ route('employees.index') }}" class="btn btn-outline-secondary">
            <i class="bi bi-arrow-left me-1"></i> Kembali
        </a>
    </div>

    <form action="{{ route('employees.store') }}" method="POST" class="card border-0 shadow-sm rounded-4 p-4">
        @csrf
        <div class="row g-3">
            <div class="col-md-6">
                <label class="form-label fw-medium small">Peran Karyawan (Role)</label>
                <select name="role" id="roleSelect" class="form-select fw-bold" required onchange="togglePasswordFields(this.value)">
                    <option value="pegawai" selected>Pegawai Biasa (Staf Lapangan - Tanpa Akses Login Sistem)</option>
                    <option value="kasir" {{ $hasKasir ? 'disabled' : '' }}>
                        Kasir Operasional {{ $hasKasir ? '(SUDAH ADA 1 KASIR TERDAFTAR)' : '(Akses Login POS - Max 1 Akun)' }}
                    </option>
                </select>
                <small class="text-muted d-block mt-1">
                    <i class="bi bi-info-circle me-1"></i>
                    Pegawai Biasa hanya didaftarkan untuk presensi barcode & gaji. Hanya 1 Akun Kasir yang dapat mengakses login POS.
                </small>
            </div>

            <div class="col-md-6">
                <label class="form-label fw-medium small">Nama Lengkap Karyawan</label>
                <input type="text" name="name" class="form-control" placeholder="Contoh: Budi Santoso" value="{{ old('name') }}" required>
            </div>

            <div class="col-md-6">
                <label class="form-label fw-medium small">Email Identitas Pegawai</label>
                <input type="email" name="email" class="form-control" placeholder="budi@berkahjaya.com" value="{{ old('email') }}" required>
            </div>

            <div class="col-md-6">
                <label class="form-label fw-medium small">Nomor HP / WhatsApp</label>
                <input type="text" name="phone" class="form-control" placeholder="081234567890" value="{{ old('phone') }}">
            </div>

            <!-- Password section only strictly needed for Kasir account -->
            <div class="col-md-6" id="passwordGroup" style="display: none;">
                <label class="form-label fw-medium small">Kata Sandi Login Kasir</label>
                <input type="password" name="password" id="passwordInput" class="form-control" placeholder="••••••••">
            </div>

            <div class="col-md-6" id="passwordConfirmGroup" style="display: none;">
                <label class="form-label fw-medium small">Konfirmasi Kata Sandi Kasir</label>
                <input type="password" name="password_confirmation" id="passwordConfirmInput" class="form-control" placeholder="••••••••">
            </div>

            <hr class="my-3">

            <div class="col-md-6">
                <label class="form-label fw-medium small">Upah Standard Per Hari Hadir (Rp)</label>
                <div class="input-group">
                    <span class="input-group-text bg-light fw-bold">Rp</span>
                    <input type="number" class="form-control fw-bold text-success" value="50000" disabled>
                    <span class="input-group-text">/ Hari</span>
                </div>
                <small class="text-muted">Standard Rp 50.000 per hari presensi hadir</small>
            </div>

            <div class="col-md-6">
                <label class="form-label fw-medium small">Plafon Limit Pinjaman Kasbon (Rp)</label>
                <input type="number" name="kasbon_limit" class="form-control" placeholder="1000000" value="1000000" min="0">
                <small class="text-muted">Batas maksimal nominal pinjaman kasbon</small>
            </div>
        </div>

        <div class="mt-4 text-end">
            <button type="submit" class="btn btn-primary btn-lg fw-bold px-4 rounded-3 shadow">
                <i class="bi bi-check-circle me-1"></i> Simpan Data Pegawai
            </button>
        </div>
    </form>
</div>
@endsection

@section('scripts')
<script>
    function togglePasswordFields(val) {
        const passGrp = document.getElementById('passwordGroup');
        const passConfGrp = document.getElementById('passwordConfirmGroup');
        const passInp = document.getElementById('passwordInput');
        const passConfInp = document.getElementById('passwordConfirmInput');

        if (val === 'kasir') {
            passGrp.style.display = 'block';
            passConfGrp.style.display = 'block';
            passInp.required = true;
            passConfInp.required = true;
        } else {
            passGrp.style.display = 'none';
            passConfGrp.style.display = 'none';
            passInp.required = false;
            passConfInp.required = false;
        }
    }
</script>
@endsection

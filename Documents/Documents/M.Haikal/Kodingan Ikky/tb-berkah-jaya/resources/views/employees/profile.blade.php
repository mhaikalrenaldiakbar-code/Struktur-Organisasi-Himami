@extends('layouts.app')

@section('title', 'Profil Karyawan')

@section('content')
<div class="container-fluid p-0">
    <div class="d-flex align-items-center justify-content-between mb-4">
        <div>
            <h3 class="fw-bold text-dark mb-1">Profil {{ $user->role === 'admin' ? 'Pemilik / Manager (Owner)' : 'Karyawan' }}: {{ $user->name }}</h3>
            <p class="text-secondary mb-0">Informasi Diri & Akses Pengguna SIM-TB Berkah Jaya Citapen</p>
        </div>
        <a href="{{ route('employees.index') }}" class="btn btn-outline-secondary">
            <i class="bi bi-arrow-left me-1"></i> Kembali ke Daftar
        </a>
    </div>

    @if($user->role === 'admin')
        <!-- Admin / Owner Profile Card (No QR Code, No Salary/Kasbon/Attendance Logs) -->
        <div class="row justify-content-center">
            <div class="col-lg-6">
                <div class="card border-0 shadow-sm rounded-4 p-5 text-center bg-white border-top border-primary border-4">
                    <div class="bg-primary text-white rounded-circle mx-auto d-flex align-items-center justify-content-center mb-3 shadow" style="width: 90px; height: 90px; font-weight: bold; font-size: 2.25rem;">
                        {{ strtoupper(substr($user->name, 0, 1)) }}
                    </div>
                    <h3 class="fw-bold text-dark mb-1">{{ $user->name }}</h3>
                    <span class="badge bg-primary text-uppercase px-3 py-1.5 rounded-pill mb-3">Pemilik Toko / Admin Manager</span>

                    <hr class="my-4">

                    <div class="text-start bg-light p-4 rounded-4 border">
                        <h6 class="fw-bold text-dark mb-3"><i class="bi bi-person-badge text-primary me-2"></i>Detail Informasi Pengguna:</h6>
                        <table class="table table-borderless table-sm mb-0">
                            <tr>
                                <td class="text-muted" style="width: 140px;">Nama Lengkap</td>
                                <td>: <strong class="text-dark">{{ $user->name }}</strong></td>
                            </tr>
                            <tr>
                                <td class="text-muted">Alamat Email</td>
                                <td>: <strong class="text-dark">{{ $user->email }}</strong></td>
                            </tr>
                            <tr>
                                <td class="text-muted">Peran Hak Akses</td>
                                <td>: <span class="badge bg-dark">ADMINISTRATOR (FULL ACCESS)</span></td>
                            </tr>
                            <tr>
                                <td class="text-muted">Status Akun</td>
                                <td>: <span class="badge bg-success">AKTIF</span></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    @else
        <!-- Employee / Cashier Profile Card -->
        <div class="row g-4 mb-4">
            <!-- Personal Details & QR Card Download -->
            <div class="col-lg-4">
                <div class="card border-0 shadow-sm rounded-4 p-4 text-center mb-4">
                    <div class="bg-primary text-white rounded-circle mx-auto d-flex align-items-center justify-content-center mb-3" style="width: 80px; height: 80px; font-weight: bold; font-size: 2rem;">
                        {{ strtoupper(substr($user->name, 0, 1)) }}
                    </div>
                    <h4 class="fw-bold text-dark mb-0">{{ $user->name }}</h4>
                    <span class="badge bg-success text-uppercase px-3 py-1 rounded-pill mt-2 d-inline-block">{{ $user->role }}</span>

                    <hr class="my-3">

                    <!-- ID Card Preview Block -->
                    <div class="card border-primary border-2 p-3 rounded-4 bg-light mb-3 text-center shadow-sm" id="idCardPrintArea">
                        <div class="d-flex align-items-center justify-content-center gap-2 mb-2">
                            <i class="bi bi-buildings-fill text-primary fs-5"></i>
                            <span class="fw-bold text-dark small">TB BERKAH JAYA CITAPEN</span>
                        </div>
                        <small class="text-muted d-block mb-2" style="font-size: 0.75rem;">KARTU ANGGOTA PEGAWAI</small>
                        
                        <div class="bg-white p-2 rounded-3 d-inline-block border mb-2">
                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data={{ $user->qr_code_token }}" alt="QR Code ID Card" class="img-fluid rounded-2" style="width: 140px; height: 140px;">
                        </div>
                        
                        <div class="fw-bold text-dark mb-0">{{ $user->name }}</div>
                        <code class="small text-primary fw-bold">{{ $user->qr_code_token }}</code>
                    </div>

                    <div class="d-flex gap-2">
                        <button type="button" class="btn btn-primary w-100 rounded-3 fw-bold" onclick="printIDCard()">
                            <i class="bi bi-printer me-1"></i> Cetak / Unduh ID Card
                        </button>
                    </div>

                    @if(auth()->user()->role === 'admin')
                        <form action="{{ route('employees.regenerate', $user->id) }}" method="POST" class="mt-2">
                            @csrf
                            <button type="submit" class="btn btn-sm btn-outline-warning w-100 rounded-3">
                                <i class="bi bi-arrow-repeat me-1"></i> Generate Ulang Token QR
                            </button>
                        </form>
                    @endif
                </div>
            </div>

            <!-- Financial & Attendance Log Section -->
            <div class="col-lg-8">
                <div class="row g-3 mb-4">
                    <div class="col-md-6">
                        <div class="card border-0 shadow-sm rounded-4 p-3 border-start border-success border-4">
                            <small class="text-muted fw-bold">STANDAR UPAH HARIAN</small>
                            <h4 class="fw-bold text-success my-1">Rp 50.000 <small class="fs-6 text-muted fw-normal">/ Hari Hadir</small></h4>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card border-0 shadow-sm rounded-4 p-3 border-start border-danger border-4">
                            <small class="text-muted fw-bold">SISA KASBON BERJALAN</small>
                            <h4 class="fw-bold text-danger my-1">Rp {{ number_format($unpaidKasbonSum, 0, ',', '.') }}</h4>
                            <small class="text-muted">Plafon Limit: Rp {{ number_format($user->kasbon_limit ?? 1000000, 0, ',', '.') }}</small>
                        </div>
                    </div>
                </div>

                <!-- Attendance History Log Table -->
                <div class="card border-0 shadow-sm rounded-4 p-4">
                    <div class="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                        <h5 class="fw-bold text-dark mb-0"><i class="bi bi-calendar-check text-info me-2"></i>Histori Presensi Absensi</h5>
                        <form method="GET" action="{{ route('employees.profile', $user->id) }}">
                            <input type="month" name="month" class="form-control form-control-sm" value="{{ $month }}" onchange="this.form.submit()">
                        </form>
                    </div>

                    <div class="table-responsive" style="max-height: 320px; overflow-y: auto;">
                        <table class="table table-hover align-middle mb-0">
                            <thead class="table-light">
                                <tr>
                                    <th>Tanggal</th>
                                    <th>Check-In</th>
                                    <th>Check-Out</th>
                                    <th>Terlambat</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                @forelse($attendances as $att)
                                    <tr>
                                        <td>{{ \Carbon\Carbon::parse($att->date)->format('d F Y') }}</td>
                                        <td><span class="text-success fw-bold">{{ $att->check_in ? \Carbon\Carbon::parse($att->check_in)->format('H:i') : '-' }}</span></td>
                                        <td><span class="text-primary fw-bold">{{ $att->check_out ? \Carbon\Carbon::parse($att->check_out)->format('H:i') : '-' }}</span></td>
                                        <td>{{ $att->minutes_late > 0 ? $att->minutes_late . ' menit' : 'Tepat Waktu' }}</td>
                                        <td><span class="badge bg-secondary">{{ strtoupper($att->status) }}</span></td>
                                    </tr>
                                @empty
                                    <tr>
                                        <td colspan="5" class="text-center py-4 text-muted">Belum ada riwayat absensi bulan ini</td>
                                    </tr>
                                @endforelse
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    @endif
</div>
@endsection

@section('scripts')
@if($user->role !== 'admin')
<script>
    function printIDCard() {
        const printWindow = window.open('', '_blank', 'width=450,height=550');
        const idCardContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>ID Card {{ $user->name }} - TB Berkah Jaya</title>
                <style>
                    body { font-family: sans-serif; text-align: center; padding: 20px; }
                    .card-box { border: 2px solid #0284c7; border-radius: 16px; padding: 20px; width: 280px; margin: 0 auto; background: #f0f9ff; }
                    .logo { font-size: 16px; font-weight: bold; color: #0284c7; margin-bottom: 5px; }
                    .title { font-size: 11px; color: #64748b; font-weight: bold; letter-spacing: 1px; margin-bottom: 15px; }
                    .qr-img { width: 160px; height: 160px; border-radius: 8px; border: 1px solid #cbd5e1; background: #fff; padding: 5px; }
                    .name { font-size: 16px; font-weight: bold; margin-top: 10px; color: #0f172a; }
                    .token { font-family: monospace; font-size: 12px; color: #0284c7; font-weight: bold; margin-top: 5px; }
                </style>
            </head>
            <body onload="window.print();">
                <div class="card-box">
                    <div class="logo">TB BERKAH JAYA CITAPEN</div>
                    <div class="title">KARTU ANGGOTA ABSENSI PEGAWAI</div>
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data={{ $user->qr_code_token }}" class="qr-img">
                    <div class="name">{{ $user->name }}</div>
                    <div class="token">{{ $user->qr_code_token }}</div>
                </div>
            </body>
            </html>
        `;
        printWindow.document.write(idCardContent);
        printWindow.document.close();
    }
</script>
@endif
@endsection

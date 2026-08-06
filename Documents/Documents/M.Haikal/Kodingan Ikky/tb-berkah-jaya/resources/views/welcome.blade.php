<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Selamat Datang di SIM-TB Berkah Jaya Citapen</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <style>
        :root {
            --tb-primary: #0f172a;
            --tb-accent: #0284c7;
        }
        body {
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            min-height: 100vh;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem 1rem;
        }
        .welcome-container {
            max-width: 1000px;
            width: 100%;
        }
        .hero-title-box {
            text-align: center;
            margin-bottom: 3rem;
        }
        .option-card {
            background: #1e293b;
            border: 1px solid #334155;
            border-radius: 24px;
            padding: 2.5rem 2rem;
            height: 100%;
            display: flex;
            flex-direction: column;
            transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .option-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 30px -10px rgba(0, 0, 0, 0.5);
            border-color: var(--tb-accent);
        }
        .card-icon {
            width: 70px;
            height: 70px;
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2.25rem;
            margin-bottom: 1.5rem;
        }
    </style>
</head>
<body>

    <div class="welcome-container">
        <!-- Hero Welcome Header -->
        <div class="hero-title-box">
            <div class="d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill bg-primary bg-opacity-20 border border-primary text-info mb-3 small">
                <i class="bi bi-buildings-fill"></i> System Information Management (SIM-TB)
            </div>
            <h1 class="fw-bold display-5 mb-2">Selamat Datang di TB Berkah Jaya Citapen</h1>
            <p class="text-white-50 lead mb-0">Sistem Informasi Manajemen & Operasional Toko Bangunan Terpadu</p>
        </div>

        <!-- 2 Main Access Gate Cards (Split into 2) -->
        <div class="row g-4 justify-content-center">
            
            <!-- GATE 1: Menu Absen tanpa Login -->
            <div class="col-md-6">
                <div class="option-card border-start border-4 border-info">
                    <div class="card-icon bg-info bg-opacity-10 text-info">
                        <i class="bi bi-qr-code-scan"></i>
                    </div>
                    <h3 class="fw-bold text-white mb-2">Terminal Absensi QR Code</h3>
                    <p class="text-white-50 mb-4 flex-grow-1">
                        Gerbang pemindaian mandiri presensi kedatangan & kepulangan pegawai secara langsung tanpa perlu login terlebih dahulu. Terkunci dengan IP Wi-Fi toko.
                    </p>
                    <a href="{{ route('attendances.scan') }}" class="btn btn-info btn-lg w-100 fw-bold py-3 rounded-4 shadow">
                        <i class="bi bi-camera me-2"></i> BUKA TERMINAL ABSENSI
                    </a>
                </div>
            </div>

            <!-- GATE 2: Menu Login Internal Admin & Pegawai -->
            <div class="col-md-6">
                <div class="option-card border-start border-4 border-success">
                    <div class="card-icon bg-success bg-opacity-10 text-success">
                        <i class="bi bi-shield-lock-fill"></i>
                    </div>
                    <h3 class="fw-bold text-white mb-2">Portal Ruang Kerja Internal</h3>
                    <p class="text-white-50 mb-4 flex-grow-1">
                        Pintu masuk bagi Admin (Pemilik/Manajer) & Pegawai (Kasir) untuk mengakses Point of Sale, Stok Barang Grosir/Eceran, & Laporan Keuangan.
                    </p>
                    @auth
                        <a href="{{ route('dashboard') }}" class="btn btn-success btn-lg w-100 fw-bold py-3 rounded-4 shadow">
                            <i class="bi bi-speedometer2 me-2"></i> MASUK KE DASHBOARD INTERNAL
                        </a>
                    @else
                        <a href="{{ route('login') }}" class="btn btn-success btn-lg w-100 fw-bold py-3 rounded-4 shadow">
                            <i class="bi bi-box-arrow-in-right me-2"></i> MASUK KE SYSTEM LOGIN
                        </a>
                    @endauth
                </div>
            </div>

        </div>

        <div class="text-center text-white-50 small mt-5">
            &copy; 2026 TB Berkah Jaya Citapen • All-in-One Digital Store Operations
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>

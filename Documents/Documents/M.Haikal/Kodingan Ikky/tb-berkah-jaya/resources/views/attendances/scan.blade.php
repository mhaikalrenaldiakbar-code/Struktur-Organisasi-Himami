<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Terminal Absensi Scan QR - TB Berkah Jaya Citapen</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <style>
        body {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            min-height: 100vh;
            color: #ffffff;
            font-family: 'Segoe UI', system-ui, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1.5rem;
        }
        .scan-card {
            background: #1e293b;
            border: 1px solid #334155;
            border-radius: 24px;
            max-width: 540px;
            width: 100%;
            overflow: hidden;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        #reader {
            width: 100%;
            border-radius: 16px;
            overflow: hidden;
            background: #0f172a;
        }
    </style>
</head>
<body>

    <div class="scan-card p-4 text-center">
        <!-- Dynamic Back Button (PRD Rule: If Logged In, Return to Dashboard, Not External Page) -->
        <div class="d-flex align-items-center justify-content-between mb-3">
            @auth
                <a href="{{ route('dashboard') }}" class="btn btn-outline-light btn-sm rounded-pill fw-bold">
                    <i class="bi bi-arrow-left me-1"></i> Kembali ke Dashboard
                </a>
            @else
                <a href="{{ route('home') }}" class="btn btn-outline-light btn-sm rounded-pill fw-bold">
                    <i class="bi bi-arrow-left me-1"></i> Kembali ke Portal Utama
                </a>
            @endauth

            <span class="badge bg-primary px-3 py-2 rounded-pill"><i class="bi bi-shield-lock me-1"></i> Anti-Fraud Guarded</span>
        </div>

        <h3 class="fw-bold mb-1"><i class="bi bi-qr-code-scan text-info me-2"></i>Terminal Scan Absensi</h3>
        <p class="text-white-50 small mb-3">Tunjukkan QR Code ID Card Pegawai ke Depan Kamera Toko</p>

        <!-- Webcam Frame Container -->
        <div class="position-relative mb-3">
            <div id="reader"></div>
        </div>

        <!-- Live Status Audio/Alert Container -->
        <div id="alertBox" class="alert d-none mb-3 py-2 text-start rounded-3" role="alert"></div>

        <!-- Manual Backup Input Token Fallback -->
        <div class="border-top border-secondary pt-3 mt-3">
            <label class="form-label text-white-50 small mb-1">Jika Kamera Rusak / Input Token ID Card Manual</label>
            <div class="input-group">
                <input type="text" id="manualTokenInput" class="form-control bg-dark text-white border-secondary" placeholder="Contoh: PEGAWAI-TOKEN-XXXXXX">
                <button class="btn btn-info fw-bold" id="submitManualBtn">Absen Manual</button>
            </div>
        </div>
    </div>

    <!-- Html5 QRCode Library -->
    <script src="https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js"></script>
    <script>
        const alertBox = document.getElementById('alertBox');
        let isProcessing = false;

        function showAlert(message, isSuccess = true) {
            alertBox.className = `alert ${isSuccess ? 'alert-success border-success' : 'alert-danger border-danger'} py-2 text-center rounded-3`;
            alertBox.innerHTML = `<i class="bi ${isSuccess ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'} me-2"></i> ${message}`;
            alertBox.classList.remove('d-none');
        }

        function sendScanToken(token) {
            if (isProcessing) return;
            isProcessing = true;

            fetch('{{ route("attendances.handle-scan") }}', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': '{{ csrf_token() }}'
                },
                body: JSON.stringify({ token: token })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    showAlert(data.message, true);
                } else {
                    showAlert(data.message, false);
                }
                setTimeout(() => { isProcessing = false; }, 3000);
            })
            .catch(err => {
                showAlert('Terjadi kesalahan koneksi terminal.', false);
                setTimeout(() => { isProcessing = false; }, 3000);
            });
        }

        // Initialize HTML5 QR Scanner
        const html5QrCode = new Html5Qrcode("reader");
        const config = { fps: 10, qrbox: { width: 250, height: 250 } };

        html5QrCode.start({ facingMode: "user" }, config, (decodedText, decodedResult) => {
            sendScanToken(decodedText);
        }).catch(err => {
            console.log("Kamera tidak ditemukan atau ditolak.");
        });

        // Manual submit handler
        document.getElementById('submitManualBtn').addEventListener('click', function() {
            const token = document.getElementById('manualTokenInput').value.trim();
            if (token) {
                sendScanToken(token);
                document.getElementById('manualTokenInput').value = '';
            }
        });
    </script>
</body>
</html>

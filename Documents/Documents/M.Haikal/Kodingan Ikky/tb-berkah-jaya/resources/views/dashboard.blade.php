@extends('layouts.app')

@section('title', 'Dashboard Operasional')

@section('content')
<div class="container-fluid p-0">

    <!-- Top Greeting Banner -->
    <div class="d-flex align-items-center justify-content-between mb-4">
        <div>
            <h3 class="fw-bold text-dark mb-1">
                Selamat Datang, {{ auth()->user()->name }} 👋 
                <span class="badge {{ auth()->user()->role === 'admin' ? 'bg-primary' : 'bg-success' }} fs-6 fw-normal ms-2 align-middle text-uppercase">
                    {{ auth()->user()->role === 'admin' ? 'Pemilik Toko (Admin)' : 'Staf Kasir' }}
                </span>
            </h3>
            <p class="text-secondary mb-0">Ringkasan Operasional TB Berkah Jaya Citapen - {{ now()->translatedFormat('l, d F Y') }}</p>
        </div>
        <div class="d-flex gap-2">
            <a href="{{ route('pos.index') }}" class="btn btn-success fw-bold px-3 py-2 rounded-3 shadow-sm">
                <i class="bi bi-calculator-fill me-1"></i> Buka Kasir POS
            </a>
            @if(auth()->user()->role === 'admin')
                <a href="{{ route('exports.index') }}" class="btn btn-warning fw-bold px-3 py-2 rounded-3 shadow-sm">
                    <i class="bi bi-file-earmark-bar-graph-fill me-1"></i> Rekap Laporan
                </a>
            @endif
        </div>
    </div>

    <!-- Metric Cards Row -->
    <div class="row g-3 mb-4">
        <div class="col-xl-3 col-md-6">
            <div class="card border-0 shadow-sm rounded-4 bg-white p-3 h-100 border-start border-primary border-4">
                <div class="d-flex align-items-center justify-content-between">
                    <div>
                        <div class="text-muted small fw-bold text-uppercase">Transaksi Penjualan Today</div>
                        <h2 class="fw-bold text-dark my-1">{{ number_format($salesCount) }}</h2>
                        <span class="text-success small"><i class="bi bi-clock me-1"></i> Total Sales Struk</span>
                    </div>
                    <div class="bg-primary bg-opacity-10 p-3 rounded-4 text-primary">
                        <i class="bi bi-cart-check fs-2"></i>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-xl-3 col-md-6">
            <div class="card border-0 shadow-sm rounded-4 bg-white p-3 h-100 border-start border-success border-4">
                <div class="d-flex align-items-center justify-content-between">
                    <div>
                        <div class="text-muted small fw-bold text-uppercase">Omzet Penjualan Kotor</div>
                        <h2 class="fw-bold text-success my-1">Rp {{ number_format($revenueToday, 0, ',', '.') }}</h2>
                        <span class="text-secondary small"><i class="bi bi-cash-stack me-1"></i> Total Kas Masuk</span>
                    </div>
                    <div class="bg-success bg-opacity-10 p-3 rounded-4 text-success">
                        <i class="bi bi-currency-dollar fs-2"></i>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-xl-3 col-md-6">
            <div class="card border-0 shadow-sm rounded-4 bg-white p-3 h-100 border-start border-info border-4">
                <div class="d-flex align-items-center justify-content-between">
                    <div>
                        <div class="text-muted small fw-bold text-uppercase">Barang Masuk (Restock)</div>
                        <h2 class="fw-bold text-info my-1">{{ number_format($incomingCount, 2) }}</h2>
                        <span class="text-secondary small"><i class="bi bi-box-arrow-in-down me-1"></i> Kuantitas Restock</span>
                    </div>
                    <div class="bg-info bg-opacity-10 p-3 rounded-4 text-info">
                        <i class="bi bi-boxes fs-2"></i>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-xl-3 col-md-6">
            <div class="card border-0 shadow-sm rounded-4 bg-white p-3 h-100 border-start border-secondary border-4">
                <div class="d-flex align-items-center justify-content-between">
                    <div>
                        <div class="text-muted small fw-bold text-uppercase">Barang Keluar Today</div>
                        <h2 class="fw-bold text-dark my-1">{{ number_format($outgoingCount, 2) }}</h2>
                        <span class="text-secondary small"><i class="bi bi-box-arrow-up me-1"></i> Sales & Rusak</span>
                    </div>
                    <div class="bg-secondary bg-opacity-10 p-3 rounded-4 text-secondary">
                        <i class="bi bi-truck fs-2"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Main Workspace Split: Left Chart & Logs | Right Smart Alert Panel (PRD 3.1) -->
    <div class="row g-4">
        
        <!-- Left Side: Analytics & Feed -->
        <div class="col-lg-8">
            <!-- Chart Card -->
            <div class="card border-0 shadow-sm rounded-4 p-4 mb-4">
                <div class="d-flex align-items-center justify-content-between mb-3">
                    <h5 class="fw-bold text-dark mb-0"><i class="bi bi-graph-up-arrow text-primary me-2"></i>Grafik Performa Penjualan (7 Hari Terakhir)</h5>
                    <span class="badge bg-light text-secondary border">Chart.js Engine</span>
                </div>
                <div style="height: 280px;">
                    <canvas id="salesChart"></canvas>
                </div>
            </div>

            <!-- Recent Log Feeds Grid -->
            <div class="row g-3">
                <div class="col-md-6">
                    <div class="card border-0 shadow-sm rounded-4 p-3 h-100">
                        <div class="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                            <h6 class="fw-bold mb-0 text-dark"><i class="bi bi-receipt me-2 text-primary"></i>5 Transaksi Terakhir</h6>
                            <a href="{{ route('pos.history') }}" class="small text-decoration-none fw-bold">Lihat Semua</a>
                        </div>
                        <div class="list-group list-group-flush small">
                            @forelse($recentTransactions as $tx)
                                <div class="list-group-item px-0 py-2 border-bottom d-flex align-items-center justify-content-between">
                                    <div>
                                        <a href="{{ route('pos.show', $tx->id) }}" class="fw-bold text-decoration-none">{{ $tx->invoice_number }}</a>
                                        <div class="text-muted extra-small">{{ $tx->user ? $tx->user->name : 'Kasir' }} • {{ $tx->created_at->format('H:i') }}</div>
                                    </div>
                                    <div class="text-end">
                                        <div class="fw-bold text-success">Rp {{ number_format($tx->total_amount, 0, ',', '.') }}</div>
                                        <span class="badge bg-light text-dark border">{{ strtoupper($tx->payment_method) }}</span>
                                    </div>
                                </div>
                            @empty
                                <div class="text-muted text-center py-3">Belum ada transaksi hari ini</div>
                            @endforelse
                        </div>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="card border-0 shadow-sm rounded-4 p-3 h-100">
                        <div class="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                            <h6 class="fw-bold mb-0 text-dark"><i class="bi bi-clock-history me-2 text-info"></i>Log Absensi Hari Ini</h6>
                            @if(auth()->user()->role === 'admin')
                                <a href="{{ route('attendances.index') }}" class="small text-decoration-none fw-bold">Lihat Log</a>
                            @endif
                        </div>
                        <div class="list-group list-group-flush small">
                            @forelse($recentAttendances as $att)
                                <div class="list-group-item px-0 py-2 border-bottom d-flex align-items-center justify-content-between">
                                    <div>
                                        <div class="fw-bold text-dark">{{ $att->user ? $att->user->name : 'Pegawai' }}</div>
                                        <div class="text-muted extra-small">Check-in: {{ \Carbon\Carbon::parse($att->check_in)->format('H:i:s') }}</div>
                                    </div>
                                    <div>
                                        @if($att->check_out)
                                            <span class="badge bg-success-subtle text-success border border-success">Pulang {{ \Carbon\Carbon::parse($att->check_out)->format('H:i') }}</span>
                                        @else
                                            <span class="badge bg-warning-subtle text-warning border border-warning">Aktif Bekerja</span>
                                        @endif
                                    </div>
                                </div>
                            @empty
                                <div class="text-muted text-center py-3">Belum ada aktivitas scan hari ini</div>
                            @endforelse
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Right Side: SMART ALERT PANEL (PRD Section 3.1) -->
        <div class="col-lg-4">
            <div class="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white border-top border-danger border-4">
                <div class="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                    <div>
                        <h5 class="fw-bold text-danger mb-0"><i class="bi bi-shield-exclamation me-2"></i>Smart Alert Panel</h5>
                        <small class="text-muted">Deteksi Stok Kritis & Habis</small>
                    </div>
                    <span class="badge bg-danger rounded-circle p-2 fs-6">{{ count($lowStockProducts) }}</span>
                </div>

                <p class="text-secondary small mb-3">
                    Panel ini mendeteksi produk yang habis / menipis secara langsung tanpa perlu berpindah dari dashboard.
                </p>

                <div class="alert-list" style="max-height: 480px; overflow-y: auto;">
                    @forelse($lowStockProducts as $p)
                        <div class="p-3 mb-2 rounded-3 border-start border-4 {{ $p->stock <= 0 ? 'bg-danger bg-opacity-10 border-danger' : 'bg-warning bg-opacity-10 border-warning' }}">
                            <div class="d-flex align-items-start justify-content-between">
                                <div>
                                    <span class="badge {{ $p->stock <= 0 ? 'bg-danger' : 'bg-warning text-dark' }} mb-1">
                                        {{ $p->stock <= 0 ? 'HABIS' : 'KRITIS / MENIPIS' }}
                                    </span>
                                    <div class="fw-bold text-dark">{{ $p->name }}</div>
                                    <small class="text-muted d-block">Kode: {{ $p->code }} • {{ $p->category ? $p->category->name : '-' }}</small>
                                </div>
                                <div class="text-end ms-2">
                                    <div class="fw-bold fs-5 {{ $p->stock <= 0 ? 'text-danger' : 'text-warning-emphasis' }}">
                                        {{ (float)$p->stock }} <small class="fs-6 fw-normal">{{ $p->base_unit }}</small>
                                    </div>
                                    <small class="text-muted">Min: {{ (float)$p->min_stock }}</small>
                                </div>
                            </div>
                            @if(auth()->user()->role === 'admin')
                                <div class="mt-2 text-end">
                                    <a href="{{ route('products.index', ['search' => $p->code]) }}" class="btn btn-sm btn-outline-dark rounded-pill py-0 px-2" style="font-size: 0.75rem;">
                                        <i class="bi bi-arrow-repeat me-1"></i>Restock Stok
                                    </a>
                                </div>
                            @endif
                        </div>
                    @empty
                        <div class="text-center text-success py-5">
                            <i class="bi bi-check-circle display-4 d-block mb-2 text-success"></i>
                            <div class="fw-bold">Seluruh Stok Dalam Batas Aman</div>
                            <small class="text-muted">Tidak ada peringatan stok kritis saat ini.</small>
                        </div>
                    @endforelse
                </div>
            </div>
        </div>

    </div>
</div>
@endsection

@section('scripts')
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
    document.addEventListener("DOMContentLoaded", function () {
        const ctx = document.getElementById('salesChart').getContext('2d');
        const salesChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: {!! json_encode($chartLabels) !!},
                datasets: [{
                    label: 'Omzet Penjualan (Rp)',
                    data: {!! json_encode($chartData) !!},
                    borderColor: '#0284c7',
                    backgroundColor: 'rgba(2, 132, 199, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.35,
                    pointBackgroundColor: '#0284c7',
                    pointRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return 'Rp ' + value.toLocaleString('id-ID');
                            }
                        }
                    }
                }
            }
        });
    });
</script>
@endsection

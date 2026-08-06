<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'Dashboard') - SIM-TB Berkah Jaya Citapen</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <style>
        :root {
            --sidebar-width: 260px;
            --topbar-height: 65px;
            --tb-primary: #0f172a;
            --tb-secondary: #334155;
            --tb-accent: #0284c7;
        }
        body {
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
            background-color: #f1f5f9;
            overflow-x: hidden;
            -webkit-tap-highlight-color: transparent;
        }

        /* App Sidebar */
        .app-sidebar {
            width: var(--sidebar-width);
            height: 100vh;
            position: fixed;
            top: 0;
            left: 0;
            background-color: var(--tb-primary);
            color: #f8fafc;
            display: flex;
            flex-direction: column;
            z-index: 1050;
            box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease-in-out, margin-left 0.3s ease-in-out;
        }
        .sidebar-brand {
            height: var(--topbar-height);
            display: flex;
            align-items: center;
            padding: 0 1.25rem;
            font-weight: 700;
            font-size: 1.1rem;
            color: #ffffff;
            text-decoration: none;
            background-color: rgba(0, 0, 0, 0.2);
        }
        .sidebar-nav {
            padding: 1rem 0.75rem;
            flex: 1;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
        }
        .nav-label {
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #64748b;
            padding: 0.75rem 0.75rem 0.25rem;
            font-weight: 700;
        }
        .sidebar-link {
            display: flex;
            align-items: center;
            gap: 0.85rem;
            padding: 0.75rem 0.85rem;
            color: #cbd5e1;
            text-decoration: none;
            border-radius: 8px;
            font-size: 0.925rem;
            font-weight: 500;
            transition: all 0.15s ease;
        }
        .sidebar-link:hover, .sidebar-link.active {
            background-color: #1e293b;
            color: #38bdf8;
        }
        .sidebar-link i {
            font-size: 1.15rem;
        }

        /* Top Header */
        .app-topbar {
            height: var(--topbar-height);
            margin-left: var(--sidebar-width);
            background-color: #ffffff;
            border-bottom: 1px solid #e2e8f0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 1.25rem;
            position: sticky;
            top: 0;
            z-index: 1010;
            transition: margin-left 0.3s ease-in-out;
        }

        /* Main Container */
        .app-main {
            margin-left: var(--sidebar-width);
            padding: 1.5rem;
            min-height: calc(100vh - var(--topbar-height));
            transition: margin-left 0.3s ease-in-out;
        }

        /* Backdrop overlay for mobile drawer */
        .sidebar-backdrop {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(15, 23, 42, 0.5);
            backdrop-filter: blur(2px);
            z-index: 1040;
        }
        .sidebar-backdrop.show {
            display: block;
        }

        /* Responsive Breakpoints (Tablet & Mobile: Oppo A17k, iPhone, Samsung, iPad) */
        @media (max-width: 991.98px) {
            .app-sidebar {
                transform: translateX(-100%);
            }
            .app-sidebar.show {
                transform: translateX(0);
            }
            .app-topbar, .app-main {
                margin-left: 0 !important;
            }
            .app-main {
                padding: 1rem 0.75rem;
            }
        }
    </style>
    @yield('styles')
</head>
<body>

    <!-- Mobile Drawer Overlay Backdrop -->
    <div class="sidebar-backdrop" id="sidebarBackdrop"></div>

    <!-- Sidebar Navigation -->
    <aside class="app-sidebar" id="appSidebar">
        <div class="d-flex align-items-center justify-content-between pe-3 bg-dark bg-opacity-25">
            <a href="{{ route('dashboard') }}" class="sidebar-brand border-0 bg-transparent flex-grow-1">
                <i class="bi bi-buildings-fill text-info me-2 fs-4"></i>
                <div>
                    <div>TB BERKAH JAYA</div>
                    <small class="text-info fw-normal small d-block" style="font-size: 0.7rem;">Citapen System</small>
                </div>
            </a>
            <button class="btn btn-sm text-white-50 d-lg-none" id="closeSidebarBtn">
                <i class="bi bi-x-lg fs-5"></i>
            </button>
        </div>

        <div class="sidebar-nav">
            <div class="nav-label">Navigasi Utama</div>
            <a href="{{ route('dashboard') }}" class="sidebar-link {{ request()->routeIs('dashboard') ? 'active' : '' }}">
                <i class="bi bi-grid-1x2-fill"></i> Dashboard
            </a>

            <!-- POS & Inventory Lookup -->
            <div class="nav-label">Operasional Kasir & Stok</div>
            <a href="{{ route('pos.index') }}" class="sidebar-link {{ request()->routeIs('pos.index') ? 'active' : '' }}">
                <i class="bi bi-calculator-fill"></i> Point of Sale (POS)
            </a>
            <a href="{{ route('pos.history') }}" class="sidebar-link {{ request()->routeIs('pos.history') ? 'active' : '' }}">
                <i class="bi bi-receipt-cutoff"></i> Riwayat Transaksi
            </a>
            <a href="{{ route('products.search') }}" class="sidebar-link {{ request()->routeIs('products.search') ? 'active' : '' }}">
                <i class="bi bi-search"></i> Cek Stok Barang
            </a>

            <!-- Admin Modules -->
            @if(auth()->user()->role === 'admin')
                <div class="nav-label">Manajemen Inventori (Admin)</div>
                <a href="{{ route('categories.index') }}" class="sidebar-link {{ request()->routeIs('categories.*') ? 'active' : '' }}">
                    <i class="bi bi-tags-fill"></i> Kategori & Sub-Kategori
                </a>
                <a href="{{ route('products.index') }}" class="sidebar-link {{ request()->routeIs('products.index') ? 'active' : '' }}">
                    <i class="bi bi-box-seam-fill"></i> Data Barang (Tabel Utama)
                </a>

                <div class="nav-label">SDM & Kehadiran</div>
                <a href="{{ route('employees.index') }}" class="sidebar-link {{ request()->routeIs('employees.*') ? 'active' : '' }}">
                    <i class="bi bi-people-fill"></i> Profil Data Karyawan
                </a>
                <a href="{{ route('attendances.index') }}" class="sidebar-link {{ request()->routeIs('attendances.*') ? 'active' : '' }}">
                    <i class="bi bi-clock-history"></i> Log Kehadiran Pegawai
                </a>
                <a href="{{ route('whitelists.index') }}" class="sidebar-link {{ request()->routeIs('whitelists.*') ? 'active' : '' }}">
                    <i class="bi bi-wifi"></i> Lock IP Wi-Fi Toko
                </a>
                <a href="{{ route('kasbons.index') }}" class="sidebar-link {{ request()->routeIs('kasbons.index') ? 'active' : '' }}">
                    <i class="bi bi-bank"></i> Kelola Kasbon Karyawan
                </a>
                <a href="{{ route('payrolls.index') }}" class="sidebar-link {{ request()->routeIs('payrolls.*') ? 'active' : '' }}">
                    <i class="bi bi-journal-check"></i> Payroll Gaji Mingguan
                </a>
            @endif

            <!-- PRD Section 4: Reports Consolidated at the Bottom of Sidebar -->
            @if(auth()->user()->role === 'admin')
                <div class="mt-auto"></div>
                <div class="nav-label text-warning"><i class="bi bi-folder-symlink me-1"></i> Konsolidasi Laporan</div>
                <a href="{{ route('exports.index') }}" class="sidebar-link text-warning fw-bold {{ request()->routeIs('exports.*') ? 'active' : '' }}">
                    <i class="bi bi-file-earmark-bar-graph-fill text-warning"></i> Menu Laporan (PDF/Excel)
                </a>
            @endif
        </div>
    </aside>

    <!-- Top Navigation Bar -->
    <header class="app-topbar">
        <div class="d-flex align-items-center gap-2">
            <!-- Mobile Menu Toggle Button (Visible on Tablets & Android/iPhone Mobiles) -->
            <button type="button" class="btn btn-light border p-2 d-lg-none rounded-3" id="toggleSidebarBtn">
                <i class="bi bi-list fs-4 d-block"></i>
            </button>

            <span class="badge {{ auth()->user()->role === 'admin' ? 'bg-primary' : 'bg-success' }} px-3 py-2 rounded-pill text-uppercase">
                <i class="bi bi-shield-lock me-1"></i> {{ auth()->user()->role }}
            </span>
            <span class="text-muted d-none d-md-inline small">
                <i class="bi bi-geo-alt me-1"></i> TB Berkah Jaya Citapen
            </span>
        </div>

        <div class="d-flex align-items-center gap-2">
            <a href="{{ route('attendances.scan') }}" target="_blank" class="btn btn-outline-secondary btn-sm rounded-pill d-none d-md-inline-flex align-items-center gap-1">
                <i class="bi bi-camera"></i> Terminal Scanner
            </a>

            <div class="dropdown">
                <button class="btn btn-light dropdown-toggle d-flex align-items-center gap-2 border py-1.5 px-2 rounded-3" type="button" data-bs-toggle="dropdown">
                    <div class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style="width:30px; height:30px; font-weight: bold; font-size: 0.85rem;">
                        {{ strtoupper(substr(auth()->user()->name, 0, 1)) }}
                    </div>
                    <span class="fw-medium text-dark d-none d-sm-inline">{{ auth()->user()->name }}</span>
                </button>
                <ul class="dropdown-menu dropdown-menu-end shadow-sm">
                    <li><a class="dropdown-menu-item dropdown-item" href="{{ route('employees.profile', auth()->user()->id) }}"><i class="bi bi-person me-2"></i> Profil Saya</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li>
                        <form method="POST" action="{{ route('logout') }}">
                            @csrf
                            <button type="submit" class="dropdown-item text-danger"><i class="bi bi-box-arrow-right me-2"></i> Keluar (Logout)</button>
                        </form>
                    </li>
                </ul>
            </div>
        </div>
    </header>

    <!-- Main Content Body -->
    <main class="app-main">
        <!-- System Alerts -->
        @if(session('success'))
            <div class="alert alert-success alert-dismissible fade show shadow-sm border-0 border-start border-success border-4 mb-4" role="alert">
                <i class="bi bi-check-circle-fill me-2"></i> {{ session('success') }}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        @endif

        @if(session('error'))
            <div class="alert alert-danger alert-dismissible fade show shadow-sm border-0 border-start border-danger border-4 mb-4" role="alert">
                <i class="bi bi-exclamation-triangle-fill me-2"></i> {{ session('error') }}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        @endif

        @yield('content')
    </main>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            const sidebar = document.getElementById('appSidebar');
            const backdrop = document.getElementById('sidebarBackdrop');
            const toggleBtn = document.getElementById('toggleSidebarBtn');
            const closeBtn = document.getElementById('closeSidebarBtn');

            function openSidebar() {
                sidebar.classList.add('show');
                backdrop.classList.add('show');
                document.body.style.overflow = 'hidden';
            }

            function closeSidebar() {
                sidebar.classList.remove('show');
                backdrop.classList.remove('show');
                document.body.style.overflow = '';
            }

            if (toggleBtn) toggleBtn.addEventListener('click', openSidebar);
            if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
            if (backdrop) backdrop.addEventListener('click', closeSidebar);

            // Auto-close sidebar on window resize to Desktop
            window.addEventListener('resize', function () {
                if (window.innerWidth >= 992) {
                    closeSidebar();
                }
            });
        });
    </script>
    @yield('scripts')
</body>
</html>

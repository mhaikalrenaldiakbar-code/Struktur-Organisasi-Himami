@extends('layouts.app')

@section('title', 'Riwayat Transaksi Penjualan')

@section('content')
<div class="container-fluid p-0">
    <div class="d-flex align-items-center justify-content-between mb-4">
        <div>
            <h3 class="fw-bold text-dark mb-1">🛒 Riwayat Transaksi Penjualan</h3>
            <p class="text-secondary mb-0">Daftar Audit Invoice Kasir POS & Pembatalan Transaksi TB Berkah Jaya Citapen</p>
        </div>
        <a href="{{ route('pos.index') }}" class="btn btn-success fw-bold rounded-3 shadow-sm">
            <i class="bi bi-plus-circle me-1"></i> Transaksi Kasir Baru
        </a>
    </div>

    <!-- Filter Card -->
    <div class="card border-0 shadow-sm rounded-4 p-3 mb-4">
        <form method="GET" action="{{ route('pos.history') }}" class="row g-2">
            <div class="col-md-4">
                <input type="text" name="search" class="form-control bg-light" placeholder="Cari No. Faktur Invoice..." value="{{ request('search') }}">
            </div>
            <div class="col-md-3">
                <input type="date" name="date" class="form-control bg-light" value="{{ request('date') }}">
            </div>
            <div class="col-md-3">
                <select name="payment_method" class="form-select bg-light">
                    <option value="">-- Semua Metode Pembayaran --</option>
                    <option value="cash" {{ request('payment_method') == 'cash' ? 'selected' : '' }}>Tunai (Cash)</option>
                    <option value="qris" {{ request('payment_method') == 'qris' ? 'selected' : '' }}>QRIS</option>
                    <option value="bank_transfer" {{ request('payment_method') == 'bank_transfer' ? 'selected' : '' }}>Transfer Mandiri</option>
                </select>
            </div>
            <div class="col-md-2 d-grid">
                <button type="submit" class="btn btn-dark fw-bold">Filter Riwayat</button>
            </div>
        </form>
    </div>

    <!-- History Table -->
    <div class="card border-0 shadow-sm rounded-4 p-0 overflow-hidden">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
                <thead class="table-light">
                    <tr>
                        <th>No. Faktur Invoice</th>
                        <th>Tanggal & Waktu</th>
                        <th>Kasir Duty</th>
                        <th>Metode Pembayaran</th>
                        <th>Diskon</th>
                        <th>Grand Total (Netto)</th>
                        <th>Status</th>
                        <th class="text-end" style="min-width: 160px;">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($transactions as $tx)
                        <tr>
                            <td>
                                <a href="{{ route('pos.show', $tx->id) }}" class="fw-bold text-decoration-none font-monospace">
                                    {{ $tx->invoice_number }}
                                </a>
                            </td>
                            <td><small class="text-muted">{{ $tx->created_at->format('d/m/Y H:i') }}</small></td>
                            <td><div class="fw-bold text-dark">{{ $tx->user ? $tx->user->name : 'Staff' }}</div></td>
                            <td>
                                <span class="badge bg-secondary">{{ strtoupper($tx->payment_method) }}</span>
                            </td>
                            <td><small class="text-danger">- Rp {{ number_format($tx->discount_amount, 0, ',', '.') }}</small></td>
                            <td><span class="fw-bold text-success fs-6">Rp {{ number_format($tx->total_amount, 0, ',', '.') }}</span></td>
                            <td>
                                <span class="badge bg-success"><i class="bi bi-check-circle me-1"></i> SELESAI</span>
                            </td>
                            <td class="text-end">
                                <div class="btn-group btn-group-sm">
                                    <a href="{{ route('pos.show', $tx->id) }}" class="btn btn-info text-white" title="Lihat Detail Transaksi">
                                        👁 Detail
                                    </a>
                                    <a href="{{ route('pos.receipt', $tx->id) }}" target="_blank" class="btn btn-primary" title="Cetak Struk Thermal">
                                        🖨 Struk
                                    </a>
                                    @if(auth()->user()->role === 'admin')
                                        <button class="btn btn-danger" title="Batalkan & Hapus Transaksi (Kembalikan Stok)" onclick="if(confirm('Batalkan transaksi {{ $tx->invoice_number }}? Stok barang akan dikembalikan ke database.')) document.getElementById('delete-tx-{{ $tx->id }}').submit();">
                                            🗑 Batalkan
                                        </button>
                                    @endif
                                </div>

                                @if(auth()->user()->role === 'admin')
                                    <form id="delete-tx-{{ $tx->id }}" action="{{ route('pos.destroy', $tx->id) }}" method="POST" class="d-none">
                                        @csrf
                                        @method('DELETE')
                                    </form>
                                @endif
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="8" class="text-center py-5 text-muted">
                                <i class="bi bi-receipt display-4 d-block mb-2"></i>
                                Belum ada riwayat transaksi penjualan yang ditemukan.
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>

    <div class="mt-3">
        {{ $transactions->links() }}
    </div>
</div>
@endsection

@extends('layouts.app')

@section('title', 'Detail Transaksi Penjualan #' . $transaction->invoice_number)

@section('content')
<div class="container-fluid p-0">
    <!-- Toolbar Actions -->
    <div class="d-flex align-items-center justify-content-between mb-4 no-print">
        <div>
            <h3 class="fw-bold text-dark mb-1">Detail Invoice Transaksi</h3>
            <p class="text-secondary mb-0">Faktur Penjualan: <code>{{ $transaction->invoice_number }}</code></p>
        </div>
        <div class="d-flex gap-2">
            <a href="{{ route('pos.history') }}" class="btn btn-outline-secondary">
                <i class="bi bi-arrow-left me-1"></i> Kembali ke Riwayat
            </a>
            <a href="{{ route('pos.index') }}" class="btn btn-success fw-bold">
                <i class="bi bi-plus-circle me-1"></i> Transaksi Baru
            </a>
            <a href="{{ route('pos.receipt', $transaction->id) }}" target="_blank" class="btn btn-primary fw-bold">
                <i class="bi bi-printer me-1"></i> Cetak Struk Thermal
            </a>
        </div>
    </div>

    <!-- Printable Invoice Card -->
    <div class="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
        <!-- Header Toko -->
        <div class="d-flex justify-content-between align-items-start border-bottom pb-4 mb-4">
            <div>
                <h2 class="fw-bold text-dark mb-1"><i class="bi bi-buildings-fill text-primary me-2"></i>TB BERKAH JAYA CITAPEN</h2>
                <p class="text-secondary mb-0">Sistem Informasi Manajemen & Operasional Toko Bangunan</p>
                <small class="text-muted d-block">Jl. Raya Citapen No. 88, Bogor | WhatsApp: 0812-3456-7890</small>
            </div>
            <div class="text-end">
                <h3 class="fw-bold text-primary mb-1">STRUK PENJUALAN</h3>
                <span class="badge bg-success fs-6 px-3 py-2">SELESAI / PAID</span>
            </div>
        </div>

        <!-- Metadata Transaksi Grid -->
        <div class="row g-4 mb-4">
            <div class="col-md-6">
                <div class="bg-light p-3 rounded-4 border">
                    <h6 class="fw-bold text-dark mb-2">Informasi Transaksi:</h6>
                    <table class="table table-borderless table-sm mb-0 small">
                        <tr>
                            <td class="text-muted" style="width: 120px;">No. Invoice</td>
                            <td>: <strong class="text-dark">{{ $transaction->invoice_number }}</strong></td>
                        </tr>
                        <tr>
                            <td class="text-muted">Tanggal Transaksi</td>
                            <td>: {{ $transaction->created_at->translatedFormat('d F Y H:i:s') }} WIB</td>
                        </tr>
                        <tr>
                            <td class="text-muted">Metode Pembayaran</td>
                            <td>: <span class="badge bg-dark">{{ strtoupper($transaction->payment_method) }}</span></td>
                        </tr>
                    </table>
                </div>
            </div>

            <div class="col-md-6">
                <div class="bg-light p-3 rounded-4 border">
                    <h6 class="fw-bold text-dark mb-2">Informasi Kasir & Petugas:</h6>
                    <table class="table table-borderless table-sm mb-0 small">
                        <tr>
                            <td class="text-muted" style="width: 120px;">Kasir Penanggungjawab</td>
                            <td>: <strong>{{ $transaction->user ? $transaction->user->name : 'Staf Kasir' }}</strong></td>
                        </tr>
                        <tr>
                            <td class="text-muted">Status Kasir</td>
                            <td>: <span class="badge bg-info text-dark">{{ strtoupper($transaction->user ? $transaction->user->role : 'Pegawai') }}</span></td>
                        </tr>
                        <tr>
                            <td class="text-muted">Lokasi Peranti</td>
                            <td>: TB Berkah Jaya Citapen Terminal POS</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>

        <!-- Items Table -->
        <div class="table-responsive mb-4">
            <table class="table table-bordered table-striped align-middle">
                <thead class="table-dark">
                    <tr>
                        <th style="width: 50px;" class="text-center">No</th>
                        <th>Kode</th>
                        <th>Nama Product Material</th>
                        <th class="text-end">Harga Satuan</th>
                        <th class="text-center">Kuantitas</th>
                        <th class="text-end">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($transaction->details as $index => $item)
                        <tr>
                            <td class="text-center">{{ $index + 1 }}</td>
                            <td><code>{{ $item->product ? $item->product->code : '-' }}</code></td>
                            <td><strong class="text-dark">{{ $item->product ? $item->product->name : 'Material' }}</strong></td>
                            <td class="text-end">Rp {{ number_format($item->price, 0, ',', '.') }}</td>
                            <td class="text-center">{{ (float)$item->quantity }} {{ $item->unit_name }}</td>
                            <td class="text-end fw-bold">Rp {{ number_format($item->subtotal, 0, ',', '.') }}</td>
                        </tr>
                    @endforeach
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="4" rowspan="4" class="align-top bg-light p-3">
                            <small class="fw-bold text-dark d-block">KETERANGAN & REGULASI TOKO:</small>
                            <small class="text-muted">
                                Barang yang sudah dibeli tidak dapat ditukar atau dikembalikan kecuali ada perjanjian garansi khusus dari toko. Terima kasih telah berbelanja di TB Berkah Jaya Citapen!
                            </small>
                        </td>
                        <td class="fw-bold text-end bg-light">Subtotal Belanja</td>
                        <td class="fw-bold text-end bg-light">Rp {{ number_format($transaction->details->sum('subtotal'), 0, ',', '.') }}</td>
                    </tr>
                    <tr>
                        <td class="fw-bold text-end text-danger">Potongan Diskon</td>
                        <td class="fw-bold text-end text-danger">- Rp {{ number_format($transaction->discount_amount, 0, ',', '.') }}</td>
                    </tr>
                    <tr class="table-primary">
                        <td class="fw-bold text-end fs-5">TOTAL NETTO</td>
                        <td class="fw-bold text-end fs-5 text-primary">Rp {{ number_format($transaction->total_amount, 0, ',', '.') }}</td>
                    </tr>
                    <tr>
                        <td class="fw-bold text-end">Uang Dibayar ({{ strtoupper($transaction->payment_method) }})</td>
                        <td class="fw-bold text-end">Rp {{ number_format($transaction->paid_amount, 0, ',', '.') }}</td>
                    </tr>
                    <tr>
                        <td colspan="4" class="border-0"></td>
                        <td class="fw-bold text-end bg-light">Uang Kembalian</td>
                        <td class="fw-bold text-end bg-light text-success">Rp {{ number_format($transaction->change_amount, 0, ',', '.') }}</td>
                    </tr>
                </tfoot>
            </table>
        </div>

        <!-- Footer Signature Section -->
        <div class="row pt-4 mt-4 border-top">
            <div class="col-6 text-center">
                <p class="text-muted mb-5">Hormat Kami, Kasir</p>
                <div class="fw-bold text-dark text-decoration-underline">{{ $transaction->user ? $transaction->user->name : 'Staff' }}</div>
            </div>
            <div class="col-6 text-center">
                <p class="text-muted mb-5">Manajer / Pengawas Toko</p>
                <div class="fw-bold text-dark text-decoration-underline">( TB Berkah Jaya )</div>
            </div>
        </div>
    </div>
</div>
@endsection

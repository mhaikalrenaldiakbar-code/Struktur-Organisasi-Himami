@extends('layouts.app')

@section('title', 'Cek Stok Barang Terbatas')

@section('content')
<div class="container-fluid p-0">
    <div class="d-flex align-items-center justify-content-between mb-4">
        <div>
            <h3 class="fw-bold text-dark mb-1"><i class="bi bi-search text-primary me-2"></i>Cek Stok Barang (Read-Only Pegawai)</h3>
            <p class="text-secondary mb-0">Portal pencarian sisa kuantitas stok berjalan material bangunan toko (PRD 2.3 Access Policy)</p>
        </div>
    </div>

    <!-- Search Card -->
    <div class="card border-0 shadow-sm rounded-4 p-3 mb-4">
        <form method="GET" action="{{ route('products.search') }}" class="row g-2">
            <div class="col-md-7">
                <input type="text" name="search" class="form-control bg-light" placeholder="Ketik nama material atau scan barcode..." value="{{ request('search') }}" autofocus>
            </div>
            <div class="col-md-3">
                <select name="category_id" class="form-select bg-light">
                    <option value="">-- Seluruh Kategori --</option>
                    @foreach($categories as $cat)
                        <option value="{{ $cat->id }}" {{ request('category_id') == $cat->id ? 'selected' : '' }}>{{ $cat->name }}</option>
                    @endforeach
                </select>
            </div>
            <div class="col-md-2 d-grid">
                <button type="submit" class="btn btn-primary fw-bold"><i class="bi bi-search me-1"></i> Cari Stok</button>
            </div>
        </form>
    </div>

    <!-- Read-Only Results Table -->
    <div class="card border-0 shadow-sm rounded-4 p-0 overflow-hidden">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
                <thead class="table-light">
                    <tr>
                        <th>Kode Barcode</th>
                        <th>Nama Komoditas Barang</th>
                        <th>Kategori</th>
                        <th>Satuan Dasar</th>
                        <th>Harga Jual Eceran</th>
                        <th>Sisa Stok Berjalan</th>
                        <th>Status Ketersediaan</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($products as $product)
                        <tr>
                            <td><span class="badge bg-dark font-monospace">{{ $product->code }}</span></td>
                            <td><div class="fw-bold text-dark">{{ $product->name }}</div></td>
                            <td><span class="badge bg-secondary">{{ $product->category ? $product->category->name : '-' }}</span></td>
                            <td><span class="badge bg-light text-dark border">{{ $product->base_unit }}</span></td>
                            <td><span class="fw-bold text-success">Rp {{ number_format($product->selling_price, 0, ',', '.') }}</span></td>
                            <td>
                                <div class="fw-bold fs-6">{{ (float)$product->stock }} {{ $product->base_unit }}</div>
                            </td>
                            <td>
                                @if($product->stock <= 0)
                                    <span class="badge bg-danger">STOK HABIS</span>
                                @elseif($product->stock <= $product->min_stock)
                                    <span class="badge bg-warning text-dark">STOK MENIPIS</span>
                                @else
                                    <span class="badge bg-success">TERSEDIA</span>
                                @endif
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="7" class="text-center py-5 text-muted">
                                Tidak ada data barang yang cocok dengan pencarian Anda.
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>

    <div class="mt-3">
        {{ $products->links() }}
    </div>
</div>
@endsection

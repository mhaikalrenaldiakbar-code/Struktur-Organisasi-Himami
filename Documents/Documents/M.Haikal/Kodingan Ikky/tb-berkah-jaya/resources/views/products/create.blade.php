@extends('layouts.app')

@section('title', 'Tambah Produk Baru')

@section('content')
<div class="container-fluid p-0">
    <div class="d-flex align-items-center justify-content-between mb-4">
        <div>
            <h3 class="fw-bold text-dark mb-1">Tambah Produk & Konversi Satuan</h3>
            <p class="text-secondary mb-0">Pendaftaran Komoditas Baru ke Database Sistem TB Berkah Jaya</p>
        </div>
        <a href="{{ route('products.index') }}" class="btn btn-outline-secondary">
            <i class="bi bi-arrow-left me-1"></i> Kembali ke Tabel Inventori
        </a>
    </div>

    <form action="{{ route('products.store') }}" method="POST" class="row g-4">
        @csrf
        <div class="col-lg-8">
            <div class="card border-0 shadow-sm rounded-4 p-4 mb-4">
                <h5 class="fw-bold mb-3 text-dark border-bottom pb-2">Informasi Produk Utama</h5>
                
                <div class="row g-3">
                    <div class="col-md-6">
                        <label class="form-label fw-medium small">Kode Barang / Barcode <span class="text-danger">*</span></label>
                        <input type="text" name="code" class="form-control" placeholder="Contoh: CAT-001 / Barcode 89912345" value="{{ old('code') }}" required>
                    </div>

                    <div class="col-md-6">
                        <label class="form-label fw-medium small">Nama Komoditas Barang <span class="text-danger">*</span></label>
                        <input type="text" name="name" class="form-control" placeholder="Contoh: Cat Dulux Weathershield 2.5 Litre" value="{{ old('name') }}" required>
                    </div>

                    <div class="col-md-6">
                        <label class="form-label fw-medium small">Kategori / Sub-Kategori <span class="text-danger">*</span></label>
                        <select name="category_id" class="form-select" required>
                            <option value="">-- Pilih Kategori --</option>
                            @foreach($allCategories as $cat)
                                <option value="{{ $cat->id }}" {{ old('category_id') == $cat->id ? 'selected' : '' }}>
                                    {{ $cat->name }} {{ $cat->parent ? ' (Sub-kategori '.$cat->parent->name.')' : '' }}
                                </option>
                            @endforeach
                        </select>
                    </div>

                    <div class="col-md-6">
                        <label class="form-label fw-medium small">Satuan Dasar / Base Unit <span class="text-danger">*</span></label>
                        <input type="text" name="base_unit" class="form-control" placeholder="Contoh: Pcs, Kg, Meter, Kaleng" value="{{ old('base_unit', 'Pcs') }}" required>
                    </div>
                </div>
            </div>

            <div class="card border-0 shadow-sm rounded-4 p-4">
                <div class="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                    <div>
                        <h5 class="fw-bold mb-0 text-dark">Sistem Konversi Satuan Grosir <i class="bi bi-layers-half text-info me-1"></i></h5>
                        <small class="text-muted">PRD 3.2: Konversi Otomatis Grosir ke Eceran saat checkout kasir</small>
                    </div>
                    <button type="button" class="btn btn-sm btn-outline-primary" id="addConversionBtn">
                        <i class="bi bi-plus-circle me-1"></i> Tambah Konversi
                    </button>
                </div>

                <div id="conversionsContainer">
                    <div class="row g-2 align-items-center conversion-row mb-2">
                        <div class="col-md-5">
                            <input type="text" name="conversion_units[]" class="form-control" placeholder="Nama Satuan Lebih Besar (misal: Dus, Sak, Roll)">
                        </div>
                        <div class="col-md-5">
                            <input type="number" step="0.01" min="0.01" name="conversion_values[]" class="form-control" placeholder="Isi per Satuan Dasar (misal: 12 Pcs)">
                        </div>
                        <div class="col-md-2">
                            <button type="button" class="btn btn-outline-danger w-100 removeRowBtn"><i class="bi bi-x-lg"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-lg-4">
            <div class="card border-0 shadow-sm rounded-4 p-4 mb-4">
                <h5 class="fw-bold mb-3 text-dark border-bottom pb-2">Penetapan Harga & Stok Initial</h5>

                <div class="mb-3">
                    <label class="form-label fw-medium small">Harga Beli Modal (Rp) <span class="text-danger">*</span></label>
                    <input type="number" step="1" min="0" name="purchase_price" class="form-control" placeholder="0" value="{{ old('purchase_price', 0) }}" required>
                </div>

                <div class="mb-3">
                    <label class="form-label fw-medium small">Harga Jual Eceran Base (Rp) <span class="text-danger">*</span></label>
                    <input type="number" step="1" min="0" name="selling_price" class="form-control" placeholder="0" value="{{ old('selling_price', 0) }}" required>
                </div>

                <div class="mb-3">
                    <label class="form-label fw-medium small">Jumlah Stok Awal Masuk <span class="text-danger">*</span></label>
                    <input type="number" step="0.01" min="0" name="stock" class="form-control" placeholder="0.00" value="{{ old('stock', 0) }}" required>
                </div>

                <div class="mb-4">
                    <label class="form-label fw-medium small">Batas Batas Minimal Warning Alert (Min Stock) <span class="text-danger">*</span></label>
                    <input type="number" step="0.01" min="0" name="min_stock" class="form-control" placeholder="5" value="{{ old('min_stock', 5) }}" required>
                </div>

                <button type="submit" class="btn btn-primary btn-lg w-100 fw-bold rounded-3 shadow-sm">
                    <i class="bi bi-check-circle me-1"></i> Simpan Data Produk
                </button>
            </div>
        </div>
    </form>
</div>
@endsection

@section('scripts')
<script>
    document.getElementById('addConversionBtn').addEventListener('click', function() {
        const container = document.getElementById('conversionsContainer');
        const newRow = document.createElement('div');
        newRow.className = 'row g-2 align-items-center conversion-row mb-2';
        newRow.innerHTML = `
            <div class="col-md-5">
                <input type="text" name="conversion_units[]" class="form-control" placeholder="Nama Satuan Lebih Besar (misal: Dus, Sak)">
            </div>
            <div class="col-md-5">
                <input type="number" step="0.01" min="0.01" name="conversion_values[]" class="form-control" placeholder="Isi per Satuan Dasar">
            </div>
            <div class="col-md-2">
                <button type="button" class="btn btn-outline-danger w-100 removeRowBtn"><i class="bi bi-x-lg"></i></button>
            </div>
        `;
        container.appendChild(newRow);
    });

    document.addEventListener('click', function(e) {
        if (e.target.closest('.removeRowBtn')) {
            const rows = document.querySelectorAll('.conversion-row');
            if (rows.length > 1) {
                e.target.closest('.conversion-row').remove();
            }
        }
    });
</script>
@endsection

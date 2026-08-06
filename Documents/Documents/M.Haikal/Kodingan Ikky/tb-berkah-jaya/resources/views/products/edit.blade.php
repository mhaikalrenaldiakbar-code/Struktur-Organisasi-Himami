@extends('layouts.app')

@section('title', 'Edit Produk')

@section('content')
<div class="container-fluid p-0">
    <div class="d-flex align-items-center justify-content-between mb-4">
        <div>
            <h3 class="fw-bold text-dark mb-1">Edit Produk: {{ $product->name }}</h3>
            <p class="text-secondary mb-0">Ubah Harga & Konversi Satuan Komoditas Barcode: {{ $product->code }}</p>
        </div>
        <a href="{{ route('products.index') }}" class="btn btn-outline-secondary">
            <i class="bi bi-arrow-left me-1"></i> Kembali ke Tabel
        </a>
    </div>

    <form action="{{ route('products.update', $product->id) }}" method="POST" class="row g-4">
        @csrf
        @method('PUT')
        <div class="col-lg-8">
            <div class="card border-0 shadow-sm rounded-4 p-4 mb-4">
                <h5 class="fw-bold mb-3 text-dark border-bottom pb-2">Informasi Produk Utama</h5>
                
                <div class="row g-3">
                    <div class="col-md-6">
                        <label class="form-label fw-medium small">Kode Barang / Barcode <span class="text-danger">*</span></label>
                        <input type="text" name="code" class="form-control" value="{{ old('code', $product->code) }}" required>
                    </div>

                    <div class="col-md-6">
                        <label class="form-label fw-medium small">Nama Komoditas Barang <span class="text-danger">*</span></label>
                        <input type="text" name="name" class="form-control" value="{{ old('name', $product->name) }}" required>
                    </div>

                    <div class="col-md-6">
                        <label class="form-label fw-medium small">Kategori / Sub-Kategori <span class="text-danger">*</span></label>
                        <select name="category_id" class="form-select" required>
                            @foreach($allCategories as $cat)
                                <option value="{{ $cat->id }}" {{ old('category_id', $product->category_id) == $cat->id ? 'selected' : '' }}>
                                    {{ $cat->name }} {{ $cat->parent ? ' (Sub-kategori '.$cat->parent->name.')' : '' }}
                                </option>
                            @endforeach
                        </select>
                    </div>

                    <div class="col-md-6">
                        <label class="form-label fw-medium small">Satuan Dasar / Base Unit <span class="text-danger">*</span></label>
                        <input type="text" name="base_unit" class="form-control" value="{{ old('base_unit', $product->base_unit) }}" required>
                    </div>
                </div>
            </div>

            <div class="card border-0 shadow-sm rounded-4 p-4">
                <div class="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                    <div>
                        <h5 class="fw-bold mb-0 text-dark">Sistem Konversi Satuan Grosir</h5>
                        <small class="text-muted">Desimal konversi grosir ke eceran</small>
                    </div>
                    <button type="button" class="btn btn-sm btn-outline-primary" id="addConversionBtn">
                        <i class="bi bi-plus-circle me-1"></i> Tambah Konversi
                    </button>
                </div>

                <div id="conversionsContainer">
                    @forelse($product->conversions as $conv)
                        <div class="row g-2 align-items-center conversion-row mb-2">
                            <div class="col-md-5">
                                <input type="text" name="conversion_units[]" class="form-control" value="{{ $conv->unit_name }}">
                            </div>
                            <div class="col-md-5">
                                <input type="number" step="0.01" min="0.01" name="conversion_values[]" class="form-control" value="{{ (float)$conv->value_in_base_unit }}">
                            </div>
                            <div class="col-md-2">
                                <button type="button" class="btn btn-outline-danger w-100 removeRowBtn"><i class="bi bi-x-lg"></i></button>
                            </div>
                        </div>
                    @empty
                        <div class="row g-2 align-items-center conversion-row mb-2">
                            <div class="col-md-5">
                                <input type="text" name="conversion_units[]" class="form-control" placeholder="Nama Satuan (misal: Dus)">
                            </div>
                            <div class="col-md-5">
                                <input type="number" step="0.01" min="0.01" name="conversion_values[]" class="form-control" placeholder="Nilai Konversi">
                            </div>
                            <div class="col-md-2">
                                <button type="button" class="btn btn-outline-danger w-100 removeRowBtn"><i class="bi bi-x-lg"></i></button>
                            </div>
                        </div>
                    @endforelse
                </div>
            </div>
        </div>

        <div class="col-lg-4">
            <div class="card border-0 shadow-sm rounded-4 p-4 mb-4">
                <h5 class="fw-bold mb-3 text-dark border-bottom pb-2">Penetapan Harga & Minimal Warning</h5>

                <div class="mb-3">
                    <label class="form-label fw-medium small">Harga Beli Modal (Rp) <span class="text-danger">*</span></label>
                    <input type="number" step="1" min="0" name="purchase_price" class="form-control" value="{{ old('purchase_price', $product->purchase_price) }}" required>
                </div>

                <div class="mb-3">
                    <label class="form-label fw-medium small">Harga Jual Eceran Base (Rp) <span class="text-danger">*</span></label>
                    <input type="number" step="1" min="0" name="selling_price" class="form-control" value="{{ old('selling_price', $product->selling_price) }}" required>
                </div>

                <div class="mb-3">
                    <label class="form-label fw-medium small">Stok Berjalan Saat Ini</label>
                    <input type="text" class="form-control bg-light fw-bold" value="{{ (float)$product->stock }} {{ $product->base_unit }}" readonly>
                </div>

                <div class="mb-3">
                    <label class="form-label fw-bold small text-success"><i class="bi bi-plus-circle me-1"></i> Tambah Restock Stok Baru (+)</label>
                    <div class="input-group">
                        <input type="number" step="0.01" min="0" name="add_stock" class="form-control border-success text-success fw-bold" placeholder="0">
                        <span class="input-group-text bg-success text-white fw-bold">{{ $product->base_unit }}</span>
                    </div>
                    <small class="text-muted">Isi jika ada kiriman barang masuk baru dari supplier.</small>
                </div>

                <div class="mb-4">
                    <label class="form-label fw-medium small">Batas Minimal Warning Alert (Min Stock) <span class="text-danger">*</span></label>
                    <input type="number" step="0.01" min="0" name="min_stock" class="form-control" value="{{ old('min_stock', $product->min_stock) }}" required>
                </div>

                <button type="submit" class="btn btn-warning btn-lg w-100 fw-bold rounded-3 shadow-sm">
                    <i class="bi bi-check-circle me-1"></i> Perbarui Data Produk
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
                <input type="text" name="conversion_units[]" class="form-control" placeholder="Nama Satuan">
            </div>
            <div class="col-md-5">
                <input type="number" step="0.01" min="0.01" name="conversion_values[]" class="form-control" placeholder="Nilai Konversi">
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

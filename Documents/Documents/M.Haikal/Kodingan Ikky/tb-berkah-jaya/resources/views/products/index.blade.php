@extends('layouts.app')

@section('title', 'Tabel Utama Data Barang Inventori')

@section('content')
<div class="container-fluid p-0">

    <!-- Header Section -->
    <div class="d-flex align-items-center justify-content-between mb-4">
        <div>
            <h3 class="fw-bold text-dark mb-1"><i class="bi bi-box-seam text-primary me-2"></i>Tabel Terpadu Inventori Barang</h3>
            <p class="text-secondary mb-0">Kelola Data Master Produk, Restock Barang Masuk, & Mutasi Stok (PRD 3.2 View Standards)</p>
        </div>
        <div class="d-flex gap-2">
            <a href="{{ route('products.create') }}" class="btn btn-primary fw-bold rounded-3 shadow-sm">
                <i class="bi bi-box-seam me-1"></i> Tambah Produk Baru
            </a>
        </div>
    </div>

    <!-- Search & Filter Form -->
    <div class="card border-0 shadow-sm rounded-4 p-3 mb-4">
        <form method="GET" action="{{ route('products.index') }}" class="row g-2 align-items-center">
            <div class="col-md-5">
                <div class="input-group">
                    <span class="input-group-text bg-light text-muted"><i class="bi bi-search"></i></span>
                    <input type="text" name="search" class="form-control bg-light" placeholder="Cari Nama Barang atau Kode Barcode..." value="{{ request('search') }}">
                </div>
            </div>
            <div class="col-md-3">
                <select name="category_id" class="form-select bg-light">
                    <option value="">-- Semua Kategori --</option>
                    @foreach($categories as $cat)
                        <option value="{{ $cat->id }}" {{ request('category_id') == $cat->id ? 'selected' : '' }}>
                            {{ $cat->name }} {{ $cat->parent ? '('.$cat->parent->name.')' : '' }}
                        </option>
                    @endforeach
                </select>
            </div>
            <div class="col-md-3">
                <select name="stock_status" class="form-select bg-light">
                    <option value="">-- Semua Status Stok --</option>
                    <option value="habis" {{ request('stock_status') == 'habis' ? 'selected' : '' }}>Stok Habis (0)</option>
                    <option value="kritis" {{ request('stock_status') == 'kritis' ? 'selected' : '' }}>Stok Kritis (≤ 50% Min)</option>
                    <option value="menipis" {{ request('stock_status') == 'menipis' ? 'selected' : '' }}>Stok Menipis (≤ Min)</option>
                    <option value="aman" {{ request('stock_status') == 'aman' ? 'selected' : '' }}>Stok Aman</option>
                </select>
            </div>
            <div class="col-md-1 d-grid">
                <button type="submit" class="btn btn-dark fw-bold">Filter</button>
            </div>
        </form>
    </div>

    <!-- Single Unified Big Scrolling Table (PRD 3.2) -->
    <div class="card border-0 shadow-sm rounded-4 p-0 overflow-hidden mb-4">
        <div class="table-responsive" style="max-height: 75vh; overflow-y: auto;">
            @php
                $groupedProducts = $products->groupBy(function($item) {
                    return $item->category ? $item->category->name : 'Tanpa Kategori';
                });
            @endphp

            <table class="table table-hover align-middle mb-0">
                <thead class="table-dark sticky-top" style="z-index: 10;">
                    <tr>
                        <th style="width: 130px;">Kode Barang</th>
                        <th>Nama Product / Barcode</th>
                        <th>Satuan Base / Konversi Desimal</th>
                        <th>Harga Beli (Modal)</th>
                        <th>Harga Jual (Eceran)</th>
                        <th>Sisa Stok Berjalan</th>
                        <th>Status Alert</th>
                        <th class="text-end" style="width: 180px;">Opsi Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($groupedProducts as $categoryName => $catProducts)
                        <!-- Category Header Banner Row -->
                        <tr class="bg-secondary bg-opacity-10">
                            <td colspan="8" class="fw-bold text-dark py-2.5 px-3 border-top border-bottom border-primary border-2">
                                <i class="bi bi-folder-fill text-primary me-2"></i> KATEGORI: {{ strtoupper($categoryName) }} 
                                <span class="badge bg-primary ms-2 fs-6" style="font-size: 0.75rem !important;">{{ count($catProducts) }} Komoditas</span>
                            </td>
                        </tr>

                        @foreach($catProducts as $product)
                            <tr>
                                <td>
                                    <span class="badge bg-dark font-monospace text-wrap">{{ $product->code }}</span>
                                </td>
                                <td>
                                    <div class="fw-bold text-dark">{{ $product->name }}</div>
                                    @if($product->category && $product->category->parent)
                                        <small class="text-muted d-block"><i class="bi bi-chevron-right me-1"></i>{{ $product->category->parent->name }}</small>
                                    @endif
                                </td>
                                <td>
                                    <span class="badge bg-light text-dark border fw-bold me-1">{{ $product->base_unit }}</span>
                                    @if($product->conversions && $product->conversions->count() > 0)
                                        <div class="mt-1 small">
                                            @foreach($product->conversions as $conv)
                                                <span class="badge bg-info-subtle text-info border border-info mb-1" style="font-size: 0.75rem;">
                                                    1 {{ $conv->unit_name }} = {{ (float)$conv->value_in_base_unit }} {{ $product->base_unit }}
                                                </span>
                                            @endforeach
                                        </div>
                                    @endif
                                </td>
                                <td>
                                    <span class="text-secondary fw-medium">Rp {{ number_format($product->purchase_price, 0, ',', '.') }}</span>
                                </td>
                                <td>
                                    <span class="text-success fw-bold">Rp {{ number_format($product->selling_price, 0, ',', '.') }}</span>
                                </td>
                                <td>
                                    <div class="fw-bold fs-6">{{ (float)$product->stock }} <small class="text-muted fw-normal">{{ $product->base_unit }}</small></div>
                                    <small class="text-muted extra-small">Batas Min: {{ (float)$product->min_stock }}</small>
                                </td>
                                <td>
                                    @if($product->stock <= 0)
                                        <span class="badge bg-danger"><i class="bi bi-x-circle me-1"></i> STOK HABIS</span>
                                    @elseif($product->stock <= ($product->min_stock / 2))
                                        <span class="badge bg-danger text-white"><i class="bi bi-exclamation-octagon me-1"></i> KRITIS</span>
                                    @elseif($product->stock <= $product->min_stock)
                                        <span class="badge bg-warning text-dark"><i class="bi bi-exclamation-triangle me-1"></i> MENIPIS</span>
                                    @else
                                        <span class="badge bg-success"><i class="bi bi-check-circle me-1"></i> AMAN</span>
                                    @endif
                                </td>
                                <td class="text-end">
                                    <button type="button" 
                                            class="btn btn-sm btn-success fw-bold me-1 open-mutate-btn" 
                                            data-id="{{ $product->id }}"
                                            data-name="{{ $product->name }}"
                                            data-code="{{ $product->code }}"
                                            data-stock="{{ (float)$product->stock }}"
                                            data-unit="{{ $product->base_unit }}"
                                            data-action="{{ route('products.mutate', $product->id) }}">
                                        <i class="bi bi-plus-circle me-1"></i> Restock
                                    </button>
                                    <a href="{{ route('products.edit', $product->id) }}" class="btn btn-sm btn-outline-warning me-1" title="Edit Barang">
                                        <i class="bi bi-pencil"></i> Edit
                                    </a>
                                    <button class="btn btn-sm btn-outline-danger" title="Hapus Barang" onclick="if(confirm('Hapus produk {{ $product->name }}?')) document.getElementById('delete-prod-{{ $product->id }}').submit();">
                                        <i class="bi bi-trash"></i>
                                    </button>

                                    <form id="delete-prod-{{ $product->id }}" action="{{ route('products.destroy', $product->id) }}" method="POST" class="d-none">
                                        @csrf
                                        @method('DELETE')
                                    </form>
                                </td>
                            </tr>
                        @endforeach
                    @empty
                        <tr>
                            <td colspan="8" class="text-center py-5 text-muted">
                                <i class="bi bi-box-seam display-4 d-block mb-2"></i>
                                Belum ada data produk inventori yang sesuai filter.
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>

    <!-- Pagination Links -->
    <div class="mt-3">
        {{ $products->links() }}
    </div>
</div>

<!-- Global Clean Restock & Mutasi Modal Outside Table -->
<div class="modal fade" id="globalMutateModal" tabindex="-1" aria-hidden="true" style="z-index: 1060;">
    <div class="modal-dialog modal-dialog-centered">
        <form id="globalMutateForm" action="" method="POST" class="modal-content rounded-4 border-0 shadow-lg">
            @csrf
            <div class="modal-header border-0 pb-0">
                <div>
                    <h5 class="modal-title fw-bold text-dark mb-0"><i class="bi bi-arrow-repeat text-primary me-2"></i>Catat Mutasi & Restock Barang</h5>
                    <small class="text-muted">Pencatatan Stok Masuk Supplier, Rusak, atau Retur</small>
                </div>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-start">
                <div class="alert alert-light border border-primary border-opacity-25 rounded-3 mb-3">
                    <div class="fw-bold text-dark fs-6" id="modalProductName">Nama Barang</div>
                    <div class="text-muted small">
                        Kode Barcode: <code id="modalProductCode" class="fw-bold text-primary">KODE</code> • 
                        Stok Berjalan: <strong id="modalProductStock" class="text-dark">0</strong> <span id="modalProductUnit">Pcs</span>
                    </div>
                </div>

                <div class="mb-3">
                    <label class="form-label fw-bold small text-dark">Jenis Mutasi Stok</label>
                    <select name="type" class="form-select fw-bold" required>
                        <option value="restock" selected>Restock Barang Masuk Kiriman Supplier (+ Stok)</option>
                        <option value="damage">Barang Rusak / Bocor / Pecah (- Stok)</option>
                        <option value="return">Retur Kembali ke Supplier (- Stok)</option>
                    </select>
                </div>

                <div class="mb-3">
                    <label class="form-label fw-bold small text-dark">Kuantitas Jumlah Unit</label>
                    <div class="input-group">
                        <input type="number" step="0.01" min="0.01" name="qty" id="modalQtyInput" class="form-control form-control-lg fw-bold text-primary" placeholder="0.00" required>
                        <span class="input-group-text fw-bold" id="modalUnitAddon">Pcs</span>
                    </div>
                </div>

                <div class="mb-3">
                    <label class="form-label fw-medium small text-dark">Catatan / Keterangan Alasan Mutasi</label>
                    <textarea name="notes" class="form-control" rows="2" placeholder="Contoh: Kiriman truk supplier 50 sak atau kaleng bocor"></textarea>
                </div>
            </div>
            <div class="modal-footer border-0 pt-0">
                <button type="button" class="btn btn-light rounded-3" data-bs-dismiss="modal">Batal</button>
                <button type="submit" class="btn btn-primary fw-bold px-4 rounded-3 shadow">Simpan Mutasi Stok</button>
            </div>
        </form>
    </div>
</div>
@endsection

@section('scripts')
<script>
    document.addEventListener('DOMContentLoaded', function () {
        const modalEl = document.getElementById('globalMutateModal');
        const mutateModal = new bootstrap.Modal(modalEl);
        const mutateForm = document.getElementById('globalMutateForm');
        const productName = document.getElementById('modalProductName');
        const productCode = document.getElementById('modalProductCode');
        const productStock = document.getElementById('modalProductStock');
        const productUnit = document.getElementById('modalProductUnit');
        const unitAddon = document.getElementById('modalUnitAddon');
        const qtyInput = document.getElementById('modalQtyInput');

        document.querySelectorAll('.open-mutate-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const action = this.getAttribute('data-action');
                const name = this.getAttribute('data-name');
                const code = this.getAttribute('data-code');
                const stock = this.getAttribute('data-stock');
                const unit = this.getAttribute('data-unit');

                mutateForm.action = action;
                productName.textContent = name;
                productCode.textContent = code;
                productStock.textContent = stock;
                productUnit.textContent = unit;
                unitAddon.textContent = unit;
                qtyInput.value = '';

                mutateModal.show();
                setTimeout(() => qtyInput.focus(), 300);
            });
        });
    });
</script>
@endsection

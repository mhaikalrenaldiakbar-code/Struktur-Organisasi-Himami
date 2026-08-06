@extends('layouts.app')

@section('title', 'Kategori & Sub-Kategori Barang')

@section('content')
<div class="container-fluid p-0">
    <div class="d-flex align-items-center justify-content-between mb-4">
        <div>
            <h3 class="fw-bold text-dark mb-1">Taksonomi Kategori & Sub-Kategori</h3>
            <p class="text-secondary mb-0">Pengelompokan Komoditas Material Bangunan TB Berkah Jaya Citapen</p>
        </div>
        <button class="btn btn-primary fw-bold rounded-3 shadow-sm" data-bs-toggle="modal" data-bs-target="#addCategoryModal">
            <i class="bi bi-plus-circle me-1"></i> Tambah Kategori Baru
        </button>
    </div>

    <div class="row g-4">
        <div class="col-12">
            <div class="card border-0 shadow-sm rounded-4 p-4">
                <div class="table-responsive">
                    <table class="table table-hover align-middle mb-0">
                        <thead class="table-light">
                            <tr>
                                <th style="width: 50px;">#</th>
                                <th>Nama Kategori</th>
                                <th>Hierarki / Induk</th>
                                <th>Sub-Kategori Terdaftar</th>
                                <th>Jumlah Produk</th>
                                <th class="text-end">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse($categories as $index => $cat)
                                <tr>
                                    <td>{{ $index + 1 }}</td>
                                    <td>
                                        <div class="fw-bold text-dark">{{ $cat->name }}</div>
                                        <code class="small text-muted">{{ $cat->slug }}</code>
                                    </td>
                                    <td>
                                        @if($cat->parent)
                                            <span class="badge bg-secondary"><i class="bi bi-diagram-2 me-1"></i> Sub-kategori dari {{ $cat->parent->name }}</span>
                                        @else
                                            <span class="badge bg-primary">Kategori Utama (Induk)</span>
                                        @endif
                                    </td>
                                    <td>
                                        @if($cat->subcategories->count() > 0)
                                            <div class="d-flex flex-wrap gap-1">
                                                @foreach($cat->subcategories as $sub)
                                                    <span class="badge bg-info-subtle text-info border border-info" style="font-size: 0.8rem;">
                                                        {{ $sub->name }}
                                                    </span>
                                                @endforeach
                                            </div>
                                        @else
                                            <span class="text-muted small">-</span>
                                        @endif
                                    </td>
                                    <td>
                                        <span class="badge bg-light text-dark border">{{ $cat->products_count ?? 0 }} Produk</span>
                                    </td>
                                    <td class="text-end">
                                        <button class="btn btn-sm btn-outline-danger" onclick="if(confirm('Hapus kategori ini?')) document.getElementById('delete-cat-{{ $cat->id }}').submit();">
                                            <i class="bi bi-trash"></i>
                                        </button>
                                        <form id="delete-cat-{{ $cat->id }}" action="{{ route('categories.destroy', $cat->id) }}" method="POST" class="d-none">
                                            @csrf
                                            @method('DELETE')
                                        </form>
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="6" class="text-center py-4 text-muted">Belum ada data kategori terdaftar</td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal Tambah Kategori -->
<div class="modal fade" id="addCategoryModal" tabindex="-1">
    <div class="modal-dialog">
        <form action="{{ route('categories.store') }}" method="POST" class="modal-content rounded-4 border-0">
            @csrf
            <div class="modal-header border-0 pb-0">
                <h5 class="modal-title fw-bold">Tambah Kategori / Sub-Kategori</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <div class="mb-3">
                    <label class="form-label fw-medium small">Nama Kategori</label>
                    <input type="text" name="name" class="form-control" placeholder="Contoh: Cat Tembok Interior" required>
                </div>
                <div class="mb-3">
                    <label class="form-label fw-medium small">Kategori Induk (Kosongkan jika Kategori Utama)</label>
                    <select name="parent_id" class="form-select">
                        <option value="">-- Tidak Ada (Kategori Utama) --</option>
                        @foreach($parentCategories as $parent)
                            <option value="{{ $parent->id }}">{{ $parent->name }}</option>
                        @endforeach
                    </select>
                </div>
            </div>
            <div class="modal-footer border-0">
                <button type="button" class="btn btn-light" data-bs-dismiss="modal">Batal</button>
                <button type="submit" class="btn btn-primary fw-bold">Simpan Kategori</button>
            </div>
        </form>
    </div>
</div>
@endsection

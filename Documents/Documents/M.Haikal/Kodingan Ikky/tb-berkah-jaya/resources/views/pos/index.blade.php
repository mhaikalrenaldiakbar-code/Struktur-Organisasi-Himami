@extends('layouts.app')

@section('title', 'Point of Sale (POS) Kasir')

@section('styles')
<style>
    .category-chip-container {
        display: flex;
        gap: 0.5rem;
        overflow-x: auto;
        padding-bottom: 0.5rem;
        scrollbar-width: thin;
    }
    .category-btn {
        white-space: nowrap;
        font-weight: 500;
        transition: all 0.2s ease;
    }
    .pos-product-card {
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        transition: all 0.2s ease;
        background: #ffffff;
        cursor: pointer;
    }
    .pos-product-card:hover {
        border-color: #0284c7;
        box-shadow: 0 4px 12px rgba(2, 132, 199, 0.15);
        transform: translateY(-2px);
    }
    #searchResults {
        border: 1px solid #0284c7;
        background: #ffffff;
        box-shadow: 0 10px 25px rgba(0,0,0,0.15) !important;
    }
    #searchResults .list-group-item:hover {
        background-color: #f0f9ff;
    }
</style>
@endsection

@section('content')
<div class="container-fluid p-0">

    <!-- Opening Cash Banner / Drawer Status (PRD 3.3) -->
    <div class="card border-0 shadow-sm rounded-4 p-3 mb-3 bg-dark text-white d-flex flex-row align-items-center justify-content-between">
        <div class="d-flex align-items-center gap-3">
            <div class="bg-primary p-2.5 rounded-3 text-white">
                <i class="bi bi-wallet2 fs-4"></i>
            </div>
            <div>
                <div class="small text-white-50 fw-bold">SALDO AWAL LACI (UANG KEMBALIAN)</div>
                <h5 class="fw-bold mb-0 text-warning">
                    Rp {{ number_format($openingCash ?? session('opening_drawer_cash', 0), 0, ',', '.') }}
                </h5>
            </div>
        </div>
        <div>
            <button class="btn btn-outline-light btn-sm rounded-pill px-3 fw-bold" data-bs-toggle="modal" data-bs-target="#openingCashModal">
                <i class="bi bi-pencil-square me-1"></i> {{ ($openingCash ?? 0) > 0 || session()->has('opening_drawer_cash') ? 'Ubah Saldo Awal' : 'Input Saldo Awal Laci' }}
            </button>
        </div>
    </div>

    <div class="row g-3">
        <!-- Left Side: Product Selection & Category Shortcut Navigation -->
        <div class="col-lg-7">
            
            <!-- Category Filter Drawer / Shortcuts (PRD 3.3) -->
            <div class="card border-0 shadow-sm rounded-4 p-3 mb-3">
                <div class="d-flex align-items-center justify-content-between mb-2">
                    <label class="fw-bold small text-dark mb-0"><i class="bi bi-grid-fill me-1 text-primary"></i> Pintasan Kategori Barang</label>
                    <span class="badge bg-light text-muted border">Navigasi Modular</span>
                </div>
                <div class="category-chip-container" id="categoryShortcuts">
                    <button class="btn btn-primary btn-sm rounded-pill category-btn active" data-id="">Semua Kategori</button>
                    @foreach(\App\Models\Category::all() as $cat)
                        <button class="btn btn-outline-secondary btn-sm rounded-pill category-btn" data-id="{{ $cat->id }}">
                            {{ $cat->name }}
                        </button>
                    @endforeach
                </div>
            </div>

            <!-- Smart Autocomplete / Barcode Input Form -->
            <div class="card border-0 shadow-sm rounded-4 p-3 mb-3">
                <label class="form-label fw-bold text-dark mb-1"><i class="bi bi-upc-scan me-1 text-primary"></i> Cari Nama Barang / Scan Barcode Hardware</label>
                <div class="position-relative">
                    <div class="input-group">
                        <span class="input-group-text bg-primary text-white"><i class="bi bi-search"></i></span>
                        <input type="text" id="searchInput" class="form-control form-control-lg bg-light" placeholder="Arahkan Barcode Scanner atau ketik nama barang..." autocomplete="off" autofocus>
                    </div>
                    <div id="searchResults" class="list-group position-absolute w-100 shadow-lg mt-1 rounded-3 overflow-hidden d-none" style="z-index: 1090; max-height: 300px; overflow-y: auto;"></div>
                </div>
            </div>

            <!-- Quick Category Grid View Below -->
            <div class="card border-0 shadow-sm rounded-4 p-3" style="min-height: 380px; max-height: 480px; overflow-y: auto;">
                <div class="row g-2" id="productGridContainer">
                    <div class="col-12 text-center text-muted py-5">
                        <i class="bi bi-box-seam display-5 d-block mb-2 text-secondary"></i>
                        Ketik nama barang di kotak pencarian atau klik tombol kategori di atas untuk memuat katalog produk.
                    </div>
                </div>
            </div>
        </div>

        <!-- Right Side: POS Cart & Payment Calculator -->
        <div class="col-lg-5">
            <div class="card border-0 shadow-sm rounded-4 p-4 h-100 d-flex flex-column">
                <div class="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                    <h5 class="fw-bold mb-0 text-dark"><i class="bi bi-cart3 me-2 text-primary"></i>Keranjang Belanja</h5>
                    <button class="btn btn-sm btn-outline-danger" id="clearCartBtn"><i class="bi bi-trash me-1"></i> Kosongkan</button>
                </div>

                <!-- Cart Items Table -->
                <div class="table-responsive flex-grow-1 mb-3" style="max-height: 280px; overflow-y: auto;">
                    <table class="table table-sm align-middle mb-0">
                        <thead class="table-light">
                            <tr>
                                <th>Barang</th>
                                <th style="width: 80px;">Qty</th>
                                <th>Harga Unit</th>
                                <th class="text-end">Subtotal</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody id="cartTableBody">
                            <tr>
                                <td colspan="5" class="text-center text-muted py-4">Keranjang masih kosong</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Summary & Payment Calculation -->
                <div class="border-top pt-3 bg-light p-3 rounded-4">
                    <div class="d-flex justify-content-between mb-2">
                        <span class="text-muted fw-medium">Subtotal Belanja</span>
                        <span class="fw-bold text-dark fs-6" id="subtotalDisplay">Rp 0</span>
                    </div>

                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="text-muted fw-medium">Potongan Diskon (Rp)</span>
                        <input type="number" id="discountInput" class="form-control form-control-sm text-end fw-bold" style="width: 120px;" value="0" min="0">
                    </div>

                    <hr class="my-2">

                    <div class="d-flex justify-content-between mb-3">
                        <span class="fw-bold fs-5 text-dark">TOTAL NETTO</span>
                        <span class="fw-bold fs-4 text-primary" id="totalNetDisplay">Rp 0</span>
                    </div>

                    <!-- Payment Method Tabs -->
                    <div class="mb-3">
                        <label class="form-label fw-bold small text-dark">Metode Pembayaran</label>
                        <div class="btn-group w-100" role="group">
                            <input type="radio" class="btn-check" name="payment_method" id="payCash" value="cash" checked>
                            <label class="btn btn-outline-success fw-bold py-2" for="payCash"><i class="bi bi-cash me-1"></i> Tunai</label>

                            <input type="radio" class="btn-check" name="payment_method" id="payQris" value="qris">
                            <label class="btn btn-outline-primary fw-bold py-2" for="payQris"><i class="bi bi-qr-code me-1"></i> QRIS</label>

                            <input type="radio" class="btn-check" name="payment_method" id="payTransfer" value="bank_transfer">
                            <label class="btn btn-outline-dark fw-bold py-2" for="payTransfer"><i class="bi bi-bank me-1"></i> Transfer</label>
                        </div>
                    </div>

                    <div class="mb-3" id="cashInputGroup">
                        <label class="form-label fw-bold small text-dark">Nominal Tunai Diterima (Rp)</label>
                        <input type="number" id="paidAmountInput" class="form-control form-control-lg text-end fw-bold border-success" placeholder="0">
                        <div class="d-flex justify-content-between mt-2 fs-6">
                            <span class="fw-bold text-secondary">Uang Kembalian:</span>
                            <span class="fw-bold text-success fs-5" id="changeDisplay">Rp 0</span>
                        </div>
                    </div>

                    <button type="button" id="btnCheckout" class="btn btn-success btn-lg w-100 fw-bold py-3 rounded-3 shadow">
                        <i class="bi bi-printer me-1"></i> SELESAIKAN TRANSAKSI (PRINT STRUK)
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Modal Opening Cash (PRD 3.3) -->
<div class="modal fade" id="openingCashModal" tabindex="-1">
    <div class="modal-dialog">
        <form action="{{ route('pos.opening-cash') }}" method="POST" class="modal-content rounded-4 border-0">
            @csrf
            <div class="modal-header border-0 pb-0">
                <h5 class="modal-title fw-bold">Saldo Awal Laci Kasir (Uang Kembalian)</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
                <p class="text-secondary small mb-3">
                    Berdasarkan PRD Section 3.3, untuk mencegah penyelewengan dana, kasir wajib memasukkan Saldo Awal Laci sebelum transaksi pagi.
                </p>
                <div class="mb-3">
                    <label class="form-label fw-bold">Nominal Saldo Awal (Rp)</label>
                    <input type="number" name="amount" class="form-control form-control-lg text-success fw-bold" value="{{ $openingCash ?? session('opening_drawer_cash', 0) }}" required min="0">
                </div>
            </div>
            <div class="modal-footer border-0">
                <button type="button" class="btn btn-light" data-bs-dismiss="modal">Batal</button>
                <button type="submit" class="btn btn-success fw-bold">Simpan Saldo Awal</button>
            </div>
        </form>
    </div>
</div>

<!-- Modal Dynamic QRIS Display -->
<div class="modal fade" id="qrisModal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content rounded-4 border-0 text-center p-4">
            <h4 class="fw-bold text-dark mb-1">Pembayaran QRIS Dinamis</h4>
            <p class="text-muted small">Scan menggunakan Aplikasi m-Banking / E-Wallet</p>
            <div class="bg-light p-4 rounded-4 my-3 d-inline-block mx-auto border">
                <img id="qrisCodeImg" src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=TB_BERKAH_JAYA_CITAPEN_QRIS" alt="QRIS Code" class="img-fluid rounded-3">
            </div>
            <h3 class="fw-bold text-primary mb-3" id="qrisTotalDisplay">Rp 0</h3>
            <button type="button" class="btn btn-success btn-lg fw-bold rounded-3" id="confirmQrisBtn">
                <i class="bi bi-check-circle me-1"></i> Konfirmasi QRIS Berhasil
            </button>
        </div>
    </div>
</div>

@endsection

@section('scripts')
<script>
    let cart = [];
    let activeCategoryId = '';

    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const cartTableBody = document.getElementById('cartTableBody');
    const subtotalDisplay = document.getElementById('subtotalDisplay');
    const discountInput = document.getElementById('discountInput');
    const totalNetDisplay = document.getElementById('totalNetDisplay');
    const paidAmountInput = document.getElementById('paidAmountInput');
    const changeDisplay = document.getElementById('changeDisplay');
    const btnCheckout = document.getElementById('btnCheckout');
    const productGridContainer = document.getElementById('productGridContainer');

    // Fetch Products via API
    function fetchProducts(query = '', categoryId = '') {
        const url = `{{ route('pos.search-products') }}?query=${encodeURIComponent(query)}&category_id=${categoryId}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                renderProductGrid(data);
            });
    }

    // Category filter button listener
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('btn-primary', 'active'));
            document.querySelectorAll('.category-btn').forEach(b => b.classList.add('btn-outline-secondary'));
            this.classList.remove('btn-outline-secondary');
            this.classList.add('btn-primary', 'active');
            
            activeCategoryId = this.getAttribute('data-id');
            fetchProducts('', activeCategoryId);
        });
    });

    // Autocomplete Input Handler
    searchInput.addEventListener('input', function() {
        const query = this.value.trim();
        if (query.length < 1) {
            searchResults.classList.add('d-none');
            return;
        }

        fetch(`{{ route('pos.search-products') }}?query=${encodeURIComponent(query)}`)
            .then(res => res.json())
            .then(data => {
                searchResults.innerHTML = '';
                if (data.length === 0) {
                    searchResults.classList.add('d-none');
                    return;
                }

                data.forEach(p => {
                    const item = document.createElement('a');
                    item.className = 'list-group-item list-group-item-action d-flex justify-content-between align-items-center py-2 px-3 border-bottom';
                    item.style.cursor = 'pointer';
                    item.innerHTML = `
                        <div>
                            <div class="fw-bold text-dark mb-0">${p.name}</div>
                            <small class="text-muted"><span class="badge bg-secondary font-monospace me-1">${p.code}</span> Stok: ${p.stock} ${p.base_unit}</small>
                        </div>
                        <div class="text-end ms-3">
                            <span class="fw-bold text-success">Rp ${p.units[0].price.toLocaleString('id-ID')}</span>
                        </div>
                    `;
                    item.addEventListener('click', () => {
                        addToCart(p, p.units[0]);
                        searchInput.value = '';
                        searchResults.classList.add('d-none');
                    });
                    searchResults.appendChild(item);
                });
                searchResults.classList.remove('d-none');
            });
    });

    // Hide search results dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.add('d-none');
        }
    });

    // Render Product Grid for Shortcuts
    function renderProductGrid(products) {
        productGridContainer.innerHTML = '';
        if (products.length === 0) {
            productGridContainer.innerHTML = `<div class="col-12 text-center text-muted py-5"><i class="bi bi-inbox fs-1 d-block mb-2"></i>Tidak ada produk ditemukan</div>`;
            return;
        }

        products.forEach(p => {
            const card = document.createElement('div');
            card.className = 'col-md-4 col-sm-6';
            card.innerHTML = `
                <div class="pos-product-card p-3 text-center shadow-sm h-100">
                    <div class="fw-bold text-dark small text-truncate mb-1">${p.name}</div>
                    <span class="badge bg-light text-secondary border font-monospace mb-2" style="font-size: 0.7rem;">${p.code}</span>
                    <div class="fw-bold text-success fs-6 mb-1">Rp ${p.units[0].price.toLocaleString('id-ID')}</div>
                    <small class="text-muted extra-small d-block">Stok: ${p.stock} ${p.base_unit}</small>
                </div>
            `;
            card.querySelector('.pos-product-card').addEventListener('click', () => {
                addToCart(p, p.units[0]);
            });
            productGridContainer.appendChild(card);
        });
    }

    // Add Item to Cart
    function addToCart(product, selectedUnit) {
        const existingIndex = cart.findIndex(item => item.product_id === product.id && item.unit_name === selectedUnit.name);
        if (existingIndex > -1) {
            cart[existingIndex].quantity += 1;
        } else {
            cart.push({
                product_id: product.id,
                name: product.name,
                unit_name: selectedUnit.name,
                conversion_factor: selectedUnit.factor,
                price: selectedUnit.price,
                quantity: 1,
                available_units: product.units
            });
        }
        renderCart();
    }

    // Render Cart Items
    function renderCart() {
        cartTableBody.innerHTML = '';
        if (cart.length === 0) {
            cartTableBody.innerHTML = '<tr><td colspan="5" class="text-center text-muted py-4">Keranjang masih kosong</td></tr>';
            calculateTotals();
            return;
        }

        cart.forEach((item, index) => {
            const subtotal = item.price * item.quantity;
            const tr = document.createElement('tr');
            
            let unitSelectOptions = '';
            item.available_units.forEach(u => {
                unitSelectOptions += `<option value="${u.name}" ${u.name === item.unit_name ? 'selected' : ''}>${u.name}</option>`;
            });

            tr.innerHTML = `
                <td>
                    <div class="fw-bold text-dark small">${item.name}</div>
                    <select class="form-select form-select-sm py-0 mt-1 unit-selector" data-index="${index}" style="font-size: 0.75rem;">
                        ${unitSelectOptions}
                    </select>
                </td>
                <td>
                    <input type="number" step="0.01" min="0.01" value="${item.quantity}" class="form-control form-control-sm qty-input text-center" data-index="${index}">
                </td>
                <td class="small">Rp ${item.price.toLocaleString('id-ID')}</td>
                <td class="text-end fw-bold small">Rp ${subtotal.toLocaleString('id-ID')}</td>
                <td class="text-end">
                    <button class="btn btn-sm btn-link text-danger p-0 remove-item" data-index="${index}"><i class="bi bi-x-circle fs-5"></i></button>
                </td>
            `;
            cartTableBody.appendChild(tr);
        });

        calculateTotals();
    }

    // Calculate Totals & Changes
    function calculateTotals() {
        let subtotal = 0;
        cart.forEach(item => {
            subtotal += item.price * item.quantity;
        });

        const discount = parseFloat(discountInput.value) || 0;
        let totalNet = subtotal - discount;
        if (totalNet < 0) totalNet = 0;

        subtotalDisplay.innerText = `Rp ${subtotal.toLocaleString('id-ID')}`;
        totalNetDisplay.innerText = `Rp ${totalNet.toLocaleString('id-ID')}`;

        const paid = parseFloat(paidAmountInput.value) || 0;
        let change = paid - totalNet;
        if (change < 0) change = 0;

        changeDisplay.innerText = `Rp ${change.toLocaleString('id-ID')}`;
    }

    // Event Delegation for Cart Table Inputs
    cartTableBody.addEventListener('change', function(e) {
        if (e.target.classList.contains('qty-input')) {
            const index = e.target.getAttribute('data-index');
            cart[index].quantity = parseFloat(e.target.value) || 1;
            renderCart();
        } else if (e.target.classList.contains('unit-selector')) {
            const index = e.target.getAttribute('data-index');
            const newUnitName = e.target.value;
            const newUnit = cart[index].available_units.find(u => u.name === newUnitName);
            if (newUnit) {
                cart[index].unit_name = newUnit.name;
                cart[index].conversion_factor = newUnit.factor;
                cart[index].price = newUnit.price;
            }
            renderCart();
        }
    });

    cartTableBody.addEventListener('click', function(e) {
        if (e.target.closest('.remove-item')) {
            const index = e.target.closest('.remove-item').getAttribute('data-index');
            cart.splice(index, 1);
            renderCart();
        }
    });

    discountInput.addEventListener('input', calculateTotals);
    paidAmountInput.addEventListener('input', calculateTotals);
    document.getElementById('clearCartBtn').addEventListener('click', () => { cart = []; renderCart(); });

    // Handle Payment Method Toggle
    document.querySelectorAll('input[name="payment_method"]').forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'cash') {
                document.getElementById('cashInputGroup').classList.remove('d-none');
            } else {
                document.getElementById('cashInputGroup').classList.add('d-none');
            }
        });
    });

    // Checkout Form Submit
    btnCheckout.addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Keranjang belanja masih kosong!');
            return;
        }

        const paymentMethod = document.querySelector('input[name="payment_method"]:checked').value;
        const discount = parseFloat(discountInput.value) || 0;

        let subtotal = 0;
        cart.forEach(i => subtotal += i.price * i.quantity);
        let totalNet = subtotal - discount;

        if (paymentMethod === 'qris') {
            document.getElementById('qrisTotalDisplay').innerText = `Rp ${totalNet.toLocaleString('id-ID')}`;
            const qrisModal = new bootstrap.Modal(document.getElementById('qrisModal'));
            qrisModal.show();
            document.getElementById('confirmQrisBtn').onclick = function() {
                qrisModal.hide();
                processCheckout(paymentMethod, totalNet, totalNet);
            };
            return;
        }

        const paid = paymentMethod === 'cash' ? (parseFloat(paidAmountInput.value) || 0) : totalNet;

        if (paymentMethod === 'cash' && paid < totalNet) {
            alert('Uang pembayaran tunai kurang dari Total Netto!');
            return;
        }

        processCheckout(paymentMethod, discount, paid);
    });

    function processCheckout(paymentMethod, discountAmount, paidAmount) {
        btnCheckout.disabled = true;
        btnCheckout.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Memproses Checkout...';

        const payload = {
            _token: '{{ csrf_token() }}',
            items: cart,
            discount_amount: discountAmount,
            payment_method: paymentMethod,
            paid_amount: paidAmount
        };

        fetch('{{ route("pos.store") }}', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': '{{ csrf_token() }}'
            },
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(data => {
            btnCheckout.disabled = false;
            btnCheckout.innerHTML = '<i class="bi bi-printer me-1"></i> SELESAIKAN TRANSAKSI (PRINT STRUK)';

            if (data.success) {
                cart = [];
                renderCart();
                // Trigger print receipt popup
                const receiptUrl = `{{ url('/pos/receipt') }}/${data.transaction_id}`;
                window.open(receiptUrl, '_blank', 'width=400,height=600');
            } else {
                alert('Gagal: ' + data.message);
            }
        })
        .catch(err => {
            btnCheckout.disabled = false;
            alert('Terjadi kesalahan koneksi server.');
        });
    }

    // Initial load
    fetchProducts();
</script>
@endsection

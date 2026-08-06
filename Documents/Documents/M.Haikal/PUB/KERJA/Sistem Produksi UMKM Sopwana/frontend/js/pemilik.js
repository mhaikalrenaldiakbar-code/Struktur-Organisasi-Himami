requireAuth(['PEMILIK', 'ADMIN']);

document.addEventListener('DOMContentLoaded', () => {
    const profileName = document.getElementById('profileName');
    const profileRole = document.getElementById('profileRole');

    if (profileName) profileName.textContent = getUsername();
    if (profileRole) profileRole.textContent = getRole();

    bindAdminForms();
    loadAllAdmin();
});

function bindAdminForms() {
    const formRegister = document.getElementById('formRegister');

    if (formRegister) {
        formRegister.addEventListener('submit', async e => {
            e.preventDefault();

            const username = document.getElementById('regUsername').value.trim();
            const password = document.getElementById('regPassword').value.trim();
            const nama = document.getElementById('regNama').value.trim();
            const email = document.getElementById('regEmail').value.trim();
            const noHp = document.getElementById('regNoHp').value.trim();
            const alamat = document.getElementById('regAlamat').value.trim();

            if (username.length < 3 || username.length > 50) {
                toast('Username harus 3 sampai 50 karakter', 'error');
                return;
            }

            if (!/^[A-Za-z0-9._-]+$/.test(username)) {
                toast('Username hanya boleh huruf, angka, titik, underscore, atau strip', 'error');
                return;
            }

            if (password.length < 4 || password.length > 100) {
                toast('Password harus 4 sampai 100 karakter', 'error');
                return;
            }

            if (nama.length < 3 || nama.length > 100) {
                toast('Nama harus 3 sampai 100 karakter', 'error');
                return;
            }

            if (!/^[A-Za-zÀ-ÿ\s'.-]+$/.test(nama)) {
                toast('Nama hanya boleh huruf, spasi, titik, petik, atau strip', 'error');
                return;
            }

            if (email.length > 100 || !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
                toast('Format email tidak valid. Contoh yang benar: nama@gmail.com', 'error');
                return;
            }

            if (!/^08[0-9]{8,13}$/.test(noHp)) {
                toast('No HP harus diawali 08 dan berisi 10 sampai 15 digit angka', 'error');
                return;
            }

            if (alamat.length > 255) {
                toast('Alamat maksimal 255 karakter', 'error');
                return;
            }

            const body = {
                username,
                password,
                role: 'PEKERJA',
                nama,
                email,
                noHp,
                alamat
            };

            try {
                await apiPost(`${CONFIG.PAYROLL_BASE_URL}/auth/register`, body);
                toast('Pekerja berhasil didaftarkan');
                e.target.reset();
                await loadPekerja();
            } catch (err) {
                toast(err.message, 'error');
            }
        });
    }

    const formProduksi = document.getElementById('formProduksi');
    if (formProduksi) {
        formProduksi.addEventListener('submit', async e => {
            e.preventDefault();

            const jumlahBal = Number(document.getElementById('jumlahBalProduksi').value);
            const catatan = document.getElementById('catatanProduksi').value.trim();

            if (!jumlahBal || jumlahBal < 1) {
                toast('Jumlah bal produksi minimal 1', 'error');
                return;
            }

            if (catatan.length > 255) {
                toast('Catatan produksi maksimal 255 karakter', 'error');
                return;
            }

            const body = {
                jumlahBal,
                catatan
            };

            try {
                await apiPost(`${CONFIG.PRODUCTION_BASE_URL}/produksi/tambah`, body);
                toast('Produksi berhasil ditambahkan');
                e.target.reset();

                await Promise.allSettled([
                    loadStok(),
                    loadProduksi(),
                    loadRiwayatKerja()
                ]);
            } catch (err) {
                toast(err.message, 'error');
            }
        });
    }

    const formPenjualan = document.getElementById('formPenjualan');
    if (formPenjualan) {
        formPenjualan.addEventListener('submit', async e => {
            e.preventDefault();

            const jumlahIkat = Number(document.getElementById('jumlahIkatJual').value);
            const catatan = document.getElementById('catatanJual').value.trim();

            if (!jumlahIkat || jumlahIkat < 1) {
                toast('Jumlah ikat penjualan minimal 1', 'error');
                return;
            }

            if (catatan.length > 255) {
                toast('Catatan penjualan maksimal 255 karakter', 'error');
                return;
            }

            const body = {
                jumlahIkat,
                catatan
            };

            try {
                await apiPost(`${CONFIG.PRODUCTION_BASE_URL}/penjualan/tambah`, body);
                toast('Penjualan berhasil disimpan');
                e.target.reset();

                await Promise.allSettled([
                    loadStok(),
                    loadPenjualan()
                ]);
            } catch (err) {
                toast(err.message, 'error');
            }
        });
    }

    const btnMunculkanGaji = document.getElementById('btnMunculkanGaji');
    if (btnMunculkanGaji) {
        btnMunculkanGaji.addEventListener('click', async () => {
            if (!confirm('Ubah semua gaji MENUNGGU_JADWAL menjadi PENDING untuk testing/hari Sabtu?')) return;

            try {
                await apiPut(`${CONFIG.PAYROLL_BASE_URL}/transaksi/testing/munculkan-gaji`);
                toast('Gaji mingguan berhasil dimunculkan');
                await loadPendingGaji();
            } catch (err) {
                toast(err.message, 'error');
            }
        });
    }
}

async function loadAllAdmin() {
    await Promise.allSettled([
        loadDashboard(),
        loadPekerja(),
        loadProduksi(),
        loadProduksiArsip(),
        loadRiwayatKerja(),
        loadPendingGaji(),
        loadPenjualan()
    ]);
}

async function loadDashboard() {
    await Promise.allSettled([
        loadStok(),
        loadPekerja(),
        loadPendingGaji()
    ]);
}

async function loadStok() {
    try {
        const data = await apiGet(`${CONFIG.PRODUCTION_BASE_URL}/stok/terkini`);

        const stokBal = document.getElementById('stokBal');
        const stokIkat = document.getElementById('stokIkat');

        const valBal = data.jumlahBal ?? data.saldoBal ?? data.jumlah_bal ?? data.saldo_bal ?? 0;
        const valIkat = data.jumlahIkat ?? data.saldoIkat ?? data.jumlah_ikat ?? data.saldo_ikat ?? 0;

        if (stokBal) {
            stokBal.textContent = fmtNumber(valBal);
            const parent = stokBal.closest('.summary-card');
            if (parent) {
                let badgeEl = parent.querySelector('.badge-stock');
                if (!badgeEl) {
                    badgeEl = document.createElement('span');
                    parent.appendChild(badgeEl);
                }
                if (valBal <= 2) {
                    badgeEl.className = 'badge-stock danger';
                    badgeEl.textContent = '⚠️ Stok Kritis';
                } else if (valBal <= 5) {
                    badgeEl.className = 'badge-stock warning';
                    badgeEl.textContent = '⚡ Stok Menipis';
                } else {
                    badgeEl.className = 'badge-stock success';
                    badgeEl.textContent = '✅ Stok Aman';
                }
            }
        }

        if (stokIkat) {
            stokIkat.textContent = fmtNumber(valIkat);
            const parent = stokIkat.closest('.summary-card');
            if (parent) {
                let badgeEl = parent.querySelector('.badge-stock');
                if (!badgeEl) {
                    badgeEl = document.createElement('span');
                    parent.appendChild(badgeEl);
                }
                if (valIkat <= 10) {
                    badgeEl.className = 'badge-stock danger';
                    badgeEl.textContent = '⚠️ Siap Jual Kritis';
                } else if (valIkat <= 30) {
                    badgeEl.className = 'badge-stock warning';
                    badgeEl.textContent = '⚡ Siap Jual Menipis';
                } else {
                    badgeEl.className = 'badge-stock success';
                    badgeEl.textContent = '✅ Siap Jual Aman';
                }
            }
        }

    } catch (err) {
        toast('Gagal memuat stok: ' + err.message, 'error');
    }
}

window.allPekerjaData = [];
window.allProduksiData = [];

async function loadPekerja() {
    const tbody = document.getElementById('tblPekerja');

    try {
        const data = await apiGet(`${CONFIG.PAYROLL_BASE_URL}/pekerja/semua`);
        const list = Array.isArray(data) ? data : [];
        window.allPekerjaData = list;

        const totalPekerja = document.getElementById('totalPekerja');
        if (totalPekerja) totalPekerja.textContent = list.length;

        if (!tbody) return;

        renderPekerjaTable(list);

    } catch (err) {
        if (tbody) tbody.innerHTML = rowEmpty(5, err.message);
        toast('Gagal memuat pekerja: ' + err.message, 'error');
    }
}

function renderPekerjaTable(list) {
    const tbody = document.getElementById('tblPekerja');
    if (!tbody) return;

    tbody.innerHTML = list.length
        ? list.map(p => `
            <tr>
                <td><b>#${safe(p.idPekerja ?? p.id_pekerja ?? p.id ?? '-')}</b></td>
                <td><strong>${safe(p.nama ?? '-')}</strong></td>
                <td>${safe(p.email ?? '-')}</td>
                <td>${safe(p.noHp ?? p.no_hp ?? '-')}</td>
                <td class="actions-row">
                    <button class="btn btn-soft" onclick="openEditModal(${p.idPekerja ?? p.id_pekerja ?? p.id})">✏️ Edit</button>
                    <button class="btn btn-danger" onclick="hapusPekerja(${p.idPekerja ?? p.id_pekerja ?? p.id})">📥 Arsipkan</button>
                </td>
            </tr>
        `).join('')
        : rowEmpty(5, 'Belum ada data pekerja');
}

function filterPekerjaTable() {
    const query = (document.getElementById('searchPekerja')?.value || '').toLowerCase().trim();
    if (!window.allPekerjaData) return;

    const filtered = window.allPekerjaData.filter(p => {
        const nama = (p.nama || '').toLowerCase();
        const email = (p.email || '').toLowerCase();
        const hp = (p.noHp || p.no_hp || '').toLowerCase();
        const id = String(p.idPekerja || p.id_pekerja || p.id || '');
        return nama.includes(query) || email.includes(query) || hp.includes(query) || id.includes(query);
    });

    renderPekerjaTable(filtered);
}

async function openEditModal(idPekerja) {
    if (!idPekerja) {
        toast('ID pekerja tidak valid', 'error');
        return;
    }

    try {
        const p = await apiGet(`${CONFIG.PAYROLL_BASE_URL}/pekerja/${idPekerja}`);
        document.getElementById('editIdPekerja').value = p.idPekerja ?? p.id_pekerja ?? p.id;
        document.getElementById('editNamaPekerja').value = p.nama || '';
        document.getElementById('editEmailPekerja').value = p.email || '';
        document.getElementById('editNoHpPekerja').value = p.noHp || p.no_hp || '';
        document.getElementById('editAlamatPekerja').value = p.alamat || '';

        const modal = document.getElementById('modalEditPekerja');
        if (modal) modal.classList.add('active');
    } catch (err) {
        toast('Gagal memuat detail pekerja: ' + err.message, 'error');
    }
}

function closeEditModal() {
    const modal = document.getElementById('modalEditPekerja');
    if (modal) modal.classList.remove('active');
}

async function saveEditPekerja(e) {
    e.preventDefault();
    const idPekerja = document.getElementById('editIdPekerja').value;
    const namaFix = document.getElementById('editNamaPekerja').value.trim();
    const emailFix = document.getElementById('editEmailPekerja').value.trim();
    const noHpFix = document.getElementById('editNoHpPekerja').value.trim();
    const alamatFix = document.getElementById('editAlamatPekerja').value.trim();

    if (namaFix.length < 3 || namaFix.length > 100) {
        toast('Nama harus 3 sampai 100 karakter', 'error');
        return;
    }

    if (!/^[A-Za-zÀ-ÿ\s'.-]+$/.test(namaFix)) {
        toast('Nama hanya boleh huruf, spasi, titik, petik, atau strip', 'error');
        return;
    }

    if (emailFix.length > 100 || !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(emailFix)) {
        toast('Format email tidak valid. Contoh: nama@gmail.com', 'error');
        return;
    }

    if (!/^08[0-9]{8,13}$/.test(noHpFix)) {
        toast('No HP harus diawali 08 dan berisi 10 sampai 15 digit angka', 'error');
        return;
    }

    if (alamatFix.length > 255) {
        toast('Alamat maksimal 255 karakter', 'error');
        return;
    }

    try {
        await apiPut(`${CONFIG.PAYROLL_BASE_URL}/pekerja/${idPekerja}`, {
            nama: namaFix,
            email: emailFix,
            noHp: noHpFix,
            alamat: alamatFix
        });
        toast('Data pekerja berhasil diperbarui');
        closeEditModal();
        await loadPekerja();
    } catch (err) {
        toast(err.message, 'error');
    }
}

async function hapusPekerja(idPekerja) {
    if (!idPekerja) {
        toast('ID pekerja tidak valid', 'error');
        return;
    }

    if (!confirm('Arsipkan pekerja ini? Akun login pekerja akan dinonaktifkan, tetapi riwayat lama tetap aman.')) return;

    try {
        await apiDelete(`${CONFIG.PAYROLL_BASE_URL}/pekerja/${idPekerja}`);
        toast('Pekerja berhasil diarsipkan');
        await loadPekerja();
    } catch (err) {
        toast(err.message, 'error');
    }
}

async function loadProduksi() {
    const tbody = document.getElementById('tblProduksi');
    if (!tbody) return;

    try {
        const data = await apiGet(`${CONFIG.PRODUCTION_BASE_URL}/produksi/semua`);
        const list = Array.isArray(data) ? data : [];
        window.allProduksiData = list;

        renderProduksiTable(list);

    } catch (err) {
        tbody.innerHTML = rowEmpty(5, err.message);
        toast('Gagal memuat produksi: ' + err.message, 'error');
    }
}

function renderProduksiTable(list) {
    const tbody = document.getElementById('tblProduksi');
    if (!tbody) return;

    tbody.innerHTML = list.length
        ? list.map(x => `
            <tr>
                <td><b>#${safe(x.idProduksi ?? x.id_produksi ?? x.id ?? '-')}</b></td>
                <td>${safe(x.tanggal ?? '-')}</td>
                <td><strong style="color: var(--primary);">${fmtNumber(x.jumlahBal ?? x.jumlah_bal ?? 0)} bal</strong></td>
                <td>${safe(x.catatan ?? '-')}</td>
                <td>
                    <button class="btn btn-danger" onclick="arsipkanProduksi(${x.idProduksi ?? x.id_produksi ?? x.id})">📥 Arsipkan</button>
                </td>
            </tr>
        `).join('')
        : rowEmpty(5, 'Belum ada riwayat produksi bal');
}

function filterProduksiTable() {
    const query = (document.getElementById('searchProduksi')?.value || '').toLowerCase().trim();
    if (!window.allProduksiData) return;

    const filtered = window.allProduksiData.filter(x => {
        const tgl = (x.tanggal || '').toLowerCase();
        const cat = (x.catatan || '').toLowerCase();
        const id = String(x.idProduksi || x.id_produksi || x.id || '');
        const bal = String(x.jumlahBal || x.jumlah_bal || '');
        return tgl.includes(query) || cat.includes(query) || id.includes(query) || bal.includes(query);
    });

    renderProduksiTable(filtered);
}


async function loadProduksiArsip() {
    const tbody = document.getElementById('tblProduksiArsip');
    if (!tbody) return;

    try {
        const data = await apiGet(`${CONFIG.PRODUCTION_BASE_URL}/produksi/arsip`);
        const list = Array.isArray(data) ? data : [];
        tbody.innerHTML = list.length
            ? list.map(x => `
                <tr>
                    <td>${safe(x.idProduksi ?? x.id_produksi ?? x.id ?? '-')}</td>
                    <td>${safe(x.tanggal ?? '-')}</td>
                    <td>${fmtNumber(x.jumlahBal ?? x.jumlah_bal ?? 0)} bal</td>
                    <td>${safe(x.catatan ?? '-')}</td>
                    <td>${badge('DIARSIPKAN')}</td>
                </tr>
            `).join('')
            : rowEmpty(5, 'Belum ada arsip produksi bal');
    } catch (err) {
        tbody.innerHTML = rowEmpty(5, err.message);
        toast('Gagal memuat arsip produksi: ' + err.message, 'error');
    }
}

async function refreshProduksiPanel() {
    await Promise.allSettled([
        loadStok(),
        loadProduksi(),
        loadProduksiArsip(),
        loadRiwayatKerja()
    ]);
}

async function arsipkanProduksi(idProduksi) {
    if (!idProduksi) {
        toast('ID produksi tidak valid', 'error');
        return;
    }

    if (!confirm('Arsipkan data produksi ini? Stok tidak akan berubah karena ini hanya arsip data.')) return;

    try {
        await apiPut(`${CONFIG.PRODUCTION_BASE_URL}/produksi/arsip/${idProduksi}`);
        toast('Produksi berhasil diarsipkan');
        await Promise.allSettled([loadProduksi(), loadProduksiArsip()]);
    } catch (err) {
        toast(err.message, 'error');
    }
}

async function loadRiwayatKerja() {
    const tbody = document.getElementById('tblRiwayat');

    try {
        const data = await apiGet(`${CONFIG.PRODUCTION_BASE_URL}/kerja/riwayat`);
        const list = Array.isArray(data) ? data : [];

        if (tbody) {
            tbody.innerHTML = list.length
                ? list.map(x => `
                    <tr>
                        <td>${safe(x.idHasil ?? x.id_hasil ?? '-')}</td>
                        <td>${safe(x.pekerjaId ?? x.idPekerja ?? x.id_pekerja ?? '-')}</td>
                        <td>${safe(x.namaPekerja ?? x.nama_pekerja ?? x.nama ?? '-')}</td>
                        <td>${safe(x.tanggal ?? '-')}</td>
                        <td>${fmtNumber(x.jumlahBal ?? x.jumlah_bal ?? 0)} bal</td>
                        <td>${fmtNumber(x.jumlahIkat ?? x.jumlah_ikat ?? 0)} ikat</td>
                        <td>${badge(x.statusValidasi ?? x.status_validasi ?? 'PENDING')}</td>
                        <td>${badge(x.statusPembayaran ?? x.status_pembayaran ?? 'BELUM_DIHITUNG')}</td>
                    </tr>
                `).join('')
                : rowEmpty(8, 'Belum ada riwayat kerja');
        }

        renderValidasi(list);

    } catch (err) {
        if (tbody) tbody.innerHTML = rowEmpty(8, err.message);

        const tbodyValidasi = document.getElementById('tblValidasi');
        if (tbodyValidasi) tbodyValidasi.innerHTML = rowEmpty(6, err.message);

        toast('Gagal memuat riwayat kerja: ' + err.message, 'error');
    }
}

async function loadValidasi() {
    await loadRiwayatKerja();
}

function renderValidasi(list) {
    const tbodyValidasi = document.getElementById('tblValidasi');
    if (!tbodyValidasi) return;

    const needValid = list.filter(x => {
        const status = String(
            x.statusValidasi ??
            x.status_validasi ??
            'PENDING'
        ).toUpperCase();

        return status === 'PENDING';
    });

    tbodyValidasi.innerHTML = needValid.length
        ? needValid.map(x => {
            const idHasil = x.idHasil ?? x.id_hasil ?? x.id;

            return `
                <tr>
                    <td>${safe(idHasil)}</td>
                    <td>${safe(x.namaPekerja ?? x.nama_pekerja ?? x.nama ?? '-')}</td>
                    <td>${fmtNumber(x.jumlahIkat ?? x.jumlah_ikat ?? 0)} ikat</td>
                    <td>${badge(x.statusValidasi ?? x.status_validasi ?? 'PENDING')}</td>
                    <td>${safe(x.catatan ?? '-')}</td>
                    <td class="actions-row">
                        <button class="btn btn-primary" onclick="validasiHasil(${idHasil}, 'VALID')">
                            Valid
                        </button>
                        <button class="btn btn-danger" onclick="validasiHasil(${idHasil}, 'DITOLAK')">
                            Tolak
                        </button>
                    </td>
                </tr>
            `;
        }).join('')
        : rowEmpty(6, 'Tidak ada hasil kemas yang menunggu validasi');
}

async function validasiHasil(idHasil, status) {
    if (!idHasil || idHasil === '-') {
        toast('ID hasil tidak valid', 'error');
        return;
    }

    const catatan = prompt(
        `Catatan validasi ${status}:`,
        status === 'VALID' ? 'Sesuai' : 'Tidak sesuai'
    );

    if (catatan === null) return;

    try {
        await apiPut(
            `${CONFIG.PRODUCTION_BASE_URL}/kerja/validasi/${idHasil}?status=${encodeURIComponent(status)}&catatan=${encodeURIComponent(catatan)}`
        );

        toast('Validasi berhasil. Jika status VALID, backend akan membuat data penggajian.');

        await Promise.allSettled([
            loadRiwayatKerja(),
            loadStok(),
            loadPendingGaji()
        ]);

    } catch (err) {
        toast(err.message, 'error');
    }
}

const HARGA_JUAL_PER_IKAT = 2000;

function getPenjualanId(item) {
    return item?.idPenjualan ?? item?.id_penjualan ?? item?.id ?? null;
}

function getJumlahIkatPenjualan(item) {
    return Number(item?.jumlahIkat ?? item?.jumlah_ikat ?? 0);
}

function getTanggalPenjualan(item) {
    return item?.tanggal ?? item?.createdAt ?? item?.created_at ?? null;
}

function getLabelHariPenjualan(tanggalValue) {
    const d = parseTanggalSopwana(tanggalValue);
    return d ? new Intl.DateTimeFormat('id-ID', { weekday: 'long' }).format(d) : '-';
}

function groupPenjualanMingguan(list) {
    const map = new Map();

    (list || []).forEach(item => {
        const tanggal = parseTanggalSopwana(getTanggalPenjualan(item));
        if (!tanggal) return;
        const awal = getAwalMingguMingguSabtu(tanggal);
        const akhir = getAkhirMingguMingguSabtu(awal);
        const key = `${dateKeySopwana(awal)}_${dateKeySopwana(akhir)}`;

        if (!map.has(key)) {
            map.set(key, {
                key,
                awal,
                akhir,
                periode: `${dateKeySopwana(awal)} s/d ${dateKeySopwana(akhir)}`,
                title: `${namaBulanTahunPemilik(awal)} - Minggu ${mingguKeDalamBulanPemilik(awal)}`,
                items: []
            });
        }
        map.get(key).items.push(item);
    });

    return Array.from(map.values())
        .map(group => {
            group.items.sort((a, b) => String(getTanggalPenjualan(a)).localeCompare(String(getTanggalPenjualan(b))) || Number(getPenjualanId(a) || 0) - Number(getPenjualanId(b) || 0));
            group.totalIkat = group.items.reduce((sum, x) => sum + getJumlahIkatPenjualan(x), 0);
            group.totalUang = group.totalIkat * HARGA_JUAL_PER_IKAT;
            return group;
        })
        .sort((a, b) => b.awal - a.awal);
}

function renderPenjualanSummary(groups) {
    const el = document.getElementById('penjualanSummaryCards');
    if (!el) return;

    const { start, end } = getPeriodeMingguSekarang();
    const mingguIni = groups.find(g => dateKeySopwana(g.awal) === dateKeySopwana(start) && dateKeySopwana(g.akhir) === dateKeySopwana(end));
    const ikatMingguIni = mingguIni?.totalIkat || 0;
    const uangMingguIni = mingguIni?.totalUang || 0;
    const totalIkat = groups.reduce((sum, g) => sum + g.totalIkat, 0);
    const totalUang = groups.reduce((sum, g) => sum + g.totalUang, 0);

    el.innerHTML = `
        <div class="metric-card"><span>Ikat Minggu Ini</span><b>${fmtNumber(ikatMingguIni)} ikat</b></div>
        <div class="metric-card"><span>Uang Minggu Ini</span><b>${fmtRupiah(uangMingguIni)}</b></div>
        <div class="metric-card"><span>Total Semua Ikat</span><b>${fmtNumber(totalIkat)} ikat</b></div>
        <div class="metric-card"><span>Total Semua Uang</span><b>${fmtRupiah(totalUang)}</b></div>
    `;
}

function renderPenjualanMingguan(groups) {
    const container = document.getElementById('penjualanMingguanList');
    if (!container) return;

    const { start, end } = getPeriodeMingguSekarang();

    if (!groups.length) {
        container.innerHTML = '<div class="weekly-empty">Belum ada data penjualan. Input penjualan harian terlebih dahulu.</div>';
        return;
    }

    container.innerHTML = groups.map(group => {
        const mingguIni = dateKeySopwana(group.awal) === dateKeySopwana(start) && dateKeySopwana(group.akhir) === dateKeySopwana(end);
        const rows = group.items.map(x => {
            const id = getPenjualanId(x);
            const ikat = getJumlahIkatPenjualan(x);
            const uang = ikat * HARGA_JUAL_PER_IKAT;
            return `
                <tr>
                    <td>${safe(getTanggalPenjualan(x))}</td>
                    <td>${safe(getLabelHariPenjualan(getTanggalPenjualan(x)))}</td>
                    <td>${safe(id ?? '-')}</td>
                    <td>${fmtNumber(ikat)} ikat</td>
                    <td>${fmtRupiah(uang)}</td>
                    <td>${safe(x.catatan ?? '-')}</td>
                    <td><button class="btn btn-danger btn-small" onclick="arsipkanPenjualan(${id})">Arsipkan</button></td>
                </tr>
            `;
        }).join('');

        return `
            <div class="weekly-card sales-week-card">
                <div class="weekly-card-head">
                    <div>
                        <span class="eyebrow">Penjualan Mingguan</span>
                        <h3>${safe(group.title)} ${mingguIni ? '<span class="badge valid">Minggu Ini</span>' : ''}</h3>
                        <p>Periode penjualan: ${safe(group.periode)}. Data minggu berikutnya otomatis tampil pada kartu baru.</p>
                    </div>
                    <div class="weekly-total sales-week-total">
                        <div><span>Total Laporan</span><b>${fmtNumber(group.items.length)} hari/input</b></div>
                        <div><span>Total Ikat</span><b>${fmtNumber(group.totalIkat)} ikat</b></div>
                        <div><span>Harga / Ikat</span><b>Rp2.000</b></div>
                        <div><span>Total Uang</span><b>${fmtRupiah(group.totalUang)}</b></div>
                    </div>
                </div>
                <div class="weekly-table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th>Tanggal</th>
                                <th>Hari</th>
                                <th>ID</th>
                                <th>Ikat Terjual</th>
                                <th>Uang Masuk</th>
                                <th>Catatan</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>${rows}</tbody>
                    </table>
                </div>
            </div>
        `;
    }).join('');
}

async function loadPenjualan() {
    const container = document.getElementById('penjualanMingguanList');
    if (!container) return;

    try {
        const data = await apiGet(`${CONFIG.PRODUCTION_BASE_URL}/penjualan/semua`);
        const list = Array.isArray(data) ? data : [];
        const groups = groupPenjualanMingguan(list);

        renderPenjualanSummary(groups);
        renderPenjualanMingguan(groups);

    } catch (err) {
        renderPenjualanSummary([]);
        container.innerHTML = `<div class="weekly-empty error">${safe(err.message)}</div>`;
        toast('Gagal memuat penjualan: ' + err.message, 'error');
    }
}

async function arsipkanPenjualan(idPenjualan) {
    if (!idPenjualan) {
        toast('ID penjualan tidak valid', 'error');
        return;
    }

    if (!confirm('Arsipkan data penjualan ini? Stok tidak akan berubah karena ini hanya arsip data.')) return;

    try {
        await apiPut(`${CONFIG.PRODUCTION_BASE_URL}/penjualan/arsip/${idPenjualan}`);
        toast('Penjualan berhasil diarsipkan');
        await loadPenjualan();
    } catch (err) {
        toast(err.message, 'error');
    }
}



function parseTanggalSopwana(value) {
    if (!value) return null;
    if (value instanceof Date) return value;
    const text = String(value).slice(0, 10);
    const parts = text.split('-').map(Number);
    if (parts.length === 3 && parts.every(n => !Number.isNaN(n))) {
        return new Date(parts[0], parts[1] - 1, parts[2]);
    }
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d;
}

function dateKeySopwana(d) {
    if (!d) return '';
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

function getAwalMingguMingguSabtu(date) {
    const acuan = date ? new Date(date) : new Date();
    acuan.setHours(0, 0, 0, 0);
    acuan.setDate(acuan.getDate() - acuan.getDay());
    return acuan;
}

function getAkhirMingguMingguSabtu(awal) {
    const result = new Date(awal);
    result.setDate(result.getDate() + 6);
    result.setHours(23, 59, 59, 999);
    return result;
}

function getPeriodeMingguSekarang() {
    const start = getAwalMingguMingguSabtu(new Date());
    const end = getAkhirMingguMingguSabtu(start);
    return { start, end };
}

function isMingguKerjaSelesai(end) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const batas = new Date(end);
    batas.setHours(0, 0, 0, 0);
    return today >= batas;
}

function isDalamPeriode(tanggalValue, start, end) {
    const d = parseTanggalSopwana(tanggalValue);
    if (!d) return false;
    const onlyDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    return onlyDate >= start && onlyDate <= end;
}

function normalStatusSopwana(status) {
    return String(status || 'BELUM_DIHITUNG').trim().toUpperCase();
}

function isStatusDibayar(status) {
    const s = normalStatusSopwana(status);
    return s === 'DIBAYAR' || s === 'SUDAH_DIBAYAR' || s === 'LUNAS';
}

function mingguSelesai(end) {
    const hariIni = new Date();
    hariIni.setHours(0, 0, 0, 0);
    const akhir = new Date(end);
    akhir.setHours(0, 0, 0, 0);
    return hariIni > akhir;
}

function mingguKeDalamBulanPemilik(date) {
    const awalBulan = new Date(date.getFullYear(), date.getMonth(), 1);
    const awalMingguPertama = getAwalMingguMingguSabtu(awalBulan);
    const awalMingguIni = getAwalMingguMingguSabtu(date);
    return Math.floor(Math.round((awalMingguIni - awalMingguPertama) / 86400000) / 7) + 1;
}

function namaBulanTahunPemilik(date) {
    return new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric' }).format(date);
}

function statusPayrollDariList(payrollList, idPekerja, start = null, end = null) {
    let cocokList = (payrollList || []).filter(g => String(g.pekerjaId ?? g.idPekerja ?? g.id_pekerja ?? '') === String(idPekerja));

    // Cocokkan dengan periode minggu berjalan. Backend lama pernah salah membuat periode
    // menjadi minggu berikutnya, jadi tanggal bayar juga dipakai sebagai fallback.
    if (start && end) {
        const startKey = dateKeySopwana(start);
        const endKey = dateKeySopwana(end);
        const inCurrentPeriod = g => {
            const awal = String(g.tanggalAwal ?? g.tanggal_awal ?? '');
            const akhir = String(g.tanggalAkhir ?? g.tanggal_akhir ?? '');
            const periode = String(g.periode || '');
            const tglBayar = g.tanggalDibayar ?? g.tanggal_dibayar;
            if (awal.startsWith(startKey) || periode.includes(startKey)) return true;
            if (akhir.startsWith(endKey) || periode.includes(endKey)) return true;
            if (tglBayar && isDalamPeriode(tglBayar, start, end)) return true;
            return false;
        };
        const periodeList = cocokList.filter(inCurrentPeriod);
        if (periodeList.length) cocokList = periodeList;
    }

    if (!cocokList.length) return { status: 'BELUM_DIHITUNG', tanggalDibayar: '-', raw: null };

    // Prioritas status: kalau sudah ada DIBAYAR pada minggu ini, kartu harus LUNAS.
    const dibayar = cocokList.find(g => isStatusDibayar(g.status));
    const pending = cocokList.find(g => normalStatusSopwana(g.status) === 'PENDING');
    const menunggu = cocokList.find(g => normalStatusSopwana(g.status) === 'MENUNGGU_JADWAL');
    const pilihan = dibayar || pending || menunggu || cocokList[0];

    return {
        status: isStatusDibayar(pilihan.status) ? 'DIBAYAR' : normalStatusSopwana(pilihan.status),
        tanggalDibayar: pilihan.tanggalDibayar ?? pilihan.tanggal_dibayar ?? '-',
        raw: pilihan
    };
}

function groupRiwayatValidPerPekerjaMinggu(riwayatList, pekerjaId, start, end) {
    return (riwayatList || []).filter(x => {
        const xid = x.pekerjaId ?? x.idPekerja ?? x.id_pekerja;
        const status = normalStatusSopwana(x.statusValidasi ?? x.status_validasi);
        return String(xid) === String(pekerjaId)
            && status === 'VALID'
            && isDalamPeriode(x.tanggal, start, end);
    });
}

function renderDetailMingguanPemilik(hasilMingguIni) {
    if (!hasilMingguIni.length) return rowEmpty(6, 'Belum ada penyerahan VALID pada minggu ini');
    return hasilMingguIni.map(x => {
        const tgl = parseTanggalSopwana(x.tanggal);
        const hari = tgl ? new Intl.DateTimeFormat('id-ID', { weekday: 'long' }).format(tgl) : '-';
        return `
            <tr>
                <td>${safe(x.tanggal ?? '-')}</td>
                <td>${safe(hari)}</td>
                <td>${safe(x.idHasil ?? x.id_hasil ?? '-')}</td>
                <td>${fmtNumber(x.jumlahBal ?? x.jumlah_bal ?? 0)} bal</td>
                <td>${fmtNumber(x.jumlahIkat ?? x.jumlah_ikat ?? 0)} ikat</td>
                <td>${badge(x.statusValidasi ?? x.status_validasi ?? 'VALID')}</td>
            </tr>
        `;
    }).join('');
}

function renderKartuGajiPemilik(p, hasilMingguIni, payrollInfo, periodeText, canPayByDate) {
    const idPekerja = p.idPekerja ?? p.id_pekerja ?? p.id ?? '-';
    const namaPekerja = p.nama ?? p.namaPekerja ?? p.nama_pekerja ?? `ID ${idPekerja}`;
    const totalIkat = hasilMingguIni.reduce((sum, x) => sum + Number(x.jumlahIkat ?? x.jumlah_ikat ?? 0), 0);
    const totalBal = hasilMingguIni.reduce((sum, x) => sum + Number(x.jumlahBal ?? x.jumlah_bal ?? 0), 0);
    const jumlahTransaksi = hasilMingguIni.length;
    const totalUpah = totalIkat * 1000;
    const status = totalIkat > 0 ? payrollInfo.status : 'BELUM_ADA_KERJA_VALID';

    let aksi = '<small>Belum ada hasil VALID minggu ini</small>';
    let info = 'Data gaji akan muncul setelah ada hasil kemas yang divalidasi VALID.';

    if (totalIkat > 0 && isStatusDibayar(status)) {
        aksi = '<span class="badge dibayar">LUNAS / DIARSIPKAN</span>';
        info = 'Gaji minggu ini sudah dibayar. Riwayatnya masuk arsip upah.';
    } else if (totalIkat > 0) {
        const disabledInfo = canPayByDate ? '' : '<small class="muted-note">Catatan: secara aturan gaji dibayar setelah minggu kerja selesai. Untuk testing UAS, tombol tetap disediakan.</small>';
        aksi = `
            <div class="actions-row">
                <button class="btn btn-warning" onclick="siapkanPendingGaji(${idPekerja}, ${totalIkat})">Jadikan Pending</button>
                <button class="btn btn-primary" onclick="bayarMingguan(${idPekerja}, ${totalIkat})">Konfirmasi Bayar</button>
            </div>
            ${disabledInfo}
        `;
        info = 'Hasil VALID minggu ini sudah digabung dalam satu form. Setelah akhir minggu, klik Jadikan Pending lalu Konfirmasi Bayar.';
    }

    return `
        <article class="payroll-worker-card">
            <div class="payroll-worker-head">
                <div>
                    <small>Rekap Gaji Mingguan Pekerja</small>
                    <h3>${safe(namaPekerja)}</h3>
                    <p>ID Pekerja: <b>${safe(idPekerja)}</b> · Periode Minggu Ini: <b>${safe(periodeText)}</b></p>
                </div>
                <div>${badge(status)}</div>
            </div>

            <div class="payroll-summary-grid">
                <div><span>Penyerahan VALID</span><b>${fmtNumber(jumlahTransaksi)}</b></div>
                <div><span>Total Bal</span><b>${fmtNumber(totalBal)} bal</b></div>
                <div><span>Total Ikat VALID</span><b>${fmtNumber(totalIkat)} ikat</b></div>
                <div><span>Total Upah</span><b>${fmtRupiah(totalUpah)}</b></div>
            </div>

            <div class="payroll-info-note">${safe(info)}</div>

            <div class="table-wrap mini-table">
                <table>
                    <thead>
                        <tr>
                            <th>Periode</th>
                            <th>Status Payroll</th>
                            <th>Tanggal Bayar</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${safe(periodeText)}</td>
                            <td>${badge(status)}</td>
                            <td>${safe(payrollInfo.tanggalDibayar)}</td>
                            <td>${aksi}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h4 class="mini-title">Detail hasil kerja VALID selama 1 minggu</h4>
            <div class="table-wrap mini-table">
                <table>
                    <thead>
                        <tr>
                            <th>Tanggal</th>
                            <th>Hari</th>
                            <th>ID Hasil</th>
                            <th>Bal Diambil</th>
                            <th>Ikat Diserahkan</th>
                            <th>Validasi</th>
                        </tr>
                    </thead>
                    <tbody>${renderDetailMingguanPemilik(hasilMingguIni)}</tbody>
                </table>
            </div>
        </article>
    `;
}

async function renderArsipUpahPemilik(pekerjaList) {
    const hasil = [];
    const all = await Promise.allSettled(pekerjaList.map(p => {
        const id = p.idPekerja ?? p.id_pekerja ?? p.id;
        return apiGet(`${CONFIG.PAYROLL_BASE_URL}/transaksi/riwayat-mingguan/pekerja/${id}`).then(data => ({ pekerja: p, data }));
    }));

    all.forEach(r => {
        if (r.status !== 'fulfilled' || !Array.isArray(r.value.data)) return;
        const p = r.value.pekerja;
        const nama = p.nama ?? '-';
        const id = p.idPekerja ?? p.id_pekerja ?? p.id ?? '-';
        r.value.data.forEach(g => {
            if (!isStatusDibayar(g.status)) return;
            hasil.push({ id, nama, g });
        });
    });

    if (!hasil.length) {
        return '<div class="weekly-empty">Belum ada arsip upah yang sudah dibayar.</div>';
    }

    return `
        <div class="table-wrap mini-table">
            <table>
                <thead>
                    <tr>
                        <th>ID Pekerja</th>
                        <th>Nama</th>
                        <th>Periode</th>
                        <th>Total Ikat</th>
                        <th>Total Upah</th>
                        <th>Status</th>
                        <th>Tanggal Bayar</th>
                    </tr>
                </thead>
                <tbody>
                    ${hasil.map(x => `
                        <tr>
                            <td>${safe(x.id)}</td>
                            <td>${safe(x.nama)}</td>
                            <td>${safe(x.g.periode ?? `${x.g.tanggalAwal ?? '-'} s/d ${x.g.tanggalAkhir ?? '-'}`)}</td>
                            <td>${fmtNumber(x.g.totalIkat ?? x.g.total_ikat ?? 0)} ikat</td>
                            <td>${fmtRupiah(x.g.totalUpah ?? x.g.total_upah ?? 0)}</td>
                            <td>${badge(x.g.status ?? 'DIBAYAR')}</td>
                            <td>${safe(x.g.tanggalDibayar ?? x.g.tanggal_dibayar ?? '-')}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

async function loadPendingGaji() {
    const container = document.getElementById('rekapGajiList');

    try {
        const [pekerjaRes, riwayatRes, payrollRes] = await Promise.allSettled([
            apiGet(`${CONFIG.PAYROLL_BASE_URL}/pekerja/semua`),
            apiGet(`${CONFIG.PRODUCTION_BASE_URL}/kerja/riwayat`),
            apiGet(`${CONFIG.PAYROLL_BASE_URL}/transaksi/rekap-mingguan`)
        ]);

        const pekerjaList = pekerjaRes.status === 'fulfilled' && Array.isArray(pekerjaRes.value) ? pekerjaRes.value : [];
        const riwayatList = riwayatRes.status === 'fulfilled' && Array.isArray(riwayatRes.value) ? riwayatRes.value : [];
        const payrollList = payrollRes.status === 'fulfilled' && Array.isArray(payrollRes.value) ? payrollRes.value : [];

        const { start, end } = getPeriodeMingguSekarang();
        const periodeText = `${dateKeySopwana(start)} s/d ${dateKeySopwana(end)}`;
        const canPay = mingguSelesai(end);

        const totalPending = document.getElementById('totalPending');
        if (totalPending) {
            totalPending.textContent = payrollList.filter(g => normalStatusSopwana(g.status) === 'PENDING').length;
        }

        if (!container) return;

        if (!pekerjaList.length) {
            container.innerHTML = `<div class="empty-payroll">Belum ada pekerja terdaftar.</div>`;
            return;
        }

        const currentCards = pekerjaList.map(p => {
            const idPekerja = p.idPekerja ?? p.id_pekerja ?? p.id ?? '-';
            const hasilMingguIni = groupRiwayatValidPerPekerjaMinggu(riwayatList, idPekerja, start, end);
            const payrollInfo = statusPayrollDariList(payrollList, idPekerja, start, end);
            return renderKartuGajiPemilik(p, hasilMingguIni, payrollInfo, periodeText, canPay);
        }).join('');

        container.innerHTML = `
            <div class="payroll-section-title">
                <h3>Penggajian Minggu Berjalan</h3>
                <p>Semua hasil kerja VALID pekerja digabung per minggu. Gaji idealnya dibayar setelah periode minggu selesai.</p>
            </div>
            ${currentCards}
            <div class="divider"></div>
            <div class="payroll-section-title">
                <h3>Arsip Upah yang Sudah Dibayar</h3>
                <p>Data minggu yang sudah dibayar otomatis dianggap arsip upah.</p>
            </div>
            <div id="arsipUpahPemilik"><div class="weekly-empty">Memuat arsip upah...</div></div>
        `;

        const arsipContainer = document.getElementById('arsipUpahPemilik');
        if (arsipContainer) {
            arsipContainer.innerHTML = await renderArsipUpahPemilik(pekerjaList);
        }

        if (riwayatRes.status === 'rejected') {
            toast('Riwayat kerja belum bisa dimuat, rekap tampil tanpa detail kerja: ' + riwayatRes.reason.message, 'error');
        }
        if (payrollRes.status === 'rejected') {
            toast('Status payroll belum bisa dimuat, rekap tampil dari data kerja saja: ' + payrollRes.reason.message, 'error');
        }

    } catch (err) {
        if (container) container.innerHTML = `<div class="empty-payroll error">${safe(err.message || 'Gagal memuat rekap gaji mingguan')}</div>`;
        toast('Gagal memuat rekap gaji mingguan: ' + (err.message || 'Endpoint error'), 'error');
    }
}

async function siapkanPendingGaji(idPekerja, totalIkat = 0) {
    if (!idPekerja || idPekerja === '-') {
        toast('ID pekerja tidak valid', 'error');
        return;
    }

    const { end } = getPeriodeMingguSekarang();
    if (!isMingguKerjaSelesai(end)) {
        toast('Gaji belum bisa dijadikan PENDING karena minggu kerja belum selesai. Data upah sementara tetap tersimpan.', 'error');
        return;
    }

    try {
        await apiPut(`${CONFIG.PAYROLL_BASE_URL}/transaksi/siapkan-pending/${idPekerja}?totalIkat=${encodeURIComponent(totalIkat || 0)}`);
        toast('Gaji pekerja berhasil dijadikan PENDING');
        await Promise.allSettled([loadPendingGaji(), loadDashboard()]);
    } catch (err) {
        toast(err.message, 'error');
    }
}

async function bayarMingguan(idPekerja, totalIkat = 0) {
    if (!idPekerja || idPekerja === '-') {
        toast('ID pekerja tidak valid', 'error');
        return;
    }

    const { end } = getPeriodeMingguSekarang();
    if (!isMingguKerjaSelesai(end)) {
        toast('Gaji belum bisa dibayar karena periode minggu ini belum selesai. Upah sementara tetap tersimpan dan akan bertambah jika ada setoran VALID lagi.', 'error');
        return;
    }

    if (!confirm('Konfirmasi gaji minggu ini sudah dibayarkan kepada pekerja? Setelah dibayar, slip gaji otomatis dikirim ke email pekerja.')) return;

    try {
        await apiPut(`${CONFIG.PAYROLL_BASE_URL}/transaksi/bayar-mingguan/${idPekerja}?totalIkat=${encodeURIComponent(totalIkat || 0)}`);
        toast('Pembayaran berhasil. Status menjadi DIBAYAR, masuk arsip upah, dan slip gaji dikirim ke email pekerja.');

        await Promise.allSettled([
            loadPendingGaji(),
            loadDashboard(),
            loadRiwayatKerja()
        ]);

    } catch (err) {
        toast(err.message, 'error');
    }
}

async function downloadProductionExcel() {
    try {
        const periode = getPeriodeMingguIniLabel();
        await downloadFile(
            `${CONFIG.PRODUCTION_BASE_URL}/laporan/download-excel/minggu-ini`,
            `laporan_production_sopwana_${periode}.xlsx`
        );

        toast('Excel production minggu ini berhasil diunduh');

    } catch (err) {
        toast(err.message, 'error');
    }
}

async function downloadPayrollExcel() {
    try {
        const periode = getPeriodeMingguIniLabel();
        await downloadFile(
            `${CONFIG.PAYROLL_BASE_URL}/gaji/download-excel/minggu-ini`,
            `laporan_penggajian_sopwana_${periode}.xlsx`
        );

        toast('Excel payroll minggu ini berhasil diunduh');

    } catch (err) {
        toast(err.message, 'error');
    }
}

function getPeriodeMingguIniLabel() {
    const today = new Date();
    const day = today.getDay();
    const start = new Date(today);
    start.setDate(today.getDate() - day);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    const fmt = (d) => d.toISOString().slice(0, 10);
    return `${fmt(start)}_sd_${fmt(end)}`;
}

/* =========================================================
   FINAL FIX: Penggajian + Arsip Upah Pemilik yang stabil
   - Tidak mengubah database
   - Semua pekerja tetap tampil
   - Gaji DIBAYAR otomatis masuk arsip
========================================================= */
function safeTanggalBayarSopwana(item) {
    return item?.tanggalDibayar ?? item?.tanggal_dibayar ?? '-';
}

function isPayrollInPeriodePemilik(g, start, end) {
    if (!g) return false;
    const startKey = dateKeySopwana(start);
    const endKey = dateKeySopwana(end);
    const awal = String(g.tanggalAwal ?? g.tanggal_awal ?? '');
    const akhir = String(g.tanggalAkhir ?? g.tanggal_akhir ?? '');
    const periode = String(g.periode ?? '');
    const tanggal = g.tanggal ?? g.tanggal_penggajian;
    const tanggalBayar = g.tanggalDibayar ?? g.tanggal_dibayar;

    if (awal.startsWith(startKey) || akhir.startsWith(endKey)) return true;
    if (periode.includes(startKey) || periode.includes(endKey)) return true;
    if (tanggal && isDalamPeriode(tanggal, start, end)) return true;
    if (tanggalBayar && isDalamPeriode(tanggalBayar, start, end)) return true;
    return false;
}

function getPayrollInfoPemilik(payrollList, idPekerja, start, end, totalIkatValid = 0) {
    let list = (payrollList || []).filter(g => String(g.pekerjaId ?? g.idPekerja ?? g.id_pekerja ?? '') === String(idPekerja));
    const periodeList = list.filter(g => isPayrollInPeriodePemilik(g, start, end));
    if (periodeList.length) list = periodeList;

    // Fallback: kalau periode response backend lama kurang cocok, ambil payroll yang total ikatnya sama.
    if (!periodeList.length && totalIkatValid > 0) {
        const byIkat = list.filter(g => Number(g.totalIkat ?? g.total_ikat ?? 0) === Number(totalIkatValid));
        if (byIkat.length) list = byIkat;
    }

    if (!list.length) return { status: 'BELUM_DIHITUNG', tanggalDibayar: '-', raw: null };

    const dibayar = list.find(g => isStatusDibayar(g.status));
    const pending = list.find(g => normalStatusSopwana(g.status) === 'PENDING');
    const menunggu = list.find(g => normalStatusSopwana(g.status) === 'MENUNGGU_JADWAL');
    const pilihan = dibayar || pending || menunggu || list[0];

    return {
        status: isStatusDibayar(pilihan.status) ? 'DIBAYAR' : normalStatusSopwana(pilihan.status),
        tanggalDibayar: safeTanggalBayarSopwana(pilihan),
        raw: pilihan
    };
}

function renderKartuGajiPemilikFinal(p, hasilMingguIni, payrollInfo, periodeText, start, end, mode = 'aktif') {
    const idPekerja = p.idPekerja ?? p.id_pekerja ?? p.id ?? '-';
    const namaPekerja = p.nama ?? p.namaPekerja ?? p.nama_pekerja ?? `ID ${idPekerja}`;
    const totalIkat = hasilMingguIni.reduce((sum, x) => sum + Number(x.jumlahIkat ?? x.jumlah_ikat ?? 0), 0);
    const totalBal = hasilMingguIni.reduce((sum, x) => sum + Number(x.jumlahBal ?? x.jumlah_bal ?? 0), 0);
    const jumlahTransaksi = hasilMingguIni.length;
    const totalUpah = totalIkat * 1000;
    const paid = totalIkat > 0 && isStatusDibayar(payrollInfo.status);
    const mingguSelesai = isMingguKerjaSelesai(end);

    let status = 'BELUM_ADA_KERJA_VALID';
    if (totalIkat > 0) {
        status = paid ? 'DIBAYAR' : (mingguSelesai ? normalStatusSopwana(payrollInfo.status) : 'MENUNGGU_AKHIR_MINGGU');
        if (status === 'BELUM_DIHITUNG') status = mingguSelesai ? 'SIAP_DIHITUNG' : 'MENUNGGU_AKHIR_MINGGU';
    }

    let aksi = '<small>Belum ada hasil VALID minggu ini</small>';
    let info = 'Data gaji akan muncul setelah hasil kemas divalidasi VALID oleh pemilik.';

    if (totalIkat > 0 && paid) {
        aksi = '<span class="badge dibayar">LUNAS / MASUK ARSIP</span>';
        info = 'Gaji minggu ini sudah dibayar. Slip otomatis dikirim ke email pekerja dan riwayat upah masuk arsip.';
    } else if (totalIkat > 0 && !mingguSelesai) {
        aksi = '<span class="badge warning">BELUM BISA DIBAYAR</span>';
        info = 'Upah sementara tersimpan dan terus bertambah jika ada setoran VALID berikutnya. Pembayaran baru bisa dilakukan setelah periode minggu kerja selesai.';
    } else if (totalIkat > 0) {
        aksi = `
            <div class="actions-row">
                <button class="btn btn-warning" onclick="siapkanPendingGaji(${idPekerja}, ${totalIkat})">Jadikan Pending</button>
                <button class="btn btn-primary" onclick="bayarMingguan(${idPekerja}, ${totalIkat})">Konfirmasi Bayar</button>
            </div>
            <small class="muted-note">Periode sudah selesai. Setelah dibayar, slip gaji otomatis dikirim ke email pekerja.</small>
        `;
        info = 'Hasil VALID selama satu minggu sudah digabung dalam satu form. Silakan jadikan PENDING lalu konfirmasi bayar.';
    }

    return `
        <article class="payroll-worker-card ${paid || mode === 'arsip' ? 'is-paid-card' : ''}">
            <div class="payroll-worker-head">
                <div>
                    <small>${paid || mode === 'arsip' ? 'Arsip Gaji Mingguan Pekerja' : 'Rekap Gaji Mingguan Pekerja'}</small>
                    <h3>${safe(namaPekerja)}</h3>
                    <p>ID Pekerja: <b>${safe(idPekerja)}</b> · Periode: <b>${safe(periodeText)}</b></p>
                </div>
                <div>${badge(status)}</div>
            </div>

            <div class="payroll-summary-grid">
                <div><span>Penyerahan VALID</span><b>${fmtNumber(jumlahTransaksi)}</b></div>
                <div><span>Total Bal</span><b>${fmtNumber(totalBal)} bal</b></div>
                <div><span>Total Ikat VALID</span><b>${fmtNumber(totalIkat)} ikat</b></div>
                <div><span>Total Upah Sementara</span><b>${fmtRupiah(totalUpah)}</b></div>
            </div>

            <div class="payroll-info-note">${safe(info)}</div>

            <div class="table-wrap mini-table">
                <table>
                    <thead>
                        <tr><th>Periode</th><th>Status Payroll</th><th>Tanggal Bayar</th><th>Aksi</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${safe(periodeText)}</td>
                            <td>${badge(status)}</td>
                            <td>${safe(payrollInfo.tanggalDibayar)}</td>
                            <td>${aksi}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h4 class="mini-title">Detail hasil kerja VALID selama 1 minggu</h4>
            <div class="table-wrap mini-table">
                <table>
                    <thead>
                        <tr><th>Tanggal</th><th>Hari</th><th>ID Hasil</th><th>Bal Diambil</th><th>Ikat Diserahkan</th><th>Validasi</th></tr>
                    </thead>
                    <tbody>${renderDetailMingguanPemilik(hasilMingguIni)}</tbody>
                </table>
            </div>
        </article>
    `;
}

async function renderArsipUpahPemilikFinal(pekerjaList, riwayatList, payrollList, currentPaidCards = []) {
    const arsipCards = [...currentPaidCards];
    const hasil = [];

    const all = await Promise.allSettled(pekerjaList.map(p => {
        const id = p.idPekerja ?? p.id_pekerja ?? p.id;
        return apiGet(`${CONFIG.PAYROLL_BASE_URL}/transaksi/riwayat-mingguan/pekerja/${id}`).then(data => ({ pekerja: p, data }));
    }));

    all.forEach(r => {
        if (r.status !== 'fulfilled' || !Array.isArray(r.value.data)) return;
        const p = r.value.pekerja;
        const nama = p.nama ?? '-';
        const id = p.idPekerja ?? p.id_pekerja ?? p.id ?? '-';
        r.value.data.forEach(g => {
            if (!isStatusDibayar(g.status)) return;
            hasil.push({ id, nama, g });
        });
    });

    const tabelArsip = hasil.length ? `
        <div class="table-wrap mini-table archive-table">
            <table>
                <thead>
                    <tr><th>ID Pekerja</th><th>Nama</th><th>Periode</th><th>Total Ikat</th><th>Total Upah</th><th>Status</th><th>Tanggal Bayar</th></tr>
                </thead>
                <tbody>
                    ${hasil.map(x => `
                        <tr>
                            <td>${safe(x.id)}</td>
                            <td>${safe(x.nama)}</td>
                            <td>${safe(x.g.periode ?? `${x.g.tanggalAwal ?? '-'} s/d ${x.g.tanggalAkhir ?? '-'}`)}</td>
                            <td>${fmtNumber(x.g.totalIkat ?? x.g.total_ikat ?? 0)} ikat</td>
                            <td>${fmtRupiah(x.g.totalUpah ?? x.g.total_upah ?? 0)}</td>
                            <td>${badge(x.g.status ?? 'DIBAYAR')}</td>
                            <td>${safe(x.g.tanggalDibayar ?? x.g.tanggal_dibayar ?? '-')}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>` : '<div class="weekly-empty">Belum ada arsip upah yang sudah dibayar.</div>';

    return `
        ${arsipCards.length ? `<div class="archive-card-grid">${arsipCards.join('')}</div>` : ''}
        ${tabelArsip}
    `;
}

async function loadPendingGaji() {
    const container = document.getElementById('rekapGajiList');

    try {
        const [pekerjaRes, riwayatRes, payrollRes] = await Promise.allSettled([
            apiGet(`${CONFIG.PAYROLL_BASE_URL}/pekerja/semua`),
            apiGet(`${CONFIG.PRODUCTION_BASE_URL}/kerja/riwayat`),
            apiGet(`${CONFIG.PAYROLL_BASE_URL}/transaksi/rekap-mingguan`)
        ]);

        const pekerjaList = pekerjaRes.status === 'fulfilled' && Array.isArray(pekerjaRes.value) ? pekerjaRes.value : [];
        const riwayatList = riwayatRes.status === 'fulfilled' && Array.isArray(riwayatRes.value) ? riwayatRes.value : [];
        const payrollList = payrollRes.status === 'fulfilled' && Array.isArray(payrollRes.value) ? payrollRes.value : [];

        const { start, end } = getPeriodeMingguSekarang();
        const periodeText = `${dateKeySopwana(start)} s/d ${dateKeySopwana(end)}`;

        const totalPending = document.getElementById('totalPending');
        if (totalPending) totalPending.textContent = payrollList.filter(g => normalStatusSopwana(g.status) === 'PENDING').length;

        if (!container) return;
        if (!pekerjaList.length) {
            container.innerHTML = `<div class="empty-payroll">Belum ada pekerja terdaftar.</div>`;
            return;
        }

        const aktifCards = [];
        const arsipCards = [];

        pekerjaList.forEach(p => {
            const idPekerja = p.idPekerja ?? p.id_pekerja ?? p.id ?? '-';
            const hasilMingguIni = groupRiwayatValidPerPekerjaMinggu(riwayatList, idPekerja, start, end);
            const totalIkat = hasilMingguIni.reduce((sum, x) => sum + Number(x.jumlahIkat ?? x.jumlah_ikat ?? 0), 0);
            const payrollInfo = getPayrollInfoPemilik(payrollList, idPekerja, start, end, totalIkat);
            const paid = totalIkat > 0 && isStatusDibayar(payrollInfo.status);
            const card = renderKartuGajiPemilikFinal(p, hasilMingguIni, payrollInfo, periodeText, start, end, paid ? 'arsip' : 'aktif');
            if (paid) arsipCards.push(card);
            else aktifCards.push(card);
        });

        container.innerHTML = `
            <div class="payroll-hero">
                <div>
                    <span class="eyebrow">Penggajian Mingguan</span>
                    <h3>Minggu Berjalan</h3>
                    <p>Semua hasil kerja VALID digabung per pekerja selama 1 minggu. Jika sudah dibayar, otomatis masuk arsip.</p>
                </div>
                <div class="period-pill">${safe(periodeText)}</div>
            </div>
            <div class="payroll-worker-list">${aktifCards.join('')}</div>
            <div class="divider"></div>
            <div class="payroll-hero archive-hero">
                <div>
                    <span class="eyebrow">Arsip Upah</span>
                    <h3>Upah yang Sudah Dibayar</h3>
                    <p>Data status DIBAYAR/LUNAS muncul di sini supaya tidak bercampur dengan gaji minggu berjalan.</p>
                </div>
            </div>
            <div id="arsipUpahPemilik"><div class="weekly-empty">Memuat arsip upah...</div></div>
        `;

        const arsipContainer = document.getElementById('arsipUpahPemilik');
        if (arsipContainer) arsipContainer.innerHTML = await renderArsipUpahPemilikFinal(pekerjaList, riwayatList, payrollList, arsipCards);

        if (riwayatRes.status === 'rejected') toast('Riwayat kerja belum bisa dimuat: ' + riwayatRes.reason.message, 'error');
        if (payrollRes.status === 'rejected') toast('Status payroll belum bisa dimuat: ' + payrollRes.reason.message, 'error');
    } catch (err) {
        if (container) container.innerHTML = `<div class="empty-payroll error">${safe(err.message || 'Gagal memuat rekap gaji mingguan')}</div>`;
        toast('Gagal memuat rekap gaji mingguan: ' + (err.message || 'Endpoint error'), 'error');
    }
}


/* =========================================================
   ARSIP CLEANUP UI FIX
   - Arsip yang sudah banyak bisa disembunyikan dari tampilan
   - Tidak menghapus database, supaya data laporan tetap aman
   - Bisa reset/tampilkan kembali arsip tersembunyi
========================================================= */
function arsipStorageKey(scope) {
    return `sopwana_hidden_archive_${scope}`;
}

function getHiddenArsip(scope) {
    try {
        return new Set(JSON.parse(localStorage.getItem(arsipStorageKey(scope)) || '[]'));
    } catch (e) {
        return new Set();
    }
}

function setHiddenArsip(scope, key) {
    const data = getHiddenArsip(scope);
    data.add(String(key));
    localStorage.setItem(arsipStorageKey(scope), JSON.stringify([...data]));
}

function resetHiddenArsip(scope) {
    localStorage.removeItem(arsipStorageKey(scope));
}

function hideArsipItem(scope, key, reloadName) {
    if (!confirm('Sembunyikan arsip ini dari tampilan? Data di database tetap aman.')) return;
    setHiddenArsip(scope, key);
    toast('Arsip disembunyikan dari tampilan.');
    if (reloadName && typeof window[reloadName] === 'function') window[reloadName]();
}

function resetArsipTersembunyi(scope, reloadName) {
    if (!confirm('Tampilkan kembali semua arsip yang pernah disembunyikan?')) return;
    resetHiddenArsip(scope);
    toast('Arsip tersembunyi ditampilkan kembali.');
    if (reloadName && typeof window[reloadName] === 'function') window[reloadName]();
}

function archiveToolbar(scope, reloadName, title = 'Kelola Arsip') {
    const hidden = getHiddenArsip(scope).size;
    return `
        <div class="archive-toolbar">
            <div>
                <b>${safe(title)}</b>
                <small>${hidden ? `${hidden} arsip disembunyikan dari tampilan.` : 'Arsip lama bisa discroll atau disembunyikan agar tampilan tidak penuh.'}</small>
            </div>
            <button class="btn btn-soft btn-small" onclick="resetArsipTersembunyi('${scope}', '${reloadName}')">Tampilkan Semua Arsip</button>
        </div>
    `;
}

function ownerPaidArchiveKey(idPekerja, periodeText, totalIkat, tanggalBayar) {
    return `owner-upah:${idPekerja}:${periodeText}:${totalIkat}:${tanggalBayar || '-'}`;
}

function payrollArchiveRowKey(id, g) {
    const periode = g.periode ?? `${g.tanggalAwal ?? g.tanggal_awal ?? '-'}_${g.tanggalAkhir ?? g.tanggal_akhir ?? '-'}`;
    const totalIkat = g.totalIkat ?? g.total_ikat ?? 0;
    const bayar = g.tanggalDibayar ?? g.tanggal_dibayar ?? '-';
    return `owner-payroll-row:${id}:${periode}:${totalIkat}:${bayar}`;
}

async function renderArsipUpahPemilikFinal(pekerjaList, riwayatList, payrollList, currentPaidCards = []) {
    const scope = 'pemilik_upah';
    const hidden = getHiddenArsip(scope);
    const hasil = [];

    const all = await Promise.allSettled(pekerjaList.map(p => {
        const id = p.idPekerja ?? p.id_pekerja ?? p.id;
        return apiGet(`${CONFIG.PAYROLL_BASE_URL}/transaksi/riwayat-mingguan/pekerja/${id}`).then(data => ({ pekerja: p, data }));
    }));

    all.forEach(r => {
        if (r.status !== 'fulfilled' || !Array.isArray(r.value.data)) return;
        const p = r.value.pekerja;
        const nama = p.nama ?? '-';
        const id = p.idPekerja ?? p.id_pekerja ?? p.id ?? '-';
        r.value.data.forEach(g => {
            if (!isStatusDibayar(g.status)) return;
            const key = payrollArchiveRowKey(id, g);
            if (hidden.has(key)) return;
            hasil.push({ id, nama, g, key });
        });
    });

    const cards = currentPaidCards.filter(x => !hidden.has(x.key)).map(x => `
        <div class="archive-item">
            <div class="archive-clean-actions">
                <button class="btn btn-danger btn-small" onclick="hideArsipItem('${scope}', '${x.key}', 'loadPendingGaji')">Sembunyikan Arsip</button>
            </div>
            ${x.html}
        </div>
    `);

    const tabelArsip = hasil.length ? `
        <div class="table-wrap mini-table archive-table archive-scroll-list">
            <table>
                <thead>
                    <tr><th>ID Pekerja</th><th>Nama</th><th>Periode</th><th>Total Ikat</th><th>Total Upah</th><th>Status</th><th>Tanggal Bayar</th><th>Aksi</th></tr>
                </thead>
                <tbody>
                    ${hasil.map(x => `
                        <tr>
                            <td>${safe(x.id)}</td>
                            <td>${safe(x.nama)}</td>
                            <td>${safe(x.g.periode ?? `${x.g.tanggalAwal ?? x.g.tanggal_awal ?? '-'} s/d ${x.g.tanggalAkhir ?? x.g.tanggal_akhir ?? '-'}`)}</td>
                            <td>${fmtNumber(x.g.totalIkat ?? x.g.total_ikat ?? 0)} ikat</td>
                            <td>${fmtRupiah(x.g.totalUpah ?? x.g.total_upah ?? 0)}</td>
                            <td>${badge(x.g.status ?? 'DIBAYAR')}</td>
                            <td>${safe(x.g.tanggalDibayar ?? x.g.tanggal_dibayar ?? '-')}</td>
                            <td><button class="btn btn-danger btn-small" onclick="hideArsipItem('${scope}', '${x.key}', 'loadPendingGaji')">Sembunyikan</button></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>` : '<div class="weekly-empty">Belum ada arsip upah yang sudah dibayar atau semua arsip sedang disembunyikan.</div>';

    return `
        ${archiveToolbar(scope, 'loadPendingGaji', 'Arsip Upah Pemilik')}
        <div class="archive-scroll-list archive-card-scroll">
            ${cards.length ? `<div class="archive-card-grid">${cards.join('')}</div>` : ''}
            ${tabelArsip}
        </div>
    `;
}

async function loadPendingGaji() {
    const container = document.getElementById('rekapGajiList');

    try {
        const [pekerjaRes, riwayatRes, payrollRes] = await Promise.allSettled([
            apiGet(`${CONFIG.PAYROLL_BASE_URL}/pekerja/semua`),
            apiGet(`${CONFIG.PRODUCTION_BASE_URL}/kerja/riwayat`),
            apiGet(`${CONFIG.PAYROLL_BASE_URL}/transaksi/rekap-mingguan`)
        ]);

        const pekerjaList = pekerjaRes.status === 'fulfilled' && Array.isArray(pekerjaRes.value) ? pekerjaRes.value : [];
        const riwayatList = riwayatRes.status === 'fulfilled' && Array.isArray(riwayatRes.value) ? riwayatRes.value : [];
        const payrollList = payrollRes.status === 'fulfilled' && Array.isArray(payrollRes.value) ? payrollRes.value : [];

        const { start, end } = getPeriodeMingguSekarang();
        const periodeText = `${dateKeySopwana(start)} s/d ${dateKeySopwana(end)}`;

        const totalPending = document.getElementById('totalPending');
        if (totalPending) totalPending.textContent = payrollList.filter(g => normalStatusSopwana(g.status) === 'PENDING').length;

        if (!container) return;
        if (!pekerjaList.length) {
            container.innerHTML = `<div class="empty-payroll">Belum ada pekerja terdaftar.</div>`;
            return;
        }

        const aktifCards = [];
        const arsipCards = [];

        pekerjaList.forEach(p => {
            const idPekerja = p.idPekerja ?? p.id_pekerja ?? p.id ?? '-';
            const hasilMingguIni = groupRiwayatValidPerPekerjaMinggu(riwayatList, idPekerja, start, end);
            const totalIkat = hasilMingguIni.reduce((sum, x) => sum + Number(x.jumlahIkat ?? x.jumlah_ikat ?? 0), 0);
            const payrollInfo = getPayrollInfoPemilik(payrollList, idPekerja, start, end, totalIkat);
            const paid = totalIkat > 0 && isStatusDibayar(payrollInfo.status);
            const html = renderKartuGajiPemilikFinal(p, hasilMingguIni, payrollInfo, periodeText, start, end, paid ? 'arsip' : 'aktif');
            if (paid) arsipCards.push({ key: ownerPaidArchiveKey(idPekerja, periodeText, totalIkat, payrollInfo.tanggalDibayar), html });
            else aktifCards.push(html);
        });

        container.innerHTML = `
            <div class="payroll-hero">
                <div>
                    <span class="eyebrow">Penggajian Mingguan</span>
                    <h3>Minggu Berjalan</h3>
                    <p>Semua hasil kerja VALID digabung per pekerja selama 1 minggu. Jika sudah dibayar, otomatis masuk arsip.</p>
                </div>
                <div class="period-pill">${safe(periodeText)}</div>
            </div>
            <div class="payroll-worker-list">${aktifCards.join('')}</div>
            <div class="divider"></div>
            <div class="payroll-hero archive-hero">
                <div>
                    <span class="eyebrow">Arsip Upah</span>
                    <h3>Upah yang Sudah Dibayar</h3>
                    <p>Arsip lama bisa discroll dan bisa disembunyikan dari tampilan agar tidak menumpuk.</p>
                </div>
            </div>
            <div id="arsipUpahPemilik"><div class="weekly-empty">Memuat arsip upah...</div></div>
        `;

        const arsipContainer = document.getElementById('arsipUpahPemilik');
        if (arsipContainer) arsipContainer.innerHTML = await renderArsipUpahPemilikFinal(pekerjaList, riwayatList, payrollList, arsipCards);

        if (riwayatRes.status === 'rejected') toast('Riwayat kerja belum bisa dimuat: ' + riwayatRes.reason.message, 'error');
        if (payrollRes.status === 'rejected') toast('Status payroll belum bisa dimuat: ' + payrollRes.reason.message, 'error');
    } catch (err) {
        if (container) container.innerHTML = `<div class="empty-payroll error">${safe(err.message || 'Gagal memuat rekap gaji mingguan')}</div>`;
        toast('Gagal memuat rekap gaji mingguan: ' + (err.message || 'Endpoint error'), 'error');
    }
}

async function loadProduksiArsip() {
    const tbody = document.getElementById('tblProduksiArsip');
    if (!tbody) return;
    const scope = 'pemilik_produksi_arsip';
    const hidden = getHiddenArsip(scope);

    try {
        const data = await apiGet(`${CONFIG.PRODUCTION_BASE_URL}/produksi/arsip`);
        const list = (Array.isArray(data) ? data : []).filter(x => {
            const id = x.idProduksi ?? x.id_produksi ?? x.id ?? '-';
            return !hidden.has(`produksi:${id}`);
        });

        const table = tbody.closest('table');
        const head = table?.querySelector('thead tr');
        if (head && !head.innerHTML.includes('Aksi')) {
            head.innerHTML = '<th>ID</th><th>Tanggal</th><th>Jumlah Bal</th><th>Catatan</th><th>Status</th><th>Aksi</th>';
        }

        const wrap = table?.closest('.table-wrap');
        if (wrap) wrap.classList.add('archive-scroll-list');

        let toolbar = document.getElementById('produksiArchiveToolbar');
        if (!toolbar && wrap) {
            toolbar = document.createElement('div');
            toolbar.id = 'produksiArchiveToolbar';
            wrap.parentNode.insertBefore(toolbar, wrap);
        }
        if (toolbar) toolbar.innerHTML = archiveToolbar(scope, 'loadProduksiArsip', 'Arsip Produksi');

        tbody.innerHTML = list.length
            ? list.map(x => {
                const id = x.idProduksi ?? x.id_produksi ?? x.id ?? '-';
                return `
                    <tr>
                        <td>${safe(id)}</td>
                        <td>${safe(x.tanggal ?? '-')}</td>
                        <td>${fmtNumber(x.jumlahBal ?? x.jumlah_bal ?? 0)} bal</td>
                        <td>${safe(x.catatan ?? '-')}</td>
                        <td>${badge('DIARSIPKAN')}</td>
                        <td><button class="btn btn-danger btn-small" onclick="hideArsipItem('${scope}', 'produksi:${id}', 'loadProduksiArsip')">Sembunyikan</button></td>
                    </tr>
                `;
            }).join('')
            : rowEmpty(6, 'Belum ada arsip produksi bal atau semua arsip sedang disembunyikan.');
    } catch (err) {
        tbody.innerHTML = rowEmpty(6, err.message);
        toast('Gagal memuat arsip produksi: ' + err.message, 'error');
    }
}

requireAuth(['PEKERJA', 'PEMILIK', 'ADMIN']);

const TARIF_PER_IKAT = 1000;
const IKAT_PER_BAL = 10;

document.addEventListener('DOMContentLoaded', async () => {
    const profileName = document.getElementById('profileName');
    const profileRole = document.getElementById('profileRole');
    const pekerjaIdInput = document.getElementById('pekerjaIdInput');
    const manualBox = document.getElementById('manualPekerjaIdBox');

    if (profileName) {
        profileName.textContent = getUsername();
    }

    if (profileRole) {
        profileRole.textContent = getRole();
    }

    // Untuk role PEKERJA, ID pekerja WAJIB otomatis dari akun login.
    // Input manual disembunyikan supaya data tidak ketabrak ID pekerja lain.
    if (getRole() === 'PEKERJA') {
        if (manualBox) manualBox.classList.add('hidden');
        await loadPekerjaLoginOtomatis();
    } else {
        // Pemilik/Admin tetap bisa melihat input manual kalau membuka halaman pekerja untuk testing.
        if (manualBox) manualBox.classList.remove('hidden');
    }

    if (pekerjaIdInput) {
        pekerjaIdInput.value = getPekerjaId();
        pekerjaIdInput.readOnly = getRole() === 'PEKERJA';
    }

    updatePekerjaLabel();
    bindPekerjaForms();
    loadAllPekerja();
});

async function loadPekerjaLoginOtomatis() {
    try {
        const data = await apiGet(`${CONFIG.PAYROLL_BASE_URL}/pekerja/me`);
        const id = data.idPekerja ?? data.id_pekerja ?? data.pekerjaId;

        if (!id) {
            throw new Error('ID pekerja tidak ada pada response /pekerja/me');
        }

        setPekerjaId(id);
        sessionStorage.setItem('pekerjaNama', data.nama || getUsername());
        sessionStorage.setItem('pekerjaEmail', data.email || '');

        const profileName = document.getElementById('profileName');
        const pekerjaIdInput = document.getElementById('pekerjaIdInput');

        if (profileName) {
            profileName.textContent = data.nama || getUsername();
        }

        if (pekerjaIdInput) {
            pekerjaIdInput.value = id;
            pekerjaIdInput.readOnly = true;
        }

        updatePekerjaLabel();
    } catch (err) {
        // Jangan tampilkan input manual untuk pekerja. Lebih aman tampilkan pesan supaya relasi bisa diperbaiki.
        const label = document.getElementById('idPekerjaLabel');
        if (label) label.textContent = 'Belum terbaca';
        toast('ID pekerja otomatis belum terbaca: ' + err.message, 'error');
    }
}

function updatePekerjaLabel() {
    const label = document.getElementById('idPekerjaLabel');

    if (label) {
        label.textContent = getPekerjaId() || '-';
    }
}

function savePekerjaId() {
    if (getRole() === 'PEKERJA') {
        toast('ID pekerja otomatis dari akun login, tidak perlu input manual.', 'warning');
        return;
    }

    const input = document.getElementById('pekerjaIdInput');
    const id = input ? input.value : '';

    if (!id) {
        toast('ID pekerja wajib diisi', 'warning');
        return;
    }

    setPekerjaId(id);
    updatePekerjaLabel();
    toast('ID pekerja disimpan');
    loadAllPekerja();
}

function mustPekerjaId() {
    const id = getPekerjaId();

    if (!id) {
        toast('ID pekerja belum terbaca otomatis. Logout lalu login ulang. Jika masih gagal, cek relasi tbl_pekerja.user_id ke tbl_users.id_user.', 'warning');
        throw new Error('ID pekerja belum diisi');
    }

    return Number(id);
}

function bindPekerjaForms() {
    const formAmbil = document.getElementById('formAmbil');

    if (formAmbil) {
        formAmbil.addEventListener('submit', async e => {
            e.preventDefault();

            try {
                const pekerjaId = mustPekerjaId();

                const body = {
                    pekerjaId: pekerjaId,
                    jumlahBal: Number(document.getElementById('ambilJumlahBal').value),
                    plastik: Number(document.getElementById('ambilPlastik').value || 0),
                    label: Number(document.getElementById('ambilLabel').value || 0),
                    rafia: Number(document.getElementById('ambilRafia').value || 0)
                };

                const data = await apiPost(`${CONFIG.PRODUCTION_BASE_URL}/kerja/ambil-barang`, body);

                const idPengambilan = normalizeItemId(
                    data,
                    'idPengambilan',
                    'id_pengambilan',
                    'id'
                );

                if (idPengambilan) {
                    sessionStorage.setItem('lastPengambilanId', idPengambilan);
                    sessionStorage.setItem('lastPengambilanBal', String(body.jumlahBal));
                    sessionStorage.setItem('lastPengambilanWajibIkat', String(body.jumlahBal * 10));

                    const lastBox = document.getElementById('lastPengambilanBox');
                    const kemasInput = document.getElementById('kemasPengambilanId');

                    if (lastBox) {
                        lastBox.textContent = idPengambilan;
                    }

                    if (kemasInput) {
                        kemasInput.value = idPengambilan;
                    }
                }

                toast('Pengambilan barang berhasil');
                e.target.reset();

                await Promise.allSettled([
                    loadStok(),
                    loadRiwayatKerjaSaya(),
                    loadRiwayatUpahSaya()
                ]);

            } catch (err) {
                toast(err.message, 'error');
            }
        });
    }

    const formKemas = document.getElementById('formKemas');

    if (formKemas) {
        formKemas.addEventListener('submit', async e => {
            e.preventDefault();

            try {
                const pengambilanId = Number(document.getElementById('kemasPengambilanId').value);
                const jumlahIkat = Number(document.getElementById('kemasJumlahIkat').value);
                const pekerjaId = mustPekerjaId();

                const pengambilan = await apiGet(`${CONFIG.PRODUCTION_BASE_URL}/kerja/pengambilan/${pengambilanId}`);
                const pemilikPengambilan = Number(pengambilan.pekerjaId ?? pengambilan.pekerja_id ?? 0);
                const jumlahBal = Number(pengambilan.jumlahBal ?? pengambilan.jumlah_bal ?? 0);
                const wajibIkat = jumlahBal * 10;

                if (pemilikPengambilan !== Number(pekerjaId)) {
                    toast('ID pengambilan ini bukan milik akun pekerja yang sedang login.', 'error');
                    return;
                }

                if (jumlahIkat !== wajibIkat) {
                    toast(`${jumlahBal} bal wajib diserahkan menjadi ${wajibIkat} ikat. Isi jumlah ikat harus pas ${wajibIkat}.`, 'error');
                    return;
                }

                const body = {
                    pekerjaId: pekerjaId,
                    pengambilanId: pengambilanId,
                    jumlahIkat: jumlahIkat,
                    catatan: document.getElementById('kemasCatatan').value
                };

                await apiPost(`${CONFIG.PRODUCTION_BASE_URL}/kerja/laporkan-kemas`, body);

                toast('Hasil kemas berhasil dikirim. Upah akan tampil setelah divalidasi VALID oleh pemilik.');
                e.target.reset();

                await Promise.allSettled([
                    loadRiwayatKerjaSaya(),
                    loadRiwayatUpahSaya()
                ]);

            } catch (err) {
                toast(err.message, 'error');
            }
        });
    }
}

async function loadDashboardPekerja() {
    await loadAllPekerja();
}

async function loadAllPekerja() {
    const last = sessionStorage.getItem('lastPengambilanId');
    const lastBox = document.getElementById('lastPengambilanBox');

    if (last && lastBox) {
        const bal = sessionStorage.getItem('lastPengambilanBal');
        const wajib = sessionStorage.getItem('lastPengambilanWajibIkat');
        lastBox.textContent = bal && wajib ? `${last} (${bal} bal = ${wajib} ikat)` : last;
    }

    await Promise.allSettled([
        loadStok(),
        loadRiwayatKerjaSaya(),
        loadRiwayatUpahSaya()
    ]);
}

async function loadStok() {
    try {
        const data = await apiGet(`${CONFIG.PRODUCTION_BASE_URL}/stok/terkini`);

        const stokBal = document.getElementById('stokBal');

        if (stokBal) {
            stokBal.textContent = fmtNumber(
                data.jumlahBal ??
                data.saldoBal ??
                data.jumlah_bal ??
                data.saldo_bal ??
                0
            );
        }

    } catch (err) {
        toast('Gagal memuat stok: ' + err.message, 'error');
    }
}

function hitungIkatDariRiwayat(x) {
    const jumlahIkatBackend = Number(x.jumlahIkat ?? x.jumlah_ikat ?? 0);
    const jumlahBal = Number(x.jumlahBal ?? x.jumlah_bal ?? 0);

    if (jumlahIkatBackend > 0) {
        return jumlahIkatBackend;
    }

    return jumlahBal * IKAT_PER_BAL;
}

function hitungUpahDariRiwayat(x) {
    const totalUpahBackend = Number(x.totalUpah ?? x.total_upah ?? 0);

    if (totalUpahBackend > 0) {
        return totalUpahBackend;
    }

    const totalIkat = hitungIkatDariRiwayat(x);
    return totalIkat * TARIF_PER_IKAT;
}

function isValidHasil(x) {
    const status = String(
        x.statusValidasi ??
        x.status_validasi ??
        ''
    ).toUpperCase();

    return status === 'VALID';
}

async function loadRiwayatKerjaSaya() {
    const legacyTbody = document.getElementById('tblRiwayatSaya');
    const container = document.getElementById('weeklyRiwayatSaya');

    try {
        const id = mustPekerjaId();
        const data = await apiGet(`${CONFIG.PRODUCTION_BASE_URL}/kerja/riwayat/pekerja/${id}`);
        const list = Array.isArray(data) ? data : [];

        if (legacyTbody) legacyTbody.innerHTML = '';
        if (!container) return;

        if (!list.length) {
            container.innerHTML = '<div class="weekly-empty">Belum ada riwayat kerja. Setelah ambil barang dan lapor hasil kemas, data akan tampil per minggu di sini.</div>';
            return;
        }

        const groups = groupRiwayatPerMinggu(list, false);
        const aktif = groups.filter(isCurrentWeekGroup);
        const arsip = groups.filter(g => !isCurrentWeekGroup(g));

        container.innerHTML = `
            <div class="payroll-section-title"><h3>Minggu Berjalan</h3><p>Data penyerahan hasil kerja minggu ini.</p></div>
            ${aktif.length ? aktif.map(group => renderKartuRiwayatMingguan(group, false)).join('') : '<div class="weekly-empty">Belum ada data kerja minggu berjalan.</div>'}
            <div class="payroll-section-title"><h3>Arsip Riwayat Kerja</h3><p>Minggu lama otomatis menjadi arsip riwayat kerja.</p></div>
            ${arsip.length ? arsip.map(group => renderKartuRiwayatMingguan(group, true)).join('') : '<div class="weekly-empty">Belum ada arsip riwayat kerja.</div>'}
        `;

    } catch (err) {
        if (legacyTbody) legacyTbody.innerHTML = rowEmpty(5, err.message);
        if (container) container.innerHTML = `<div class="weekly-empty">${safe(err.message)}</div>`;
    }
}

function parseTanggalKerja(value) {
    if (!value) return null;
    const dateOnly = String(value).split('T')[0];
    const result = new Date(`${dateOnly}T00:00:00`);
    return Number.isNaN(result.getTime()) ? null : result;
}

function formatIsoDate(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

function getAwalMingguMingguSabtu(date) {
    const result = new Date(date);
    const hari = result.getDay(); // 0 Minggu, 1 Senin, ... 6 Sabtu
    result.setDate(result.getDate() - hari);
    result.setHours(0, 0, 0, 0);
    return result;
}

function getAkhirMingguMingguSabtu(awalMinggu) {
    const result = new Date(awalMinggu);
    result.setDate(result.getDate() + 6);
    result.setHours(23, 59, 59, 999);
    return result;
}

function mingguKeDalamBulan(date) {
    if (!date) return '-';
    const awalBulan = new Date(date.getFullYear(), date.getMonth(), 1);
    const awalMingguPertama = getAwalMingguMingguSabtu(awalBulan);
    const awalMingguIni = getAwalMingguMingguSabtu(date);
    const selisihHari = Math.round((awalMingguIni - awalMingguPertama) / (1000 * 60 * 60 * 24));
    return Math.floor(selisihHari / 7) + 1;
}

function namaBulanTahun(date) {
    if (!date) return '-';
    return new Intl.DateTimeFormat('id-ID', {
        month: 'long',
        year: 'numeric'
    }).format(date);
}

function keyBulanMinggu(date) {
    const tahun = date.getFullYear();
    const bulan = String(date.getMonth() + 1).padStart(2, '0');
    const minggu = String(mingguKeDalamBulan(date)).padStart(2, '0');
    return `${tahun}-${bulan}-M${minggu}`;
}

function isCurrentWeekGroup(group) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today >= group.awal && today <= group.akhir;
}

function formatTanggalIndonesia(date) {
    if (!date) return '-';
    return new Intl.DateTimeFormat('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    }).format(date);
}

function namaHariIndonesia(index) {
    return ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'][index] || '-';
}

function isValidHasil(x) {
    const status = String(x.statusValidasi ?? x.status_validasi ?? '').toUpperCase();
    return status === 'VALID';
}

function hitungIkatDariRiwayat(x) {
    return Number(x.jumlahIkat ?? x.jumlah_ikat ?? 0);
}

function hitungUpahDariRiwayat(x) {
    // Upah pekerja dihitung dari jumlah ikat pada riwayat kerja VALID,
    // bukan dari total_upah backend agar tidak membesar karena data payroll lama/akumulasi.
    return hitungIkatDariRiwayat(x) * TARIF_PER_IKAT;
}

function groupRiwayatPerMinggu(list, validOnly = false) {
    const grouped = new Map();

    list.forEach(item => {
        if (validOnly && !isValidHasil(item)) return;

        const tanggal = parseTanggalKerja(item.tanggal);
        if (!tanggal) return;

        // Kelompok dibuat berdasarkan BULAN dan MINGGU dari tanggal input/penyerahan.
        // Jadi saat masuk minggu berikutnya atau bulan berikutnya, otomatis beda kartu/form.
        const awal = getAwalMingguMingguSabtu(tanggal);
        const akhir = getAkhirMingguMingguSabtu(awal);
        const key = keyBulanMinggu(tanggal);

        if (!grouped.has(key)) {
            grouped.set(key, {
                key,
                awal,
                akhir,
                bulanTahun: namaBulanTahun(tanggal),
                tahun: tanggal.getFullYear(),
                bulan: tanggal.getMonth() + 1,
                mingguKe: mingguKeDalamBulan(tanggal),
                rowsByDate: new Map(),
                items: [],
                totalBal: 0,
                totalIkat: 0,
                totalUpah: 0,
                totalValid: 0,
                totalPending: 0,
                totalDitolak: 0
            });
        }

        const group = grouped.get(key);
        const tanggalKey = formatIsoDate(tanggal);
        const status = String(item.statusValidasi ?? item.status_validasi ?? 'PENDING').toUpperCase();
        const bal = Number(item.jumlahBal ?? item.jumlah_bal ?? 0);
        const ikat = hitungIkatDariRiwayat(item);
        const upah = isValidHasil(item) ? hitungUpahDariRiwayat(item) : 0;

        if (!group.rowsByDate.has(tanggalKey)) {
            group.rowsByDate.set(tanggalKey, {
                tanggal,
                items: [],
                totalBal: 0,
                totalIkat: 0,
                totalUpah: 0,
                statusList: []
            });
        }

        const row = group.rowsByDate.get(tanggalKey);
        row.items.push(item);
        row.totalBal += bal;
        row.totalIkat += ikat;
        row.totalUpah += upah;
        row.statusList.push(status);

        group.items.push(item);
        group.totalBal += bal;
        group.totalIkat += ikat;
        group.totalUpah += upah;
        if (status === 'VALID') group.totalValid += 1;
        else if (status === 'DITOLAK') group.totalDitolak += 1;
        else group.totalPending += 1;
    });

    return Array.from(grouped.values()).sort((a, b) => {
        if (b.tahun !== a.tahun) return b.tahun - a.tahun;
        if (b.bulan !== a.bulan) return b.bulan - a.bulan;
        return b.mingguKe - a.mingguKe;
    });
}

function gabungStatusHarian(statusList) {
    const list = statusList.map(x => String(x || '').toUpperCase());
    if (!list.length) return '<span class="day-muted">Belum ada</span>';
    const unik = Array.from(new Set(list));
    return unik.map(s => badge(s)).join(' ');
}

function renderBarisTujuhHari(group, upahOnly = false) {
    const rows = [];
    for (let i = 0; i < 7; i++) {
        const tanggal = new Date(group.awal);
        tanggal.setDate(tanggal.getDate() + i);
        const key = formatIsoDate(tanggal);
        const row = group.rowsByDate.get(key);

        if (row) {
            rows.push(`
                <tr>
                    <td><b>${namaHariIndonesia(i)}</b><br><small>${formatTanggalIndonesia(tanggal)}</small></td>
                    <td>${fmtNumber(row.totalBal)} bal</td>
                    <td>${fmtNumber(row.totalIkat)} ikat</td>
                    ${upahOnly ? `<td>${fmtRupiah(row.totalUpah)}</td>` : ''}
                    <td>${gabungStatusHarian(row.statusList)}</td>
                    <td><small>${row.items.length} penyerahan</small></td>
                </tr>
            `);
        } else {
            rows.push(`
                <tr>
                    <td><b>${namaHariIndonesia(i)}</b><br><small>${formatTanggalIndonesia(tanggal)}</small></td>
                    <td class="day-muted">-</td>
                    <td class="day-muted">-</td>
                    ${upahOnly ? '<td class="day-muted">-</td>' : ''}
                    <td><span class="day-muted">Belum ada penyerahan</span></td>
                    <td class="day-muted">-</td>
                </tr>
            `);
        }
    }
    return rows.join('');
}

function renderKartuRiwayatMingguan(group, arsipMode = false) {
    return `
        <article class="weekly-card">
            <div class="weekly-card-head">
                <div>
                    <h3>${safe(group.bulanTahun)} - Minggu ${safe(group.mingguKe)} ${isCurrentWeekGroup(group) && !arsipMode ? '<span class="badge warning">MINGGU INI</span>' : '<span class="badge dibayar">ARSIP</span>'}</h3>
                    <p>Periode kerja: ${formatTanggalIndonesia(group.awal)} - ${formatTanggalIndonesia(group.akhir)}</p>
                </div>
                <div class="weekly-total">
                    <div><span>Total Bal</span><b>${fmtNumber(group.totalBal)} bal</b></div>
                    <div><span>Total Ikat</span><b>${fmtNumber(group.totalIkat)} ikat</b></div>
                    <div><span>Status</span><b>${group.totalValid} valid</b></div>
                </div>
            </div>
            <div class="weekly-table-wrap">
                <table class="weekly-table">
                    <thead>
                        <tr>
                            <th>Hari / Tanggal</th>
                            <th>Bal</th>
                            <th>Ikat Diserahkan</th>
                            <th>Validasi</th>
                            <th>Jumlah Laporan</th>
                        </tr>
                    </thead>
                    <tbody>${renderBarisTujuhHari(group, false)}</tbody>
                </table>
            </div>
        </article>
    `;
}

function normalStatusUpah(status) {
    return String(status || 'BELUM_DIHITUNG').trim().toUpperCase();
}

function statusSudahDibayar(status) {
    const s = normalStatusUpah(status);
    return s === 'DIBAYAR' || s === 'SUDAH_DIBAYAR' || s === 'LUNAS';
}

function statusMingguanFromPayroll(payrollList, group) {
    const start = formatIsoDate(group.awal);
    const end = formatIsoDate(group.akhir);
    const cocokList = (payrollList || []).filter(x => {
        const awal = x.tanggalAwal ?? x.tanggal_awal;
        const akhir = x.tanggalAkhir ?? x.tanggal_akhir;
        const periode = String(x.periode || '');
        const tanggalBayar = x.tanggalDibayar ?? x.tanggal_dibayar;
        if (String(awal || '').startsWith(start)) return true;
        if (String(akhir || '').startsWith(end)) return true;
        if (periode.includes(start) || periode.includes(end)) return true;
        // Fallback untuk data lama: kalau tanggal bayar ada di minggu ini,
        // statusnya tetap dianggap milik rekap minggu ini.
        if (tanggalBayar) {
            const d = parseTanggalKerja(tanggalBayar);
            if (d && d >= group.awal && d <= group.akhir) return true;
        }
        return false;
    });

    if (!cocokList.length) return null;

    // Prioritaskan DIBAYAR agar kalau sudah lunas tidak kembali tampil BELUM_DIHITUNG/PENDING.
    return cocokList.find(x => statusSudahDibayar(x.status))
        || cocokList.find(x => normalStatusUpah(x.status) === 'PENDING')
        || cocokList[0];
}

async function loadRiwayatUpahSaya() {
    const legacyTbody = document.getElementById('tblUpahSaya');
    const container = document.getElementById('weeklyUpahSaya');

    try {
        const id = mustPekerjaId();

        const [riwayatKerjaResult, payrollResult] = await Promise.allSettled([
            apiGet(`${CONFIG.PRODUCTION_BASE_URL}/kerja/riwayat/pekerja/${id}`),
            apiGet(`${CONFIG.PAYROLL_BASE_URL}/transaksi/riwayat-mingguan/pekerja/${id}`)
        ]);

        const riwayatKerja = riwayatKerjaResult.status === 'fulfilled' && Array.isArray(riwayatKerjaResult.value)
            ? riwayatKerjaResult.value
            : [];

        const payrollList = payrollResult.status === 'fulfilled' && Array.isArray(payrollResult.value)
            ? payrollResult.value
            : [];

        if (legacyTbody) legacyTbody.innerHTML = '';
        if (!container) return;

        const groups = groupRiwayatPerMinggu(riwayatKerja, true);

        if (!groups.length) {
            container.innerHTML = '<div class="weekly-empty">Belum ada upah mingguan. Upah akan muncul setelah hasil kemas divalidasi VALID oleh pemilik.</div>';
            return;
        }

        const sudahDibayarGroup = g => statusSudahDibayar(statusMingguanFromPayroll(payrollList, g)?.status);
        const aktif = groups.filter(g => isCurrentWeekGroup(g) && !sudahDibayarGroup(g));
        const arsip = groups.filter(g => !isCurrentWeekGroup(g) || sudahDibayarGroup(g));

        container.innerHTML = `
            <div class="payroll-section-title"><h3>Upah Minggu Berjalan</h3><p>Upah dihitung dari hasil kerja VALID minggu ini. Jika sudah dibayar, minggu tersebut pindah ke arsip.</p></div>
            ${aktif.length ? aktif.map(group => renderKartuUpahMingguan(group, payrollList, false)).join('') : '<div class="weekly-empty">Belum ada upah minggu berjalan yang belum dibayar.</div>'}
            <div class="payroll-section-title"><h3>Arsip Riwayat Upah</h3><p>Minggu lama atau minggu yang sudah dibayar masuk ke arsip.</p></div>
            ${arsip.length ? arsip.map(group => renderKartuUpahMingguan(group, payrollList, true)).join('') : '<div class="weekly-empty">Belum ada arsip upah.</div>'}
        `;

    } catch (err) {
        if (legacyTbody) legacyTbody.innerHTML = rowEmpty(6, err.message);
        if (container) container.innerHTML = `<div class="weekly-empty">${safe(err.message)}</div>`;
    }
}

function renderKartuUpahMingguan(group, payrollList, arsipMode = false) {
    const payroll = statusMingguanFromPayroll(payrollList, group);
    const status = payroll ? normalStatusUpah(payroll.status ?? 'MENUNGGU_JADWAL') : 'BELUM_DIHITUNG';
    const tanggalBayar = payroll ? safe(payroll.tanggalDibayar ?? payroll.tanggal_dibayar ?? '-') : '-';
    // Nilai upah dan total ikat diambil dari riwayat kerja VALID minggu ini.
    // Payroll hanya dipakai untuk status bayar dan tanggal bayar.
    const totalIkat = group.totalIkat;
    const totalUpah = totalIkat * TARIF_PER_IKAT;
    const jumlahTransaksi = group.totalValid;

    return `
        <article class="weekly-card">
            <div class="weekly-card-head">
                <div>
                    <h3>${safe(group.bulanTahun)} - Minggu ${safe(group.mingguKe)} ${arsipMode ? '<span class="badge dibayar">ARSIP</span>' : (isCurrentWeekGroup(group) ? '<span class="badge warning">MINGGU INI</span>' : '')}</h3>
                    <p>Periode upah: ${formatTanggalIndonesia(group.awal)} - ${formatTanggalIndonesia(group.akhir)}</p>
                </div>
                <div class="weekly-total">
                    <div><span>Hasil Valid</span><b>${fmtNumber(jumlahTransaksi)} laporan</b></div>
                    <div><span>Total Ikat</span><b>${fmtNumber(totalIkat)} ikat</b></div>
                    <div><span>Total Upah</span><b>${fmtRupiah(totalUpah)}</b></div>
                </div>
            </div>
            <div class="weekly-table-wrap">
                <table class="weekly-table">
                    <thead>
                        <tr>
                            <th>Hari / Tanggal</th>
                            <th>Bal</th>
                            <th>Ikat Valid</th>
                            <th>Upah Harian</th>
                            <th>Validasi</th>
                            <th>Jumlah Laporan</th>
                        </tr>
                    </thead>
                    <tbody>${renderBarisTujuhHari(group, true)}</tbody>
                </table>
            </div>
            <div class="weekly-card-head" style="border-top:1px solid #d8ebef;border-bottom:none">
                <div>
                    <p>Status bayar minggu ini</p>
                    <h3>${badge(status)}</h3>
                </div>
                <div class="weekly-total">
                    <div><span>Tanggal Bayar</span><b>${safe(tanggalBayar)}</b></div>
                    <div><span>Tarif</span><b>${fmtRupiah(TARIF_PER_IKAT)} / ikat</b></div>
                    <div><span>Perhitungan</span><b>${fmtNumber(totalIkat)} × ${fmtRupiah(TARIF_PER_IKAT)}</b></div>
                </div>
            </div>
        </article>
    `;
}


/* =========================================================
   FINAL FIX: Arsip Pekerja sinkron dengan status DIBAYAR
   - Riwayat kerja minggu ini ikut arsip kalau gajinya sudah dibayar
   - Riwayat upah membaca status DIBAYAR dengan fallback lebih aman
========================================================= */
function statusMingguanFromPayroll(payrollList, group) {
    const start = formatIsoDate(group.awal);
    const end = formatIsoDate(group.akhir);
    const totalIkatGroup = Number(group.totalIkat || 0);

    let cocokList = (payrollList || []).filter(x => {
        const awal = x.tanggalAwal ?? x.tanggal_awal;
        const akhir = x.tanggalAkhir ?? x.tanggal_akhir;
        const periode = String(x.periode || '');
        const tanggalBayar = x.tanggalDibayar ?? x.tanggal_dibayar;
        const tanggal = x.tanggal ?? x.tanggal_penggajian;
        if (String(awal || '').startsWith(start)) return true;
        if (String(akhir || '').startsWith(end)) return true;
        if (periode.includes(start) || periode.includes(end)) return true;
        if (tanggal && (() => { const d = parseTanggalKerja(tanggal); return d && d >= group.awal && d <= group.akhir; })()) return true;
        if (tanggalBayar && (() => { const d = parseTanggalKerja(tanggalBayar); return d && d >= group.awal && d <= group.akhir; })()) return true;
        return false;
    });

    // Fallback aman: kalau payroll backend lama tidak membawa periode yang sama,
    // cocokkan dari total ikat minggu tersebut.
    if (!cocokList.length && totalIkatGroup > 0) {
        cocokList = (payrollList || []).filter(x => Number(x.totalIkat ?? x.total_ikat ?? 0) === totalIkatGroup);
    }

    if (!cocokList.length) return null;

    return cocokList.find(x => statusSudahDibayar(x.status))
        || cocokList.find(x => normalStatusUpah(x.status) === 'PENDING')
        || cocokList[0];
}

async function loadRiwayatKerjaSaya() {
    const legacyTbody = document.getElementById('tblRiwayatSaya');
    const container = document.getElementById('weeklyRiwayatSaya');

    try {
        const id = mustPekerjaId();
        const [riwayatRes, payrollRes] = await Promise.allSettled([
            apiGet(`${CONFIG.PRODUCTION_BASE_URL}/kerja/riwayat/pekerja/${id}`),
            apiGet(`${CONFIG.PAYROLL_BASE_URL}/transaksi/riwayat-mingguan/pekerja/${id}`)
        ]);

        const list = riwayatRes.status === 'fulfilled' && Array.isArray(riwayatRes.value) ? riwayatRes.value : [];
        const payrollList = payrollRes.status === 'fulfilled' && Array.isArray(payrollRes.value) ? payrollRes.value : [];

        if (legacyTbody) legacyTbody.innerHTML = '';
        if (!container) return;

        if (!list.length) {
            container.innerHTML = '<div class="weekly-empty">Belum ada riwayat kerja. Setelah ambil barang dan lapor hasil kemas, data akan tampil per minggu di sini.</div>';
            return;
        }

        const groups = groupRiwayatPerMinggu(list, false);
        const sudahDibayarGroup = g => statusSudahDibayar(statusMingguanFromPayroll(payrollList, g)?.status);
        const aktif = groups.filter(g => isCurrentWeekGroup(g) && !sudahDibayarGroup(g));
        const arsip = groups.filter(g => !isCurrentWeekGroup(g) || sudahDibayarGroup(g));

        container.innerHTML = `
            <div class="payroll-section-title"><h3>Minggu Berjalan</h3><p>Data penyerahan hasil kerja minggu ini yang belum dibayar.</p></div>
            ${aktif.length ? aktif.map(group => renderKartuRiwayatMingguan(group, false)).join('') : '<div class="weekly-empty">Belum ada data kerja minggu berjalan yang belum dibayar.</div>'}
            <div class="payroll-section-title"><h3>Arsip Riwayat Kerja</h3><p>Minggu lama atau minggu yang sudah dibayar otomatis masuk arsip.</p></div>
            ${arsip.length ? arsip.map(group => renderKartuRiwayatMingguan(group, true)).join('') : '<div class="weekly-empty">Belum ada arsip riwayat kerja.</div>'}
        `;

        if (riwayatRes.status === 'rejected') toast('Gagal memuat riwayat kerja: ' + riwayatRes.reason.message, 'error');
    } catch (err) {
        if (legacyTbody) legacyTbody.innerHTML = rowEmpty(5, err.message);
        if (container) container.innerHTML = `<div class="weekly-empty">${safe(err.message)}</div>`;
    }
}


/* =========================================================
   ARSIP CLEANUP UI PEKERJA
   - Arsip bisa discroll dan disembunyikan dari tampilan
   - Tidak menghapus data database
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
    if (!confirm('Sembunyikan arsip ini dari tampilan? Data asli di database tetap aman.')) return;
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

function groupArchiveKey(prefix, group) {
    return `${prefix}:${group.key}:${formatIsoDate(group.awal)}:${formatIsoDate(group.akhir)}:${group.totalIkat || 0}`;
}

function renderArchiveGroup(scope, key, html, reloadName) {
    return `
        <div class="archive-item">
            <div class="archive-clean-actions">
                <button class="btn btn-danger btn-small" onclick="hideArsipItem('${scope}', '${key}', '${reloadName}')">Sembunyikan Arsip</button>
            </div>
            ${html}
        </div>
    `;
}

async function loadRiwayatKerjaSaya() {
    const legacyTbody = document.getElementById('tblRiwayatSaya');
    const container = document.getElementById('weeklyRiwayatSaya');

    try {
        const id = mustPekerjaId();
        const scope = `pekerja_${id}_riwayat_kerja`;
        const hidden = getHiddenArsip(scope);

        // Riwayat kerja harus tahu status payroll juga.
        // Kalau minggu berjalan sudah DIBAYAR/LUNAS, minggu itu dipindahkan ke arsip.
        const [riwayatRes, payrollRes] = await Promise.allSettled([
            apiGet(`${CONFIG.PRODUCTION_BASE_URL}/kerja/riwayat/pekerja/${id}`),
            apiGet(`${CONFIG.PAYROLL_BASE_URL}/transaksi/riwayat-mingguan/pekerja/${id}`)
        ]);

        const list = riwayatRes.status === 'fulfilled' && Array.isArray(riwayatRes.value) ? riwayatRes.value : [];
        const payrollList = payrollRes.status === 'fulfilled' && Array.isArray(payrollRes.value) ? payrollRes.value : [];

        if (legacyTbody) legacyTbody.innerHTML = '';
        if (!container) return;

        if (!list.length) {
            container.innerHTML = '<div class="weekly-empty">Belum ada riwayat kerja. Setelah ambil barang dan lapor hasil kemas, data akan tampil per minggu di sini.</div>';
            return;
        }

        const groups = groupRiwayatPerMinggu(list, false);
        const sudahDibayarGroup = g => statusSudahDibayar(statusMingguanFromPayroll(payrollList, g)?.status);
        const aktif = groups.filter(g => isCurrentWeekGroup(g) && !sudahDibayarGroup(g));
        const arsip = groups.filter(g => (!isCurrentWeekGroup(g) || sudahDibayarGroup(g)) && !hidden.has(groupArchiveKey('kerja', g)));

        container.innerHTML = `
            <div class="payroll-section-title"><h3>Minggu Berjalan</h3><p>Data penyerahan hasil kerja minggu ini yang belum dibayar.</p></div>
            ${aktif.length ? aktif.map(group => renderKartuRiwayatMingguan(group, false)).join('') : '<div class="weekly-empty">Belum ada data kerja minggu berjalan yang belum dibayar. Kalau minggu ini sudah dibayar, datanya pindah ke Arsip Riwayat Kerja.</div>'}
            <div class="payroll-section-title"><h3>Arsip Riwayat Kerja</h3><p>Minggu lama atau minggu berjalan yang sudah dibayar otomatis masuk arsip.</p></div>
            ${archiveToolbar(scope, 'loadRiwayatKerjaSaya', 'Arsip Riwayat Kerja')}
            <div class="archive-scroll-list archive-card-scroll">
                ${arsip.length ? arsip.map(group => renderArchiveGroup(scope, groupArchiveKey('kerja', group), renderKartuRiwayatMingguan(group, true), 'loadRiwayatKerjaSaya')).join('') : '<div class="weekly-empty">Belum ada arsip riwayat kerja atau semua arsip sedang disembunyikan.</div>'}
            </div>
        `;

        if (riwayatRes.status === 'rejected') toast('Gagal memuat riwayat kerja: ' + riwayatRes.reason.message, 'error');
        if (payrollRes.status === 'rejected') toast('Status bayar belum bisa dibaca, arsip kerja mungkin belum pindah otomatis.', 'error');
    } catch (err) {
        if (legacyTbody) legacyTbody.innerHTML = rowEmpty(5, err.message);
        if (container) container.innerHTML = `<div class="weekly-empty">${safe(err.message)}</div>`;
    }
}

async function loadRiwayatUpahSaya() {
    const legacyTbody = document.getElementById('tblUpahSaya');
    const container = document.getElementById('weeklyUpahSaya');

    try {
        const id = mustPekerjaId();
        const scope = `pekerja_${id}_riwayat_upah`;
        const hidden = getHiddenArsip(scope);

        const [riwayatKerjaResult, payrollResult] = await Promise.allSettled([
            apiGet(`${CONFIG.PRODUCTION_BASE_URL}/kerja/riwayat/pekerja/${id}`),
            apiGet(`${CONFIG.PAYROLL_BASE_URL}/transaksi/riwayat-mingguan/pekerja/${id}`)
        ]);

        const riwayatKerja = riwayatKerjaResult.status === 'fulfilled' && Array.isArray(riwayatKerjaResult.value)
            ? riwayatKerjaResult.value
            : [];

        const payrollList = payrollResult.status === 'fulfilled' && Array.isArray(payrollResult.value)
            ? payrollResult.value
            : [];

        if (legacyTbody) legacyTbody.innerHTML = '';
        if (!container) return;

        const groups = groupRiwayatPerMinggu(riwayatKerja, true);

        if (!groups.length) {
            container.innerHTML = '<div class="weekly-empty">Belum ada upah mingguan. Upah akan muncul setelah hasil kemas divalidasi VALID oleh pemilik.</div>';
            return;
        }

        const sudahDibayarGroup = g => statusSudahDibayar(statusMingguanFromPayroll(payrollList, g)?.status);
        const arsip = groups.filter(g => sudahDibayarGroup(g) && !hidden.has(groupArchiveKey('upah', g)));
        const belumDibayar = groups.filter(g => !sudahDibayarGroup(g));

        container.innerHTML = `
            <div class="payroll-section-title"><h3>Upah Berjalan</h3><p>Upah yang belum dibayar belum masuk riwayat upah. Data setoran bisa dilihat di Riwayat Kerja sampai pemilik melakukan pembayaran.</p></div>
            ${belumDibayar.length ? '<div class="weekly-empty">Ada hasil kerja VALID yang masih berjalan/menunggu akhir minggu. Riwayat upah akan tampil setelah pemilik klik Konfirmasi Bayar.</div>' : '<div class="weekly-empty">Belum ada upah berjalan.</div>'}
            <div class="payroll-section-title"><h3>Arsip Riwayat Upah</h3><p>Hanya gaji yang sudah DIBAYAR yang tampil di sini.</p></div>
            ${archiveToolbar(scope, 'loadRiwayatUpahSaya', 'Arsip Riwayat Upah')}
            <div class="archive-scroll-list archive-card-scroll">
                ${arsip.length ? arsip.map(group => renderArchiveGroup(scope, groupArchiveKey('upah', group), renderKartuUpahMingguan(group, payrollList, true), 'loadRiwayatUpahSaya')).join('') : '<div class="weekly-empty">Belum ada riwayat upah yang sudah dibayar atau semua arsip sedang disembunyikan.</div>'}
            </div>
        `;

    } catch (err) {
        if (legacyTbody) legacyTbody.innerHTML = rowEmpty(6, err.message);
        if (container) container.innerHTML = `<div class="weekly-empty">${safe(err.message)}</div>`;
    }
}

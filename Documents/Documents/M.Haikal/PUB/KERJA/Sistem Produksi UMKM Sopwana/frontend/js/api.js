/* =========================================================
   API HELPER SOPWANA
   Dibuat aman untuk HTML biasa, Live Server, dan file://.
   Semua request backend lewat fungsi ini.
========================================================= */

function getToken() {
    return sessionStorage.getItem('token');
}

function getRole() {
    return (sessionStorage.getItem('role') || '').replace('ROLE_', '').toUpperCase();
}

function getUsername() {
    return sessionStorage.getItem('username') || '-';
}

function getPekerjaId() {
    return sessionStorage.getItem('pekerjaId') || '';
}

function setPekerjaId(id) {
    if (id !== null && id !== undefined && id !== '') {
        sessionStorage.setItem('pekerjaId', id);
    }
}

function logout() {
    sessionStorage.clear();
    window.location.href = 'login.html';
}

function requireAuth(allowedRoles = []) {
    if (!getToken()) {
        window.location.href = 'login.html';
        return;
    }

    const role = getRole();
    if (allowedRoles.length && !allowedRoles.includes(role)) {
        alert('Akses ditolak untuk role: ' + role);
        logout();
    }
}

function authHeaders(json = true) {
    const headers = {};
    const token = getToken();

    if (token) {
        headers.Authorization = 'Bearer ' + token;
    }

    if (json) {
        headers['Content-Type'] = 'application/json';
    }

    headers.Accept = 'application/json, text/plain, */*';
    return headers;
}

function buildFetchOptions(options = {}) {
    return {
        mode: 'cors',
        cache: 'no-store',
        ...options
    };
}

function normalizeErrorMessage(status, statusText, data, url) {
    let message = '';

    if (typeof data === 'string') {
        message = data;
    } else if (data && typeof data === 'object') {
        message = data.message || data.error || data.detail || JSON.stringify(data);
    }

    return `${status} ${statusText || ''} - ${message || 'Request gagal'} - URL: ${url}`;
}

async function request(url, options = {}) {
    let res;

    try {
        res = await fetch(url, buildFetchOptions(options));
    } catch (err) {
        console.error('Gagal menghubungi backend:', { url, error: err });
        throw new Error(
            'Gagal menghubungi backend. Pastikan backend payroll port 8082 dan production port 8083 sudah berjalan, lalu buka frontend lewat Live Server atau http://localhost:5500. URL: ' + url
        );
    }

    const contentType = res.headers.get('content-type') || '';
    let data = null;

    try {
        if (contentType.includes('application/json')) {
            data = await res.json();
        } else {
            data = await res.text();
        }
    } catch (err) {
        data = null;
    }

    if (!res.ok) {
        throw new Error(normalizeErrorMessage(res.status, res.statusText, data, url));
    }

    return data;
}

function apiGet(url) {
    return request(url, {
        method: 'GET',
        headers: authHeaders(false)
    });
}

function apiPost(url, body = {}) {
    return request(url, {
        method: 'POST',
        headers: authHeaders(true),
        body: JSON.stringify(body)
    });
}

function apiPut(url, body = null) {
    const options = {
        method: 'PUT',
        headers: authHeaders(body !== null)
    };

    if (body !== null) {
        options.body = JSON.stringify(body);
    }

    return request(url, options);
}

function apiPatch(url, body = null) {
    const options = {
        method: 'PATCH',
        headers: authHeaders(body !== null)
    };

    if (body !== null) {
        options.body = JSON.stringify(body);
    }

    return request(url, options);
}

function apiDelete(url) {
    return request(url, {
        method: 'DELETE',
        headers: authHeaders(false)
    });
}

async function downloadFile(url, filename) {
    let res;

    try {
        res = await fetch(url, buildFetchOptions({
            method: 'GET',
            headers: authHeaders(false)
        }));
    } catch (err) {
        throw new Error('Gagal download file. Pastikan backend berjalan. URL: ' + url);
    }

    if (!res.ok) {
        const text = await res.text().catch(() => 'Download gagal');
        throw new Error(`${res.status} ${res.statusText} - ${text}`);
    }

    const blob = await res.blob();
    const a = document.createElement('a');
    const objectUrl = URL.createObjectURL(blob);

    a.href = objectUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(objectUrl);
}

function toast(message, type = 'success') {
    const el = document.getElementById('toast');
    if (!el) {
        alert(message);
        return;
    }

    el.className = `toast ${type}`;
    el.textContent = message;
    el.classList.remove('hidden');

    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => el.classList.add('hidden'), 4200);
}

function fmtNumber(n) {
    return Number(n || 0).toLocaleString('id-ID');
}

function fmtRupiah(n) {
    return 'Rp' + Number(n || 0).toLocaleString('id-ID');
}

function safe(v, fallback = '-') {
    return v === null || v === undefined || v === '' ? fallback : v;
}

function badge(status) {
    const s = (status || 'PENDING').toString().toUpperCase();
    return `<span class="badge ${s.toLowerCase()}">${s.replaceAll('_', ' ')}</span>`;
}

function rowEmpty(colspan, text = 'Data belum tersedia') {
    return `<tr><td colspan="${colspan}" style="text-align:center;color:#777;padding:22px">${text}</td></tr>`;
}

function normalizeItemId(obj, ...keys) {
    for (const key of keys) {
        if (obj && obj[key] !== undefined && obj[key] !== null) {
            return obj[key];
        }
    }
    return null;
}

// Cek cepat dari console browser: SopwanaApiCheck()
async function SopwanaApiCheck() {
    const results = {};

    try {
        results.payroll = await fetch(CONFIG.PAYROLL_BASE_URL + '/auth/login', { method: 'OPTIONS', mode: 'cors' })
            .then(r => r.status)
            .catch(e => 'ERROR: ' + e.message);
    } catch (e) {
        results.payroll = 'ERROR: ' + e.message;
    }

    try {
        results.production = await fetch(CONFIG.PRODUCTION_BASE_URL + '/stok/terkini', { method: 'OPTIONS', mode: 'cors' })
            .then(r => r.status)
            .catch(e => 'ERROR: ' + e.message);
    } catch (e) {
        results.production = 'ERROR: ' + e.message;
    }

    console.table(results);
    return results;
}

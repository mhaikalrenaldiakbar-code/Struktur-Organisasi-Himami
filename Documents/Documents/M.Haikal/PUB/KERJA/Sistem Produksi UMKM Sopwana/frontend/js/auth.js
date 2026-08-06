document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const msg = document.getElementById('loginMessage');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        msg.className = 'alert hidden';

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

        try {
            const data = await request(`${CONFIG.PAYROLL_BASE_URL}/auth/login`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password })
            });
            // Hapus sisa session lama supaya ID pekerja tidak nyasar ke akun sebelumnya.
            sessionStorage.clear();
            sessionStorage.setItem('token', data.token || data.jwt || data.accessToken);
            sessionStorage.setItem('username', data.username || username);
            sessionStorage.setItem('role', data.role || 'PEKERJA');
            if (data.idUser || data.userId || data.id_user) {
                sessionStorage.setItem('idUser', data.idUser || data.userId || data.id_user);
            }
            if (data.pekerjaId || data.idPekerja || data.id_pekerja) {
                sessionStorage.setItem('pekerjaId', data.pekerjaId || data.idPekerja || data.id_pekerja);
            }

            const role = getRole();
            msg.textContent = 'Login berhasil. Mengalihkan halaman...';
            msg.className = 'alert success';
            setTimeout(() => {
                if (role === 'PEMILIK' || role === 'ADMIN') window.location.href = 'dashboard-pemilik.html';
                else window.location.href = 'dashboard-pekerja.html';
            }, 450);
        } catch (err) {
            msg.textContent = err.message || 'Login gagal';
            msg.className = 'alert';
        }
    });
});

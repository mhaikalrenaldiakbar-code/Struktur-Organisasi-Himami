function showInfo(targetId, buttonElement) {
    const panels = document.querySelectorAll('.info-panel');
    const buttons = document.querySelectorAll('.feature-btn');

    panels.forEach(panel => {
        panel.classList.remove('active');
    });

    buttons.forEach(button => {
        button.classList.remove('active');
    });

    const targetPanel = document.getElementById(targetId);

    if (targetPanel) {
        targetPanel.classList.add('active');
    }

    if (buttonElement) {
        buttonElement.classList.add('active');
    }

    // Auto close mobile sidebar when tab clicked
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    if (sidebar && sidebar.classList.contains('mobile-open')) {
        sidebar.classList.remove('mobile-open');
    }
    if (overlay && overlay.classList.contains('active')) {
        overlay.classList.remove('active');
    }
}

function toggleMobileSidebar() {
    const sidebar = document.querySelector('.sidebar');
    let overlay = document.querySelector('.sidebar-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        overlay.onclick = toggleMobileSidebar;
        document.body.appendChild(overlay);
    }
    if (sidebar) {
        sidebar.classList.toggle('mobile-open');
        overlay.classList.toggle('active');
    }
}

// Tailwind-style responsive helper: convert every table row to mobile cards
// without changing backend/API logic. It only adds data-label attributes.
function applyResponsiveTableLabels(root = document) {
    root.querySelectorAll('table').forEach(table => {
        const headers = Array.from(table.querySelectorAll('thead th')).map(th => th.textContent.trim());
        table.querySelectorAll('tbody tr').forEach(row => {
            Array.from(row.children).forEach((cell, index) => {
                if (!cell.getAttribute('data-label')) {
                    cell.setAttribute('data-label', headers[index] || 'Data');
                }
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    applyResponsiveTableLabels();
    const observer = new MutationObserver(() => applyResponsiveTableLabels());
    observer.observe(document.body, { childList: true, subtree: true });
});

// Refresh button helper: saat user menekan tombol Refresh sebelum submit,
// input/form pada panel aktif ikut dibersihkan supaya tidak menyimpan isian lama.
function resetFormsInPanel(panel) {
    if (!panel) return;

    panel.querySelectorAll('form').forEach(form => {
        form.reset();
        form.querySelectorAll('input, textarea, select').forEach(field => {
            field.classList.remove('is-invalid', 'is-valid', 'error', 'success');
            field.removeAttribute('aria-invalid');
        });
    });

    // Bersihkan input tunggal yang mungkin tidak berada di dalam form,
    // tapi jangan hapus field identitas pekerja otomatis.
    panel.querySelectorAll('input, textarea, select').forEach(field => {
        if (field.closest('form')) return;
        if (field.id === 'pekerjaIdInput' || field.readOnly || field.disabled) return;
        if (field.type === 'checkbox' || field.type === 'radio') {
            field.checked = false;
        } else {
            field.value = '';
        }
    });
}

function resetActivePanelForms() {
    const activePanel = document.querySelector('.info-panel.active');
    resetFormsInPanel(activePanel);
}

// Dipasang dalam fase capture supaya berjalan sebelum onclick inline seperti loadProduksi(), loadPekerja(), dll.
document.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;

    const text = (button.textContent || '').trim().toLowerCase();
    const onclick = (button.getAttribute('onclick') || '').toLowerCase();

    const isRefreshButton = text.includes('refresh') || onclick.includes('refresh');
    if (!isRefreshButton) return;

    resetActivePanelForms();
}, true);

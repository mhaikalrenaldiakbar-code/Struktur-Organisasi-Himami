package com.haikal.sopwana.production.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.haikal.sopwana.production.client.PayrollClient;
import com.haikal.sopwana.production.entity.HasilPengemasan;
import com.haikal.sopwana.production.entity.Stok;
import com.haikal.sopwana.production.repository.HasilPengemasanRepository;
import com.haikal.sopwana.production.repository.StokRepository;
import com.haikal.sopwana.production.service.ValidasiService;

@Service
@Transactional
public class ValidasiServiceImpl implements ValidasiService {

    @Autowired
    private HasilPengemasanRepository hasilRepo;

    @Autowired
    private StokRepository stokRepo;

    @Autowired
    private PayrollClient payrollClient;

    private Integer aman(Integer nilai) {
        return nilai == null ? 0 : nilai;
    }

    private void tambahKartuStok(Integer jumlahBal, Integer jumlahIkat) {
        Stok stok = new Stok();
        stok.setJumlahBal(aman(jumlahBal));
        stok.setJumlahIkat(aman(jumlahIkat));
        stokRepo.save(stok);
    }

    @Override
    public HasilPengemasan validasiHasilKerja(Long idHasil, String status, String catatan) {
        if (idHasil == null) {
            throw new IllegalArgumentException("ID hasil kemas wajib diisi");
        }

        if (status == null || status.isBlank()) {
            throw new IllegalArgumentException("Status validasi wajib diisi: VALID / DITOLAK / PENDING");
        }

        HasilPengemasan hasil = hasilRepo.findById(idHasil)
                .orElseThrow(() -> new RuntimeException("Data hasil pengemasan tidak ditemukan"));

        String statusLama = hasil.getStatusValidasi() == null
                ? "PENDING"
                : hasil.getStatusValidasi().trim().toUpperCase();

        String statusBaru = status.trim().toUpperCase();

        if (!statusBaru.equals("VALID") && !statusBaru.equals("DITOLAK") && !statusBaru.equals("PENDING")) {
            throw new IllegalArgumentException("Status hanya boleh VALID, DITOLAK, atau PENDING");
        }

        Integer jumlahIkat = aman(hasil.getJumlahIkat());

        if (!statusLama.equals("VALID") && statusBaru.equals("VALID")) {
            // Tambah stok ikat saat hasil kemas menjadi VALID.
            tambahKartuStok(0, jumlahIkat);

            // Kirim data upah otomatis ke payroll. Status awal di payroll: MENUNGGU_JADWAL.
            Long pekerjaId = hasil.getPengambilanBarang().getPekerjaId();
            payrollClient.kirimUpahOtomatis(pekerjaId, jumlahIkat, hasil.getIdHasil());

        } else if (statusLama.equals("VALID") && !statusBaru.equals("VALID")) {
            // Batalkan stok ikat yang sebelumnya sudah masuk.
            tambahKartuStok(0, -jumlahIkat);
        }

        hasil.setStatusValidasi(statusBaru);
        hasil.setCatatan(catatan);

        return hasilRepo.save(hasil);
    }

    @Override
    public List<HasilPengemasan> getHasilKerjaValidByPekerja(Long pekerjaId) {
        return hasilRepo.findValidByPekerjaId(pekerjaId);
    }
}

package com.haikal.sopwana.production.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.haikal.sopwana.production.dto.PenjualanRequest;
import com.haikal.sopwana.production.entity.Penjualan;
import com.haikal.sopwana.production.entity.Stok;
import com.haikal.sopwana.production.repository.PenjualanRepository;
import com.haikal.sopwana.production.repository.StokRepository;
import com.haikal.sopwana.production.service.PenjualanService;

@Service
@Transactional
public class PenjualanServiceImpl implements PenjualanService {

    @Autowired
    private PenjualanRepository penjualanRepository;

    @Autowired
    private StokRepository stokRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private Integer aman(Integer nilai) {
        return nilai == null ? 0 : nilai;
    }

    private void validasiAngkaPositif(Integer nilai, String namaField) {
        if (nilai == null || nilai <= 0) {
            throw new IllegalArgumentException(namaField + " harus lebih dari 0");
        }
    }

    private String trimToNull(String nilai) {
        return nilai == null || nilai.isBlank() ? null : nilai.trim();
    }

    private Integer getTotalStokIkat() {
        Integer hasil = jdbcTemplate.queryForObject(
                "SELECT COALESCE(SUM(jumlah_ikat), 0) FROM tbl_stok",
                Integer.class);

        return hasil == null ? 0 : hasil;
    }

    private void tambahKartuStok(Integer jumlahBal, Integer jumlahIkat) {
        Stok stok = new Stok();
        stok.setJumlahBal(aman(jumlahBal));
        stok.setJumlahIkat(aman(jumlahIkat));
        stokRepository.save(stok);
    }

    @Override
    public Penjualan tambahPenjualan(PenjualanRequest request) {
        if (request == null) {
            throw new IllegalArgumentException("Request penjualan tidak boleh kosong");
        }

        validasiAngkaPositif(request.getJumlahIkat(), "Jumlah ikat yang dijual");

        Integer stokIkatSekarang = getTotalStokIkat();

        if (stokIkatSekarang < request.getJumlahIkat()) {
            throw new RuntimeException(
                    "Stok ikat tidak mencukupi. Stok tersedia: " + stokIkatSekarang);
        }

        Penjualan penjualan = new Penjualan();
        penjualan.setJumlahIkat(request.getJumlahIkat());
        penjualan.setCatatan(trimToNull(request.getCatatan()));
        penjualan.setDiarsipkan(false);

        Penjualan hasilPenjualan = penjualanRepository.save(penjualan);

        tambahKartuStok(0, -request.getJumlahIkat());

        return hasilPenjualan;
    }

    @Override
    public List<Penjualan> getSemuaPenjualan() {
        return penjualanRepository.findAktifOrderByTanggalDesc();
    }

    @Override
    public List<Penjualan> getPenjualanArsip() {
        return penjualanRepository.findArsipOrderByTanggalDesc();
    }

    @Override
    public void arsipkanPenjualan(Long idPenjualan) {
        Penjualan penjualan = penjualanRepository.findById(idPenjualan)
                .orElseThrow(() -> new RuntimeException("Penjualan tidak ditemukan dengan ID: " + idPenjualan));
        penjualan.setDiarsipkan(true);
        penjualanRepository.save(penjualan);
    }
}

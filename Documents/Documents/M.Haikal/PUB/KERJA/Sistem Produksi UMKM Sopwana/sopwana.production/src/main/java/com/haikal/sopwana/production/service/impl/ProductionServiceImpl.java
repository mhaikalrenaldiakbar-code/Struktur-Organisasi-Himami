package com.haikal.sopwana.production.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.haikal.sopwana.production.dto.HasilKemasRequest;
import com.haikal.sopwana.production.dto.PengambilanRequest;
import com.haikal.sopwana.production.dto.StokResponse;
import com.haikal.sopwana.production.entity.HasilPengemasan;
import com.haikal.sopwana.production.entity.PengambilanBarang;
import com.haikal.sopwana.production.entity.Produksi;
import com.haikal.sopwana.production.entity.Stok;
import com.haikal.sopwana.production.exception.StokTidakCukupException;
import com.haikal.sopwana.production.repository.HasilPengemasanRepository;
import com.haikal.sopwana.production.repository.PengambilanBarangRepository;
import com.haikal.sopwana.production.repository.ProduksiRepository;
import com.haikal.sopwana.production.repository.StokRepository;
import com.haikal.sopwana.production.service.ProductionService;

@Service
@Transactional
public class ProductionServiceImpl implements ProductionService {

    @Autowired
    private ProduksiRepository produksiRepo;

    @Autowired
    private StokRepository stokRepo;

    @Autowired
    private PengambilanBarangRepository ambilRepo;

    @Autowired
    private HasilPengemasanRepository hasilRepo;

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

    private Integer hasilInteger(String sql) {
        Integer hasil = jdbcTemplate.queryForObject(sql, Integer.class);
        return hasil == null ? 0 : hasil;
    }

    private Integer getTotalStokBal() {
        return hasilInteger("SELECT COALESCE(SUM(jumlah_bal), 0) FROM tbl_stok");
    }

    private Integer getTotalStokIkat() {
        return hasilInteger("SELECT COALESCE(SUM(jumlah_ikat), 0) FROM tbl_stok");
    }

    private void tambahKartuStok(Integer jumlahBal, Integer jumlahIkat) {
        Stok stok = new Stok();
        stok.setJumlahBal(aman(jumlahBal));
        stok.setJumlahIkat(aman(jumlahIkat));
        stokRepo.save(stok);
    }

    @Override
    public Produksi tambahProduksi(Integer jumlahBal) {
        return tambahProduksi(jumlahBal, null);
    }

    @Override
    public Produksi tambahProduksi(Integer jumlahBal, String catatan) {
        validasiAngkaPositif(jumlahBal, "Jumlah bal produksi");

        Produksi produksi = new Produksi();
        produksi.setJumlahBal(jumlahBal);
        produksi.setCatatan(trimToNull(catatan));
        produksi.setDiarsipkan(false);

        Produksi hasilProduksi = produksiRepo.save(produksi);

        tambahKartuStok(jumlahBal, 0);

        return hasilProduksi;
    }

    @Override
    public List<Produksi> getSemuaProduksiAktif() {
        return produksiRepo.findAktifOrderByTanggalDesc();
    }

    @Override
    public List<Produksi> getProduksiArsip() {
        return produksiRepo.findArsipOrderByTanggalDesc();
    }

    @Override
    public void arsipkanProduksi(Long idProduksi) {
        Produksi produksi = produksiRepo.findById(idProduksi)
                .orElseThrow(() -> new RuntimeException("Produksi tidak ditemukan dengan ID: " + idProduksi));
        produksi.setDiarsipkan(true);
        produksiRepo.save(produksi);
    }

    @Override
    public PengambilanBarang ambilBarang(PengambilanRequest request) {
        if (request == null) {
            throw new IllegalArgumentException("Request pengambilan barang tidak boleh kosong");
        }

        if (request.getPekerjaId() == null) {
            throw new IllegalArgumentException("Pekerja ID wajib diisi");
        }

        validasiAngkaPositif(request.getJumlahBal(), "Jumlah bal yang diambil");

        Integer stokBalSekarang = getTotalStokBal();

        if (stokBalSekarang < request.getJumlahBal()) {
            throw new StokTidakCukupException(
                    "Stok bal tidak mencukupi. Stok tersedia: " + stokBalSekarang);
        }

        PengambilanBarang pengambilan = new PengambilanBarang();
        pengambilan.setPekerjaId(request.getPekerjaId());
        pengambilan.setJumlahBal(request.getJumlahBal());

        PengambilanBarang hasilPengambilan = ambilRepo.save(pengambilan);

        tambahKartuStok(-request.getJumlahBal(), 0);

        return hasilPengambilan;
    }

    @Override
    public HasilPengemasan inputHasilKemas(HasilKemasRequest request) {
        if (request == null) {
            throw new IllegalArgumentException("Request hasil kemas tidak boleh kosong");
        }

        if (request.getPengambilanId() == null) {
            throw new IllegalArgumentException("ID pengambilan wajib diisi");
        }

        validasiAngkaPositif(request.getJumlahIkat(), "Jumlah ikat hasil kemas");

        PengambilanBarang pengambilan = ambilRepo.findById(request.getPengambilanId())
                .orElseThrow(() -> new RuntimeException("Log pengambilan barang tidak ditemukan"));

        if (request.getPekerjaId() != null && !request.getPekerjaId().equals(pengambilan.getPekerjaId())) {
            throw new IllegalArgumentException(
                    "ID pengambilan ini bukan milik pekerja yang sedang login. "
                    + "Silakan gunakan ID pengambilan milik sendiri.");
        }

        int jumlahBal = aman(pengambilan.getJumlahBal());
        int wajibIkat = jumlahBal * 10;

        if (wajibIkat <= 0) {
            throw new IllegalArgumentException("Data jumlah bal pada pengambilan tidak valid.");
        }

        Long laporanAktif = hasilRepo.countAktifByPengambilanId(pengambilan.getIdPengambilan());
        if (laporanAktif != null && laporanAktif > 0) {
            throw new IllegalArgumentException(
                    "ID pengambilan ini sudah pernah dilaporkan dan masih menunggu/valid. "
                    + "Kalau laporan sebelumnya DITOLAK, baru pekerja boleh input ulang.");
        }

        if (!request.getJumlahIkat().equals(wajibIkat)) {
            throw new IllegalArgumentException(
                    "Jumlah ikat hasil kemas harus PAS sesuai standar. "
                    + jumlahBal + " bal wajib menghasilkan " + wajibIkat
                    + " ikat. Silakan input " + wajibIkat + " ikat.");
        }

        HasilPengemasan hasil = new HasilPengemasan();
        hasil.setPengambilanBarang(pengambilan);
        hasil.setJumlahIkat(request.getJumlahIkat());
        hasil.setCatatan(trimToNull(request.getCatatan()));
        hasil.setStatusValidasi("PENDING");

        return hasilRepo.save(hasil);
    }

    @Override
    public StokResponse getStokTerkini() {
        return new StokResponse(
                getTotalStokBal(),
                getTotalStokIkat());
    }
}

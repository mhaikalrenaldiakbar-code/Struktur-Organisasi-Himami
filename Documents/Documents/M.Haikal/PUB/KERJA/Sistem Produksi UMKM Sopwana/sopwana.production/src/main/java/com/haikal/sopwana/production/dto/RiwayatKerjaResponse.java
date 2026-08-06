package com.haikal.sopwana.production.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class RiwayatKerjaResponse {

    private Long idHasil;
    private Long idPekerja;
    private String namaPekerja;
    private LocalDate tanggal;
    private Integer jumlahBal;
    private Integer jumlahIkat;
    private String statusValidasi;
    private String catatan;
    private BigDecimal totalUpah;
    private String statusPembayaran;

    public RiwayatKerjaResponse() {
    }

    public RiwayatKerjaResponse(
            Long idHasil,
            Long idPekerja,
            String namaPekerja,
            LocalDate tanggal,
            Integer jumlahBal,
            Integer jumlahIkat,
            String statusValidasi,
            String catatan,
            BigDecimal totalUpah,
            String statusPembayaran
    ) {
        this.idHasil = idHasil;
        this.idPekerja = idPekerja;
        this.namaPekerja = namaPekerja;
        this.tanggal = tanggal;
        this.jumlahBal = jumlahBal;
        this.jumlahIkat = jumlahIkat;
        this.statusValidasi = statusValidasi;
        this.catatan = catatan;
        this.totalUpah = totalUpah;
        this.statusPembayaran = statusPembayaran;
    }

    public Long getIdHasil() {
        return idHasil;
    }

    public void setIdHasil(Long idHasil) {
        this.idHasil = idHasil;
    }

    public Long getIdPekerja() {
        return idPekerja;
    }

    public void setIdPekerja(Long idPekerja) {
        this.idPekerja = idPekerja;
    }

    public String getNamaPekerja() {
        return namaPekerja;
    }

    public void setNamaPekerja(String namaPekerja) {
        this.namaPekerja = namaPekerja;
    }

    public LocalDate getTanggal() {
        return tanggal;
    }

    public void setTanggal(LocalDate tanggal) {
        this.tanggal = tanggal;
    }

    public Integer getJumlahBal() {
        return jumlahBal;
    }

    public void setJumlahBal(Integer jumlahBal) {
        this.jumlahBal = jumlahBal;
    }

    public Integer getJumlahIkat() {
        return jumlahIkat;
    }

    public void setJumlahIkat(Integer jumlahIkat) {
        this.jumlahIkat = jumlahIkat;
    }

    public String getStatusValidasi() {
        return statusValidasi;
    }

    public void setStatusValidasi(String statusValidasi) {
        this.statusValidasi = statusValidasi;
    }

    public String getCatatan() {
        return catatan;
    }

    public void setCatatan(String catatan) {
        this.catatan = catatan;
    }

    public BigDecimal getTotalUpah() {
        return totalUpah;
    }

    public void setTotalUpah(BigDecimal totalUpah) {
        this.totalUpah = totalUpah;
    }

    public String getStatusPembayaran() {
        return statusPembayaran;
    }

    public void setStatusPembayaran(String statusPembayaran) {
        this.statusPembayaran = statusPembayaran;
    }
}

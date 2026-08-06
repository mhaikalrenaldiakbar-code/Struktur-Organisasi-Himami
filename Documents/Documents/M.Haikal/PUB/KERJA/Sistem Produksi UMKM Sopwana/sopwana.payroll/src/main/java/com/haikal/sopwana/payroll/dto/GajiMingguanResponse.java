package com.haikal.sopwana.payroll.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class GajiMingguanResponse {

    private Long pekerjaId;
    private String namaPekerja;
    private Integer totalIkat;
    private BigDecimal totalUpah;
    private Integer jumlahTransaksi;
    private String status;
    private LocalDate tanggalAwal;
    private LocalDate tanggalAkhir;
    private Integer mingguKe;
    private String periode;
    private LocalDate tanggalDibayar;

    public GajiMingguanResponse() {
    }

    public GajiMingguanResponse(Long pekerjaId, String namaPekerja, Integer totalIkat, BigDecimal totalUpah,
            Integer jumlahTransaksi, String status, LocalDate tanggalAwal, LocalDate tanggalAkhir, Integer mingguKe,
            String periode, LocalDate tanggalDibayar) {
        this.pekerjaId = pekerjaId;
        this.namaPekerja = namaPekerja;
        this.totalIkat = totalIkat;
        this.totalUpah = totalUpah;
        this.jumlahTransaksi = jumlahTransaksi;
        this.status = status;
        this.tanggalAwal = tanggalAwal;
        this.tanggalAkhir = tanggalAkhir;
        this.mingguKe = mingguKe;
        this.periode = periode;
        this.tanggalDibayar = tanggalDibayar;
    }

    public Long getPekerjaId() { return pekerjaId; }
    public void setPekerjaId(Long pekerjaId) { this.pekerjaId = pekerjaId; }
    public String getNamaPekerja() { return namaPekerja; }
    public void setNamaPekerja(String namaPekerja) { this.namaPekerja = namaPekerja; }
    public Integer getTotalIkat() { return totalIkat; }
    public void setTotalIkat(Integer totalIkat) { this.totalIkat = totalIkat; }
    public BigDecimal getTotalUpah() { return totalUpah; }
    public void setTotalUpah(BigDecimal totalUpah) { this.totalUpah = totalUpah; }
    public Integer getJumlahTransaksi() { return jumlahTransaksi; }
    public void setJumlahTransaksi(Integer jumlahTransaksi) { this.jumlahTransaksi = jumlahTransaksi; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDate getTanggalAwal() { return tanggalAwal; }
    public void setTanggalAwal(LocalDate tanggalAwal) { this.tanggalAwal = tanggalAwal; }
    public LocalDate getTanggalAkhir() { return tanggalAkhir; }
    public void setTanggalAkhir(LocalDate tanggalAkhir) { this.tanggalAkhir = tanggalAkhir; }
    public Integer getMingguKe() { return mingguKe; }
    public void setMingguKe(Integer mingguKe) { this.mingguKe = mingguKe; }
    public String getPeriode() { return periode; }
    public void setPeriode(String periode) { this.periode = periode; }
    public LocalDate getTanggalDibayar() { return tanggalDibayar; }
    public void setTanggalDibayar(LocalDate tanggalDibayar) { this.tanggalDibayar = tanggalDibayar; }
}

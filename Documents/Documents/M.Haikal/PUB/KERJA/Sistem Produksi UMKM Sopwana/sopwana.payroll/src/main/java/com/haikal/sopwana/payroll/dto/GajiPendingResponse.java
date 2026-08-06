package com.haikal.sopwana.payroll.dto;

import java.math.BigDecimal;

public class GajiPendingResponse {

    private Long pekerjaId;
    private String namaPekerja;
    private Integer totalIkat;
    private BigDecimal totalUpah;
    private Integer jumlahTransaksi;
    private String status;

    public GajiPendingResponse() {
    }

    public GajiPendingResponse(
            Long pekerjaId,
            String namaPekerja,
            Integer totalIkat,
            BigDecimal totalUpah,
            Integer jumlahTransaksi,
            String status) {
        this.pekerjaId = pekerjaId;
        this.namaPekerja = namaPekerja;
        this.totalIkat = totalIkat;
        this.totalUpah = totalUpah;
        this.jumlahTransaksi = jumlahTransaksi;
        this.status = status;
    }

    public Long getPekerjaId() {
        return pekerjaId;
    }

    public void setPekerjaId(Long pekerjaId) {
        this.pekerjaId = pekerjaId;
    }

    public String getNamaPekerja() {
        return namaPekerja;
    }

    public void setNamaPekerja(String namaPekerja) {
        this.namaPekerja = namaPekerja;
    }

    public Integer getTotalIkat() {
        return totalIkat;
    }

    public void setTotalIkat(Integer totalIkat) {
        this.totalIkat = totalIkat;
    }

    public BigDecimal getTotalUpah() {
        return totalUpah;
    }

    public void setTotalUpah(BigDecimal totalUpah) {
        this.totalUpah = totalUpah;
    }

    public Integer getJumlahTransaksi() {
        return jumlahTransaksi;
    }

    public void setJumlahTransaksi(Integer jumlahTransaksi) {
        this.jumlahTransaksi = jumlahTransaksi;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}

package com.haikal.sopwana.payroll.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class PembayaranMingguanResponse {

    private Long pekerjaId;
    private Integer totalIkat;
    private BigDecimal totalUpah;
    private String status;
    private LocalDate tanggalDibayar;

    public PembayaranMingguanResponse() {
    }

    public PembayaranMingguanResponse(
            Long pekerjaId,
            Integer totalIkat,
            BigDecimal totalUpah,
            String status,
            LocalDate tanggalDibayar) {
        this.pekerjaId = pekerjaId;
        this.totalIkat = totalIkat;
        this.totalUpah = totalUpah;
        this.status = status;
        this.tanggalDibayar = tanggalDibayar;
    }

    public Long getPekerjaId() {
        return pekerjaId;
    }

    public void setPekerjaId(Long pekerjaId) {
        this.pekerjaId = pekerjaId;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getTanggalDibayar() {
        return tanggalDibayar;
    }

    public void setTanggalDibayar(LocalDate tanggalDibayar) {
        this.tanggalDibayar = tanggalDibayar;
    }
}
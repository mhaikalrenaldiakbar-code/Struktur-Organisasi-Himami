package com.haikal.sopwana.payroll.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class GajiResponse {
    @SuppressWarnings("FieldMayBeFinal")
    private Long idPenggajian;
    @SuppressWarnings("FieldMayBeFinal")
    private String namaPekerja;
    @SuppressWarnings("FieldMayBeFinal")
    private BigDecimal totalUpah;
    private LocalDate tanggal;
    private String status;

    public GajiResponse(Long idPenggajian, String namaPekerja, BigDecimal totalUpah, LocalDate tanggal, String status) {
        this.idPenggajian = idPenggajian;
        this.namaPekerja = namaPekerja;
        this.totalUpah = totalUpah;
        this.tanggal = tanggal;
        this.status = status;
    }

    public GajiResponse() {
    }

    public Long getIdPenggajian() {
        return idPenggajian;
    }

    public String getNamaPekerja() {
        return namaPekerja;
    }

    public BigDecimal getTotalUpah() {
        return totalUpah;
    }

    public LocalDate getTanggal() {
        return tanggal;
    }

    public String getStatus() {
        return status;
    }
}
package com.haikal.sopwana.production.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class PengambilanRequest {

    @NotNull(message = "ID pekerja wajib diisi")
    @Min(value = 1, message = "ID pekerja tidak valid")
    private Long pekerjaId;

    @NotNull(message = "Jumlah bal wajib diisi")
    @Min(value = 1, message = "Jumlah bal minimal 1")
    private Integer jumlahBal;

    public Long getPekerjaId() { return pekerjaId; }
    public void setPekerjaId(Long pekerjaId) { this.pekerjaId = pekerjaId; }
    public Integer getJumlahBal() { return jumlahBal; }
    public void setJumlahBal(Integer jumlahBal) { this.jumlahBal = jumlahBal; }
}

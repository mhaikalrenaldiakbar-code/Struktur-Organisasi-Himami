package com.haikal.sopwana.payroll.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class TransaksiUpahRequest {

    @NotNull(message = "ID pekerja wajib diisi")
    @Min(value = 1, message = "ID pekerja tidak valid")
    private Long pekerjaId;

    @NotNull(message = "Total ikat wajib diisi")
    @Min(value = 1, message = "Total ikat minimal 1")
    private Integer totalIkat;

    @Size(max = 255, message = "Catatan maksimal 255 karakter")
    private String catatan;

    public Long getPekerjaId() { return pekerjaId; }
    public void setPekerjaId(Long pekerjaId) { this.pekerjaId = pekerjaId; }
    public Integer getTotalIkat() { return totalIkat; }
    public void setTotalIkat(Integer totalIkat) { this.totalIkat = totalIkat; }
    public String getCatatan() { return catatan; }
    public void setCatatan(String catatan) { this.catatan = catatan; }
}

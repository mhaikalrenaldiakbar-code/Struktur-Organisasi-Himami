package com.haikal.sopwana.production.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class PenjualanRequest {

    @NotNull(message = "Jumlah ikat wajib diisi")
    @Min(value = 1, message = "Jumlah ikat minimal 1")
    private Integer jumlahIkat;

    @Size(max = 255, message = "Catatan maksimal 255 karakter")
    private String catatan;

    public Integer getJumlahIkat() { return jumlahIkat; }
    public void setJumlahIkat(Integer jumlahIkat) { this.jumlahIkat = jumlahIkat; }
    public String getCatatan() { return catatan; }
    public void setCatatan(String catatan) { this.catatan = catatan; }
}

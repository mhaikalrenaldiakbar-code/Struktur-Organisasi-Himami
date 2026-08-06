package com.haikal.sopwana.production.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class ProduksiRequest {

    @NotNull(message = "Jumlah bal wajib diisi")
    @Min(value = 1, message = "Jumlah bal minimal 1")
    private Integer jumlahBal;

    @Size(max = 255, message = "Catatan maksimal 255 karakter")
    private String catatan;

    public Integer getJumlahBal() { return jumlahBal; }
    public void setJumlahBal(Integer jumlahBal) { this.jumlahBal = jumlahBal; }
    public String getCatatan() { return catatan; }
    public void setCatatan(String catatan) { this.catatan = catatan; }
}

package com.haikal.sopwana.production.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class HasilKemasRequest {

    @NotNull(message = "ID pengambilan wajib diisi")
    @Min(value = 1, message = "ID pengambilan tidak valid")
    private Long pengambilanId;

    @NotNull(message = "Jumlah ikat wajib diisi")
    @Min(value = 1, message = "Jumlah ikat minimal 1")
    private Integer jumlahIkat;

    private Long pekerjaId;

    @Size(max = 255, message = "Catatan maksimal 255 karakter")
    private String catatan;

    public Long getPengambilanId() { return pengambilanId; }
    public void setPengambilanId(Long pengambilanId) { this.pengambilanId = pengambilanId; }
    public Integer getJumlahIkat() { return jumlahIkat; }
    public void setJumlahIkat(Integer jumlahIkat) { this.jumlahIkat = jumlahIkat; }
    public Long getPekerjaId() { return pekerjaId; }
    public void setPekerjaId(Long pekerjaId) { this.pekerjaId = pekerjaId; }
    public String getCatatan() { return catatan; }
    public void setCatatan(String catatan) { this.catatan = catatan; }
}

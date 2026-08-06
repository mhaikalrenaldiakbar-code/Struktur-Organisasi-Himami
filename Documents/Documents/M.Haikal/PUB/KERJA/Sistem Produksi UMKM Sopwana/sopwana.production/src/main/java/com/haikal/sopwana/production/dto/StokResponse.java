package com.haikal.sopwana.production.dto;

public class StokResponse {
    private Integer jumlahBal;
    private Integer jumlahIkat;

    public StokResponse(Integer jumlahBal, Integer jumlahIkat) {
        this.jumlahBal = jumlahBal;
        this.jumlahIkat = jumlahIkat;
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
}
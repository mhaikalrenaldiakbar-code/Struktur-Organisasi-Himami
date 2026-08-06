package com.haikal.sopwana.production.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_stok")
public class Stok {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_stok")
    private Long idStok;

    @Column(name = "jumlah_bal")
    private Integer jumlahBal;

    @Column(name = "jumlah_ikat")
    private Integer jumlahIkat;

    public Long getIdStok() {
        return idStok;
    }

    public void setIdStok(Long idStok) {
        this.idStok = idStok;
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
package com.haikal.sopwana.production.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "tbl_produksi")
public class Produksi {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_produksi")
    private Long idProduksi;

    @Column(nullable = false)
    private LocalDate tanggal = LocalDate.now();

    @Column(name = "jumlah_bal", nullable = false)
    private Integer jumlahBal;

    @Column(name = "catatan")
    private String catatan;

    @Column(name = "diarsipkan")
    private Boolean diarsipkan = false;

    @PrePersist
    public void prePersist() {
        if (tanggal == null) tanggal = LocalDate.now();
        if (diarsipkan == null) diarsipkan = false;
    }

    public Long getIdProduksi() {
        return idProduksi;
    }

    public void setIdProduksi(Long idProduksi) {
        this.idProduksi = idProduksi;
    }

    public LocalDate getTanggal() {
        return tanggal;
    }

    public void setTanggal(LocalDate tanggal) {
        this.tanggal = tanggal;
    }

    public Integer getJumlahBal() {
        return jumlahBal;
    }

    public void setJumlahBal(Integer jumlahBal) {
        this.jumlahBal = jumlahBal;
    }

    public String getCatatan() {
        return catatan;
    }

    public void setCatatan(String catatan) {
        this.catatan = catatan;
    }

    public Boolean getDiarsipkan() {
        return diarsipkan;
    }

    public void setDiarsipkan(Boolean diarsipkan) {
        this.diarsipkan = diarsipkan;
    }
}

package com.haikal.sopwana.production.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "tbl_penjualan")
public class Penjualan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_penjualan")
    private Long idPenjualan;

    @Column(name = "tanggal")
    private LocalDate tanggal;

    @Column(name = "jumlah_ikat")
    private Integer jumlahIkat;

    @Column(name = "catatan")
    private String catatan;

    @Column(name = "diarsipkan")
    private Boolean diarsipkan = false;

    @PrePersist
    public void prePersist() {
        if (tanggal == null) {
            tanggal = LocalDate.now();
        }
        if (diarsipkan == null) {
            diarsipkan = false;
        }
    }

    public Long getIdPenjualan() {
        return idPenjualan;
    }

    public void setIdPenjualan(Long idPenjualan) {
        this.idPenjualan = idPenjualan;
    }

    public LocalDate getTanggal() {
        return tanggal;
    }

    public void setTanggal(LocalDate tanggal) {
        this.tanggal = tanggal;
    }

    public Integer getJumlahIkat() {
        return jumlahIkat;
    }

    public void setJumlahIkat(Integer jumlahIkat) {
        this.jumlahIkat = jumlahIkat;
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

package com.haikal.sopwana.production.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "tbl_pengambilan_barang")
public class PengambilanBarang {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pengambilan")
    private Long idPengambilan;

    @Column(name = "pekerja_id", nullable = false)
    private Long pekerjaId;

    @Column(name = "jumlah_bal", nullable = false)
    private Integer jumlahBal;

    @Column(nullable = false)
    private LocalDate tanggal = LocalDate.now();

    public Long getIdPengambilan() {
        return idPengambilan;
    }

    public void setIdPengambilan(Long idPengambilan) {
        this.idPengambilan = idPengambilan;
    }

    public Long getPekerjaId() {
        return pekerjaId;
    }

    public void setPekerjaId(Long pekerjaId) {
        this.pekerjaId = pekerjaId;
    }

    public Integer getJumlahBal() {
        return jumlahBal;
    }

    public void setJumlahBal(Integer jumlahBal) {
        this.jumlahBal = jumlahBal;
    }

    public LocalDate getTanggal() {
        return tanggal;
    }

    public void setTanggal(LocalDate tanggal) {
        this.tanggal = tanggal;
    }
}
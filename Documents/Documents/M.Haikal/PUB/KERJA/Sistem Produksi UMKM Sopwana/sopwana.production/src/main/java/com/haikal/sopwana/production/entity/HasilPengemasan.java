package com.haikal.sopwana.production.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_hasil_pengemasan")
public class HasilPengemasan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_hasil")
    private Long idHasil;

    @ManyToOne
    @JoinColumn(name = "pengambilan_id", nullable = false)
    private PengambilanBarang pengambilanBarang;

    @Column(name = "jumlah_ikat", nullable = false)
    private Integer jumlahIkat;

    @Column(name = "status_validasi", nullable = false, length = 20)
    private String statusValidasi = "PENDING";

    @Column(columnDefinition = "TEXT")
    private String catatan;

    public Long getIdHasil() {
        return idHasil;
    }

    public void setIdHasil(Long idHasil) {
        this.idHasil = idHasil;
    }

    public PengambilanBarang getPengambilanBarang() {
        return pengambilanBarang;
    }

    public void setPengambilanBarang(PengambilanBarang pengambilanBarang) {
        this.pengambilanBarang = pengambilanBarang;
    }

    public Integer getJumlahIkat() {
        return jumlahIkat;
    }

    public void setJumlahIkat(Integer jumlahIkat) {
        this.jumlahIkat = jumlahIkat;
    }

    public String getStatusValidasi() {
        return statusValidasi;
    }

    public void setStatusValidasi(String statusValidasi) {
        this.statusValidasi = statusValidasi;
    }

    public String getCatatan() {
        return catatan;
    }

    public void setCatatan(String catatan) {
        this.catatan = catatan;
    }
}
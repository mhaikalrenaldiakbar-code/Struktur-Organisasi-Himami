package com.haikal.sopwana.payroll.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_pekerja")
public class Pekerja {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pekerja")
    private Long idPekerja;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false, length = 100)
    private String nama;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(columnDefinition = "TEXT")
    private String alamat;

    @Column(name = "no_hp", length = 20)
    private String noHp;

    @Column(name = "diarsipkan")
    private Boolean diarsipkan = false;

    @PrePersist
    public void prePersist() {
        if (diarsipkan == null) {
            diarsipkan = false;
        }
    }

    public Long getIdPekerja() {
        return idPekerja;
    }

    public void setIdPekerja(Long idPekerja) {
        this.idPekerja = idPekerja;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getNama() {
        return nama;
    }

    public void setNama(String nama) {
        this.nama = nama;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAlamat() {
        return alamat;
    }

    public void setAlamat(String alamat) {
        this.alamat = alamat;
    }

    public String getNoHp() {
        return noHp;
    }

    public void setNoHp(String noHp) {
        this.noHp = noHp;
    }

    public Boolean getDiarsipkan() {
        return diarsipkan;
    }

    public void setDiarsipkan(Boolean diarsipkan) {
        this.diarsipkan = diarsipkan;
    }
}

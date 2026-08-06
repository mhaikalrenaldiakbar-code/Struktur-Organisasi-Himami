package com.haikal.sopwana.payroll.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;

@Entity
@Table(name = "tbl_penggajian")
public class Penggajian {

    public static final String STATUS_MENUNGGU_JADWAL = "MENUNGGU_JADWAL";
    public static final String STATUS_PENDING = "PENDING";
    // Disesuaikan dengan database kamu: status lunas tersimpan sebagai DIBAYAR.
    public static final String STATUS_SUDAH_DIBAYAR = "DIBAYAR";
    public static final BigDecimal TARIF_DEFAULT = new BigDecimal("1000");

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_penggajian")
    private Long idPenggajian;

    @ManyToOne
    @JoinColumn(name = "pekerja_id", nullable = false)
    private Pekerja pekerja;

    /*
     * PENTING:
     * Database kamu tidak memiliki kolom total_ikat dan tarif_per_ikat.
     * Karena itu dua field ini dibuat @Transient agar Hibernate tidak SELECT/INSERT kolom tersebut.
     * totalIkat tetap bisa dipakai response dengan cara dihitung dari total_upah / 1000.
     */
    @Transient
    private Integer totalIkat;

    @Transient
    private BigDecimal tarifPerIkat = TARIF_DEFAULT;

    @Column(name = "total_upah", nullable = false, precision = 12, scale = 2)
    private BigDecimal totalUpah = BigDecimal.ZERO;

    @Column(nullable = false)
    private LocalDate tanggal = LocalDate.now();

    @Column(nullable = false, length = 30)
    private String status = STATUS_MENUNGGU_JADWAL;

    @Column(name = "tanggal_dibayar")
    private LocalDate tanggalDibayar;

    @Column(name = "catatan")
    private String catatan;

    @PrePersist
    public void prePersist() {
        if (tanggal == null) tanggal = LocalDate.now();
        if (status == null || status.isBlank()) status = STATUS_MENUNGGU_JADWAL;
        if (tarifPerIkat == null) tarifPerIkat = TARIF_DEFAULT;
        if (totalUpah == null) totalUpah = BigDecimal.ZERO;
        if ((totalUpah.compareTo(BigDecimal.ZERO) == 0) && totalIkat != null && totalIkat > 0) {
            totalUpah = tarifPerIkat.multiply(BigDecimal.valueOf(totalIkat));
        }
    }

    @PreUpdate
    public void preUpdate() {
        if (tarifPerIkat == null) tarifPerIkat = TARIF_DEFAULT;
        if (totalUpah == null) totalUpah = BigDecimal.ZERO;
    }

    public Long getIdPenggajian() { return idPenggajian; }
    public void setIdPenggajian(Long idPenggajian) { this.idPenggajian = idPenggajian; }

    public Pekerja getPekerja() { return pekerja; }
    public void setPekerja(Pekerja pekerja) { this.pekerja = pekerja; }

    public Integer getTotalIkat() {
        if (totalIkat != null) return totalIkat;
        if (totalUpah == null || totalUpah.compareTo(BigDecimal.ZERO) <= 0) return 0;
        return totalUpah.divide(TARIF_DEFAULT, 0, RoundingMode.DOWN).intValue();
    }

    public void setTotalIkat(Integer totalIkat) { this.totalIkat = totalIkat; }

    public BigDecimal getTarifPerIkat() { return tarifPerIkat == null ? TARIF_DEFAULT : tarifPerIkat; }
    public void setTarifPerIkat(BigDecimal tarifPerIkat) { this.tarifPerIkat = tarifPerIkat; }

    public BigDecimal getTotalUpah() { return totalUpah; }
    public void setTotalUpah(BigDecimal totalUpah) { this.totalUpah = totalUpah; }

    public LocalDate getTanggal() { return tanggal; }
    public void setTanggal(LocalDate tanggal) { this.tanggal = tanggal; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDate getTanggalDibayar() { return tanggalDibayar; }
    public void setTanggalDibayar(LocalDate tanggalDibayar) { this.tanggalDibayar = tanggalDibayar; }

    public String getCatatan() { return catatan; }
    public void setCatatan(String catatan) { this.catatan = catatan; }
}

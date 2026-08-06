package com.haikal.sopwana.production.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.haikal.sopwana.production.entity.Penjualan;

public interface PenjualanRepository extends JpaRepository<Penjualan, Long> {

    @Query("SELECT p FROM Penjualan p WHERE p.diarsipkan = false OR p.diarsipkan IS NULL ORDER BY p.tanggal DESC, p.idPenjualan DESC")
    List<Penjualan> findAktifOrderByTanggalDesc();

    @Query("SELECT p FROM Penjualan p WHERE p.diarsipkan = true ORDER BY p.tanggal DESC, p.idPenjualan DESC")
    List<Penjualan> findArsipOrderByTanggalDesc();
}

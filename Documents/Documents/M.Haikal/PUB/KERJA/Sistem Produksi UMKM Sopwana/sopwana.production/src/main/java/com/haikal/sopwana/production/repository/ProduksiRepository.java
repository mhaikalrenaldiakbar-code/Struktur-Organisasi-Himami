package com.haikal.sopwana.production.repository;

import com.haikal.sopwana.production.entity.Produksi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProduksiRepository extends JpaRepository<Produksi, Long> {

    @Query("SELECT p FROM Produksi p WHERE p.diarsipkan = false OR p.diarsipkan IS NULL ORDER BY p.tanggal DESC, p.idProduksi DESC")
    List<Produksi> findAktifOrderByTanggalDesc();

    @Query("SELECT p FROM Produksi p WHERE p.diarsipkan = true ORDER BY p.tanggal DESC, p.idProduksi DESC")
    List<Produksi> findArsipOrderByTanggalDesc();
}

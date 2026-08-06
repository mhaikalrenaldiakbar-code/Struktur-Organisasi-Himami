package com.haikal.sopwana.production.repository;

import com.haikal.sopwana.production.entity.PengambilanBarang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PengambilanBarangRepository extends JpaRepository<PengambilanBarang, Long> {
}
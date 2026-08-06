package com.haikal.sopwana.production.repository;

import com.haikal.sopwana.production.entity.Stok;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StokRepository extends JpaRepository<Stok, Long> {
}
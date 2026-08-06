package com.haikal.sopwana.production.repository;

import com.haikal.sopwana.production.entity.HasilPengemasan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface HasilPengemasanRepository extends JpaRepository<HasilPengemasan, Long> {

    @Query("SELECT h FROM HasilPengemasan h WHERE h.pengambilanBarang.pekerjaId = :pekerjaId AND h.statusValidasi = 'VALID'")
    List<HasilPengemasan> findValidByPekerjaId(@Param("pekerjaId") Long pekerjaId);

    @Query("SELECT COALESCE(SUM(h.jumlahIkat), 0) FROM HasilPengemasan h WHERE h.pengambilanBarang.idPengambilan = :pengambilanId AND UPPER(TRIM(h.statusValidasi)) <> 'DITOLAK'")
    Integer sumJumlahIkatByPengambilanId(@Param("pengambilanId") Long pengambilanId);

    @Query("SELECT COUNT(h) FROM HasilPengemasan h WHERE h.pengambilanBarang.idPengambilan = :pengambilanId AND UPPER(TRIM(h.statusValidasi)) <> 'DITOLAK'")
    Long countAktifByPengambilanId(@Param("pengambilanId") Long pengambilanId);
}
package com.haikal.sopwana.payroll.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.haikal.sopwana.payroll.entity.Pekerja;

public interface PekerjaRepository extends JpaRepository<Pekerja, Long> {

    @Query("SELECT p FROM Pekerja p WHERE p.diarsipkan = false OR p.diarsipkan IS NULL ORDER BY p.idPekerja ASC")
    List<Pekerja> findAktifOrderByIdPekerjaAsc();

    @Query("SELECT p FROM Pekerja p WHERE p.diarsipkan = true ORDER BY p.idPekerja ASC")
    List<Pekerja> findArsipOrderByIdPekerjaAsc();


    Optional<Pekerja> findByUserUsername(String username);

    Optional<Pekerja> findByUserIdUser(Long idUser);


    /**
     * Dipakai untuk dashboard pekerja: cari id_pekerja berdasarkan akun yang sedang login.
     * Query native ini dibuat LIMIT 1 supaya aman walaupun data lama pernah dobel saat testing.
     */
    @Query(value = """
            SELECT p.*
            FROM tbl_pekerja p
            JOIN tbl_users u ON p.user_id = u.id_user
            WHERE LOWER(u.username) = LOWER(:username)
              AND (p.diarsipkan = false OR p.diarsipkan IS NULL)
            ORDER BY p.id_pekerja ASC
            LIMIT 1
            """, nativeQuery = true)
    Optional<Pekerja> findLoginPekerjaByUsername(@Param("username") String username);

    /**
     * Fallback untuk data lama jika relasi user_id belum tersambung,
     * tetapi nama pekerja sama dengan username login.
     */
    @Query(value = """
            SELECT p.*
            FROM tbl_pekerja p
            WHERE LOWER(p.nama) = LOWER(:username)
              AND (p.diarsipkan = false OR p.diarsipkan IS NULL)
            ORDER BY p.id_pekerja ASC
            LIMIT 1
            """, nativeQuery = true)
    Optional<Pekerja> findLoginPekerjaByNamaFallback(@Param("username") String username);

    boolean existsByEmailIgnoreCase(String email);

    boolean existsByEmailIgnoreCaseAndIdPekerjaNot(String email, Long idPekerja);
}

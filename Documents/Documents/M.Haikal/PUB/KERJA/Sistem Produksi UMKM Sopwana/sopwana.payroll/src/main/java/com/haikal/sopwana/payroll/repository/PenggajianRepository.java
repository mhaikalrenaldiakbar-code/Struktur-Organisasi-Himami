package com.haikal.sopwana.payroll.repository;

import com.haikal.sopwana.payroll.entity.Penggajian;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PenggajianRepository extends JpaRepository<Penggajian, Long> {

    // Ambil semua data berdasarkan status
    // Contoh: MENUNGGU_JADWAL, PENDING, SUDAH_DIBAYAR
    List<Penggajian> findByStatus(String status);

    // Ambil transaksi gaji pekerja berdasarkan status tertentu
    // Dipakai saat bayar mingguan: cari semua PENDING milik pekerja
    List<Penggajian> findByPekerjaIdPekerjaAndStatus(Long pekerjaId, String status);

    // Riwayat gaji pekerja dari terbaru
    List<Penggajian> findByPekerjaIdPekerjaOrderByTanggalDesc(Long pekerjaId);

    // Ambil semua transaksi pending
    List<Penggajian> findByStatusOrderByTanggalDesc(String status);

    // Ambil riwayat berdasarkan pekerja dan status dari terbaru
    List<Penggajian> findByPekerjaIdPekerjaAndStatusOrderByTanggalDesc(Long pekerjaId, String status);

    @Query("""
            SELECT g FROM Penggajian g
            JOIN FETCH g.pekerja p
            WHERE g.tanggal BETWEEN :tanggalAwal AND :tanggalAkhir
            ORDER BY p.idPekerja ASC, g.tanggal ASC, g.idPenggajian ASC
            """)
    List<Penggajian> findByTanggalBetweenOrderByPekerjaIdPekerjaAscTanggalAsc(
            @Param("tanggalAwal") LocalDate tanggalAwal,
            @Param("tanggalAkhir") LocalDate tanggalAkhir);

    @Query("""
            SELECT g FROM Penggajian g
            JOIN FETCH g.pekerja p
            WHERE p.idPekerja = :pekerjaId
              AND g.status = :status
              AND g.tanggal BETWEEN :tanggalAwal AND :tanggalAkhir
            ORDER BY g.tanggal ASC, g.idPenggajian ASC
            """)
    List<Penggajian> findByPekerjaIdPekerjaAndStatusAndTanggalBetween(
            @Param("pekerjaId") Long pekerjaId,
            @Param("status") String status,
            @Param("tanggalAwal") LocalDate tanggalAwal,
            @Param("tanggalAkhir") LocalDate tanggalAkhir);

    @Query("""
            SELECT g FROM Penggajian g
            JOIN FETCH g.pekerja p
            WHERE p.idPekerja = :pekerjaId
              AND g.tanggal BETWEEN :tanggalAwal AND :tanggalAkhir
            ORDER BY g.tanggal DESC, g.idPenggajian DESC
            """)
    List<Penggajian> findByPekerjaIdPekerjaAndTanggalBetweenOrderByTanggalDesc(
            @Param("pekerjaId") Long pekerjaId,
            @Param("tanggalAwal") LocalDate tanggalAwal,
            @Param("tanggalAkhir") LocalDate tanggalAkhir);

    @Query(value = """
            SELECT COALESCE(SUM(pb.jumlah_bal), 0)
            FROM tbl_hasil_pengemasan hp
            JOIN tbl_pengambilan_barang pb ON hp.pengambilan_id = pb.id_pengambilan
            WHERE pb.pekerja_id = :pekerjaId
              AND hp.status_validasi = 'VALID'
              AND pb.tanggal BETWEEN :tanggalAwal AND :tanggalAkhir
            """, nativeQuery = true)
    Integer countTotalBalByPekerjaIdAndTanggalBetween(
            @Param("pekerjaId") Long pekerjaId,
            @Param("tanggalAwal") LocalDate tanggalAwal,
            @Param("tanggalAkhir") LocalDate tanggalAkhir);
}

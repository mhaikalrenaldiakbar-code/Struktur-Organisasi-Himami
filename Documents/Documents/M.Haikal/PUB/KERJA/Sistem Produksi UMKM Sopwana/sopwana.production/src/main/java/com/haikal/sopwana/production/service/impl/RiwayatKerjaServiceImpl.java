package com.haikal.sopwana.production.service.impl;

import com.haikal.sopwana.production.dto.RiwayatKerjaResponse;
import com.haikal.sopwana.production.service.RiwayatKerjaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Service
public class RiwayatKerjaServiceImpl implements RiwayatKerjaService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    /*
     * Riwayat kerja tidak disimpan dalam satu tabel khusus.
     * Data riwayat dibentuk dari gabungan:
     * - tbl_hasil_pengemasan    : hasil ikat, status validasi, catatan
     * - tbl_pengambilan_barang  : tanggal kerja, bal yang diambil, pekerja_id
     * - tbl_pekerja             : nama pekerja
     * - tbl_penggajian          : status pembayaran dan total upah
     */
    private static final String BASE_QUERY = """
            SELECT
                hp.id_hasil,
                p.id_pekerja,
                p.nama AS nama_pekerja,
                pb.tanggal,
                pb.jumlah_bal,
                hp.jumlah_ikat,
                hp.status_validasi,
                hp.catatan,
                CASE
                    WHEN hp.status_validasi = 'VALID' THEN hp.jumlah_ikat * 1000
                    ELSE 0
                END AS total_upah,
                'DILIHAT_DI_MENU_UPAH' AS status_pembayaran
            FROM tbl_hasil_pengemasan hp
            JOIN tbl_pengambilan_barang pb
                ON hp.pengambilan_id = pb.id_pengambilan
            JOIN tbl_pekerja p
                ON pb.pekerja_id = p.id_pekerja
            WHERE UPPER(TRIM(hp.status_validasi)) <> 'DITOLAK'
            """;

    @Override
    public List<RiwayatKerjaResponse> getSemuaRiwayatKerja() {
        String sql = BASE_QUERY + """
                ORDER BY pb.tanggal DESC, hp.id_hasil DESC
                """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> mapToResponse(rs));
    }

    @Override
    public List<RiwayatKerjaResponse> getRiwayatKerjaByPekerja(Long pekerjaId) {
        if (pekerjaId == null) {
            throw new IllegalArgumentException("ID pekerja wajib diisi");
        }

        String sql = BASE_QUERY + """
                AND p.id_pekerja = ?
                ORDER BY pb.tanggal DESC, hp.id_hasil DESC
                """;

        return jdbcTemplate.query(sql, (rs, rowNum) -> mapToResponse(rs), pekerjaId);
    }

    private RiwayatKerjaResponse mapToResponse(java.sql.ResultSet rs) throws java.sql.SQLException {
        BigDecimal totalUpah = rs.getBigDecimal("total_upah");

        return new RiwayatKerjaResponse(
                rs.getLong("id_hasil"),
                rs.getLong("id_pekerja"),
                rs.getString("nama_pekerja"),
                toLocalDate(rs.getDate("tanggal")),
                rs.getInt("jumlah_bal"),
                rs.getInt("jumlah_ikat"),
                rs.getString("status_validasi"),
                rs.getString("catatan"),
                totalUpah == null ? BigDecimal.ZERO : totalUpah,
                rs.getString("status_pembayaran")
        );
    }

    private LocalDate toLocalDate(Date date) {
        return date == null ? null : date.toLocalDate();
    }
}

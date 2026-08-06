package com.haikal.sopwana.payroll.controller;

import com.haikal.sopwana.payroll.dto.GajiPendingResponse;
import com.haikal.sopwana.payroll.dto.GajiMingguanResponse;
import com.haikal.sopwana.payroll.dto.PembayaranMingguanResponse;
import com.haikal.sopwana.payroll.dto.TransaksiUpahRequest;
import com.haikal.sopwana.payroll.entity.Penggajian;
import com.haikal.sopwana.payroll.service.PenggajianService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payroll/transaksi")
public class TransaksiController {

    @Autowired
    private PenggajianService penggajianService;

    /*
     * Dipanggil Production Service saat hasil kemas divalidasi VALID.
     * Payroll membuat data gaji status awal MENUNGGU_JADWAL.
     */
    @PostMapping("/upload")
    public ResponseEntity<Penggajian> uploadTransaksiHarian(@Valid @RequestBody TransaksiUpahRequest request) {
        Penggajian hasil = penggajianService.catatTransaksiUpah(request);
        return ResponseEntity.ok(hasil);
    }

    /*
     * Dipakai dashboard pemilik.
     * Data PENDING digabung per pekerja agar tabel penggajian tampil rapi.
     */
    @GetMapping("/pending")
    public ResponseEntity<List<GajiPendingResponse>> getPending() {
        List<Penggajian> dataPending = penggajianService.getTransaksiPending();
        Map<Long, GajiPendingResponse> grouped = new LinkedHashMap<>();

        for (Penggajian gaji : dataPending) {
            if (gaji.getPekerja() == null || gaji.getPekerja().getIdPekerja() == null) {
                continue;
            }

            Long pekerjaId = gaji.getPekerja().getIdPekerja();
            String namaPekerja = gaji.getPekerja().getNama();
            Integer totalIkat = gaji.getTotalIkat() == null ? 0 : gaji.getTotalIkat();
            BigDecimal totalUpah = gaji.getTotalUpah() == null ? BigDecimal.ZERO : gaji.getTotalUpah();

            GajiPendingResponse item = grouped.get(pekerjaId);
            if (item == null) {
                item = new GajiPendingResponse(
                        pekerjaId,
                        namaPekerja,
                        0,
                        BigDecimal.ZERO,
                        0,
                        "PENDING");
                grouped.put(pekerjaId, item);
            }

            item.setTotalIkat(item.getTotalIkat() + totalIkat);
            item.setTotalUpah(item.getTotalUpah().add(totalUpah));
            item.setJumlahTransaksi(item.getJumlahTransaksi() + 1);
        }

        return ResponseEntity.ok(new ArrayList<>(grouped.values()));
    }


    /*
     * Rekap penggajian mingguan untuk dashboard pemilik.
     * Berisi total hasil kerja VALID yang sudah masuk payroll, dikelompokkan per pekerja.
     * Default: minggu berjalan (Senin-Minggu).
     */
    @GetMapping("/rekap-mingguan")
    public ResponseEntity<List<GajiMingguanResponse>> getRekapMingguan(
            @RequestParam(required = false) String tanggalAwal,
            @RequestParam(required = false) String tanggalAkhir) {

        LocalDate awal = tanggalAwal == null || tanggalAwal.isBlank() ? null : LocalDate.parse(tanggalAwal);
        LocalDate akhir = tanggalAkhir == null || tanggalAkhir.isBlank() ? null : LocalDate.parse(tanggalAkhir);

        return ResponseEntity.ok(penggajianService.getRekapGajiMingguan(awal, akhir));
    }

    /*
     * Riwayat upah pekerja dalam bentuk rekap per minggu.
     */
    @GetMapping("/riwayat-mingguan/pekerja/{pekerjaId}")
    public ResponseEntity<List<GajiMingguanResponse>> getRiwayatMingguanPekerja(@PathVariable Long pekerjaId) {
        return ResponseEntity.ok(penggajianService.getRiwayatGajiMingguanPekerja(pekerjaId));
    }

    /*
     * Dipakai dashboard pekerja untuk melihat riwayat upah dari tabel payroll.
     */
    @GetMapping("/pekerja/{pekerjaId}")
    public ResponseEntity<List<Penggajian>> getRiwayatPekerja(@PathVariable Long pekerjaId) {
        return ResponseEntity.ok(penggajianService.getRiwayatPekerja(pekerjaId));
    }

    /*
     * Pemilik klik Konfirmasi Bayar.
     * Semua PENDING pekerja tersebut menjadi SUDAH_DIBAYAR dan slip email dikirim dari service.
     */
    @PutMapping("/siapkan-pending/{pekerjaId}")
    public ResponseEntity<PembayaranMingguanResponse> siapkanPendingMingguan(
            @PathVariable Long pekerjaId,
            @RequestParam(required = false) Integer totalIkat) {
        return ResponseEntity.ok(penggajianService.siapkanPendingMingguan(pekerjaId, totalIkat));
    }

    @PutMapping("/bayar-mingguan/{pekerjaId}")
    public ResponseEntity<PembayaranMingguanResponse> bayarMingguan(
            @PathVariable Long pekerjaId,
            @RequestParam(required = false) Integer totalIkat) {
        return ResponseEntity.ok(penggajianService.bayarMingguan(pekerjaId, totalIkat));
    }

    /*
     * Testing hari Sabtu.
     * Mengubah semua MENUNGGU_JADWAL menjadi PENDING.
     */
    @PutMapping("/testing/munculkan-gaji")
    public ResponseEntity<String> munculkanGajiTesting() {
        penggajianService.munculkanGajiMingguan();
        return ResponseEntity.ok("Gaji mingguan berhasil dimunculkan untuk testing.");
    }
}

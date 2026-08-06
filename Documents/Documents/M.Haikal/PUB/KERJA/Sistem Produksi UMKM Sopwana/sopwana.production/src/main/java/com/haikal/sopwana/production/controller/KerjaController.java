package com.haikal.sopwana.production.controller;

import com.haikal.sopwana.production.config.JwtAuthenticationFilter;
import com.haikal.sopwana.production.dto.HasilKemasRequest;
import com.haikal.sopwana.production.dto.PengambilanRequest;
import com.haikal.sopwana.production.entity.HasilPengemasan;
import com.haikal.sopwana.production.entity.PengambilanBarang;
import com.haikal.sopwana.production.repository.PengambilanBarangRepository;
import com.haikal.sopwana.production.service.ProductionService;
import com.haikal.sopwana.production.service.ValidasiService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/production/kerja")
public class KerjaController {

    @Autowired private ProductionService            prodService;
    @Autowired private ValidasiService              valService;
    @Autowired private PengambilanBarangRepository  ambilRepo;

    // ─────────────────────────────────────────────────────────────
    // PERBAIKAN UTAMA:
    //
    // SEBELUM:
    //   Frontend mengirim pekerjaId di dalam body request.
    //   Masalah: Pekerja bisa saja mengubah pekerjaId di browser
    //   dan mengklaim data milik pekerja lain.
    //
    // SESUDAH:
    //   pekerjaId dibaca dari klaim JWT (yang ditanam saat login).
    //   Filter JwtAuthenticationFilter sudah mengekstrak dan
    //   menyimpannya di request attribute "pekerjaIdFromToken".
    //
    //   Controller tinggal panggil getPekerjaIdDariToken(request).
    //   Kalau token tidak punya pekerja_id (misal PEMILIK login),
    //   baru lihat dari body — ini untuk endpoint yang juga dipanggil
    //   PEMILIK saat audit/validasi.
    // ─────────────────────────────────────────────────────────────

    @PostMapping("/ambil-barang")
    public ResponseEntity<PengambilanBarang> ambilBarang(
            @Valid @RequestBody PengambilanRequest req,
            HttpServletRequest request) {

        // Pekerja ID dari JWT menggantikan pekerjaId dari body
        Long pekerjaIdFromToken = getPekerjaIdDariToken(request);
        if (pekerjaIdFromToken != null) {
            req.setPekerjaId(pekerjaIdFromToken);
        }

        return ResponseEntity.ok(prodService.ambilBarang(req));
    }

    @PostMapping("/laporkan-kemas")
    public ResponseEntity<HasilPengemasan> laporkanKemas(
            @Valid @RequestBody HasilKemasRequest req,
            HttpServletRequest request) {

        // Pekerja ID dari JWT menggantikan pekerjaId dari body
        Long pekerjaIdFromToken = getPekerjaIdDariToken(request);
        if (pekerjaIdFromToken != null) {
            req.setPekerjaId(pekerjaIdFromToken);
        }

        return ResponseEntity.ok(prodService.inputHasilKemas(req));
    }

    @GetMapping("/pengambilan/{idPengambilan}")
    public ResponseEntity<PengambilanBarang> detailPengambilan(
            @PathVariable Long idPengambilan) {
        PengambilanBarang data = ambilRepo.findById(idPengambilan)
                .orElseThrow(() -> new RuntimeException("Data pengambilan tidak ditemukan"));
        return ResponseEntity.ok(data);
    }

    @PutMapping({
        "/validasi/{idHasil}",
        "/validasi/hasil/{idHasil}",
        "/hasil/validasi/{idHasil}",
        "/validasi-hasil/{idHasil}"
    })
    public ResponseEntity<HasilPengemasan> validasiKerja(
            @PathVariable Long idHasil,
            @RequestParam String status,
            @RequestParam(required = false) String catatan) {
        return ResponseEntity.ok(valService.validasiHasilKerja(idHasil, status, catatan));
    }

    @PutMapping("/validasi")
    public ResponseEntity<HasilPengemasan> validasiKerjaQueryParam(
            @RequestParam Long idHasil,
            @RequestParam String status,
            @RequestParam(required = false) String catatan) {
        return ResponseEntity.ok(valService.validasiHasilKerja(idHasil, status, catatan));
    }

    @GetMapping("/pekerja/{pekerjaId}/valid")
    public ResponseEntity<List<HasilPengemasan>> ambilKerjaValidKaryawan(
            @PathVariable Long pekerjaId) {
        return ResponseEntity.ok(valService.getHasilKerjaValidByPekerja(pekerjaId));
    }

    // ─── Helper: baca pekerjaId dari request attribute ────────────
    /**
     * Baca pekerjaId yang sudah diinject oleh JwtAuthenticationFilter
     * dari klaim JWT. Mengembalikan null jika token tidak membawa klaim
     * ini (misalnya token milik PEMILIK/ADMIN).
     */
    private Long getPekerjaIdDariToken(HttpServletRequest request) {
        Object attr = request.getAttribute(JwtAuthenticationFilter.ATTR_PEKERJA_ID);
        if (attr instanceof Long)    return (Long) attr;
        if (attr instanceof Integer) return ((Integer) attr).longValue();
        if (attr instanceof Number)  return ((Number) attr).longValue();
        return null;
    }
}

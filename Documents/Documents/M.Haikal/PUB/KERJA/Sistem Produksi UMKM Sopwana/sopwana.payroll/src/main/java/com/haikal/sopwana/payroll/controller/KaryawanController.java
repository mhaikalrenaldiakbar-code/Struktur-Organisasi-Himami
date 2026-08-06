package com.haikal.sopwana.payroll.controller;

import java.util.List;
import java.util.Optional;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.haikal.sopwana.payroll.dto.PekerjaDto;
import com.haikal.sopwana.payroll.entity.Pekerja;
import com.haikal.sopwana.payroll.repository.PekerjaRepository;
import com.haikal.sopwana.payroll.service.ExcelService;
import com.haikal.sopwana.payroll.service.PenggajianService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/payroll/pekerja")
public class KaryawanController {

    @Autowired
    private PenggajianService pService;

    @Autowired
    private ExcelService excelService;

    @Autowired
    private PekerjaRepository pekerjaRepository;

    @PostMapping("/daftar")
    public ResponseEntity<Pekerja> daftarPekerja(@Valid @RequestBody PekerjaDto dto) {
        return ResponseEntity.ok(pService.registrasiPekerja(dto));
    }


    /**
     * Endpoint khusus dashboard pekerja.
     * Setelah pekerja login, frontend memanggil endpoint ini untuk mengambil
     * id_pekerja dari tabel tbl_pekerja berdasarkan username token.
     * Jadi pekerja tidak perlu input ID manual dan data tidak ketabrak pekerja lain.
     */
    @GetMapping("/me")
    public ResponseEntity<?> pekerjaLoginSaya(Authentication authentication) {
        if (authentication == null || authentication.getName() == null || authentication.getName().isBlank()) {
            return ResponseEntity.status(401).body("Token login tidak terbaca. Silakan login ulang.");
        }

        String username = authentication.getName();

        Optional<Pekerja> pekerja = pekerjaRepository.findLoginPekerjaByUsername(username)
                .or(() -> pekerjaRepository.findLoginPekerjaByNamaFallback(username));

        if (pekerja.isEmpty()) {
            return ResponseEntity.badRequest().body(
                    "Akun login '" + username + "' belum terhubung dengan data pekerja. " +
                    "Pastikan pekerja dibuat dari menu Kelola Pekerja dan tbl_pekerja.user_id mengarah ke tbl_users.id_user.");
        }

        Pekerja p = pekerja.get();
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("idPekerja", p.getIdPekerja());
        body.put("nama", p.getNama());
        body.put("email", p.getEmail());
        body.put("noHp", p.getNoHp());
        body.put("alamat", p.getAlamat());
        body.put("username", username);
        return ResponseEntity.ok(body);
    }

    @GetMapping("/semua")
    public ResponseEntity<List<Pekerja>> dapatkanSemua() {
        return ResponseEntity.ok(pService.dapatkanSemuaPekerja());
    }

    @GetMapping("/arsip")
    public ResponseEntity<List<Pekerja>> dapatkanArsipPekerja() {
        return ResponseEntity.ok(pService.dapatkanPekerjaDiarsipkan());
    }

    @GetMapping("/{idPekerja}")
    public ResponseEntity<?> dapatkanPekerjaById(@PathVariable Long idPekerja) {
        Optional<Pekerja> pekerja = pekerjaRepository.findById(idPekerja);

        if (pekerja.isEmpty()) {
            return ResponseEntity
                    .badRequest()
                    .body("Pekerja dengan ID " + idPekerja + " tidak ditemukan");
        }

        return ResponseEntity.ok(pekerja.get());
    }

    @PutMapping("/{idPekerja}")
    public ResponseEntity<Pekerja> updatePekerja(@PathVariable Long idPekerja, @Valid @RequestBody PekerjaDto dto) {
        return ResponseEntity.ok(pService.updatePekerja(idPekerja, dto));
    }

    /*
     * Hapus pekerja di sini memakai konsep arsip/nonaktif.
     * Data lama tetap aman untuk riwayat kerja dan penggajian.
     */
    @DeleteMapping("/{idPekerja}")
    public ResponseEntity<String> arsipkanPekerja(@PathVariable Long idPekerja) {
        pService.arsipkanPekerja(idPekerja);
        return ResponseEntity.ok("Pekerja berhasil diarsipkan/nonaktif.");
    }

    @PostMapping("/import-excel")
    public ResponseEntity<String> uploadExcelWorkers(@RequestParam("file") MultipartFile file) {
        excelService.importPekerja(file);
        return ResponseEntity.ok("Data massal pekerja dari file Excel berhasil dimasukkan!");
    }
}

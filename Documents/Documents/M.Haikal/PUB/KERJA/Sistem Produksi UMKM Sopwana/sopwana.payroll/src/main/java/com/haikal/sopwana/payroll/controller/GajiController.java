package com.haikal.sopwana.payroll.controller;

import com.haikal.sopwana.payroll.entity.Penggajian;
import com.haikal.sopwana.payroll.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;

@RestController
@RequestMapping("/api/payroll/gaji")
public class GajiController {

    @Autowired
    private PenggajianService gajiService;
    @Autowired
    private ExcelService excelService;

    @PostMapping("/hitung-bayar")
    public ResponseEntity<Penggajian> eksekusiGaji(@RequestParam Long pekerjaId, @RequestParam Integer totalIkat) {
        return ResponseEntity.ok(gajiService.hitungDanBayarGaji(pekerjaId, totalIkat));
    }

    @GetMapping("/download-excel")
    public ResponseEntity<Resource> downloadLaporanExcel() {
        String filename = "laporan_penggajian_sopwana.xlsx";
        InputStreamResource file = new InputStreamResource(excelService.exportLaporanGaji());

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                .contentType(
                        MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(file);
    }

    @GetMapping("/download-excel/minggu-ini")
    public ResponseEntity<Resource> downloadLaporanExcelMingguIni() {
        LocalDate[] periode = periodeMingguIni();
        String filename = "laporan_penggajian_sopwana_" + periode[0] + "_sd_" + periode[1] + ".xlsx";
        InputStreamResource file = new InputStreamResource(excelService.exportLaporanGaji(periode[0], periode[1]));

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                .contentType(
                        MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(file);
    }

    @GetMapping("/download-excel/periode")
    public ResponseEntity<Resource> downloadLaporanExcelPeriode(
            @RequestParam String tanggalAwal,
            @RequestParam String tanggalAkhir) {
        LocalDate awal = LocalDate.parse(tanggalAwal);
        LocalDate akhir = LocalDate.parse(tanggalAkhir);
        String filename = "laporan_penggajian_sopwana_" + awal + "_sd_" + akhir + ".xlsx";
        InputStreamResource file = new InputStreamResource(excelService.exportLaporanGaji(awal, akhir));

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                .contentType(
                        MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(file);
    }

    private LocalDate[] periodeMingguIni() {
        LocalDate hariIni = LocalDate.now();
        LocalDate awal = hariIni.with(TemporalAdjusters.previousOrSame(DayOfWeek.SUNDAY));
        LocalDate akhir = awal.plusDays(6);
        return new LocalDate[] { awal, akhir };
    }
}
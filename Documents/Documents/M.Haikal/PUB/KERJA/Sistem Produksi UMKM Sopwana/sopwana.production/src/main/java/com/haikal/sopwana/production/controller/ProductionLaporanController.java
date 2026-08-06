package com.haikal.sopwana.production.controller;

import com.haikal.sopwana.production.service.ProductionExcelService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;

@RestController
@RequestMapping("/api/production/laporan")
public class ProductionLaporanController {

    @Autowired
    private ProductionExcelService productionExcelService;

    @GetMapping("/download-excel")
    public ResponseEntity<InputStreamResource> downloadExcelProduction() {
        ByteArrayInputStream stream = productionExcelService.downloadLaporanProduction();

        HttpHeaders headers = new HttpHeaders();
        headers.add(
                "Content-Disposition",
                "attachment; filename=laporan_production_sopwana.xlsx");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.parseMediaType(
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(new InputStreamResource(stream));
    }

    @GetMapping("/download-excel/minggu-ini")
    public ResponseEntity<InputStreamResource> downloadExcelProductionMingguIni() {
        LocalDate[] periode = periodeMingguIni();
        ByteArrayInputStream stream = productionExcelService.downloadLaporanProduction(periode[0], periode[1]);

        HttpHeaders headers = new HttpHeaders();
        headers.add(
                "Content-Disposition",
                "attachment; filename=laporan_production_sopwana_" + periode[0] + "_sd_" + periode[1] + ".xlsx");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.parseMediaType(
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(new InputStreamResource(stream));
    }

    @GetMapping("/download-excel/periode")
    public ResponseEntity<InputStreamResource> downloadExcelProductionPeriode(
            @RequestParam String tanggalAwal,
            @RequestParam String tanggalAkhir) {
        LocalDate awal = LocalDate.parse(tanggalAwal);
        LocalDate akhir = LocalDate.parse(tanggalAkhir);
        ByteArrayInputStream stream = productionExcelService.downloadLaporanProduction(awal, akhir);

        HttpHeaders headers = new HttpHeaders();
        headers.add(
                "Content-Disposition",
                "attachment; filename=laporan_production_sopwana_" + awal + "_sd_" + akhir + ".xlsx");

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.parseMediaType(
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(new InputStreamResource(stream));
    }

    private LocalDate[] periodeMingguIni() {
        LocalDate hariIni = LocalDate.now();
        LocalDate awal = hariIni.with(TemporalAdjusters.previousOrSame(DayOfWeek.SUNDAY));
        LocalDate akhir = awal.plusDays(6);
        return new LocalDate[] { awal, akhir };
    }
}
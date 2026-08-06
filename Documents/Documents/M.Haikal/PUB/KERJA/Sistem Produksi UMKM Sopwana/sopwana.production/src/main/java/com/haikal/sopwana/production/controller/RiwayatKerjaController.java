package com.haikal.sopwana.production.controller;

import com.haikal.sopwana.production.dto.RiwayatKerjaResponse;
import com.haikal.sopwana.production.service.RiwayatKerjaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/production/kerja/riwayat")
public class RiwayatKerjaController {

    @Autowired
    private RiwayatKerjaService riwayatKerjaService;

    // Pemilik/Admin: melihat semua riwayat hasil kerja pekerja.
    @GetMapping
    public ResponseEntity<List<RiwayatKerjaResponse>> getSemuaRiwayatKerja() {
        return ResponseEntity.ok(riwayatKerjaService.getSemuaRiwayatKerja());
    }

    // Pekerja/Pemilik/Admin: melihat riwayat hasil kerja berdasarkan ID pekerja.
    @GetMapping("/pekerja/{pekerjaId}")
    public ResponseEntity<List<RiwayatKerjaResponse>> getRiwayatKerjaByPekerja(@PathVariable Long pekerjaId) {
        return ResponseEntity.ok(riwayatKerjaService.getRiwayatKerjaByPekerja(pekerjaId));
    }
}

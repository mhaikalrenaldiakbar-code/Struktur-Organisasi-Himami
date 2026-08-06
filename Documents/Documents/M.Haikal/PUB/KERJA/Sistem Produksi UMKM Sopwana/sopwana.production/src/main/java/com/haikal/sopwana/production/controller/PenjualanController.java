package com.haikal.sopwana.production.controller;

import com.haikal.sopwana.production.dto.PenjualanRequest;
import com.haikal.sopwana.production.entity.Penjualan;
import com.haikal.sopwana.production.service.PenjualanService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/production/penjualan")
public class PenjualanController {

    @Autowired
    private PenjualanService penjualanService;

    @PostMapping("/tambah")
    public ResponseEntity<Penjualan> tambahPenjualan(@Valid @RequestBody PenjualanRequest request) {
        return ResponseEntity.ok(penjualanService.tambahPenjualan(request));
    }

    @GetMapping("/semua")
    public ResponseEntity<List<Penjualan>> getSemuaPenjualan() {
        return ResponseEntity.ok(penjualanService.getSemuaPenjualan());
    }

    @GetMapping("/arsip")
    public ResponseEntity<List<Penjualan>> getPenjualanArsip() {
        return ResponseEntity.ok(penjualanService.getPenjualanArsip());
    }

    @PutMapping("/arsip/{idPenjualan}")
    public ResponseEntity<String> arsipkanPenjualan(@PathVariable Long idPenjualan) {
        penjualanService.arsipkanPenjualan(idPenjualan);
        return ResponseEntity.ok("Data penjualan berhasil diarsipkan.");
    }
}

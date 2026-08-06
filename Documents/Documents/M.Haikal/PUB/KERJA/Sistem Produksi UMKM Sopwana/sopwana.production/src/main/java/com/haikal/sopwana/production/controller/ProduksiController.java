package com.haikal.sopwana.production.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.haikal.sopwana.production.dto.ProduksiRequest;
import com.haikal.sopwana.production.entity.Produksi;
import com.haikal.sopwana.production.service.ProductionService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/production/produksi")
public class ProduksiController {

    @Autowired
    private ProductionService prodService;

    @PostMapping("/tambah")
    public ResponseEntity<Produksi> tambahProduksi(@Valid @RequestBody ProduksiRequest request) {
        return ResponseEntity.ok(prodService.tambahProduksi(request.getJumlahBal(), request.getCatatan()));
    }

    @GetMapping("/semua")
    public ResponseEntity<List<Produksi>> semuaProduksiAktif() {
        return ResponseEntity.ok(prodService.getSemuaProduksiAktif());
    }

    @GetMapping("/arsip")
    public ResponseEntity<List<Produksi>> arsipProduksi() {
        return ResponseEntity.ok(prodService.getProduksiArsip());
    }

    @PutMapping("/arsip/{idProduksi}")
    public ResponseEntity<String> arsipkanProduksi(@PathVariable Long idProduksi) {
        prodService.arsipkanProduksi(idProduksi);
        return ResponseEntity.ok("Data produksi berhasil diarsipkan.");
    }
}

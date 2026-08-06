package com.haikal.sopwana.production.controller;

import com.haikal.sopwana.production.dto.StokResponse;
import com.haikal.sopwana.production.service.ProductionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/production/stok")
public class StokController {

    @Autowired
    private ProductionService prodService;

    @GetMapping("/terkini")
    public ResponseEntity<StokResponse> getStok() {
        return ResponseEntity.ok(prodService.getStokTerkini());
    }
}
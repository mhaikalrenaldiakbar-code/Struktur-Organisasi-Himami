package com.haikal.sopwana.payroll.controller;

import com.haikal.sopwana.payroll.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payroll/email")
public class EmailTestController {

    @Autowired
    private EmailService emailService;

    /*
     * Endpoint testing email slip gaji.
     * Contoh:
     * POST http://localhost:8082/api/payroll/email/test-slip?to=emailtujuan@gmail.com
     */
    @PostMapping("/test-slip")
    public ResponseEntity<Map<String, Object>> testSlip(@RequestParam String to) {
        emailService.kirimSlipGaji(
                to,
                "Pekerja Testing",
                LocalDate.now().minusDays(7),
                LocalDate.now(),
                5,
                10,
                new BigDecimal("10000"),
                LocalDate.now()
        );

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Email test slip gaji berhasil dikirim");
        response.put("to", to);
        return ResponseEntity.ok(response);
    }
}

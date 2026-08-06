package com.haikal.sopwana.production.client;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class PayrollClient {

    private final RestTemplate restTemplate = new RestTemplate();

    private static final String PAYROLL_URL =
            "http://localhost:8082/api/payroll/transaksi/upload";

    public void kirimUpahOtomatis(Long pekerjaId, Integer totalIkat, Long idHasil) {
        Map<String, Object> body = new HashMap<>();
        body.put("pekerjaId", pekerjaId);
        body.put("totalIkat", totalIkat);
        body.put("catatan", "Upah otomatis dari hasil kemas VALID ID: " + idHasil);

        restTemplate.postForObject(PAYROLL_URL, body, Object.class);
    }
}
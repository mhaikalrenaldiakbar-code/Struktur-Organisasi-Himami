package com.haikal.sopwana.production.util;

import java.time.LocalDateTime;

public class ValidationLogHelper {
    public static void logAktivitas(String modul, String pesan) {
        System.out.println("[" + LocalDateTime.now() + "] LOG PRODUKSI - " + modul + ": " + pesan);
    }
}
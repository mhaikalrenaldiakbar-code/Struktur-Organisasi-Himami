package com.haikal.sopwana.payroll.service;

import java.math.BigDecimal;
import java.time.LocalDate;

public interface EmailService {

    void kirimSlipGaji(
            String emailTujuan,
            String namaPekerja,
            LocalDate tanggalAwal,
            LocalDate tanggalAkhir,
            Integer totalBal,
            Integer totalIkat,
            BigDecimal totalUpah,
            LocalDate tanggalDibayar);
}
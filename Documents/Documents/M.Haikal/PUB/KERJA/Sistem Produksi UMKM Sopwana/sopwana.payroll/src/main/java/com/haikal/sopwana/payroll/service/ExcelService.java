package com.haikal.sopwana.payroll.service;

import org.springframework.web.multipart.MultipartFile;
import java.io.ByteArrayInputStream;
import java.time.LocalDate;

public interface ExcelService {
    void importPekerja(MultipartFile file);

    ByteArrayInputStream exportLaporanGaji();

    ByteArrayInputStream exportLaporanGaji(LocalDate tanggalAwal, LocalDate tanggalAkhir);
}
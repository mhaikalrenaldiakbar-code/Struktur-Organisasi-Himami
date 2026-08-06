package com.haikal.sopwana.production.service;

import java.io.ByteArrayInputStream;
import java.time.LocalDate;

public interface ProductionExcelService {

    ByteArrayInputStream downloadLaporanProduction();

    ByteArrayInputStream downloadLaporanProduction(LocalDate tanggalAwal, LocalDate tanggalAkhir);
}
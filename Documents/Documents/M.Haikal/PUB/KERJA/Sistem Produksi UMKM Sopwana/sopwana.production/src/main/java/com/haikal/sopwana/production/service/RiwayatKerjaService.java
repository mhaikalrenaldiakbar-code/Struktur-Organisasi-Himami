package com.haikal.sopwana.production.service;

import com.haikal.sopwana.production.dto.RiwayatKerjaResponse;

import java.util.List;

public interface RiwayatKerjaService {

    List<RiwayatKerjaResponse> getSemuaRiwayatKerja();

    List<RiwayatKerjaResponse> getRiwayatKerjaByPekerja(Long pekerjaId);
}

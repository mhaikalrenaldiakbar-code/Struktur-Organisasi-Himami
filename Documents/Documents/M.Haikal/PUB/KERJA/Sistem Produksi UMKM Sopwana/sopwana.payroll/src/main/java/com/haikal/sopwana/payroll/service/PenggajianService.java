package com.haikal.sopwana.payroll.service;

import com.haikal.sopwana.payroll.dto.GajiMingguanResponse;
import com.haikal.sopwana.payroll.dto.PekerjaDto;
import com.haikal.sopwana.payroll.dto.PembayaranMingguanResponse;
import com.haikal.sopwana.payroll.dto.TransaksiUpahRequest;
import com.haikal.sopwana.payroll.entity.Pekerja;
import com.haikal.sopwana.payroll.entity.Penggajian;

import java.time.LocalDate;
import java.util.List;

public interface PenggajianService {

    Pekerja registrasiPekerja(PekerjaDto dto);

    List<Pekerja> dapatkanSemuaPekerja();

    List<Pekerja> dapatkanPekerjaDiarsipkan();

    Pekerja updatePekerja(Long idPekerja, PekerjaDto dto);

    void arsipkanPekerja(Long idPekerja);

    Penggajian hitungDanBayarGaji(Long pekerjaId, Integer totalIkat);

    Penggajian catatTransaksiUpah(TransaksiUpahRequest request);

    void munculkanGajiMingguan();

    PembayaranMingguanResponse siapkanPendingMingguan(Long pekerjaId, Integer totalIkat);

    List<Penggajian> getTransaksiPending();

    List<GajiMingguanResponse> getRekapGajiMingguan(LocalDate tanggalAwal, LocalDate tanggalAkhir);

    List<GajiMingguanResponse> getRiwayatGajiMingguanPekerja(Long pekerjaId);

    List<Penggajian> getRiwayatPekerja(Long pekerjaId);

    PembayaranMingguanResponse bayarMingguan(Long pekerjaId);

    PembayaranMingguanResponse bayarMingguan(Long pekerjaId, Integer totalIkat);
}

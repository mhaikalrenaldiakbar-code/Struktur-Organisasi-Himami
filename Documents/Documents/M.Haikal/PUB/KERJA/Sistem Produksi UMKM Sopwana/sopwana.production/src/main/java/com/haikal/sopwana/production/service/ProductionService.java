package com.haikal.sopwana.production.service;

import com.haikal.sopwana.production.dto.*;
import com.haikal.sopwana.production.entity.*;

import java.util.List;

public interface ProductionService {
    Produksi tambahProduksi(Integer jumlahBal);

    Produksi tambahProduksi(Integer jumlahBal, String catatan);

    List<Produksi> getSemuaProduksiAktif();

    List<Produksi> getProduksiArsip();

    void arsipkanProduksi(Long idProduksi);

    PengambilanBarang ambilBarang(PengambilanRequest request);

    HasilPengemasan inputHasilKemas(HasilKemasRequest request);

    StokResponse getStokTerkini();
}

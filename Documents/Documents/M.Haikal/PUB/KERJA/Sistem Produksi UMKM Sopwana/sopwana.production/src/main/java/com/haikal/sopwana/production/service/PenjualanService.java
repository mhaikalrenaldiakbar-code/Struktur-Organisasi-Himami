package com.haikal.sopwana.production.service;

import java.util.List;

import com.haikal.sopwana.production.dto.PenjualanRequest;
import com.haikal.sopwana.production.entity.Penjualan;

public interface PenjualanService {
    Penjualan tambahPenjualan(PenjualanRequest request);
    List<Penjualan> getSemuaPenjualan();
    List<Penjualan> getPenjualanArsip();
    void arsipkanPenjualan(Long idPenjualan);
}

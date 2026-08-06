package com.haikal.sopwana.production.service;

import com.haikal.sopwana.production.entity.HasilPengemasan;
import java.util.List;

public interface ValidasiService {
    HasilPengemasan validasiHasilKerja(Long idHasil, String status, String catatan);

    List<HasilPengemasan> getHasilKerjaValidByPekerja(Long pekerjaId);
}
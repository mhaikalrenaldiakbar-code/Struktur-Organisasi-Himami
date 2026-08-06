package com.haikal.sopwana.payroll.scheduler;

import com.haikal.sopwana.payroll.entity.Penggajian;
import com.haikal.sopwana.payroll.repository.PenggajianRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
public class GajiScheduler {

    @Autowired
    private PenggajianRepository penggajianRepository;

    /*
     * Jalan otomatis setiap hari Sabtu jam 06:00 pagi WIB.
     * Cron:
     * detik menit jam hari-bulan bulan hari-minggu
     */
    @Scheduled(cron = "0 0 6 ? * SAT", zone = "Asia/Jakarta")
    @Transactional
    public void munculkanGajiHariSabtu() {
        List<Penggajian> dataMenunggu = penggajianRepository.findByStatus("MENUNGGU_JADWAL");

        for (Penggajian gaji : dataMenunggu) {
            gaji.setStatus("PENDING");
        }

        penggajianRepository.saveAll(dataMenunggu);

        System.out.println("Scheduler gaji Sabtu berjalan. Total data diubah: " + dataMenunggu.size());
    }
}
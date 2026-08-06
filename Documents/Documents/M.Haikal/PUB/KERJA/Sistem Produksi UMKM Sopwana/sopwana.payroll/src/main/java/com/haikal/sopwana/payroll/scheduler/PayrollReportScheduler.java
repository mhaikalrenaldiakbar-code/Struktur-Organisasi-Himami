package com.haikal.sopwana.payroll.scheduler;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class PayrollReportScheduler {

    @Scheduled(cron = "0 0 1 1 * ?")
    public void kirimNotifikasiLaporanGajiKeAdmin() {
        System.out.println("SCHEDULER PAYROLL: Rekapitulasi bulanan otomatis siap diproses oleh Admin.");
    }
}
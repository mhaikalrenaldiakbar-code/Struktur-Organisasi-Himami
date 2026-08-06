package com.haikal.sopwana.production.scheduler;

import com.haikal.sopwana.production.util.ValidationLogHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class StokOpnameScheduler {

    @Scheduled(cron = "0 59 23 * * ?")
    public void automasiLogHarianStok() {
        ValidationLogHelper.logAktivitas("SCHEDULER", "Melakukan konsolidasi harian stok kerupuk sopwana.");
    }
}
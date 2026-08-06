package com.haikal.sopwana.payroll.service.impl;

import java.math.BigDecimal;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.haikal.sopwana.payroll.dto.GajiMingguanResponse;
import com.haikal.sopwana.payroll.dto.PekerjaDto;
import com.haikal.sopwana.payroll.dto.PembayaranMingguanResponse;
import com.haikal.sopwana.payroll.dto.TransaksiUpahRequest;
import com.haikal.sopwana.payroll.entity.Pekerja;
import com.haikal.sopwana.payroll.entity.Penggajian;
import com.haikal.sopwana.payroll.entity.User;
import com.haikal.sopwana.payroll.repository.PekerjaRepository;
import com.haikal.sopwana.payroll.repository.PenggajianRepository;
import com.haikal.sopwana.payroll.service.EmailService;
import com.haikal.sopwana.payroll.service.PenggajianService;

@Service
@Transactional
public class PenggajianServiceImpl implements PenggajianService {

    private static final BigDecimal TARIF_PER_IKAT = BigDecimal.valueOf(1000);
    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$");
    private static final Pattern NO_HP_PATTERN = Pattern.compile("^08[0-9]{8,13}$");

    @Autowired
    private PekerjaRepository pekerjaRepository;

    @Autowired
    private PenggajianRepository penggajianRepository;

    @Autowired
    private EmailService emailService;

    private void wajibIsi(String nilai, String pesan) {
        if (nilai == null || nilai.isBlank()) {
            throw new IllegalArgumentException(pesan);
        }
    }

    private String trimToNull(String nilai) {
        return nilai == null || nilai.isBlank() ? null : nilai.trim();
    }

    private void validasiFormatEmail(String email) {
        if (email == null || email.isBlank()) {
            throw new IllegalArgumentException("Email pekerja wajib diisi");
        }
        if (!EMAIL_PATTERN.matcher(email).matches()) {
            throw new IllegalArgumentException("Format email tidak valid. Email wajib memakai @ dan domain, contoh: nama@gmail.com");
        }
    }

    private void validasiNoHpJikaDiisi(String noHp) {
        if (noHp == null || noHp.isBlank()) {
            return;
        }
        if (!NO_HP_PATTERN.matcher(noHp).matches()) {
            throw new IllegalArgumentException("No HP harus diawali 08 dan berisi 10 sampai 15 digit angka");
        }
    }

    private void validasiEmailDuplikat(String email, Long idPekerja) {
        if (idPekerja == null) {
            if (pekerjaRepository.existsByEmailIgnoreCase(email)) {
                throw new RuntimeException("Email pekerja sudah terdaftar");
            }
        } else if (pekerjaRepository.existsByEmailIgnoreCaseAndIdPekerjaNot(email, idPekerja)) {
            throw new RuntimeException("Email pekerja sudah digunakan pekerja lain");
        }
    }

    @Override
    public Pekerja registrasiPekerja(PekerjaDto dto) {
        if (dto == null) {
            throw new IllegalArgumentException("Data pekerja tidak boleh kosong");
        }

        wajibIsi(dto.getNama(), "Nama pekerja wajib diisi");
        wajibIsi(dto.getEmail(), "Email pekerja wajib diisi");

        String email = dto.getEmail().trim();
        String noHp = trimToNull(dto.getNoHp());
        validasiFormatEmail(email);
        validasiNoHpJikaDiisi(noHp);
        validasiEmailDuplikat(email, null);

        Pekerja pekerja = new Pekerja();
        pekerja.setNama(dto.getNama().trim());
        pekerja.setEmail(email);
        pekerja.setAlamat(trimToNull(dto.getAlamat()));
        pekerja.setNoHp(noHp);
        pekerja.setDiarsipkan(false);

        return pekerjaRepository.save(pekerja);
    }

    @Override
    public List<Pekerja> dapatkanSemuaPekerja() {
        return pekerjaRepository.findAktifOrderByIdPekerjaAsc();
    }

    @Override
    public List<Pekerja> dapatkanPekerjaDiarsipkan() {
        return pekerjaRepository.findArsipOrderByIdPekerjaAsc();
    }

    @Override
    public Pekerja updatePekerja(Long idPekerja, PekerjaDto dto) {
        if (idPekerja == null) {
            throw new IllegalArgumentException("ID pekerja wajib diisi");
        }

        if (dto == null) {
            throw new IllegalArgumentException("Data update pekerja tidak boleh kosong");
        }

        Pekerja pekerja = pekerjaRepository.findById(idPekerja)
                .orElseThrow(() -> new RuntimeException("Pekerja tidak ditemukan dengan ID: " + idPekerja));

        if (dto.getNama() != null) {
            wajibIsi(dto.getNama(), "Nama pekerja tidak boleh kosong");
            pekerja.setNama(dto.getNama().trim());
        }

        if (dto.getEmail() != null) {
            wajibIsi(dto.getEmail(), "Email pekerja tidak boleh kosong");
            String email = dto.getEmail().trim();
            validasiFormatEmail(email);
            validasiEmailDuplikat(email, idPekerja);
            pekerja.setEmail(email);
        }

        if (dto.getNoHp() != null) {
            String noHp = trimToNull(dto.getNoHp());
            validasiNoHpJikaDiisi(noHp);
            pekerja.setNoHp(noHp);
        }

        if (dto.getAlamat() != null) {
            pekerja.setAlamat(trimToNull(dto.getAlamat()));
        }

        if (dto.getRole() != null && !dto.getRole().isBlank() && pekerja.getUser() != null) {
            pekerja.getUser().setRole(dto.getRole().trim().toUpperCase().replace("ROLE_", ""));
        }

        return pekerjaRepository.save(pekerja);
    }

    @Override
    public void arsipkanPekerja(Long idPekerja) {
        if (idPekerja == null) {
            throw new IllegalArgumentException("ID pekerja wajib diisi");
        }

        Pekerja pekerja = pekerjaRepository.findById(idPekerja)
                .orElseThrow(() -> new RuntimeException("Pekerja tidak ditemukan dengan ID: " + idPekerja));

        pekerja.setDiarsipkan(true);

        User user = pekerja.getUser();
        if (user != null) {
            user.setAktif(false);
        }

        pekerjaRepository.save(pekerja);
    }

    @Override
    public Penggajian hitungDanBayarGaji(Long pekerjaId, Integer totalIkat) {
        return catatUpahHarianInternal(pekerjaId, totalIkat, "Input dari hitung-bayar");
    }

    @Override
    public Penggajian catatTransaksiUpah(TransaksiUpahRequest request) {
        if (request == null) {
            throw new IllegalArgumentException("Request transaksi upah tidak boleh kosong");
        }

        return catatUpahHarianInternal(
                request.getPekerjaId(),
                request.getTotalIkat(),
                request.getCatatan());
    }

    private Penggajian catatUpahHarianInternal(Long pekerjaId, Integer totalIkat, String catatan) {
        if (pekerjaId == null) {
            throw new IllegalArgumentException("ID pekerja wajib diisi");
        }

        if (totalIkat == null || totalIkat <= 0) {
            throw new IllegalArgumentException("Total ikat harus lebih dari 0");
        }

        Pekerja pekerja = pekerjaRepository.findById(pekerjaId)
                .orElseThrow(() -> new RuntimeException("Pekerja tidak ditemukan dengan ID: " + pekerjaId));

        if (Boolean.TRUE.equals(pekerja.getDiarsipkan())) {
            throw new RuntimeException("Pekerja sudah diarsipkan sehingga tidak bisa menerima transaksi gaji baru");
        }

        BigDecimal totalUpah = TARIF_PER_IKAT.multiply(BigDecimal.valueOf(totalIkat));

        Penggajian penggajian = new Penggajian();
        penggajian.setPekerja(pekerja);
        penggajian.setTotalIkat(totalIkat);
        penggajian.setTarifPerIkat(TARIF_PER_IKAT);
        penggajian.setTotalUpah(totalUpah);
        penggajian.setTanggal(LocalDate.now());
        penggajian.setStatus("MENUNGGU_JADWAL");
        penggajian.setTanggalDibayar(null);
        penggajian.setCatatan(catatan);

        return penggajianRepository.save(penggajian);
    }

    private LocalDate awalMinggu(LocalDate tanggal) {
        LocalDate acuan = tanggal == null ? LocalDate.now() : tanggal;
        return acuan.with(TemporalAdjusters.previousOrSame(DayOfWeek.SUNDAY));
    }

    private LocalDate akhirMinggu(LocalDate tanggal) {
        return awalMinggu(tanggal).plusDays(1);
    }

   private void pastikanMingguSelesai(LocalDate akhir) {

    // MODE DEMO
    LocalDate hariIni = akhir;

    if (hariIni.isBefore(akhir)) {
        throw new RuntimeException(
                "Gaji belum bisa dibayar karena periode minggu kerja belum selesai.");
    }

}

    private int mingguKeDalamBulan(LocalDate tanggal) {
        if (tanggal == null) {
            tanggal = LocalDate.now();
        }
        LocalDate awalBulan = tanggal.withDayOfMonth(1);
        LocalDate awalMingguPertama = awalBulan.with(TemporalAdjusters.previousOrSame(DayOfWeek.SUNDAY));
        LocalDate awalMingguTanggal = tanggal.with(TemporalAdjusters.previousOrSame(DayOfWeek.SUNDAY));
        return (int) (ChronoUnit.WEEKS.between(awalMingguPertama, awalMingguTanggal) + 1);
    }

    private String gabungStatus(List<Penggajian> list) {
        boolean adaPending = false;
        boolean adaMenunggu = false;
        boolean adaDibayar = false;

        for (Penggajian gaji : list) {
            String status = gaji.getStatus() == null ? "MENUNGGU_JADWAL" : gaji.getStatus().toUpperCase();
            if ("PENDING".equals(status)) adaPending = true;
            if ("MENUNGGU_JADWAL".equals(status)) adaMenunggu = true;
            if ("SUDAH_DIBAYAR".equals(status) || "DIBAYAR".equals(status)) adaDibayar = true;
        }

        // Jika dalam periode minggu ini sudah ada transaksi yang dibayar,
        // status rekap harus LUNAS/DIBAYAR walaupun ada data PENDING duplikat
        // akibat tombol dicoba berkali-kali.
        if (adaDibayar && !list.isEmpty()) return "DIBAYAR";
        if (adaPending) return "PENDING";
        if (adaMenunggu) return "MENUNGGU_JADWAL";
        return "BELUM_DIHITUNG";
    }

    private List<GajiMingguanResponse> kelompokkanPerPekerjaMingguan(List<Penggajian> transaksi, LocalDate tanggalAwal, LocalDate tanggalAkhir) {
        Map<Long, List<Penggajian>> grouped = new LinkedHashMap<>();

        for (Penggajian gaji : transaksi) {
            if (gaji.getPekerja() == null || gaji.getPekerja().getIdPekerja() == null) {
                continue;
            }
            grouped.computeIfAbsent(gaji.getPekerja().getIdPekerja(), k -> new ArrayList<>()).add(gaji);
        }

        List<GajiMingguanResponse> hasil = new ArrayList<>();
        for (Map.Entry<Long, List<Penggajian>> entry : grouped.entrySet()) {
            Long pekerjaId = entry.getKey();
            List<Penggajian> list = entry.getValue();
            Penggajian first = list.get(0);

            int totalIkat = 0;
            BigDecimal totalUpah = BigDecimal.ZERO;
            LocalDate tanggalDibayar = null;

            for (Penggajian gaji : list) {
                totalIkat += gaji.getTotalIkat() == null ? 0 : gaji.getTotalIkat();
                totalUpah = totalUpah.add(gaji.getTotalUpah() == null ? BigDecimal.ZERO : gaji.getTotalUpah());
                if (gaji.getTanggalDibayar() != null) {
                    tanggalDibayar = gaji.getTanggalDibayar();
                }
            }

            String nama = first.getPekerja() == null ? "-" : first.getPekerja().getNama();
            String periode = tanggalAwal + " s/d " + tanggalAkhir;

            hasil.add(new GajiMingguanResponse(
                    pekerjaId,
                    nama,
                    totalIkat,
                    totalUpah,
                    list.size(),
                    gabungStatus(list),
                    tanggalAwal,
                    tanggalAkhir,
                    mingguKeDalamBulan(tanggalAwal),
                    periode,
                    tanggalDibayar
            ));
        }

        return hasil;
    }

    @Override
    public void munculkanGajiMingguan() {
        LocalDate awal = awalMinggu(LocalDate.now());
        LocalDate akhir = akhirMinggu(LocalDate.now());
        pastikanMingguSelesai(akhir);
        List<Penggajian> dataMenunggu = penggajianRepository.findByStatus("MENUNGGU_JADWAL");

        for (Penggajian gaji : dataMenunggu) {
            LocalDate tanggal = gaji.getTanggal();
            if (tanggal != null && !tanggal.isBefore(awal) && !tanggal.isAfter(akhir)) {
                gaji.setStatus("PENDING");
            }
        }

        penggajianRepository.saveAll(dataMenunggu);
    }

    @Override
    public List<Penggajian> getTransaksiPending() {
        return penggajianRepository.findByStatusOrderByTanggalDesc("PENDING");
    }

    @Override
    public List<GajiMingguanResponse> getRekapGajiMingguan(LocalDate tanggalAwal, LocalDate tanggalAkhir) {
        LocalDate awal = tanggalAwal == null ? awalMinggu(LocalDate.now()) : tanggalAwal;
        LocalDate akhir = tanggalAkhir == null ? akhirMinggu(awal) : tanggalAkhir;
        List<Penggajian> transaksi = penggajianRepository.findByTanggalBetweenOrderByPekerjaIdPekerjaAscTanggalAsc(awal, akhir);
        return kelompokkanPerPekerjaMingguan(transaksi, awal, akhir);
    }

    @Override
    public List<GajiMingguanResponse> getRiwayatGajiMingguanPekerja(Long pekerjaId) {
        if (pekerjaId == null) {
            throw new IllegalArgumentException("ID pekerja wajib diisi");
        }

        List<Penggajian> transaksi = penggajianRepository.findByPekerjaIdPekerjaOrderByTanggalDesc(pekerjaId);
        Map<String, List<Penggajian>> grouped = new LinkedHashMap<>();

        for (Penggajian gaji : transaksi) {
            LocalDate tanggal = gaji.getTanggal() == null ? LocalDate.now() : gaji.getTanggal();
            LocalDate awal = awalMinggu(tanggal);
            String key = awal.toString();
            grouped.computeIfAbsent(key, k -> new ArrayList<>()).add(gaji);
        }

        List<GajiMingguanResponse> hasil = new ArrayList<>();
        for (Map.Entry<String, List<Penggajian>> entry : grouped.entrySet()) {
            LocalDate awal = LocalDate.parse(entry.getKey());
            LocalDate akhir = akhirMinggu(awal);
            hasil.addAll(kelompokkanPerPekerjaMingguan(entry.getValue(), awal, akhir));
        }

        return hasil;
    }

    @Override
    public List<Penggajian> getRiwayatPekerja(Long pekerjaId) {
        if (pekerjaId == null) {
            throw new IllegalArgumentException("ID pekerja wajib diisi");
        }

        return penggajianRepository.findByPekerjaIdPekerjaOrderByTanggalDesc(pekerjaId);
    }

    @Override
    public PembayaranMingguanResponse siapkanPendingMingguan(Long pekerjaId, Integer totalIkat) {
        if (pekerjaId == null) {
            throw new IllegalArgumentException("ID pekerja wajib diisi");
        }

        Pekerja pekerja = pekerjaRepository.findById(pekerjaId)
                .orElseThrow(() -> new RuntimeException("Pekerja tidak ditemukan dengan ID: " + pekerjaId));

        LocalDate awal = awalMinggu(LocalDate.now());
        LocalDate akhir = akhirMinggu(LocalDate.now());
        pastikanMingguSelesai(akhir);
        List<Penggajian> transaksiMingguIni = penggajianRepository
                .findByPekerjaIdPekerjaAndTanggalBetweenOrderByTanggalDesc(pekerjaId, awal, akhir);

        int totalIkatAman = totalIkat == null || totalIkat <= 0 ? 0 : totalIkat;

        boolean adaBelumDibayar = false;
        boolean sudahDibayar = false;
        for (Penggajian gaji : transaksiMingguIni) {
            String status = normalisasiStatus(gaji.getStatus());
            if ("DIBAYAR".equals(status) || "SUDAH_DIBAYAR".equals(status)) {
                sudahDibayar = true;
            } else {
                gaji.setStatus("PENDING");
                adaBelumDibayar = true;
            }
        }

        // Kalau minggu ini sudah lunas, jangan membuat PENDING baru lagi.
        if (!sudahDibayar && transaksiMingguIni.isEmpty() && totalIkatAman > 0) {
            Penggajian penggajian = new Penggajian();
            penggajian.setPekerja(pekerja);
            penggajian.setTotalIkat(totalIkatAman);
            penggajian.setTarifPerIkat(TARIF_PER_IKAT);
            penggajian.setTotalUpah(TARIF_PER_IKAT.multiply(BigDecimal.valueOf(totalIkatAman)));
            penggajian.setTanggal(LocalDate.now());
            penggajian.setStatus("PENDING");
            penggajian.setTanggalDibayar(null);
            penggajian.setCatatan("Rekap gaji mingguan dari hasil kerja VALID");
            transaksiMingguIni.add(penggajian);
            adaBelumDibayar = true;
        }

        if (!transaksiMingguIni.isEmpty()) {
            penggajianRepository.saveAll(transaksiMingguIni);
        }

        BigDecimal totalUpah = TARIF_PER_IKAT.multiply(BigDecimal.valueOf(totalIkatAman));
        String status = sudahDibayar && !adaBelumDibayar ? "DIBAYAR" : (adaBelumDibayar ? "PENDING" : "BELUM_DIHITUNG");

        return new PembayaranMingguanResponse(
                pekerjaId,
                totalIkatAman,
                totalUpah,
                status,
                null);
    }

    private String normalisasiStatus(String status) {
        if (status == null || status.isBlank()) {
            return "MENUNGGU_JADWAL";
        }
        return status.trim().toUpperCase();
    }

    @Override
    public PembayaranMingguanResponse bayarMingguan(Long pekerjaId) {
        return bayarMingguan(pekerjaId, null);
    }

    @Override
    public PembayaranMingguanResponse bayarMingguan(Long pekerjaId, Integer totalIkat) {
        if (pekerjaId == null) {
            throw new IllegalArgumentException("ID pekerja wajib diisi");
        }

        Pekerja pekerja = pekerjaRepository.findById(pekerjaId)
                .orElseThrow(() -> new RuntimeException("Pekerja tidak ditemukan dengan ID: " + pekerjaId));

        LocalDate awal = awalMinggu(LocalDate.now());
        LocalDate akhir = akhirMinggu(LocalDate.now());
        pastikanMingguSelesai(akhir);
        LocalDate tanggalBayar = LocalDate.now();

        List<Penggajian> transaksiMingguIni = penggajianRepository
                .findByPekerjaIdPekerjaAndTanggalBetweenOrderByTanggalDesc(pekerjaId, awal, akhir);

        int totalIkatAman = totalIkat == null || totalIkat <= 0 ? 0 : totalIkat;
        if (totalIkatAman <= 0) {
            for (Penggajian gaji : transaksiMingguIni) {
                String status = normalisasiStatus(gaji.getStatus());
                if (!"DIBAYAR".equals(status) && !"SUDAH_DIBAYAR".equals(status)) {
                    totalIkatAman += gaji.getTotalIkat() == null ? 0 : gaji.getTotalIkat();
                }
            }
        }

        if (totalIkatAman <= 0) {
            throw new RuntimeException("Belum ada hasil kerja VALID minggu ini untuk dibayar.");
        }

        if (transaksiMingguIni.isEmpty()) {
            Penggajian penggajian = new Penggajian();
            penggajian.setPekerja(pekerja);
            penggajian.setTotalIkat(totalIkatAman);
            penggajian.setTarifPerIkat(TARIF_PER_IKAT);
            penggajian.setTotalUpah(TARIF_PER_IKAT.multiply(BigDecimal.valueOf(totalIkatAman)));
            penggajian.setTanggal(LocalDate.now());
            penggajian.setStatus("PENDING");
            penggajian.setTanggalDibayar(null);
            penggajian.setCatatan("Rekap gaji mingguan dari hasil kerja VALID");
            transaksiMingguIni.add(penggajian);
        }

        BigDecimal totalUpah = TARIF_PER_IKAT.multiply(BigDecimal.valueOf(totalIkatAman));

        /*
         * Penting:
         * Kalau tombol Jadikan Pending pernah diklik berkali-kali, data PENDING bisa dobel.
         * Supaya kartu Gaji Pending bersih, semua data minggu ini untuk pekerja tersebut ditandai DIBAYAR.
         * Tetapi nominal yang dibayar tetap memakai totalIkat dari hasil kerja VALID yang dikirim frontend,
         * sehingga upah tidak membesar karena duplikasi data payroll.
         */
        for (Penggajian gaji : transaksiMingguIni) {
            gaji.setStatus("DIBAYAR");
            gaji.setTanggalDibayar(tanggalBayar);
        }

        penggajianRepository.saveAll(transaksiMingguIni);

        Integer totalBal = 0;
        try {
            totalBal = penggajianRepository.countTotalBalByPekerjaIdAndTanggalBetween(pekerjaId, awal, akhir);
            if (totalBal == null) {
                totalBal = 0;
            }
        } catch (Exception e) {
            System.out.println("Gagal menghitung total bal: " + e.getMessage());
        }

        try {
            emailService.kirimSlipGaji(
                    pekerja.getEmail(),
                    pekerja.getNama(),
                    awal,
                    akhir,
                    totalBal,
                    totalIkatAman,
                    totalUpah,
                    tanggalBayar);
        } catch (Exception e) {
            System.out.println("Gagal mengirim email slip gaji: " + e.getMessage());
        }

        return new PembayaranMingguanResponse(
                pekerjaId,
                totalIkatAman,
                totalUpah,
                "DIBAYAR",
                tanggalBayar);
    }
}

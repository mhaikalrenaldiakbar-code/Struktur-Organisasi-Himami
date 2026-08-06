package com.haikal.sopwana.production.service.impl;

import com.haikal.sopwana.production.entity.HasilPengemasan;
import com.haikal.sopwana.production.entity.PengambilanBarang;
import com.haikal.sopwana.production.entity.Produksi;
import com.haikal.sopwana.production.entity.Penjualan;
import com.haikal.sopwana.production.entity.Stok;
import com.haikal.sopwana.production.repository.HasilPengemasanRepository;
import com.haikal.sopwana.production.repository.PengambilanBarangRepository;
import com.haikal.sopwana.production.repository.ProduksiRepository;
import com.haikal.sopwana.production.repository.PenjualanRepository;
import com.haikal.sopwana.production.repository.StokRepository;
import com.haikal.sopwana.production.service.ProductionExcelService;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductionExcelServiceImpl implements ProductionExcelService {

    @Autowired
    private ProduksiRepository produksiRepository;

    @Autowired
    private PengambilanBarangRepository pengambilanBarangRepository;

    @Autowired
    private HasilPengemasanRepository hasilPengemasanRepository;

    @Autowired
    private StokRepository stokRepository;

    @Autowired
    private PenjualanRepository penjualanRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final int HARGA_JUAL_PER_IKAT = 2000;

    private Integer hasilInteger(String sql) {
        Integer hasil = jdbcTemplate.queryForObject(sql, Integer.class);
        return hasil == null ? 0 : hasil;
    }

    private CellStyle titleStyle(Workbook workbook) {
        Font font = workbook.createFont();
        font.setBold(true);
        font.setFontHeightInPoints((short) 16);
        font.setColor(IndexedColors.WHITE.getIndex());

        CellStyle style = workbook.createCellStyle();
        style.setFont(font);
        style.setFillForegroundColor(IndexedColors.BROWN.getIndex());
        style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        style.setAlignment(HorizontalAlignment.CENTER);
        style.setVerticalAlignment(VerticalAlignment.CENTER);
        return style;
    }

    private CellStyle subTitleStyle(Workbook workbook) {
        Font font = workbook.createFont();
        font.setItalic(true);
        font.setColor(IndexedColors.GREY_50_PERCENT.getIndex());

        CellStyle style = workbook.createCellStyle();
        style.setFont(font);
        style.setAlignment(HorizontalAlignment.CENTER);
        return style;
    }

    private CellStyle headerStyle(Workbook workbook) {
        Font font = workbook.createFont();
        font.setBold(true);
        font.setColor(IndexedColors.WHITE.getIndex());

        CellStyle style = workbook.createCellStyle();
        style.setFont(font);
        style.setFillForegroundColor(IndexedColors.DARK_BLUE.getIndex());
        style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        style.setAlignment(HorizontalAlignment.CENTER);
        style.setVerticalAlignment(VerticalAlignment.CENTER);
        style.setBorderTop(BorderStyle.THIN);
        style.setBorderBottom(BorderStyle.THIN);
        style.setBorderLeft(BorderStyle.THIN);
        style.setBorderRight(BorderStyle.THIN);
        return style;
    }

    private CellStyle bodyStyle(Workbook workbook) {
        CellStyle style = workbook.createCellStyle();
        style.setVerticalAlignment(VerticalAlignment.CENTER);
        style.setBorderTop(BorderStyle.THIN);
        style.setBorderBottom(BorderStyle.THIN);
        style.setBorderLeft(BorderStyle.THIN);
        style.setBorderRight(BorderStyle.THIN);
        return style;
    }

    private CellStyle numberStyle(Workbook workbook) {
        CellStyle style = bodyStyle(workbook);
        style.setAlignment(HorizontalAlignment.RIGHT);
        return style;
    }

    private CellStyle centerStyle(Workbook workbook) {
        CellStyle style = bodyStyle(workbook);
        style.setAlignment(HorizontalAlignment.CENTER);
        return style;
    }

    private CellStyle summaryLabelStyle(Workbook workbook) {
        Font font = workbook.createFont();
        font.setBold(true);

        CellStyle style = bodyStyle(workbook);
        style.setFont(font);
        style.setFillForegroundColor(IndexedColors.LIGHT_YELLOW.getIndex());
        style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        return style;
    }

    private CellStyle summaryValueStyle(Workbook workbook) {
        Font font = workbook.createFont();
        font.setBold(true);

        CellStyle style = numberStyle(workbook);
        style.setFont(font);
        style.setFillForegroundColor(IndexedColors.LIGHT_GREEN.getIndex());
        style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        return style;
    }

    private CellStyle validStyle(Workbook workbook) {
        Font font = workbook.createFont();
        font.setBold(true);
        font.setColor(IndexedColors.GREEN.getIndex());

        CellStyle style = centerStyle(workbook);
        style.setFont(font);
        style.setFillForegroundColor(IndexedColors.LIGHT_GREEN.getIndex());
        style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        return style;
    }

    private CellStyle pendingStyle(Workbook workbook) {
        Font font = workbook.createFont();
        font.setBold(true);
        font.setColor(IndexedColors.DARK_YELLOW.getIndex());

        CellStyle style = centerStyle(workbook);
        style.setFont(font);
        style.setFillForegroundColor(IndexedColors.LIGHT_YELLOW.getIndex());
        style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        return style;
    }

    private CellStyle ditolakStyle(Workbook workbook) {
        Font font = workbook.createFont();
        font.setBold(true);
        font.setColor(IndexedColors.RED.getIndex());

        CellStyle style = centerStyle(workbook);
        style.setFont(font);
        style.setFillForegroundColor(IndexedColors.ROSE.getIndex());
        style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        return style;
    }

    private void buatJudulSheet(Sheet sheet, Workbook workbook, String judul, int jumlahKolom) {
        CellStyle titleStyle = titleStyle(workbook);
        CellStyle subTitleStyle = subTitleStyle(workbook);

        Row titleRow = sheet.createRow(0);
        titleRow.setHeightInPoints(28);

        Cell titleCell = titleRow.createCell(0);
        titleCell.setCellValue(judul);
        titleCell.setCellStyle(titleStyle);

        sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, jumlahKolom - 1));

        Row subTitleRow = sheet.createRow(1);
        Cell subTitleCell = subTitleRow.createCell(0);
        subTitleCell.setCellValue("Dicetak pada: " + LocalDateTime.now()
                .format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss")));
        subTitleCell.setCellStyle(subTitleStyle);

        sheet.addMergedRegion(new CellRangeAddress(1, 1, 0, jumlahKolom - 1));
    }

    private void buatHeader(Row row, CellStyle style, String... headers) {
        row.setHeightInPoints(22);
        for (int i = 0; i < headers.length; i++) {
            Cell cell = row.createCell(i);
            cell.setCellValue(headers[i]);
            cell.setCellStyle(style);
        }
    }

    private void autosize(Sheet sheet, int totalKolom) {
        for (int i = 0; i < totalKolom; i++) {
            sheet.autoSizeColumn(i);
            int currentWidth = sheet.getColumnWidth(i);
            sheet.setColumnWidth(i, Math.min(currentWidth + 1000, 12000));
        }
    }

    private void setAutoFilter(Sheet sheet, int headerRowIndex, int totalKolom) {
        sheet.setAutoFilter(new CellRangeAddress(headerRowIndex, headerRowIndex, 0, totalKolom - 1));
        sheet.createFreezePane(0, headerRowIndex + 1);
    }

    @Override
    public ByteArrayInputStream downloadLaporanProduction() {
        return downloadLaporanProduction(null, null);
    }

    @Override
    public ByteArrayInputStream downloadLaporanProduction(LocalDate tanggalAwal, LocalDate tanggalAkhir) {
        try (Workbook workbook = new XSSFWorkbook();
                ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {

            CellStyle headerStyle = headerStyle(workbook);
            CellStyle bodyStyle = bodyStyle(workbook);
            CellStyle numberStyle = numberStyle(workbook);
            CellStyle centerStyle = centerStyle(workbook);

            String periodeLabel = buatLabelPeriode(tanggalAwal, tanggalAkhir);
            List<Produksi> produksiList = filterProduksi(tanggalAwal, tanggalAkhir);
            List<PengambilanBarang> pengambilanList = filterPengambilan(tanggalAwal, tanggalAkhir);
            List<HasilPengemasan> hasilList = filterHasilPengemasan(tanggalAwal, tanggalAkhir);
            List<Penjualan> penjualanList = filterPenjualan(tanggalAwal, tanggalAkhir);
            List<Stok> stokList = stokRepository.findAll();

            buatSheetRingkasan(workbook, headerStyle, produksiList, pengambilanList, hasilList, penjualanList, periodeLabel);
            buatSheetProduksi(workbook, headerStyle, bodyStyle, numberStyle, centerStyle, produksiList, periodeLabel);
            buatSheetPengambilan(workbook, headerStyle, bodyStyle, numberStyle, centerStyle, pengambilanList, periodeLabel);
            buatSheetHasilPengemasan(workbook, headerStyle, bodyStyle, numberStyle, centerStyle, hasilList, periodeLabel);
            buatSheetPenjualan(workbook, headerStyle, bodyStyle, numberStyle, centerStyle, penjualanList, periodeLabel);
            buatSheetStok(workbook, headerStyle, bodyStyle, numberStyle, centerStyle, stokList, periodeLabel);

            workbook.write(outputStream);
            return new ByteArrayInputStream(outputStream.toByteArray());

        } catch (Exception e) {
            throw new RuntimeException("Gagal membuat laporan Excel production: " + e.getMessage(), e);
        }
    }

    private String buatLabelPeriode(LocalDate tanggalAwal, LocalDate tanggalAkhir) {
        if (tanggalAwal != null && tanggalAkhir != null) {
            return "Periode: " + tanggalAwal + " s/d " + tanggalAkhir;
        }
        return "Periode: Semua data";
    }

    private boolean masukPeriode(LocalDate tanggal, LocalDate tanggalAwal, LocalDate tanggalAkhir) {
        if (tanggalAwal == null || tanggalAkhir == null || tanggal == null) {
            return true;
        }
        return !tanggal.isBefore(tanggalAwal) && !tanggal.isAfter(tanggalAkhir);
    }

    private List<Produksi> filterProduksi(LocalDate tanggalAwal, LocalDate tanggalAkhir) {
        return produksiRepository.findAll().stream()
                .filter(item -> masukPeriode(item.getTanggal(), tanggalAwal, tanggalAkhir))
                .collect(Collectors.toList());
    }

    private List<PengambilanBarang> filterPengambilan(LocalDate tanggalAwal, LocalDate tanggalAkhir) {
        return pengambilanBarangRepository.findAll().stream()
                .filter(item -> masukPeriode(item.getTanggal(), tanggalAwal, tanggalAkhir))
                .collect(Collectors.toList());
    }

    private List<HasilPengemasan> filterHasilPengemasan(LocalDate tanggalAwal, LocalDate tanggalAkhir) {
        return hasilPengemasanRepository.findAll().stream()
                .filter(item -> item.getPengambilanBarang() == null || masukPeriode(item.getPengambilanBarang().getTanggal(), tanggalAwal, tanggalAkhir))
                .collect(Collectors.toList());
    }

    private List<Penjualan> filterPenjualan(LocalDate tanggalAwal, LocalDate tanggalAkhir) {
        return penjualanRepository.findAll().stream()
                .filter(item -> masukPeriode(item.getTanggal(), tanggalAwal, tanggalAkhir))
                .collect(Collectors.toList());
    }

    private void buatSheetRingkasan(Workbook workbook, CellStyle headerStyle,
            List<Produksi> produksiList,
            List<PengambilanBarang> pengambilanList,
            List<HasilPengemasan> hasilList,
            List<Penjualan> penjualanList,
            String periodeLabel) {
        Sheet sheet = workbook.createSheet("Ringkasan");

        buatJudulSheet(sheet, workbook, "LAPORAN RINGKASAN PRODUCTION SOPWANA", 2);

        int totalProduksiBal = produksiList.stream().mapToInt(item -> item.getJumlahBal() == null ? 0 : item.getJumlahBal()).sum();
        int totalPengambilanBal = pengambilanList.stream().mapToInt(item -> item.getJumlahBal() == null ? 0 : item.getJumlahBal()).sum();
        int totalHasilIkat = hasilList.stream().mapToInt(item -> item.getJumlahIkat() == null ? 0 : item.getJumlahIkat()).sum();
        int totalHasilValid = hasilList.stream()
                .filter(item -> "VALID".equalsIgnoreCase(item.getStatusValidasi()))
                .mapToInt(item -> item.getJumlahIkat() == null ? 0 : item.getJumlahIkat())
                .sum();
        int totalIkatTerjual = penjualanList.stream().mapToInt(item -> item.getJumlahIkat() == null ? 0 : item.getJumlahIkat()).sum();
        int totalUangPenjualan = totalIkatTerjual * HARGA_JUAL_PER_IKAT;

        Integer stokBalKartu = hasilInteger("SELECT COALESCE(SUM(jumlah_bal), 0) FROM tbl_stok");
        Integer stokIkatKartu = hasilInteger("SELECT COALESCE(SUM(jumlah_ikat), 0) FROM tbl_stok");

        CellStyle labelStyle = summaryLabelStyle(workbook);
        CellStyle valueStyle = summaryValueStyle(workbook);

        buatHeader(sheet.createRow(3), headerStyle, "Keterangan", "Jumlah");

        int rowIdx = 4;
        buatRowRingkasan(sheet, rowIdx++, "Periode Laporan", periodeLabel, labelStyle, valueStyle);
        buatRowRingkasan(sheet, rowIdx++, "Total Produksi Bal", totalProduksiBal, labelStyle, valueStyle);
        buatRowRingkasan(sheet, rowIdx++, "Total Pengambilan Bal", totalPengambilanBal, labelStyle, valueStyle);
        buatRowRingkasan(sheet, rowIdx++, "Total Hasil Pengemasan Ikat", totalHasilIkat, labelStyle, valueStyle);
        buatRowRingkasan(sheet, rowIdx++, "Total Hasil VALID Ikat", totalHasilValid, labelStyle, valueStyle);
        buatRowRingkasan(sheet, rowIdx++, "Total Ikat Terjual", totalIkatTerjual, labelStyle, valueStyle);
        buatRowRingkasan(sheet, rowIdx++, "Harga Jual per Ikat", "Rp" + HARGA_JUAL_PER_IKAT, labelStyle, valueStyle);
        buatRowRingkasan(sheet, rowIdx++, "Total Uang Penjualan", totalUangPenjualan, labelStyle, valueStyle);
        buatRowRingkasan(sheet, rowIdx++, "Stok Bal Terkini dari Kartu Stok", stokBalKartu, labelStyle, valueStyle);
        buatRowRingkasan(sheet, rowIdx, "Stok Ikat Terkini dari Kartu Stok", stokIkatKartu, labelStyle, valueStyle);

        setAutoFilter(sheet, 3, 2);
        autosize(sheet, 2);
    }

    private void buatRowRingkasan(Sheet sheet, int rowIndex, String label, Integer value,
            CellStyle labelStyle, CellStyle valueStyle) {
        Row row = sheet.createRow(rowIndex);

        Cell cellLabel = row.createCell(0);
        cellLabel.setCellValue(label);
        cellLabel.setCellStyle(labelStyle);

        Cell cellValue = row.createCell(1);
        cellValue.setCellValue(value == null ? 0 : value);
        cellValue.setCellStyle(valueStyle);
    }

    private void buatRowRingkasan(Sheet sheet, int rowIndex, String label, String value,
            CellStyle labelStyle, CellStyle valueStyle) {
        Row row = sheet.createRow(rowIndex);

        Cell cellLabel = row.createCell(0);
        cellLabel.setCellValue(label);
        cellLabel.setCellStyle(labelStyle);

        Cell cellValue = row.createCell(1);
        cellValue.setCellValue(value == null ? "-" : value);
        cellValue.setCellStyle(valueStyle);
    }

    private void buatSheetProduksi(Workbook workbook, CellStyle headerStyle,
            CellStyle bodyStyle, CellStyle numberStyle, CellStyle centerStyle,
            List<Produksi> data, String periodeLabel) {
        Sheet sheet = workbook.createSheet("Produksi");

        buatJudulSheet(sheet, workbook, "LAPORAN DATA PRODUKSI - " + periodeLabel, 3);

        buatHeader(sheet.createRow(3), headerStyle,
                "ID Produksi",
                "Tanggal",
                "Jumlah Bal");

        int rowIdx = 4;
        for (Produksi item : data) {
            Row row = sheet.createRow(rowIdx++);

            Cell c0 = row.createCell(0);
            c0.setCellValue(item.getIdProduksi() == null ? 0 : item.getIdProduksi());
            c0.setCellStyle(centerStyle);

            Cell c1 = row.createCell(1);
            c1.setCellValue(item.getTanggal() == null ? "-" : item.getTanggal().toString());
            c1.setCellStyle(centerStyle);

            Cell c2 = row.createCell(2);
            c2.setCellValue(item.getJumlahBal() == null ? 0 : item.getJumlahBal());
            c2.setCellStyle(numberStyle);
        }

        setAutoFilter(sheet, 3, 3);
        autosize(sheet, 3);
    }

    private void buatSheetPengambilan(Workbook workbook, CellStyle headerStyle,
            CellStyle bodyStyle, CellStyle numberStyle, CellStyle centerStyle,
            List<PengambilanBarang> data, String periodeLabel) {
        Sheet sheet = workbook.createSheet("Pengambilan Barang");

        buatJudulSheet(sheet, workbook, "LAPORAN PENGAMBILAN BARANG - " + periodeLabel, 4);

        buatHeader(sheet.createRow(3), headerStyle,
                "ID Pengambilan",
                "Pekerja ID",
                "Jumlah Bal",
                "Tanggal");

        int rowIdx = 4;
        for (PengambilanBarang item : data) {
            Row row = sheet.createRow(rowIdx++);

            Cell c0 = row.createCell(0);
            c0.setCellValue(item.getIdPengambilan() == null ? 0 : item.getIdPengambilan());
            c0.setCellStyle(centerStyle);

            Cell c1 = row.createCell(1);
            c1.setCellValue(item.getPekerjaId() == null ? 0 : item.getPekerjaId());
            c1.setCellStyle(centerStyle);

            Cell c2 = row.createCell(2);
            c2.setCellValue(item.getJumlahBal() == null ? 0 : item.getJumlahBal());
            c2.setCellStyle(numberStyle);

            Cell c3 = row.createCell(3);
            c3.setCellValue(item.getTanggal() == null ? "-" : item.getTanggal().toString());
            c3.setCellStyle(centerStyle);
        }

        setAutoFilter(sheet, 3, 4);
        autosize(sheet, 4);
    }

    private void buatSheetHasilPengemasan(Workbook workbook, CellStyle headerStyle,
            CellStyle bodyStyle, CellStyle numberStyle, CellStyle centerStyle,
            List<HasilPengemasan> data, String periodeLabel) {
        Sheet sheet = workbook.createSheet("Hasil Pengemasan");

        buatJudulSheet(sheet, workbook, "LAPORAN HASIL PENGEMASAN - " + periodeLabel, 6);

        buatHeader(sheet.createRow(3), headerStyle,
                "ID Hasil",
                "ID Pengambilan",
                "Tanggal Pengambilan",
                "Jumlah Ikat",
                "Status Validasi",
                "Catatan");

        CellStyle validStyle = validStyle(workbook);
        CellStyle pendingStyle = pendingStyle(workbook);
        CellStyle ditolakStyle = ditolakStyle(workbook);

        int rowIdx = 4;
        for (HasilPengemasan item : data) {
            Row row = sheet.createRow(rowIdx++);

            Cell c0 = row.createCell(0);
            c0.setCellValue(item.getIdHasil() == null ? 0 : item.getIdHasil());
            c0.setCellStyle(centerStyle);

            Long idPengambilan = 0L;
            String tanggalPengambilan = "-";
            if (item.getPengambilanBarang() != null) {
                if (item.getPengambilanBarang().getIdPengambilan() != null) {
                    idPengambilan = item.getPengambilanBarang().getIdPengambilan();
                }
                if (item.getPengambilanBarang().getTanggal() != null) {
                    tanggalPengambilan = item.getPengambilanBarang().getTanggal().toString();
                }
            }

            Cell c1 = row.createCell(1);
            c1.setCellValue(idPengambilan);
            c1.setCellStyle(centerStyle);

            Cell c2 = row.createCell(2);
            c2.setCellValue(tanggalPengambilan);
            c2.setCellStyle(centerStyle);

            Cell c3 = row.createCell(3);
            c3.setCellValue(item.getJumlahIkat() == null ? 0 : item.getJumlahIkat());
            c3.setCellStyle(numberStyle);

            String status = item.getStatusValidasi() == null ? "PENDING" : item.getStatusValidasi();

            Cell c4 = row.createCell(4);
            c4.setCellValue(status);

            if ("VALID".equalsIgnoreCase(status)) {
                c4.setCellStyle(validStyle);
            } else if ("DITOLAK".equalsIgnoreCase(status)) {
                c4.setCellStyle(ditolakStyle);
            } else {
                c4.setCellStyle(pendingStyle);
            }

            Cell c5 = row.createCell(5);
            c5.setCellValue(item.getCatatan() == null ? "-" : item.getCatatan());
            c5.setCellStyle(bodyStyle);
        }

        setAutoFilter(sheet, 3, 6);
        autosize(sheet, 6);
    }

    private void buatSheetPenjualan(Workbook workbook, CellStyle headerStyle,
            CellStyle bodyStyle, CellStyle numberStyle, CellStyle centerStyle,
            List<Penjualan> data, String periodeLabel) {
        Sheet sheet = workbook.createSheet("Penjualan");

        buatJudulSheet(sheet, workbook, "LAPORAN PENJUALAN - " + periodeLabel, 6);

        buatHeader(sheet.createRow(3), headerStyle,
                "ID Penjualan",
                "Tanggal",
                "Jumlah Ikat",
                "Harga / Ikat",
                "Total Uang",
                "Catatan");

        int rowIdx = 4;
        for (Penjualan item : data) {
            int jumlahIkat = item.getJumlahIkat() == null ? 0 : item.getJumlahIkat();
            int totalUang = jumlahIkat * HARGA_JUAL_PER_IKAT;

            Row row = sheet.createRow(rowIdx++);

            Cell c0 = row.createCell(0);
            c0.setCellValue(item.getIdPenjualan() == null ? 0 : item.getIdPenjualan());
            c0.setCellStyle(centerStyle);

            Cell c1 = row.createCell(1);
            c1.setCellValue(item.getTanggal() == null ? "-" : item.getTanggal().toString());
            c1.setCellStyle(centerStyle);

            Cell c2 = row.createCell(2);
            c2.setCellValue(jumlahIkat);
            c2.setCellStyle(numberStyle);

            Cell c3 = row.createCell(3);
            c3.setCellValue(HARGA_JUAL_PER_IKAT);
            c3.setCellStyle(numberStyle);

            Cell c4 = row.createCell(4);
            c4.setCellValue(totalUang);
            c4.setCellStyle(numberStyle);

            Cell c5 = row.createCell(5);
            c5.setCellValue(item.getCatatan() == null ? "-" : item.getCatatan());
            c5.setCellStyle(bodyStyle);
        }

        setAutoFilter(sheet, 3, 6);
        autosize(sheet, 6);
    }

    private void buatSheetStok(Workbook workbook, CellStyle headerStyle,
            CellStyle bodyStyle, CellStyle numberStyle, CellStyle centerStyle,
            List<Stok> data, String periodeLabel) {
        Sheet sheet = workbook.createSheet("Kartu Stok");

        buatJudulSheet(sheet, workbook, "LAPORAN KARTU STOK - " + periodeLabel, 3);

        buatHeader(sheet.createRow(3), headerStyle,
                "ID Stok",
                "Jumlah Bal",
                "Jumlah Ikat");

        int rowIdx = 4;
        for (Stok item : data) {
            Row row = sheet.createRow(rowIdx++);

            Cell c0 = row.createCell(0);
            c0.setCellValue(item.getIdStok() == null ? 0 : item.getIdStok());
            c0.setCellStyle(centerStyle);

            Cell c1 = row.createCell(1);
            c1.setCellValue(item.getJumlahBal() == null ? 0 : item.getJumlahBal());
            c1.setCellStyle(numberStyle);

            Cell c2 = row.createCell(2);
            c2.setCellValue(item.getJumlahIkat() == null ? 0 : item.getJumlahIkat());
            c2.setCellStyle(numberStyle);
        }

        setAutoFilter(sheet, 3, 3);
        autosize(sheet, 3);
    }

}
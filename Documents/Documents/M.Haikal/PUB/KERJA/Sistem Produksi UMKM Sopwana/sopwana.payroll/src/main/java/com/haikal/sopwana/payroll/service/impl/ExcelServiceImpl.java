package com.haikal.sopwana.payroll.service.impl;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.haikal.sopwana.payroll.entity.Pekerja;
import com.haikal.sopwana.payroll.entity.Penggajian;
import com.haikal.sopwana.payroll.repository.PekerjaRepository;
import com.haikal.sopwana.payroll.repository.PenggajianRepository;
import com.haikal.sopwana.payroll.service.ExcelService;
import com.haikal.sopwana.payroll.util.ExcelHelper;

@Service
public class ExcelServiceImpl implements ExcelService {

    @Autowired
    private PekerjaRepository pekerjaRepo;

    @Autowired
    private PenggajianRepository gajiRepo;

    @Override
    public void importPekerja(MultipartFile file) {
        try {
            List<Pekerja> pekerjaList = ExcelHelper.excelToPekerja(file.getInputStream());
            pekerjaRepo.saveAll(pekerjaList);
        } catch (Exception e) {
            throw new RuntimeException("Proses penyimpanan data Excel gagal: " + e.getMessage());
        }
    }

    @Override
    public ByteArrayInputStream exportLaporanGaji() {
        return exportLaporanGaji(null, null);
    }

    @Override
    public ByteArrayInputStream exportLaporanGaji(LocalDate tanggalAwal, LocalDate tanggalAkhir) {
        try (Workbook workbook = new XSSFWorkbook();
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {

            List<Penggajian> list = ambilDataGaji(tanggalAwal, tanggalAkhir);

            CellStyle titleStyle = titleStyle(workbook);
            CellStyle subtitleStyle = subtitleStyle(workbook);
            CellStyle headerStyle = headerStyle(workbook);
            CellStyle bodyStyle = bodyStyle(workbook);
            CellStyle centerStyle = centerStyle(workbook);
            CellStyle currencyStyle = currencyStyle(workbook);
            CellStyle pendingStyle = pendingStyle(workbook);
            CellStyle paidStyle = paidStyle(workbook);
            CellStyle summaryLabelStyle = summaryLabelStyle(workbook);
            CellStyle summaryValueStyle = summaryValueStyle(workbook);

            String periodeLabel = buatLabelPeriode(tanggalAwal, tanggalAkhir);

            buatSheetRingkasan(
                    workbook,
                    list,
                    titleStyle,
                    subtitleStyle,
                    headerStyle,
                    summaryLabelStyle,
                    summaryValueStyle,
                    periodeLabel
            );

            buatSheetDetailGaji(
                    workbook,
                    list,
                    titleStyle,
                    subtitleStyle,
                    headerStyle,
                    bodyStyle,
                    centerStyle,
                    currencyStyle,
                    pendingStyle,
                    paidStyle,
                    periodeLabel
            );

            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());

        } catch (Exception e) {
            throw new RuntimeException("Gagal mengekspor data ke Excel: " + e.getMessage());
        }
    }

    private List<Penggajian> ambilDataGaji(LocalDate tanggalAwal, LocalDate tanggalAkhir) {
        if (tanggalAwal != null && tanggalAkhir != null) {
            return gajiRepo.findByTanggalBetweenOrderByPekerjaIdPekerjaAscTanggalAsc(tanggalAwal, tanggalAkhir);
        }
        return gajiRepo.findAll();
    }

    private String buatLabelPeriode(LocalDate tanggalAwal, LocalDate tanggalAkhir) {
        if (tanggalAwal != null && tanggalAkhir != null) {
            return "Periode: " + tanggalAwal + " s/d " + tanggalAkhir;
        }
        return "Periode: Semua data";
    }

    private void buatSheetRingkasan(
            Workbook workbook,
            List<Penggajian> list,
            CellStyle titleStyle,
            CellStyle subtitleStyle,
            CellStyle headerStyle,
            CellStyle summaryLabelStyle,
            CellStyle summaryValueStyle,
            String periodeLabel
    ) {
        Sheet sheet = workbook.createSheet("Ringkasan Gaji");

        buatJudul(sheet, "LAPORAN RINGKASAN GAJI SOPWANA", periodeLabel, 2, titleStyle, subtitleStyle);

        int totalTransaksi = list.size();
        long totalPending = list.stream()
                .filter(g -> "PENDING".equalsIgnoreCase(amanString(g.getStatus())))
                .count();

        long totalSudahDibayar = list.stream()
                .filter(g -> ("SUDAH_DIBAYAR".equalsIgnoreCase(amanString(g.getStatus())) || "DIBAYAR".equalsIgnoreCase(amanString(g.getStatus()))))
                .count();

        BigDecimal totalUpah = list.stream()
                .map(g -> g.getTotalUpah() == null ? BigDecimal.ZERO : g.getTotalUpah())
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalUpahPending = list.stream()
                .filter(g -> "PENDING".equalsIgnoreCase(amanString(g.getStatus())))
                .map(g -> g.getTotalUpah() == null ? BigDecimal.ZERO : g.getTotalUpah())
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalUpahDibayar = list.stream()
                .filter(g -> ("SUDAH_DIBAYAR".equalsIgnoreCase(amanString(g.getStatus())) || "DIBAYAR".equalsIgnoreCase(amanString(g.getStatus()))))
                .map(g -> g.getTotalUpah() == null ? BigDecimal.ZERO : g.getTotalUpah())
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        buatHeader(sheet.createRow(3), headerStyle, "Keterangan", "Jumlah");

        int rowIdx = 4;
        buatRingkasanRow(sheet, rowIdx++, "Total Transaksi Gaji", totalTransaksi, summaryLabelStyle, summaryValueStyle);
        buatRingkasanRow(sheet, rowIdx++, "Total Status PENDING", totalPending, summaryLabelStyle, summaryValueStyle);
        buatRingkasanRow(sheet, rowIdx++, "Total Status SUDAH_DIBAYAR", totalSudahDibayar, summaryLabelStyle, summaryValueStyle);
        buatRingkasanRow(sheet, rowIdx++, "Total Semua Upah", totalUpah.doubleValue(), summaryLabelStyle, summaryValueStyle);
        buatRingkasanRow(sheet, rowIdx++, "Total Upah Pending", totalUpahPending.doubleValue(), summaryLabelStyle, summaryValueStyle);
        buatRingkasanRow(sheet, rowIdx, "Total Upah Sudah Dibayar", totalUpahDibayar.doubleValue(), summaryLabelStyle, summaryValueStyle);

        sheet.setAutoFilter(new CellRangeAddress(3, 3, 0, 1));
        sheet.createFreezePane(0, 4);
        autosize(sheet, 2);
    }

    private void buatSheetDetailGaji(
            Workbook workbook,
            List<Penggajian> list,
            CellStyle titleStyle,
            CellStyle subtitleStyle,
            CellStyle headerStyle,
            CellStyle bodyStyle,
            CellStyle centerStyle,
            CellStyle currencyStyle,
            CellStyle pendingStyle,
            CellStyle paidStyle,
            String periodeLabel
    ) {
        Sheet sheet = workbook.createSheet("Detail Gaji");

        buatJudul(sheet, "LAPORAN DETAIL GAJI PEKERJA SOPWANA", periodeLabel, 7, titleStyle, subtitleStyle);

        buatHeader(sheet.createRow(3), headerStyle,
                "ID GAJI",
                "NAMA PEKERJA",
                "TOTAL UPAH",
                "TANGGAL",
                "STATUS",
                "TANGGAL DIBAYAR",
                "KETERANGAN"
        );

        int rowIndex = 4;

        for (Penggajian g : list) {
            Row row = sheet.createRow(rowIndex++);

            Cell c0 = row.createCell(0);
            c0.setCellValue(g.getIdPenggajian() == null ? 0 : g.getIdPenggajian());
            c0.setCellStyle(centerStyle);

            Cell c1 = row.createCell(1);
            c1.setCellValue(
                    g.getPekerja() == null || g.getPekerja().getNama() == null
                            ? "-"
                            : g.getPekerja().getNama()
            );
            c1.setCellStyle(bodyStyle);

            Cell c2 = row.createCell(2);
            c2.setCellValue(g.getTotalUpah() == null ? 0 : g.getTotalUpah().doubleValue());
            c2.setCellStyle(currencyStyle);

            Cell c3 = row.createCell(3);
            c3.setCellValue(g.getTanggal() == null ? "-" : g.getTanggal().toString());
            c3.setCellStyle(centerStyle);

            String status = amanString(g.getStatus());

            Cell c4 = row.createCell(4);
            c4.setCellValue(status);

            if ("SUDAH_DIBAYAR".equalsIgnoreCase(status) || "DIBAYAR".equalsIgnoreCase(status)) {
                c4.setCellStyle(paidStyle);
            } else {
                c4.setCellStyle(pendingStyle);
            }

            Cell c5 = row.createCell(5);
            try {
                c5.setCellValue(g.getTanggalDibayar() == null ? "-" : g.getTanggalDibayar().toString());
            } catch (Exception e) {
                c5.setCellValue("-");
            }
            c5.setCellStyle(centerStyle);

            Cell c6 = row.createCell(6);
            if ("SUDAH_DIBAYAR".equalsIgnoreCase(status) || "DIBAYAR".equalsIgnoreCase(status)) {
                c6.setCellValue("Slip upah sudah lunas dan dapat diberikan kepada pekerja.");
            } else {
                c6.setCellValue("Upah belum dibayar, menunggu konfirmasi pemilik.");
            }
            c6.setCellStyle(bodyStyle);
        }

        sheet.setAutoFilter(new CellRangeAddress(3, 3, 0, 6));
        sheet.createFreezePane(0, 4);
        autosize(sheet, 7);
    }

    private void buatJudul(
            Sheet sheet,
            String judul,
            String periodeLabel,
            int jumlahKolom,
            CellStyle titleStyle,
            CellStyle subtitleStyle
    ) {
        Row titleRow = sheet.createRow(0);
        titleRow.setHeightInPoints(30);

        Cell titleCell = titleRow.createCell(0);
        titleCell.setCellValue(judul);
        titleCell.setCellStyle(titleStyle);

        sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, jumlahKolom - 1));

        Row subtitleRow = sheet.createRow(1);
        Cell subtitleCell = subtitleRow.createCell(0);
        subtitleCell.setCellValue(periodeLabel + " | Dicetak pada: " + LocalDateTime.now()
                .format(DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss")));
        subtitleCell.setCellStyle(subtitleStyle);

        sheet.addMergedRegion(new CellRangeAddress(1, 1, 0, jumlahKolom - 1));
    }

    private void buatHeader(Row row, CellStyle style, String... headers) {
        row.setHeightInPoints(24);

        for (int col = 0; col < headers.length; col++) {
            Cell cell = row.createCell(col);
            cell.setCellValue(headers[col]);
            cell.setCellStyle(style);
        }
    }

    private void buatRingkasanRow(
            Sheet sheet,
            int rowIndex,
            String label,
            double value,
            CellStyle labelStyle,
            CellStyle valueStyle
    ) {
        Row row = sheet.createRow(rowIndex);

        Cell labelCell = row.createCell(0);
        labelCell.setCellValue(label);
        labelCell.setCellStyle(labelStyle);

        Cell valueCell = row.createCell(1);
        valueCell.setCellValue(value);
        valueCell.setCellStyle(valueStyle);
    }

    private void autosize(Sheet sheet, int totalKolom) {
        for (int i = 0; i < totalKolom; i++) {
            sheet.autoSizeColumn(i);
            int width = sheet.getColumnWidth(i);
            sheet.setColumnWidth(i, Math.min(width + 1200, 14000));
        }
    }

    private String amanString(String value) {
        return value == null || value.isBlank() ? "PENDING" : value.trim().toUpperCase();
    }

    private CellStyle titleStyle(Workbook workbook) {
        Font font = workbook.createFont();
        font.setBold(true);
        font.setFontHeightInPoints((short) 16);
        font.setColor(IndexedColors.WHITE.getIndex());

        CellStyle style = workbook.createCellStyle();
        style.setFont(font);
        style.setFillForegroundColor(IndexedColors.DARK_BLUE.getIndex());
        style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        style.setAlignment(HorizontalAlignment.CENTER);
        style.setVerticalAlignment(VerticalAlignment.CENTER);

        return style;
    }

    private CellStyle subtitleStyle(Workbook workbook) {
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
        style.setFillForegroundColor(IndexedColors.BROWN.getIndex());
        style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        style.setAlignment(HorizontalAlignment.CENTER);
        style.setVerticalAlignment(VerticalAlignment.CENTER);

        beriBorder(style);

        return style;
    }

    private CellStyle bodyStyle(Workbook workbook) {
        CellStyle style = workbook.createCellStyle();
        style.setVerticalAlignment(VerticalAlignment.CENTER);
        beriBorder(style);
        return style;
    }

    private CellStyle centerStyle(Workbook workbook) {
        CellStyle style = bodyStyle(workbook);
        style.setAlignment(HorizontalAlignment.CENTER);
        return style;
    }

    private CellStyle currencyStyle(Workbook workbook) {
        CellStyle style = bodyStyle(workbook);
        DataFormat format = workbook.createDataFormat();
        style.setDataFormat(format.getFormat("\"Rp\" #,##0"));
        style.setAlignment(HorizontalAlignment.RIGHT);
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

        CellStyle style = currencyStyle(workbook);
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

    private CellStyle paidStyle(Workbook workbook) {
        Font font = workbook.createFont();
        font.setBold(true);
        font.setColor(IndexedColors.GREEN.getIndex());

        CellStyle style = centerStyle(workbook);
        style.setFont(font);
        style.setFillForegroundColor(IndexedColors.LIGHT_GREEN.getIndex());
        style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        return style;
    }

    private void beriBorder(CellStyle style) {
        style.setBorderTop(BorderStyle.THIN);
        style.setBorderBottom(BorderStyle.THIN);
        style.setBorderLeft(BorderStyle.THIN);
        style.setBorderRight(BorderStyle.THIN);
    }
}
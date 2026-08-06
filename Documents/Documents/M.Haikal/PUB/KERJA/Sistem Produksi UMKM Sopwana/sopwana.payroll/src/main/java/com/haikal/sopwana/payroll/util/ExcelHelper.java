package com.haikal.sopwana.payroll.util;

import com.haikal.sopwana.payroll.entity.Pekerja;
import com.haikal.sopwana.payroll.exception.ExcelParsingException;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

public class ExcelHelper {

    public static List<Pekerja> excelToPekerja(InputStream is) {
        try (Workbook workbook = new XSSFWorkbook(is)) {
            Sheet sheet = workbook.getSheetAt(0);
            List<Pekerja> list = new ArrayList<>();

            // Iterasi data baris ke-2 (Index 1) karena baris pertama adalah header
            for (int r = 1; r <= sheet.getLastRowNum(); r++) {
                Row row = sheet.getRow(r);
                if (row == null)
                    continue;

                Pekerja p = new Pekerja();
                p.setNama(row.getCell(0).getStringCellValue());
                p.setEmail(row.getCell(1).getStringCellValue());
                p.setAlamat(row.getCell(2).getStringCellValue());
                p.setNoHp(row.getCell(3).getStringCellValue());
                list.add(p);
            }
            return list;
        } catch (Exception e) {
            throw new ExcelParsingException("Gagal melakukan impor lembar Excel: " + e.getMessage());
        }
    }
}
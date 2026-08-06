package com.haikal.sopwana.payroll.service.impl;

import com.haikal.sopwana.payroll.service.EmailService;

import jakarta.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.text.NumberFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Override
    public void kirimSlipGaji(
            String emailTujuan,
            String namaPekerja,
            LocalDate tanggalAwal,
            LocalDate tanggalAkhir,
            Integer totalBal,
            Integer totalIkat,
            BigDecimal totalUpah,
            LocalDate tanggalDibayar) {
        try {
            if (emailTujuan == null || emailTujuan.isBlank()) {
                throw new RuntimeException("Email pekerja kosong, slip upah tidak dapat dikirim.");
            }

            String nama = namaPekerja == null || namaPekerja.isBlank()
                    ? "Pekerja Sopwana"
                    : namaPekerja;

            Integer bal = totalBal == null ? 0 : totalBal;
            Integer ikat = totalIkat == null ? 0 : totalIkat;
            BigDecimal upah = totalUpah == null ? BigDecimal.ZERO : totalUpah;

            String tglAwalStr = tanggalAwal == null
                    ? "-"
                    : tanggalAwal.format(DateTimeFormatter.ofPattern("dd-MM-yyyy"));
            String tglAkhirStr = tanggalAkhir == null
                    ? "-"
                    : tanggalAkhir.format(DateTimeFormatter.ofPattern("dd-MM-yyyy"));
            String periode = tglAwalStr + " - " + tglAkhirStr;

            String tanggalBayarStr = tanggalDibayar == null
                    ? "-"
                    : tanggalDibayar.format(DateTimeFormatter.ofPattern("dd-MM-yyyy"));

            String totalUpahFormat = formatRupiah(upah);

            MimeMessage message = javaMailSender.createMimeMessage();

            MimeMessageHelper helper = new MimeMessageHelper(
                    message,
                    true,
                    "UTF-8");

            helper.setTo(emailTujuan);
            helper.setSubject("Slip Gaji Sopwana - " + nama + " - " + periode);

            String htmlContent = """
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="UTF-8">
                        <title>Slip Gaji Pekerja</title>
                    </head>
                    <body style="margin: 0; padding: 0; background-color: #EFF7F9; font-family: 'Segoe UI', Arial, sans-serif; -webkit-font-smoothing: antialiased;">
                        <table width="100%%" border="0" cellspacing="0" cellpadding="0" style="background-color: #EFF7F9; padding: 40px 20px;">
                            <tr>
                                <td align="center">
                                    <table width="100%%" style="max-width: 600px; background-color: #FFFFFF; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06); border-collapse: collapse;">
                                        <!-- Header -->
                                        <tr>
                                            <td style="background: linear-gradient(135deg, #0B6678 0%%, #0E8399 100%%); padding: 32px 40px; text-align: center;">
                                                <span style="display: block; font-size: 12px; font-weight: 700; color: #B5D6D9; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px;">UMKM Kerupuk Sopwana</span>
                                                <h1 style="margin: 0; font-size: 26px; font-weight: 700; color: #FFFFFF; letter-spacing: 0.5px;">Slip Gaji Pekerja</h1>
                                            </td>
                                        </tr>
                                        
                                        <!-- Content -->
                                        <tr>
                                            <td style="padding: 40px; color: #334155; font-size: 15px; line-height: 1.6;">
                                                <p style="margin-top: 0; margin-bottom: 16px; font-size: 16px;">
                                                    Halo <strong>%s</strong>,
                                                </p>
                                                <p style="margin-bottom: 24px; color: #475569;">
                                                    Gaji Anda untuk periode <strong>%s</strong> telah dikonfirmasi dan dibayarkan oleh pemilik.
                                                </p>
                                                
                                                <h3 style="margin: 24px 0 12px 0; font-size: 16px; color: #0B6678; border-bottom: 2px solid #82B2B8; padding-bottom: 8px;">Rincian Slip Gaji</h3>
                                                
                                                <table width="100%%" style="border-collapse: collapse; margin-bottom: 24px;">
                                                    <tr>
                                                        <td style="padding: 10px 0; border-bottom: 1px solid #EFF7F9; color: #64748B; width: 45%%;">Nama Pekerja</td>
                                                        <td style="padding: 10px 0; border-bottom: 1px solid #EFF7F9; color: #1E293B; font-weight: 600;">%s</td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding: 10px 0; border-bottom: 1px solid #EFF7F9; color: #64748B;">Periode</td>
                                                        <td style="padding: 10px 0; border-bottom: 1px solid #EFF7F9; color: #1E293B; font-weight: 600;">%s</td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding: 10px 0; border-bottom: 1px solid #EFF7F9; color: #64748B;">Total Bal</td>
                                                        <td style="padding: 10px 0; border-bottom: 1px solid #EFF7F9; color: #1E293B; font-weight: 600;">%d bal</td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding: 10px 0; border-bottom: 1px solid #EFF7F9; color: #64748B;">Total Ikat Valid</td>
                                                        <td style="padding: 10px 0; border-bottom: 1px solid #EFF7F9; color: #1E293B; font-weight: 600;">%d ikat</td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding: 10px 0; border-bottom: 1px solid #EFF7F9; color: #64748B;">Tarif per Ikat</td>
                                                        <td style="padding: 10px 0; border-bottom: 1px solid #EFF7F9; color: #1E293B; font-weight: 600;">Rp1.000</td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding: 10px 0; border-bottom: 1px solid #EFF7F9; color: #64748B; font-weight: bold;">Total Upah</td>
                                                        <td style="padding: 10px 0; border-bottom: 1px solid #EFF7F9; color: #0B6678; font-weight: bold; font-size: 16px;">%s</td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding: 10px 0; border-bottom: 1px solid #EFF7F9; color: #64748B;">Status</td>
                                                        <td style="padding: 10px 0; border-bottom: 1px solid #EFF7F9;">
                                                            <span style="background-color: #dcf8ed; color: #059669; padding: 4px 10px; border-radius: 9999px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">DIBAYAR</span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding: 10px 0; border-bottom: 1px solid #EFF7F9; color: #64748B;">Tanggal Pembayaran</td>
                                                        <td style="padding: 10px 0; border-bottom: 1px solid #EFF7F9; color: #1E293B; font-weight: 600;">%s</td>
                                                    </tr>
                                                </table>
                                                
                                                <p style="margin-top: 24px; margin-bottom: 0; color: #475569;">
                                                    Terima kasih atas kerja keras Anda.
                                                </p>
                                            </td>
                                        </tr>
                                        
                                        <!-- Footer -->
                                        <tr>
                                            <td style="background-color: #EFF7F9; border-top: 1px solid #82B2B8; padding: 24px 40px; text-align: center; color: #0B6678; font-size: 12px; line-height: 1.5;">
                                                Email ini dikirim otomatis oleh <strong>Sistem Sopwana Production & Payroll</strong>.<br>
                                                Mohon tidak membalas email ini secara langsung.
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </body>
                    </html>
                    """
                    .formatted(
                            nama,
                            periode,
                            nama,
                            periode,
                            bal,
                            ikat,
                            totalUpahFormat,
                            tanggalBayarStr);

            helper.setText(htmlContent, true);

            javaMailSender.send(message);

        } catch (Exception e) {
            throw new RuntimeException("Gagal mengirim slip upah ke email pekerja: " + e.getMessage(), e);
        }
    }

    private String formatRupiah(BigDecimal nominal) {
        NumberFormat formatter = NumberFormat.getCurrencyInstance(new Locale("id", "ID"));
        return formatter.format(nominal == null ? BigDecimal.ZERO : nominal);
    }
}
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Slip Gaji - {{ $payroll->user ? $payroll->user->name : 'Karyawan' }}</title>
    <style>
        body { font-family: sans-serif; font-size: 11px; color: #000; padding: 10px; }
        .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 8px; margin-bottom: 10px; }
        .header h3 { margin: 0; font-size: 16px; }
        .line { border-bottom: 1px dashed #000; margin: 8px 0; }
        table { width: 100%; border-collapse: collapse; }
        td { padding: 4px 0; }
        .text-right { text-align: right; }
        .fw-bold { font-weight: bold; }
    </style>
</head>
<body>

    <div class="header">
        <h3>TB BERKAH JAYA CITAPEN</h3>
        <small>SLIP GAJI INDIVIDU KARYAWAN</small><br>
        <small>Periode Bulan: {{ $payroll->month }}</small>
    </div>

    <table>
        <tr>
            <td>Nama Karyawan:</td>
            <td class="text-right fw-bold">{{ $payroll->user ? $payroll->user->name : '-' }}</td>
        </tr>
        <tr>
            <td>Jabatan/Role:</td>
            <td class="text-right">{{ strtoupper($payroll->user ? $payroll->user->role : 'Staf') }}</td>
        </tr>
    </table>

    <div class="line"></div>

    <div class="fw-bold" style="margin-bottom: 5px;">Rincian Take Home Pay (THP):</div>
    <table>
        <tr>
            <td>+ Gaji Pokok:</td>
            <td class="text-right">Rp {{ number_format($payroll->base_salary, 0, ',', '.') }}</td>
        </tr>
        <tr>
            <td>+ Tunjangan Posisi:</td>
            <td class="text-right">Rp {{ number_format($payroll->allowance, 0, ',', '.') }}</td>
        </tr>
        <tr>
            <td>- Potongan Kasbon Berjalan:</td>
            <td class="text-right" style="color: red;">- Rp {{ number_format($payroll->kasbon_deduction, 0, ',', '.') }}</td>
        </tr>
    </table>

    <div class="line"></div>

    <table>
        <tr class="fw-bold" style="font-size: 13px;">
            <td>TOTAL GAJI BERSIH (THP):</td>
            <td class="text-right">Rp {{ number_format($payroll->net_salary, 0, ',', '.') }}</td>
        </tr>
    </table>

    <div class="line"></div>

    <div style="margin-top: 30px; text-align: right;">
        <small>Citapen, {{ now()->translatedFormat('d F Y') }}</small><br>
        <small>Manajer Toko / Admin</small><br><br><br>
        <span class="fw-bold">( TB Berkah Jaya )</span>
    </div>

</body>
</html>

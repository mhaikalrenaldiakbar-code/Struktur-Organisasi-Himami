<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Laporan Relegasi Penjualan Bulanan - TB Berkah Jaya</title>
    <style>
        body { font-family: sans-serif; font-size: 11px; color: #333; }
        .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 15px; }
        .header h2 { margin: 0; font-size: 18px; }
        .header p { margin: 2px 0; font-size: 12px; color: #555; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { border: 1px solid #ccc; padding: 6px; text-align: left; }
        th { background-color: #f2f2f2; font-weight: bold; }
        .text-right { text-align: right; }
        .text-center { text-align: center; }
        .summary-box { background-color: #f8fafc; border: 1px solid #cbd5e1; padding: 10px; margin-bottom: 15px; border-radius: 4px; }
    </style>
</head>
<body>

    <div class="header">
        <h2>TB BERKAH JAYA CITAPEN</h2>
        <p>LAPORAN PENJUALAN & REKAP KASIR BULANAN</p>
        <p><small>Periode Bulan: {{ $month }}</small></p>
    </div>

    <div class="summary-box">
        <table>
            <tr style="border:none;">
                <td style="border:none;"><strong>Total Lembar Invoice:</strong> {{ $invoiceCount }} Transaksi</td>
                <td style="border:none;" class="text-right"><strong>Total Omzet Kotor:</strong> Rp {{ number_format($totalRevenue, 0, ',', '.') }}</td>
            </tr>
            <tr style="border:none;">
                <td style="border:none;"><strong>Total Potongan Diskon:</strong> Rp {{ number_format($totalDiscount, 0, ',', '.') }}</td>
                <td style="border:none;" class="text-right"><strong>Total Profit Bersih Terakumulasi:</strong> Rp {{ number_format($totalRevenue - $totalDiscount, 0, ',', '.') }}</td>
            </tr>
        </table>
    </div>

    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>No Invoice</th>
                <th>Waktu Transaksi</th>
                <th>Kasir Duty</th>
                <th>Metode Pembayaran</th>
                <th>Diskon</th>
                <th>Total Netto</th>
            </tr>
        </thead>
        <tbody>
            @foreach($transactions as $index => $tx)
                <tr>
                    <td class="text-center">{{ $index + 1 }}</td>
                    <td><code>{{ $tx->invoice_number }}</code></td>
                    <td>{{ $tx->created_at->format('d/m/Y H:i') }}</td>
                    <td>{{ $tx->user ? $tx->user->name : '-' }}</td>
                    <td class="text-center">{{ strtoupper($tx->payment_method) }}</td>
                    <td class="text-right">Rp {{ number_format($tx->discount_amount, 0, ',', '.') }}</td>
                    <td class="text-right"><strong>Rp {{ number_format($tx->total_amount, 0, ',', '.') }}</strong></td>
                </tr>
            @endforeach
        </tbody>
    </table>

</body>
</html>

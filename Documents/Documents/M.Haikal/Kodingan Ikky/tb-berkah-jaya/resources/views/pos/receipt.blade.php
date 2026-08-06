<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Struk #{{ $transaction->invoice_number }} - TB Berkah Jaya</title>
    <style>
        @page {
            size: 80mm auto;
            margin: 0;
        }
        body {
            font-family: 'Courier New', Courier, monospace;
            width: 76mm;
            margin: 0 auto;
            padding: 5mm 2mm;
            font-size: 11px;
            color: #000;
        }
        .text-center { text-align: center; }
        .text-right { text-align: right; }
        .fw-bold { font-weight: bold; }
        .line { border-bottom: 1px dashed #000; margin: 5px 0; }
        .double-line { border-bottom: 2px double #000; margin: 5px 0; }
        table { width: 100%; border-collapse: collapse; }
        td { vertical-align: top; }
    </style>
</head>
<body onload="window.print();">

    <div class="text-center">
        <h3 style="margin: 0;">TB BERKAH JAYA</h3>
        <small>Jl. Raya Citapen No. 88, Bogor</small><br>
        <small>Telp/WA: 0812-3456-7890</small>
    </div>

    <div class="double-line"></div>

    <div>
        <strong>No Invoice: {{ $transaction->invoice_number }}</strong><br>
        <span>Tanggal   : {{ $transaction->created_at->format('d/m/Y H:i') }}</span><br>
        <span>Kasir     : {{ $transaction->user ? $transaction->user->name : 'Kasir' }}</span><br>
        <span>Metode    : {{ strtoupper($transaction->payment_method) }}</span>
    </div>

    <div class="line"></div>

    <table>
        @foreach($transaction->details as $detail)
            <tr>
                <td colspan="3" class="fw-bold">{{ $detail->product ? $detail->product->name : 'Barang' }}</td>
            </tr>
            <tr>
                <td>{{ (float)$detail->quantity }} {{ $detail->unit_name }} x {{ number_format($detail->price, 0, ',', '.') }}</td>
                <td class="text-right fw-bold">Rp {{ number_format($detail->subtotal, 0, ',', '.') }}</td>
            </tr>
        @endforeach
    </table>

    <div class="line"></div>

    <table>
        <tr>
            <td>Diskon:</td>
            <td class="text-right">Rp {{ number_format($transaction->discount_amount, 0, ',', '.') }}</td>
        </tr>
        <tr class="fw-bold">
            <td style="font-size: 13px;">TOTAL NETTO:</td>
            <td class="text-right" style="font-size: 13px;">Rp {{ number_format($transaction->total_amount, 0, ',', '.') }}</td>
        </tr>
        <tr>
            <td>Bayar:</td>
            <td class="text-right">Rp {{ number_format($transaction->paid_amount, 0, ',', '.') }}</td>
        </tr>
        <tr>
            <td>Kembali:</td>
            <td class="text-right">Rp {{ number_format($transaction->change_amount, 0, ',', '.') }}</td>
        </tr>
    </table>

    <div class="double-line"></div>

    <div class="text-center" style="margin-top: 10px;">
        <small>*** TERIMA KASIH ***</small><br>
        <small>Barang yang sudah dibeli tidak dapat ditukar/dikembalikan kecuali ada perjanjian.</small>
    </div>

</body>
</html>

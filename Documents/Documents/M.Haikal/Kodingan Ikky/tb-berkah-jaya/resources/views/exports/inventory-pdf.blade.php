<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Laporan Stok Opname Inventori - TB Berkah Jaya</title>
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
        .badge { padding: 3px 6px; border-radius: 3px; font-size: 10px; }
        .badge-danger { background-color: #f8d7da; color: #721c24; }
        .badge-success { background-color: #d4edda; color: #155724; }
    </style>
</head>
<body>

    <div class="header">
        <h2>TB BERKAH JAYA CITAPEN</h2>
        <p>LAPORAN STOK & INVENTORI MATERIAL BANGUNAN (STOCK OPNAME)</p>
        <p><small>Tanggal Cetak Dokumen: {{ now()->translatedFormat('d F Y H:i') }}</small></p>
    </div>

    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Kode Barang</th>
                <th>Nama Product Material</th>
                <th>Kategori</th>
                <th>Harga Modal</th>
                <th>Harga Jual</th>
                <th>Sisa Stok</th>
                <th>Status Audit</th>
            </tr>
        </thead>
        <tbody>
            @foreach($products as $index => $p)
                <tr>
                    <td class="text-center">{{ $index + 1 }}</td>
                    <td><code>{{ $p->code }}</code></td>
                    <td><strong>{{ $p->name }}</strong></td>
                    <td>{{ $p->category ? $p->category->name : '-' }}</td>
                    <td class="text-right">Rp {{ number_format($p->purchase_price, 0, ',', '.') }}</td>
                    <td class="text-right">Rp {{ number_format($p->selling_price, 0, ',', '.') }}</td>
                    <td class="text-center"><strong>{{ (float)$p->stock }} {{ $p->base_unit }}</strong></td>
                    <td class="text-center">
                        @if($p->stock <= 0)
                            <span class="badge badge-danger">HABIS</span>
                        @elseif($p->stock <= $p->min_stock)
                            <span class="badge badge-danger">KRITIS</span>
                        @else
                            <span class="badge badge-success">AMAN</span>
                        @endif
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>

</body>
</html>

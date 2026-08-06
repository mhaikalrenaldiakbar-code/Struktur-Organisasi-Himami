<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Laporan Presensi Kehadiran Bulanan - TB Berkah Jaya</title>
    <style>
        body { font-family: sans-serif; font-size: 11px; color: #333; }
        .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 15px; }
        .header h2 { margin: 0; font-size: 18px; }
        .header p { margin: 2px 0; font-size: 12px; color: #555; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        th, td { border: 1px solid #ccc; padding: 6px; text-align: left; }
        th { background-color: #f2f2f2; font-weight: bold; }
        .text-center { text-align: center; }
    </style>
</head>
<body>

    <div class="header">
        <h2>TB BERKAH JAYA CITAPEN</h2>
        <p>LAPORAN REKAPITULASI PRESENSI & KEHADIRAN PEGAWAI</p>
        <p><small>Periode Bulan: {{ $month }}</small></p>
    </div>

    <table>
        <thead>
            <tr>
                <th>No</th>
                <th>Tanggal</th>
                <th>Nama Pegawai</th>
                <th>Jam Masuk</th>
                <th>Jam Pulang</th>
                <th>Keterlambatan</th>
                <th>Status</th>
                <th>IP Connection</th>
            </tr>
        </thead>
        <tbody>
            @foreach($attendances as $index => $att)
                <tr>
                    <td class="text-center">{{ $index + 1 }}</td>
                    <td>{{ \Carbon\Carbon::parse($att->date)->format('d/m/Y') }}</td>
                    <td><strong>{{ $att->user ? $att->user->name : '-' }}</strong></td>
                    <td class="text-center">{{ $att->check_in ? \Carbon\Carbon::parse($att->check_in)->format('H:i:s') : '-' }}</td>
                    <td class="text-center">{{ $att->check_out ? \Carbon\Carbon::parse($att->check_out)->format('H:i:s') : '-' }}</td>
                    <td class="text-center">{{ $att->minutes_late > 0 ? $att->minutes_late.' Min' : 'Tepat Waktu' }}</td>
                    <td class="text-center">{{ strtoupper($att->status) }}</td>
                    <td class="text-center"><code>{{ $att->ip_address }}</code></td>
                </tr>
            @endforeach
        </tbody>
    </table>

</body>
</html>

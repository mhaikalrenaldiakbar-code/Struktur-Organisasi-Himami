<?php

namespace App\Exports;

use App\Models\Attendance;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class AttendanceExport implements FromCollection, WithHeadings, WithMapping
{
    protected $month;

    public function __construct(string $month)
    {
        $this->month = $month;
    }

    public function collection()
    {
        list($year, $month) = explode('-', $this->month);
        return Attendance::with('user')
            ->whereYear('date', $year)
            ->whereMonth('date', $month)
            ->get();
    }

    public function headings(): array
    {
        return [
            'Nama Pegawai',
            'Email Pegawai',
            'Tanggal',
            'Jam Masuk',
            'Jam Keluar',
            'Keterlambatan (Menit)',
            'IP Address',
            'Status Kehadiran'
        ];
    }

    public function map($att): array
    {
        return [
            $att->user->name ?? '-',
            $att->user->email ?? '-',
            $att->date,
            $att->check_in ?? '-',
            $att->check_out ?? '-',
            $att->minutes_late,
            $att->ip_address ?? '-',
            strtoupper($att->status)
        ];
    }
}

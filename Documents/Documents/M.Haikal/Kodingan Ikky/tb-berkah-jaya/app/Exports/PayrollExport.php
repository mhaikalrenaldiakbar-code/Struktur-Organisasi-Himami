<?php

namespace App\Exports;

use App\Models\Payroll;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class PayrollExport implements FromCollection, WithHeadings, WithMapping
{
    protected $month;

    public function __construct(string $month)
    {
        $this->month = $month;
    }

    public function collection()
    {
        return Payroll::with('user')
            ->where('month', $this->month)
            ->get();
    }

    public function headings(): array
    {
        return [
            'Nama Pegawai',
            'Bulan Periode',
            'Gaji Pokok (Rp)',
            'Tunjangan (Rp)',
            'Insentif / Bonus (Rp)',
            'Potongan Absensi (Rp)',
            'Potongan Kasbon (Rp)',
            'Gaji Bersih Diterima (Rp)',
            'Status Pembayaran'
        ];
    }

    public function map($pr): array
    {
        return [
            $pr->user->name ?? '-',
            $pr->month,
            $pr->basic_salary,
            $pr->allowance,
            $pr->bonus,
            $pr->deductions_alpha,
            $pr->deductions_kasbon,
            $pr->net_salary,
            strtoupper($pr->status)
        ];
    }
}

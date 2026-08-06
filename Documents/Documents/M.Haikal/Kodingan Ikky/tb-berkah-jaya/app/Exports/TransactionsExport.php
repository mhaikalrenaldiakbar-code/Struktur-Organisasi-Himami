<?php

namespace App\Exports;

use App\Models\Transaction;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class TransactionsExport implements FromCollection, WithHeadings, WithMapping
{
    protected $month;

    public function __construct(string $month)
    {
        $this->month = $month;
    }

    public function collection()
    {
        list($year, $month) = explode('-', $this->month);
        return Transaction::with('user')
            ->whereYear('created_at', $year)
            ->whereMonth('created_at', $month)
            ->get();
    }

    public function headings(): array
    {
        return [
            'Nomor Invoice',
            'Tanggal Transaksi',
            'Nama Kasir',
            'Metode Pembayaran',
            'Diskon Diberikan (Rp)',
            'Total Pembayaran Net (Rp)',
            'Jumlah Uang Diterima (Rp)',
            'Kembalian (Rp)'
        ];
    }

    public function map($transaction): array
    {
        return [
            $transaction->invoice_number,
            $transaction->created_at->format('d-m-Y H:i'),
            $transaction->user->name ?? '-',
            strtoupper($transaction->payment_method),
            $transaction->discount_amount,
            $transaction->total_amount,
            $transaction->paid_amount,
            $transaction->change_amount
        ];
    }
}

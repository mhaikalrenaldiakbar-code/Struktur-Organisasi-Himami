<?php

namespace App\Http\Controllers;

use App\Models\Payroll;
use App\Models\User;
use App\Models\Attendance;
use App\Models\Kasbon;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class PayrollController extends Controller
{
    public function index(Request $request)
    {
        $month = $request->get('month', now()->format('Y-m'));
        $weekNumber = $request->get('week_number', '');

        $query = Payroll::with('user')->where('month', $month);

        if ($weekNumber !== '') {
            $query->where('week_number', $weekNumber);
        }

        $payrolls = $query->latest()->get();
        $employees = User::where('role', '!=', 'admin')->get();

        return view('payrolls.index', compact('payrolls', 'employees', 'month', 'weekNumber'));
    }

    public function generate(Request $request)
    {
        $request->validate([
            'month' => 'required|string',
            'week_number' => 'required|integer|in:1,2,3,4',
            'daily_rate' => 'required|numeric|min:0',
        ]);

        $month = $request->month;
        $weekNumber = (int)$request->week_number;
        $dailyRate = (float)$request->daily_rate;

        // Calculate Date Range for Week 1, 2, 3, 4
        $monthCarbon = Carbon::parse($month . '-01');
        if ($weekNumber === 1) {
            $startDate = $monthCarbon->copy()->startOfMonth()->toDateString();
            $endDate = $monthCarbon->copy()->day(7)->toDateString();
        } elseif ($weekNumber === 2) {
            $startDate = $monthCarbon->copy()->day(8)->toDateString();
            $endDate = $monthCarbon->copy()->day(14)->toDateString();
        } elseif ($weekNumber === 3) {
            $startDate = $monthCarbon->copy()->day(15)->toDateString();
            $endDate = $monthCarbon->copy()->day(21)->toDateString();
        } else {
            $startDate = $monthCarbon->copy()->day(22)->toDateString();
            $endDate = $monthCarbon->copy()->endOfMonth()->toDateString();
        }

        $employees = User::where('role', '!=', 'admin')->get();
        $generatedCount = 0;

        foreach ($employees as $user) {
            // Count present days in this weekly range
            $totalDaysPresent = Attendance::where('user_id', $user->id)
                ->whereBetween('date', [$startDate, $endDate])
                ->whereIn('status', ['present', 'late'])
                ->count();

            $basicSalary = $totalDaysPresent * $dailyRate;
            $allowance = (float)($user->allowance ? $user->allowance / 4 : 0);

            // Deduct pending kasbon for this user if any (spread evenly or deduct up to earned amount)
            $unpaidKasbonSum = (float) Kasbon::where('user_id', $user->id)
                ->where('is_paid', false)
                ->sum('amount');

            // Limit weekly kasbon deduction to basic salary + allowance
            $kasbonDeduction = min($unpaidKasbonSum, $basicSalary + $allowance);

            $netSalary = max(0, ($basicSalary + $allowance) - $kasbonDeduction);

            Payroll::updateOrCreate(
                [
                    'user_id' => $user->id,
                    'month' => $month,
                    'week_number' => $weekNumber,
                ],
                [
                    'basic_salary' => $basicSalary,
                    'total_allowance' => $allowance,
                    'kasbon_deduction' => $kasbonDeduction,
                    'net_salary' => $netSalary,
                    'status' => 'pending',
                ]
            );
            $generatedCount++;
        }

        return redirect()->route('payrolls.index', ['month' => $month, 'week_number' => $weekNumber])
            ->with('success', "Payroll mingguan (Minggu {$weekNumber}) bulan {$month} untuk {$generatedCount} pegawai berhasil dihitung berdasarkan tarif Rp " . number_format($dailyRate, 0, ',', '.') . "/hari.");
    }

    public function approve(Payroll $payroll)
    {
        $payroll->update(['status' => 'approved']);

        if ($payroll->kasbon_deduction > 0) {
            $pendingKasbons = Kasbon::where('user_id', $payroll->user_id)
                ->where('is_paid', false)
                ->get();

            $remainingDeduction = (float)$payroll->kasbon_deduction;
            foreach ($pendingKasbons as $k) {
                if ($remainingDeduction <= 0) break;
                if ($k->amount <= $remainingDeduction) {
                    $remainingDeduction -= $k->amount;
                    $k->update(['is_paid' => true]);
                }
            }
        }

        return redirect()->back()->with('success', 'Payroll mingguan disetujui.');
    }
}

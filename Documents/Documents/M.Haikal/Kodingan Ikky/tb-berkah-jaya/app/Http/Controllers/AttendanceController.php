<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\User;
use App\Models\IpWhitelist;
use App\Models\Kasbon;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AttendanceController extends Controller
{
    // Admin list of attendances
    public function index(Request $request)
    {
        $query = Attendance::with('user');

        if ($request->filled('month')) {
            list($year, $monthNum) = explode('-', $request->month);
            $query->whereMonth('date', $monthNum)
                  ->whereYear('date', $year);
        } elseif ($request->filled('date')) {
            $query->whereDate('date', $request->date);
        } else {
            $query->whereMonth('date', now()->month)
                  ->whereYear('date', now()->year);
        }

        if ($request->filled('user_id')) {
            $query->where('user_id', $request->user_id);
        }

        $attendances = $query->latest('date')->paginate(30)->withQueryString();
        $employees = User::where('role', 'pegawai')->get();

        return view('attendances.index', compact('attendances', 'employees'));
    }

    // Admin Store Manual Attendance Entry
    public function storeManual(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'date' => 'required|date',
            'status' => 'required|in:present,late,sick,permit,alpha',
            'check_in' => 'nullable|string',
            'check_out' => 'nullable|string',
            'minutes_late' => 'nullable|integer|min:0',
        ]);

        $user = User::findOrFail($request->user_id);
        $date = Carbon::parse($request->date)->toDateString();

        $checkInTime = $request->filled('check_in') ? Carbon::parse($request->check_in)->toTimeString() : null;
        $checkOutTime = $request->filled('check_out') ? Carbon::parse($request->check_out)->toTimeString() : null;

        Attendance::updateOrCreate(
            [
                'user_id' => $user->id,
                'date' => $date,
            ],
            [
                'check_in' => $checkInTime,
                'check_out' => $checkOutTime,
                'status' => $request->status,
                'minutes_late' => $request->filled('minutes_late') ? (int) $request->minutes_late : 0,
                'ip_address' => $request->ip(),
            ]
        );

        return redirect()->back()->with('success', "Data absensi manual untuk {$user->name} tanggal {$date} berhasil disimpan.");
    }

    // Terminal scan UI for employees
    public function scan()
    {
        return view('attendances.scan');
    }

    // AJAX Handler for webcam scanner
    public function handleScan(Request $request)
    {
        $request->validate([
            'token' => 'required|string',
        ]);

        $ipAddress = $request->ip();

        // 1. IP Validation (Anti-Fraud)
        $isWhitelisted = IpWhitelist::where('ip_address', $ipAddress)->exists();
        if (!$isWhitelisted) {
            return response()->json([
                'success' => false,
                'message' => "Akses Ditolak: Perangkat Anda terhubung ke IP ($ipAddress) yang tidak terdaftar di Wi-Fi Toko."
            ], 403);
        }

        // 2. Find Employee by token
        $user = User::where('qr_code_token', $request->token)->first();
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Kartu Anggota Tidak Valid.'
            ], 404);
        }

        $today = Carbon::today()->toDateString();
        $now = Carbon::now();
        $timeString = $now->toTimeString();

        // Start time threshold for lateness (08:00 AM)
        $startTime = Carbon::createFromFormat('H:i:s', '08:00:00');

        return DB::transaction(function() use ($user, $today, $timeString, $now, $startTime, $ipAddress) {
            $attendance = Attendance::where('user_id', $user->id)
                                    ->where('date', $today)
                                    ->first();

            if (!$attendance) {
                $minutesLate = 0;
                $status = 'present';

                $checkInTime = Carbon::createFromFormat('H:i:s', $timeString);
                if ($checkInTime->greaterThan($startTime)) {
                    $minutesLate = $checkInTime->diffInMinutes($startTime);
                    $status = 'late';
                }

                Attendance::create([
                    'user_id' => $user->id,
                    'date' => $today,
                    'check_in' => $timeString,
                    'ip_address' => $ipAddress,
                    'status' => $status,
                    'minutes_late' => $minutesLate,
                ]);

                $timeFormatted = $now->format('H:i');
                return response()->json([
                    'success' => true,
                    'message' => "Absen MASUK Berhasil! Halo {$user->name}, selamat bekerja. Jam masuk: {$timeFormatted} " . ($minutesLate > 0 ? "(Terlambat {$minutesLate} menit)" : "")
                ]);
            } else {
                if ($attendance->check_out !== null) {
                    return response()->json([
                        'success' => false,
                        'message' => "{$user->name} sudah melakukan absen MASUK & KELUAR hari ini."
                    ], 422);
                }

                $attendance->update([
                    'check_out' => $timeString,
                ]);

                $timeFormatted = $now->format('H:i');
                return response()->json([
                    'success' => true,
                    'message' => "Absen KELUAR Berhasil! Hati-hati di jalan, {$user->name}. Jam pulang: {$timeFormatted}"
                ]);
            }
        });
    }

    // Download/View QR Cards (Admin panel)
    public function employees()
    {
        $employees = User::where('role', 'pegawai')->get();
        return view('attendances.employees', compact('employees'));
    }

    // Refresh token manually if card is lost
    public function regenerateToken(User $user)
    {
        $user->update([
            'qr_code_token' => 'PEGAWAI-TOKEN-' . strtoupper(Str::random(6))
        ]);

        return redirect()->back()->with('success', 'Token absensi berhasil digenerate ulang.');
    }

    // Show employee monthly profile log history with filters
    public function employeeProfile(User $user, Request $request)
    {
        $month = $request->get('month', now()->format('Y-m'));
        list($year, $monthNum) = explode('-', $month);

        $attendances = Attendance::where('user_id', $user->id)
            ->whereYear('date', $year)
            ->whereMonth('date', $monthNum)
            ->oldest('date')
            ->get();

        $kasbons = Kasbon::where('user_id', $user->id)
            ->whereYear('created_at', $year)
            ->whereMonth('created_at', $monthNum)
            ->latest()
            ->get();

        $totalPresent = $attendances->count();
        $totalLateMinutes = $attendances->sum('minutes_late');
        $unpaidKasbonSum = Kasbon::where('user_id', $user->id)->where('is_paid', false)->sum('amount');

        return view('employees.profile', compact('user', 'month', 'attendances', 'kasbons', 'totalPresent', 'totalLateMinutes', 'unpaidKasbonSum'));
    }

    // Show organizational structure chart (Bagan)
    public function structure()
    {
        $admins = User::where('role', 'admin')->get();
        $pegawais = User::where('role', 'pegawai')->get();
        return view('employees.structure', compact('admins', 'pegawais'));
    }

    // Delete attendance log entry (Admin operation)
    public function destroy(Attendance $attendance)
    {
        $attendance->delete();
        return redirect()->back()->with('success', 'Data absensi berhasil dihapus.');
    }
}

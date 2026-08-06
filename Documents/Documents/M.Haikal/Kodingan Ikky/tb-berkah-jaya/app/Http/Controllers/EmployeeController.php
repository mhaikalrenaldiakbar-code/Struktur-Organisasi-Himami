<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Attendance;
use App\Models\Kasbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class EmployeeController extends Controller
{
    // List all employees & QR ID Cards
    public function index()
    {
        $employees = User::where('role', '!=', 'admin')->latest()->paginate(12);
        return view('employees.index', compact('employees'));
    }

    // Render employee registration form
    public function create()
    {
        $hasKasir = User::where('role', 'kasir')->exists();
        return view('employees.create', compact('hasKasir'));
    }

    // Store new employee record
    public function store(Request $request)
    {
        if ($request->has('daily_allowance') && !$request->has('allowance')) {
            $request->merge(['allowance' => $request->daily_allowance]);
        }

        $role = $request->input('role', 'pegawai');

        // Enforce MAX 1 Kasir Account Limit
        if ($role === 'kasir') {
            $existingKasir = User::where('role', 'kasir')->exists();
            if ($existingKasir) {
                return redirect()->back()->with('error', 'Gagal: Hanya 1 akun Kasir yang diizinkan dalam sistem. Akun Kasir sudah terdaftar.')->withInput();
            }
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'role' => 'required|in:kasir,pegawai',
            'phone' => 'nullable|string|max:20',
            'basic_salary' => 'nullable|numeric|min:0',
            'allowance' => 'nullable|numeric|min:0',
            'kasbon_limit' => 'nullable|numeric|min:0',
            'password' => $role === 'kasir' ? 'required|string|min:8|confirmed' : 'nullable|string|min:8|confirmed',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        $photoPath = null;
        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('employee-photos', 'public');
        }

        $basicSalary = (float)($request->basic_salary ?? 0);
        $kasbonLimit = $request->filled('kasbon_limit') ? (float)$request->kasbon_limit : 1000000;
        $passwordHash = $request->filled('password') ? Hash::make($request->password) : Hash::make(Str::random(16));

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $passwordHash,
            'role' => $role,
            'phone' => $request->phone ?? '-',
            'basic_salary' => $basicSalary,
            'allowance' => (float)($request->allowance ?? 0),
            'kasbon_limit' => $kasbonLimit,
            'photo' => $photoPath,
            'qr_code_token' => 'PEGAWAI-TOKEN-' . strtoupper(Str::random(6))
        ]);

        $msg = $role === 'kasir' ? 'Akun 1 Kasir resmi berhasil dibuat dan memiliki hak akses login POS.' : 'Pegawai biasa berhasil didaftarkan untuk presensi barcode & penggajian.';
        return redirect()->route('employees.index')->with('success', $msg);
    }

    // Render employee edit form
    public function edit(User $employee)
    {
        $hasKasir = User::where('role', 'kasir')->where('id', '!=', $employee->id)->exists();
        return view('employees.edit', compact('employee', 'hasKasir'));
    }

    // Update employee record
    public function update(Request $request, User $employee)
    {
        if ($request->has('daily_allowance') && !$request->has('allowance')) {
            $request->merge(['allowance' => $request->daily_allowance]);
        }

        $role = $request->input('role', $employee->role);

        // Enforce MAX 1 Kasir Account Limit
        if ($role === 'kasir') {
            $existingKasir = User::where('role', 'kasir')->where('id', '!=', $employee->id)->exists();
            if ($existingKasir) {
                return redirect()->back()->with('error', 'Gagal: Hanya 1 akun Kasir yang diizinkan dalam sistem. Akun Kasir lain sudah ada.')->withInput();
            }
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $employee->id,
            'role' => 'required|in:kasir,pegawai,admin',
            'phone' => 'nullable|string|max:20',
            'basic_salary' => 'nullable|numeric|min:0',
            'allowance' => 'nullable|numeric|min:0',
            'kasbon_limit' => 'nullable|numeric|min:0',
            'password' => 'nullable|string|min:8|confirmed',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        $basicSalary = (float)($request->basic_salary ?? 0);
        $kasbonLimit = $request->filled('kasbon_limit') ? (float)$request->kasbon_limit : 1000000;

        $data = [
            'name' => $request->name,
            'email' => $request->email,
            'role' => $role,
            'phone' => $request->phone ?? $employee->phone ?? '-',
            'basic_salary' => $basicSalary,
            'allowance' => (float)($request->allowance ?? 0),
            'kasbon_limit' => $kasbonLimit,
        ];

        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }

        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('employee-photos', 'public');
        }

        $employee->update($data);

        return redirect()->route('employees.index')->with('success', 'Data pegawai berhasil diperbarui.');
    }

    // Delete employee record
    public function destroy(User $employee)
    {
        $employee->delete();
        return redirect()->route('employees.index')->with('success', 'Pegawai berhasil dihapus dari sistem.');
    }

    // Show employee monthly profile history
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

    // Regenerate QR token for employee
    public function regenerateToken(User $employee)
    {
        $employee->update([
            'qr_code_token' => 'PEGAWAI-TOKEN-' . strtoupper(Str::random(6))
        ]);
        return redirect()->back()->with('success', 'Token absensi berhasil digenerate ulang.');
    }
}

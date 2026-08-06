<?php

namespace App\Http\Controllers;

use App\Models\Kasbon;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class KasbonController extends Controller
{
    public function index()
    {
        $kasbons = Kasbon::with('user')->latest()->get();
        $employees = User::where('role', '!=', 'admin')->get();
        return view('kasbons.index', compact('kasbons', 'employees'));
    }

    public function apply()
    {
        $user = Auth::user();
        $unpaidKasbonSum = Kasbon::where('user_id', $user->id)->where('is_paid', false)->sum('amount');
        $kasbonLimit = $user->kasbon_limit ?? 1000000;
        $remainingLimit = max(0, $kasbonLimit - $unpaidKasbonSum);
        $myKasbons = Kasbon::where('user_id', $user->id)->latest()->get();

        return view('kasbons.apply', compact('user', 'unpaidKasbonSum', 'kasbonLimit', 'remainingLimit', 'myKasbons'));
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        $unpaidKasbonSum = Kasbon::where('user_id', $user->id)->where('is_paid', false)->sum('amount');
        $kasbonLimit = $user->kasbon_limit ?? 1000000;
        $remainingLimit = max(0, $kasbonLimit - $unpaidKasbonSum);

        $request->validate([
            'amount' => 'required|numeric|min:1000|max:' . ($remainingLimit > 0 ? $remainingLimit : 10000000),
            'reason' => 'required|string|max:255',
        ]);

        Kasbon::create([
            'user_id' => $user->id,
            'amount' => $request->amount,
            'reason' => $request->reason,
            'is_paid' => false,
        ]);

        return redirect()->route('dashboard')->with('success', 'Pengajuan kasbon berhasil dicatat.');
    }

    // Admin creates Kasbon for an employee directly
    public function storeAdmin(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'amount' => 'required|numeric|min:1000',
            'reason' => 'required|string|max:255',
        ]);

        Kasbon::create([
            'user_id' => $request->user_id,
            'amount' => $request->amount,
            'reason' => $request->reason,
            'is_paid' => false,
        ]);

        return redirect()->route('kasbons.index')->with('success', 'Catatan kasbon pegawai berhasil ditambahkan oleh Admin.');
    }

    public function togglePaid(Kasbon $kasbon)
    {
        $kasbon->update(['is_paid' => !$kasbon->is_paid]);
        return redirect()->back()->with('success', 'Status pelunasan kasbon berhasil diperbarui.');
    }
}

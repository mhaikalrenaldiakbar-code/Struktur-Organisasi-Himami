<?php

namespace App\Http\Controllers;

use App\Models\IpWhitelist;
use Illuminate\Http\Request;

class WhitelistController extends Controller
{
    public function index()
    {
        $whitelists = IpWhitelist::latest()->get();
        return view('whitelists.index', compact('whitelists'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'ip_address' => 'required|string|unique:ip_whitelists,ip_address',
            'name' => 'nullable|string|max:255',
        ]);

        IpWhitelist::create([
            'ip_address' => $request->ip_address,
            'name' => $request->name,
        ]);

        return redirect()->route('whitelists.index')->with('success', 'IP Address berhasil ditambahkan ke whitelist.');
    }

    public function destroy(IpWhitelist $whitelist)
    {
        $whitelist->delete();
        return redirect()->route('whitelists.index')->with('success', 'IP Address berhasil dihapus dari whitelist.');
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Setting;

class SettingController extends Controller
{
    public function index()
    {
        // Ambil semua setting sebagai array key-value
        $settings = Setting::all()->pluck('value', 'key');

        return Inertia::render('pengaturanadmin', [
            'settings' => $settings,
        ]);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'instansi' => 'nullable|string',
            'logo_url' => 'nullable|string',
            'tanggal_gajian' => 'nullable|date',
            'format_slip' => 'nullable|string',
            'default_theme' => 'nullable|in:dark,light',
        ]);

        foreach ($data as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }

        return redirect()->back()->with('success', 'Pengaturan berhasil diperbarui.');
    }
}

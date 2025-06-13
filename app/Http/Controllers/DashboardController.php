<?php

namespace App\Http\Controllers;

use App\Models\Dosen;
use App\Models\GajiDosen;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Total dosen
        $totalDosen = Dosen::count();

        // Gaji dosen yang sudah dibayar (filter sudah_dibayar = true)
        $gajiDosenDibayar = GajiDosen::with('dosen')
            ->where('sudah_dibayar', true)
            ->latest()
            ->get();

        // Hitung jumlah dosen yang sudah dibayar (unik berdasarkan dosen_id)
        $totalDibayar = $gajiDosenDibayar->unique('dosen_id')->count();

        // Hitung total gaji yang sudah dibayarkan
        $totalGaji = $gajiDosenDibayar->sum('total_gaji');

        return Inertia::render('Dashboard', [
            'totalDosen'    => $totalDosen,
            'totalDibayar'  => $totalDibayar,
            'totalGaji'     => $totalGaji,
            'dosenDibayar'  => $gajiDosenDibayar,
        ]);
    }
}

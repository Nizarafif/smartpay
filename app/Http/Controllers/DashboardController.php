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

        // Data gaji dosen yang sudah dibayar
        $gajiDosenDibayar = GajiDosen::with('dosen') // relasi ke tabel dosen
            ->where('sudah_dibayar', true)
            ->get();

        // Jumlah dosen yang sudah dibayar (unik per dosen)
        $totalDibayar = $gajiDosenDibayar->unique('dosen_id')->count();

        // Total gaji yang sudah dibayarkan
        $totalGaji = $gajiDosenDibayar->sum('total_gaji');

        return Inertia::render('Dashboard', [
            'totalDosen' => $totalDosen,
            'totalDibayar' => $totalDibayar,
            'totalGaji' => $totalGaji,
            'dosenDibayar' => $gajiDosenDibayar, // kirim data slip gaji dosen yang sudah dibayar
        ]);
    }
}

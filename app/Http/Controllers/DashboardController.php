<?php

namespace App\Http\Controllers;

use App\Models\Dosen;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalDosen = Dosen::count();
        $dosenSudahDibayar = Dosen::where('sudah_dibayar', true)->count(); // kolom boolean `sudah_dibayar`

        return Inertia::render('Dashboard', [
            'totalDosen' => $totalDosen,
            'dosenSudahDibayar' => $dosenSudahDibayar,
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\GajiDosen;
use Inertia\Inertia;

class HistoryPembayaranController extends Controller
{
    public function index()
    {
        $dosenDibayar = GajiDosen::with('dosen')->latest()->get();

        return Inertia::render('HistoryPembayaran', [
            'dosenDibayar' => $dosenDibayar
        ]);
    }
}

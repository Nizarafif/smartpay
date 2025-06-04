<?php

namespace App\Http\Controllers;

use App\Models\Dosen;
use App\Models\GajiDosen;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GajiDosenController extends Controller
{
    public function index()
    {
        return Inertia::render('GajiDosen', [
            'dosens' => Dosen::all(),
            'gajiDosens' => GajiDosen::all(),
        ]);
    }

    public function bayar(Request $request, $id)
    {
        $request->validate([
            'gaji_utama' => 'required|numeric',
            'tunjangan' => 'required|numeric',
            'jumlah_masuk' => 'required|integer',
            'jumlah_sks' => 'required|integer',
            'jumlah_kelas' => 'required|integer',
        ]);

        $dosen = Dosen::findOrFail($id);

        $gajiDosen = GajiDosen::updateOrCreate(
            ['dosen_id' => $id],
            [
                'gaji_utama' => $request->gaji_utama,
                'tunjangan' => $request->tunjangan,
                'jumlah_masuk' => $request->jumlah_masuk,
                'jumlah_sks' => $request->jumlah_sks,
                'jumlah_kelas' => $request->jumlah_kelas,
                'sudah_dibayar' => true,
            ]
        );

        return response()->json($gajiDosen);
    }

    public function hapus($id)
    {
        $gajiDosen = GajiDosen::where('dosen_id', $id)->first();

        if (!$gajiDosen) {
            return response()->json(['message' => 'Data gaji tidak ditemukan'], 404);
        }

        $gajiDosen->delete();

        return response()->json(['message' => 'Data gaji berhasil dihapus']);
    }
}

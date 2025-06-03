<?php

namespace App\Http\Controllers;

use App\Models\Dosen;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DosenController extends Controller
{
    // Menampilkan daftar dosen
    public function index()
    {
        $dosen = Dosen::all(); // Bisa diganti pagination jika data banyak
        return Inertia::render('DataDosen', [
            'dosen' => $dosen,
        ]);
    }

    // Menampilkan form tambah dosen
    public function create()
    {
        return Inertia::render('DataDosenCreate');
    }
public function destroy($id)
{
    $dosen = Dosen::findOrFail($id);
    $dosen->delete();

    return redirect()->back()->with('success', 'Data dosen berhasil dihapus');
}

    // Menyimpan data dosen baru
    public function store(Request $request)
    {
        // Validasi data input
        $request->validate([
            'nama' => 'required|string|max:255',
            'nidn' => 'required|string|max:50',
            'email' => 'required|email|unique:dosens,email',
        ]);

        // Buat data dosen baru
        Dosen::create([
            'nama' => $request->nama,
            'nidn' => $request->nidn,
            'email' => $request->email,
        ]);

        // Redirect ke halaman data dosen dengan pesan sukses
        return redirect()->route('data-dosen.index')
            ->with('success', 'Data dosen berhasil ditambahkan.');
    }
}

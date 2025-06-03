<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DosenController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Dosen;

// Redirect root ke halaman login
Route::get('/', function () {
    return redirect()->route('login');
});

// Dashboard route – hanya bisa diakses setelah login dan verifikasi email
Route::get('/dashboard', function () {
    $totalDosen = Dosen::count();
    $totalDibayar = Dosen::where('sudah_dibayar', true)->count();
    $totalGaji = $totalDibayar * 1000000; // contoh gaji Rp1.000.000 per dosen

    return Inertia::render('Dashboard', [
        'totalDosen' => $totalDosen,
        'totalDibayar' => $totalDibayar,
        'totalGaji' => $totalGaji,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

// Group route dengan middleware auth
Route::middleware('auth')->group(function () {
    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Data Dosen
    Route::get('/data-dosen', [DosenController::class, 'index'])->name('data-dosen.index');
    Route::get('/data-dosen/create', [DosenController::class, 'create'])->name('data-dosen.create');
    Route::post('/data-dosen', [DosenController::class, 'store'])->name('data-dosen.store');
    Route::delete('/data-dosen/{id}', [DosenController::class, 'destroy'])->name('data-dosen.destroy');
});

require __DIR__.'/auth.php';

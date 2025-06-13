<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DosenController;
use App\Http\Controllers\GajiDosenController;
use App\Http\Controllers\HistoryPembayaranController;
use App\Http\Controllers\SettingController;
use App\Http\Middleware\AdminMiddleware; // Tambahkan ini

// Redirect root ke login
Route::get('/', function () {
    return redirect()->route('login');
});

// Dashboard – hanya untuk user login
Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

// Group route dengan middleware 'auth'
Route::middleware('auth')->group(function () {
    // Profil user
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Data Dosen
    Route::get('/data-dosen', [DosenController::class, 'index'])->name('data-dosen.index');
    Route::get('/data-dosen/create', [DosenController::class, 'create'])->name('data-dosen.create');
    Route::post('/data-dosen', [DosenController::class, 'store'])->name('data-dosen.store');
    Route::delete('/data-dosen/{id}', [DosenController::class, 'destroy'])->name('data-dosen.destroy');

    // Gaji Dosen
    Route::get('/gaji-dosen', [GajiDosenController::class, 'index'])->name('gaji-dosen.index');
    Route::post('/gaji-dosen/{id}/bayar', [GajiDosenController::class, 'bayar'])->name('gaji-dosen.bayar');
    Route::delete('/gaji-dosen/{dosenId}/batal-bayar', [GajiDosenController::class, 'batalBayar'])->name('gaji-dosen.batal');
    Route::delete('/gaji-dosen/{id}/hapus', [GajiDosenController::class, 'hapus'])->name('gaji-dosen.hapus');

    // Riwayat pembayaran (global)
    Route::get('/riwayat-pembayaran', [HistoryPembayaranController::class, 'index'])->name('riwayat.index');

    // Riwayat pembayaran spesifik per dosen
    Route::get('/history-dosen/{id}', [GajiDosenController::class, 'history'])->name('history.dosen');

    // Pengaturan Admin (hanya admin)
    Route::middleware([AdminMiddleware::class])->group(function () {
        Route::get('/pengaturan', [SettingController::class, 'index'])->name('pengaturan.index');
        Route::post('/pengaturan', [SettingController::class, 'update'])->name('pengaturan.update');
    });
});

// Auth route Laravel Breeze
require __DIR__.'/auth.php';

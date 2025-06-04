<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DosenController;
use App\Http\Controllers\GajiDosenController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

// Redirect ke login
Route::get('/', function () {
    return redirect()->route('login');
});

// Dashboard – hanya untuk user login
Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

// Authenticated group
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

    Route::get('/gaji-dosen', [GajiDosenController::class, 'index']);
    Route::post('/gaji-dosen/{id}/bayar', [GajiDosenController::class, 'bayar']);
    Route::delete('/gaji-dosen/{dosenId}/batal-bayar', [GajiDosenController::class, 'batalBayar']);
    Route::delete('/gaji-dosen/{id}/hapus', [GajiDosenController::class, 'hapus']);
});

require __DIR__.'/auth.php';

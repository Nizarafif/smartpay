<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DosenController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Redirect root ke halaman login
Route::get('/', function () {
    return redirect()->route('login');
});

// Halaman dashboard, hanya bisa diakses user yang sudah login dan verifikasi email
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Group route yang perlu autentikasi (login)
Route::middleware('auth')->group(function () {
    // Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Data dosen routes
    Route::get('/data-dosen', [DosenController::class, 'index'])->name('data-dosen');
});

// Jika ingin pakai route login dengan render Inertia (opsional)
// Biasanya sudah di-handle oleh auth.php dan controller autentikasi
/*
Route::middleware('guest')->group(function () {
    Route::get('/login', function () {
        return Inertia::render('Auth/Login');
    })->name('login');
});
*/

// Include routes authentication (login, register, logout, reset password, dll)
require __DIR__.'/auth.php';

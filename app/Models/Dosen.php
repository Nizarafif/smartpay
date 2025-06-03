<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Dosen extends Model
{
    // Jika tabel di database bernama "dosens", bagian ini bisa diabaikan.
    // Tapi kalau nama tabel-nya "dosen", kamu perlu menentukan secara eksplisit:
    protected $table = 'dosen';

    // Kolom yang boleh diisi melalui mass assignment (opsional, tapi bagus untuk keamanan)
    protected $fillable = [
        'nama',
        'nidn',
        'email',
    ];
}

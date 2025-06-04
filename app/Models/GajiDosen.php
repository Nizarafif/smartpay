<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GajiDosen extends Model
{
    use HasFactory;

    protected $table = 'gaji_dosen';  // nama tabel di database

    protected $fillable = [
        'dosen_id',
        'gaji_utama',
        'tunjangan',
        'jumlah_masuk',
        'jumlah_sks',
        'jumlah_kelas',
        'total_gaji',
        'sudah_dibayar',
    ];

    public function dosen()
    {
        return $this->belongsTo(Dosen::class, 'dosen_id');
    }
}

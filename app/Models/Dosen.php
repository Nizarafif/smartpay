<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Dosen extends Model
{
    use HasFactory;

    protected $fillable = ['nama', 'nidn', 'email'];

    public function gaji()
    {
        return $this->hasOne(GajiDosen::class);
    }
}

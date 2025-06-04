<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('gaji_dosen', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dosen_id')->constrained('dosens')->onDelete('cascade');
            $table->integer('gaji_utama');
            $table->integer('tunjangan');
            $table->integer('jumlah_masuk');
            $table->integer('jumlah_sks');
            $table->integer('jumlah_kelas');
            $table->integer('total_gaji')->default(0);
            $table->boolean('sudah_dibayar')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('gaji_dosen');
    }
};

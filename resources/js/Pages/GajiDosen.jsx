import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import DashboardLayout from '@/pages/DashboardLayout';
import { motion } from 'framer-motion';
import axios from 'axios';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

export default function GajiDosen() {
  const { props } = usePage();
  const dosens = props.dosens || [];
  const gajiDosens = props.gajiDosens || [];

  // Map gaji berdasarkan dosen_id
  const initialGajiMap = gajiDosens.reduce((acc, gaji) => {
    acc[gaji.dosen_id] = gaji;
    return acc;
  }, {});

  // State untuk form data per dosen
  const [formData, setFormData] = useState(() => {
    const data = {};
    dosens.forEach((dosen) => {
      const gaji = initialGajiMap[dosen.id];
      data[dosen.id] = {
        gajiUtama: gaji?.gaji_utama || '',
        tunjangan: gaji?.tunjangan || '',
        jumlahMasuk: gaji?.jumlah_masuk || '',
        jumlahSKS: gaji?.jumlah_sks || '',
        jumlahKelas: gaji?.jumlah_kelas || '',
        totalGaji: gaji ? gaji.gaji_utama + gaji.tunjangan : 0,
      };
    });
    return data;
  });

  const [gajiMap, setGajiMap] = useState(initialGajiMap);
  const [activeFormId, setActiveFormId] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(null);

  // Handle input perubahan, update total gaji juga
  const handleInputChange = (dosenId, field, value) => {
    const numericValue = value === '' ? '' : Number(value);
    setFormData((prev) => {
      const current = { ...prev[dosenId], [field]: numericValue };
      current.totalGaji = (Number(current.gajiUtama) || 0) + (Number(current.tunjangan) || 0);
      return { ...prev, [dosenId]: current };
    });
  };

  // Submit bayar gaji
  const handleSubmit = async (dosenId) => {
    const data = formData[dosenId];

    // Validasi semua field harus terisi (bukan string kosong)
    if (
      data.gajiUtama === '' ||
      data.tunjangan === '' ||
      data.jumlahMasuk === '' ||
      data.jumlahSKS === '' ||
      data.jumlahKelas === ''
    ) {
      alert('Mohon lengkapi semua kolom!');
      return;
    }

    try {
      const res = await axios.post(`/gaji-dosen/${dosenId}/bayar`, {
        gaji_utama: Number(data.gajiUtama),
        tunjangan: Number(data.tunjangan),
        jumlah_masuk: Number(data.jumlahMasuk),
        jumlah_sks: Number(data.jumlahSKS),
        jumlah_kelas: Number(data.jumlahKelas),
      });

      // Update state lokal dengan response dari backend
      setGajiMap((prev) => ({
        ...prev,
        [dosenId]: {
          ...res.data,
          sudah_dibayar: true,
        },
      }));
      setActiveFormId(null);
      alert('Data gaji berhasil disimpan.');
    } catch (err) {
      alert('Gagal menyimpan data.');
      console.error(err);
    }
  };

  // Cetak slip gaji dari data lokal, tanpa request backend
  const handlePrint = (dosenId) => {
    const slip = document.getElementById(`print-slip-${dosenId}`);
    if (!slip) return alert('Slip tidak ditemukan.');

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html><head><title>Slip Gaji</title></head>
      <body>${slip.innerHTML}</body></html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  // Hapus data gaji dosen
  const handleDelete = async (dosenId) => {
    if (!confirm('Hapus data gaji dosen ini?')) return;
    setLoadingDelete(dosenId);

    try {
      await axios.delete(`/gaji-dosen/${dosenId}/hapus`);
      setGajiMap((prev) => {
        const copy = { ...prev };
        delete copy[dosenId];
        return copy;
      });
      setFormData((prev) => ({
        ...prev,
        [dosenId]: {
          gajiUtama: '',
          tunjangan: '',
          jumlahMasuk: '',
          jumlahSKS: '',
          jumlahKelas: '',
          totalGaji: 0,
        },
      }));
      alert('Data gaji berhasil dihapus.');
    } catch (err) {
      alert('Gagal hapus data.');
      console.error(err);
    } finally {
      setLoadingDelete(null);
    }
  };

  return (
    <>
      <Head title="Gaji Dosen" />
      <DashboardLayout>
        <motion.h1
          className="text-3xl font-bold text-teal-800 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Gaji Dosen
        </motion.h1>

        {dosens.map((dosen) => {
          const gaji = formData[dosen.id];
          const sudahDibayar = gajiMap[dosen.id]?.sudah_dibayar;
          const showForm = activeFormId === dosen.id;

          return (
            <motion.div
              key={dosen.id}
              className="bg-white p-6 rounded-xl shadow mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p>
                    <strong>Nama:</strong> {dosen.nama}
                  </p>
                  <p>
                    <strong>NIDN:</strong> {dosen.nidn}
                  </p>
                  <p>
                    <strong>Email:</strong> {dosen.email}
                  </p>
                  <p>
                    <strong>Status Pembayaran:</strong>{' '}
                    <span
                      className={
                        sudahDibayar
                          ? 'text-green-600 font-semibold'
                          : 'text-red-500 font-semibold'
                      }
                    >
                      {sudahDibayar ? 'Sudah Dibayar' : 'Belum Dibayar'}
                    </span>
                  </p>
                </div>

                <div className="space-x-2">
                  <button
                    onClick={() => setActiveFormId(showForm ? null : dosen.id)}
                    className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
                  >
                    {showForm
                      ? 'Tutup'
                      : gajiMap[dosen.id]
                      ? 'Edit Gaji'
                      : 'Input Gaji'}
                  </button>

                  {sudahDibayar && (
                    <button
                      onClick={() => handleDelete(dosen.id)}
                      disabled={loadingDelete === dosen.id}
                      className={`px-4 py-2 rounded ${
                        loadingDelete === dosen.id
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-red-600 hover:bg-red-700 text-white'
                      }`}
                    >
                      {loadingDelete === dosen.id ? 'Menghapus...' : 'Hapus'}
                    </button>
                  )}
                </div>
              </div>

              {showForm && (
                <form
  onSubmit={(e) => {
    e.preventDefault();
    handleSubmit(dosen.id);
  }}
  className="mt-4"
>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div>
      <label className="block font-medium mb-1">Gaji Utama</label>
      <input
        type="number"
        min="0"
        required
        value={gaji.gajiUtama}
        onChange={(e) => handleInputChange(dosen.id, 'gajiUtama', e.target.value)}
        className="w-full border rounded px-3 py-2"
      />
    </div>
    <div>
      <label className="block font-medium mb-1">Tunjangan</label>
      <input
        type="number"
        min="0"
        required
        value={gaji.tunjangan}
        onChange={(e) => handleInputChange(dosen.id, 'tunjangan', e.target.value)}
        className="w-full border rounded px-3 py-2"
      />
    </div>
    <div>
      <label className="block font-medium mb-1">Jumlah Masuk</label>
      <input
        type="number"
        min="0"
        required
        value={gaji.jumlahMasuk}
        onChange={(e) => handleInputChange(dosen.id, 'jumlahMasuk', e.target.value)}
        className="w-full border rounded px-3 py-2"
      />
    </div>
    <div>
      <label className="block font-medium mb-1">Jumlah SKS</label>
      <input
        type="number"
        min="0"
        required
        value={gaji.jumlahSKS}
        onChange={(e) => handleInputChange(dosen.id, 'jumlahSKS', e.target.value)}
        className="w-full border rounded px-3 py-2"
      />
    </div>
    <div>
      <label className="block font-medium mb-1">Jumlah Kelas</label>
      <input
        type="number"
        min="0"
        required
        value={gaji.jumlahKelas}
        onChange={(e) => handleInputChange(dosen.id, 'jumlahKelas', e.target.value)}
        className="w-full border rounded px-3 py-2"
      />
    </div>
    <div>
      <label className="block font-medium mb-1">Total Gaji</label>
      <input
        type="text"
        readOnly
        value={`Rp ${Number(gaji.totalGaji).toLocaleString()}`}
        className="w-full border bg-gray-100 rounded px-3 py-2 text-gray-700"
      />
    </div>
  </div>

  <div className="text-right mt-4">
    <button
      type="submit"
      className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
    >
      Simpan
    </button>
  </div>
</form>

              )}

              {/* Slip gaji (untuk cetak) */}
              {sudahDibayar && (
                <div className="mt-4">
                  <button
                    onClick={() => handlePrint(dosen.id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Cetak Slip Gaji
                  </button>

                  <div
                    id={`print-slip-${dosen.id}`}
                    className="hidden"
                  >
                    <h2>Slip Gaji Dosen</h2>
                    <p>Nama: {dosen.nama}</p>
                    <p>NIDN: {dosen.nidn}</p>
                    <p>Gaji Utama: Rp {Number(gaji.gajiUtama).toLocaleString()}</p>
                    <p>Tunjangan: Rp {Number(gaji.tunjangan).toLocaleString()}</p>
                    <p>Jumlah Masuk: {gaji.jumlahMasuk}</p>
                    <p>Jumlah SKS: {gaji.jumlahSKS}</p>
                    <p>Jumlah Kelas: {gaji.jumlahKelas}</p>
                    <p>Total Gaji: Rp {Number(gaji.totalGaji).toLocaleString()}</p>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </DashboardLayout>
    </>
  );
}

import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import DashboardLayout from '@/pages/DashboardLayout';
import { motion } from 'framer-motion';
import Modal from '@/components/Modal';
import axios from 'axios';

export default function GajiDosen() {
  const { props } = usePage();
  const dosens = props.dosens || [];
  const gajiDosens = props.gajiDosens || [];

  const initialGajiMap = gajiDosens.reduce((acc, gaji) => {
    acc[gaji.dosen_id] = gaji;
    return acc;
  }, {});

  const [formData, setFormData] = useState({});
  const [gajiMap, setGajiMap] = useState(initialGajiMap);
  const [selectedDosen, setSelectedDosen] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(null);

  const openModal = (dosen) => {
    const gaji = gajiMap[dosen.id];
    setFormData({
      gajiUtama: gaji?.gaji_utama || '',
      tunjangan: gaji?.tunjangan || '',
      jumlahMasuk: gaji?.jumlah_masuk || '',
      jumlahSKS: gaji?.jumlah_sks || '',
      jumlahKelas: gaji?.jumlah_kelas || '',
    });
    setSelectedDosen(dosen);
  };

  const closeModal = () => setSelectedDosen(null);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value === '' ? '' : Number(value),
    }));
  };

  const handleSubmit = async () => {
    const data = formData;
    const requiredFields = ['gajiUtama', 'tunjangan', 'jumlahMasuk', 'jumlahSKS', 'jumlahKelas'];

    if (requiredFields.some((field) => data[field] === '' || isNaN(data[field]))) {
      alert('Mohon isi semua kolom dengan benar!');
      return;
    }

    try {
      const response = await axios.post(`/gaji-dosen/${selectedDosen.id}/bayar`, {
        gaji_utama: data.gajiUtama,
        tunjangan: data.tunjangan,
        jumlah_masuk: data.jumlahMasuk,
        jumlah_sks: data.jumlahSKS,
        jumlah_kelas: data.jumlahKelas,
      });

      setGajiMap((prev) => ({
        ...prev,
        [selectedDosen.id]: {
          ...response.data,
          sudah_dibayar: true,
        },
      }));

      closeModal();
      alert('Gaji berhasil disimpan.');
    } catch (error) {
      alert('Gagal menyimpan gaji.');
    }
  };

  const handleDelete = async (dosenId) => {
    if (!confirm('Hapus data gaji dosen ini?')) return;
    setLoadingDelete(dosenId);
    try {
      await axios.delete(`/gaji-dosen/${dosenId}/hapus`);
      setGajiMap((prev) => {
        const newMap = { ...prev };
        delete newMap[dosenId];
        return newMap;
      });
      alert('Data berhasil dihapus.');
    } catch (err) {
      alert('Gagal menghapus data.');
    } finally {
      setLoadingDelete(null);
    }
  };

  const handlePrint = (dosenId) => {
    const gaji = gajiMap[dosenId];
    const dosen = dosens.find((d) => d.id === dosenId);
    const slipHTML = `
      <div>
        <h2>Slip Gaji Dosen</h2>
        <p>Nama: ${dosen.nama}</p>
        <p>NIDN: ${dosen.nidn}</p>
        <p>Gaji Utama: Rp ${Number(gaji.gaji_utama).toLocaleString()}</p>
        <p>Tunjangan: Rp ${Number(gaji.tunjangan).toLocaleString()}</p>
        <p>Jumlah Masuk: ${gaji.jumlah_masuk}</p>
        <p>Jumlah SKS: ${gaji.jumlah_sks}</p>
        <p>Jumlah Kelas: ${gaji.jumlah_kelas}</p>
        <p>Total Gaji: Rp ${(gaji.gaji_utama + gaji.tunjangan).toLocaleString()}</p>
      </div>
    `;

    const newWindow = window.open('', '_blank');
    newWindow.document.write(`<html><head><title>Slip Gaji</title></head><body>${slipHTML}</body></html>`);
    newWindow.document.close();
    newWindow.print();
  };

  return (
    <>
      <Head title="Gaji Dosen" />
      <DashboardLayout>
        <motion.div className="p-4" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-2xl font-bold mb-6 text-teal-700 dark:text-teal-300">Gaji Dosen</h1>

          {dosens.map((dosen) => {
            const sudahDibayar = gajiMap[dosen.id]?.sudah_dibayar;
            return (
              <div key={dosen.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p><strong>Nama:</strong> {dosen.nama}</p>
                    <p><strong>NIDN:</strong> {dosen.nidn}</p>
                    <p><strong>Email:</strong> {dosen.email}</p>
                    <p><strong>Status:</strong>{' '}
                      <span className={sudahDibayar ? 'text-green-600' : 'text-red-600'}>
                        {sudahDibayar ? 'Sudah Dibayar' : 'Belum Dibayar'}
                      </span>
                    </p>
                  </div>
                  <div className="space-x-2 mt-2">
                    <button onClick={() => openModal(dosen)} className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
                      {gajiMap[dosen.id] ? 'Edit Gaji' : 'Input Gaji'}
                    </button>

                    {sudahDibayar && (
                      <>
                        <button
                          onClick={() => handlePrint(dosen.id)}
                          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                          Cetak Slip
                        </button>
                        <button
                          onClick={() => handleDelete(dosen.id)}
                          disabled={loadingDelete === dosen.id}
                          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        >
                          {loadingDelete === dosen.id ? 'Menghapus...' : 'Hapus'}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Modal Input Gaji */}
        <Modal show={!!selectedDosen} onClose={closeModal}>
          <h2 className="text-lg font-bold mb-4">Input Gaji - {selectedDosen?.nama}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['gajiUtama', 'tunjangan', 'jumlahMasuk', 'jumlahSKS', 'jumlahKelas'].map((field) => (
              <div key={field}>
                <label className="block mb-1 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded px-3 py-2"
                  value={formData[field] || ''}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                  min={0}
                  required
                />
              </div>
            ))}
            <div className="col-span-2">
              <label className="block mb-1">Total Gaji</label>
              <input
                readOnly
                className="w-full bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded px-3 py-2"
                value={`Rp ${((Number(formData.gajiUtama) || 0) + (Number(formData.tunjangan) || 0)).toLocaleString()}`}
              />
            </div>
          </div>
          <div className="mt-4 text-right">
            <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Simpan
            </button>
          </div>
        </Modal>
      </DashboardLayout>
    </>
  );
}

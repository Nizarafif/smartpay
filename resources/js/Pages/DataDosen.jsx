import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { Plus, Trash2, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from './DashboardLayout';

export default function DataDosen({ dosen: initialDosen }) {
  // Simpan dosen di state lokal biar bisa update realtime animasi
  const [dosen, setDosen] = useState(initialDosen);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ nama: '', nidn: '', email: '' });
  const [errors, setErrors] = useState({});

  function handleDelete(id) {
    if (confirm('Yakin ingin menghapus data dosen ini?')) {
      router.delete(`/data-dosen/${id}`, {
        onSuccess: () => {
          // Update state lokal, hapus dosen yg dihapus
          setDosen((prev) => prev.filter((d) => d.id !== id));
        },
      });
    }
  }

  function handleInputChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrors({});

    router.post('/data-dosen', form, {
      onSuccess: (page) => {
        // Dapat dosen baru dari response Inertia jika dikirim server
        // Biasanya server redirect balik ke halaman index dg data terbaru
        // Tapi kita optimis: tambahkan dosen baru ke state lokal jika ada
        const newDosen = page.props.dosen.slice(-1)[0]; // anggap dosen baru ada di akhir array
        setDosen((prev) => [...prev, newDosen]);

        setForm({ nama: '', nidn: '', email: '' });
        setShowForm(false);
      },
      onError: (errs) => {
        setErrors(errs);
      },
    });
  }

  return (
    <DashboardLayout>
      <Head title="Data Dosen" />

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Data Dosen
        </h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-teal-600 rounded-lg shadow-md
            hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
        >
          {showForm ? <X size={18} /> : <Plus size={18} />}
          {showForm ? 'Batal' : 'Tambah Dosen'}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {showForm && (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            onSubmit={handleSubmit}
            className="mb-6 bg-white rounded-xl shadow p-6 max-w-md"
          >
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-1">Nama</label>
              <input
                type="text"
                name="nama"
                value={form.nama}
                onChange={handleInputChange}
                className={`w-full border rounded px-3 py-2 focus:outline-none ${
                  errors.nama ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Nama dosen"
              />
              {errors.nama && <p className="text-red-500 text-sm mt-1">{errors.nama}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-1">NIDN</label>
              <input
                type="text"
                name="nidn"
                value={form.nidn}
                onChange={handleInputChange}
                className={`w-full border rounded px-3 py-2 focus:outline-none ${
                  errors.nidn ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Nomor Induk Dosen Nasional"
              />
              {errors.nidn && <p className="text-red-500 text-sm mt-1">{errors.nidn}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                className={`w-full border rounded px-3 py-2 focus:outline-none ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Email dosen"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
              >
                <Check size={16} />
                Simpan
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200"
      >
        <table className="min-w-full table-auto text-sm md:text-base">
          <thead className="bg-gray-50 text-gray-700 font-semibold tracking-wide select-none">
            <tr>
              <th className="px-6 py-4 text-left">Nama</th>
              <th className="px-6 py-4 text-left">NIDN</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            <AnimatePresence>
              {dosen.length > 0 ? (
                dosen.map((d) => (
                  <motion.tr
                    key={d.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="hover:bg-teal-50 cursor-pointer"
                  >
                    <td className="px-6 py-3 whitespace-nowrap font-medium">{d.nama}</td>
                    <td className="px-6 py-3 whitespace-nowrap">{d.nidn}</td>
                    <td className="px-6 py-3 whitespace-nowrap truncate max-w-xs">{d.email}</td>
                    <td className="px-6 py-3 text-center space-x-3">
                      <button
                        onClick={() => handleDelete(d.id)}
                        className="inline-flex items-center text-red-600 hover:text-red-800 transition"
                        title="Hapus"
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-gray-500"
                >
                  <td colSpan="4" className="py-8">
                    Tidak ada data dosen.
                  </td>
                </motion.tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </motion.div>
    </DashboardLayout>
  );
}

import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { Plus, Trash2, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from './DashboardLayout';

export default function DataDosen({ dosen: initialDosen }) {
  const [dosen, setDosen] = useState(initialDosen);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ nama: '', nidn: '', email: '' });
  const [errors, setErrors] = useState({});

  function handleDelete(id) {
    if (confirm('Yakin ingin menghapus data dosen ini?')) {
      router.delete(`/data-dosen/${id}`, {
        onSuccess: () => {
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
        const newDosen = page.props.dosen.slice(-1)[0];
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
        <h1 className="text-3xl font-extrabold text-teal-800 tracking-tight">
          Data Dosen
        </h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-teal-600 rounded-lg shadow-md
            hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-300 ease-in-out"
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
            className="mb-6 bg-white rounded-2xl shadow-lg p-8 max-w-md border border-gray-200"
          >
            <div className="mb-5">
              <label className="block text-gray-700 font-semibold mb-1">Nama</label>
              <input
                type="text"
                name="nama"
                value={form.nama}
                onChange={handleInputChange}
                className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                  errors.nama
                    ? 'border-red-500 focus:ring-red-400'
                    : 'border-gray-300 focus:ring-teal-400'
                } transition`}
                placeholder="Nama dosen"
              />
              {errors.nama && <p className="text-red-500 text-sm mt-1">{errors.nama}</p>}
            </div>

            <div className="mb-5">
              <label className="block text-gray-700 font-semibold mb-1">NIDN</label>
              <input
                type="text"
                name="nidn"
                value={form.nidn}
                onChange={handleInputChange}
                className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                  errors.nidn
                    ? 'border-red-500 focus:ring-red-400'
                    : 'border-gray-300 focus:ring-teal-400'
                } transition`}
                placeholder="Nomor Induk Dosen Nasional"
              />
              {errors.nidn && <p className="text-red-500 text-sm mt-1">{errors.nidn}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 ${
                  errors.email
                    ? 'border-red-500 focus:ring-red-400'
                    : 'border-gray-300 focus:ring-teal-400'
                } transition`}
                placeholder="Email dosen"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition duration-300"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2 bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-700 hover:shadow-lg transition duration-300"
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
        className="overflow-x-auto bg-white rounded-2xl shadow-xl border border-gray-200"
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
                    className="hover:bg-gradient-to-r hover:from-teal-50 hover:to-white cursor-pointer transition duration-300"
                  >
                    <td className="px-6 py-3 whitespace-nowrap font-medium">{d.nama}</td>
                    <td className="px-6 py-3 whitespace-nowrap">{d.nidn}</td>
                    <td className="px-6 py-3 whitespace-nowrap truncate max-w-xs">{d.email}</td>
                    <td className="px-6 py-3 text-center space-x-3">
                      <motion.button
                        onClick={() => handleDelete(d.id)}
                        whileHover={{ scale: 1.2, boxShadow: '0 0 8px rgba(220, 38, 38, 0.6)' }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition duration-300"
                        title="Hapus"
                      >
                        <Trash2 size={20} />
                      </motion.button>
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

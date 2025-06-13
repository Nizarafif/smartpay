import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { Plus, Trash2, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from './DashboardLayout';

export default function DataDosen({ dosen: initialDosen }) {
  const [dosen, setDosen] = useState(initialDosen);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ nama: '', nidn: '', email: '' });
  const [errors, setErrors] = useState({});

  const backdrop = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
  };

  function handleDelete(id) {
    if (confirm('Yakin ingin menghapus data dosen ini?')) {
      router.delete(`/data-dosen/${id}`, {
        onSuccess: () => setDosen((prev) => prev.filter((d) => d.id !== id)),
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
        setShowModal(false);
      },
      onError: (errs) => setErrors(errs),
    });
  }

  return (
    <DashboardLayout>
      <Head title="Data Dosen" />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-teal-800 dark:text-teal-300 tracking-tight">
            Data Dosen
          </h1>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-teal-600 rounded-lg shadow-md hover:bg-teal-700 dark:bg-teal-700 dark:hover:bg-teal-600 transition duration-300 ease-in-out"
          >
            <Plus size={18} />
            Tambah Dosen
          </button>
        </div>

        <div className="overflow-x-auto rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 scrollbar-hide">
          <table className="min-w-full table-auto text-sm md:text-base">
            <thead className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-100 font-semibold tracking-wide">
              <tr>
                <th className="px-6 py-4 text-left">Nama</th>
                <th className="px-6 py-4 text-left">NIDN</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-100">
              <AnimatePresence>
                {dosen.length > 0 ? (
                  dosen.map((d) => (
                    <motion.tr
                      key={d.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="hover:bg-gradient-to-r hover:from-teal-50 dark:hover:from-gray-800 hover:to-white dark:hover:to-gray-900 cursor-pointer transition duration-300"
                    >
                      <td className="px-6 py-3 font-medium">{d.nama}</td>
                      <td className="px-6 py-3">{d.nidn}</td>
                      <td className="px-6 py-3 truncate max-w-xs">{d.email}</td>
                      <td className="px-6 py-3 text-center space-x-3">
                        <motion.button
                          onClick={() => handleDelete(d.id)}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-red-100 dark:bg-red-900 text-red-600 hover:bg-red-200 dark:hover:bg-red-800 transition duration-300"
                          title="Hapus"
                        >
                          <Trash2 size={20} />
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr className="text-center text-gray-500 dark:text-gray-400">
                    <td colSpan="4" className="py-8">Tidak ada data dosen.</td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Tambah Dosen */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-md w-full p-6 mx-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-teal-700 dark:text-teal-300">Tambah Dosen</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Nama */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">Nama</label>
                  <input
                    type="text"
                    name="nama"
                    value={form.nama}
                    onChange={handleInputChange}
                    placeholder="Nama dosen"
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.nama ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 ${
                      errors.nama ? 'focus:ring-red-400' : 'focus:ring-teal-500'
                    }`}
                  />
                  {errors.nama && <p className="text-sm text-red-500 mt-1">{errors.nama}</p>}
                </div>
                {/* NIDN */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">NIDN</label>
                  <input
                    type="text"
                    name="nidn"
                    value={form.nidn}
                    onChange={handleInputChange}
                    placeholder="Nomor Induk Dosen Nasional"
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.nidn ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 ${
                      errors.nidn ? 'focus:ring-red-400' : 'focus:ring-teal-500'
                    }`}
                  />
                  {errors.nidn && <p className="text-sm text-red-500 mt-1">{errors.nidn}</p>}
                </div>
                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    placeholder="Email dosen"
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 ${
                      errors.email ? 'focus:ring-red-400' : 'focus:ring-teal-500'
                    }`}
                  />
                  {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                </div>

                {/* Aksi */}
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-5 py-2 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700"
                  >
                    <Check size={16} />
                    Simpan
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}

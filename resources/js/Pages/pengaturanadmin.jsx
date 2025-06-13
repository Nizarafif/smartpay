import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function PengaturanAdmin() {
  const { settings = {}, flash = {} } = usePage().props;

  const { data, setData, post, processing, errors } = useForm({
    instansi: settings.instansi || '',
    logo_url: settings.logo_url || '',
    tanggal_gajian: settings.tanggal_gajian || '',
    format_slip: settings.format_slip || '',
    default_theme: settings.default_theme || 'light',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('pengaturan.update'));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto px-6 py-10"
    >
      <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-2xl p-8 transition-all duration-300 border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
          ⚙️ Pengaturan Sistem
        </h1>

        {flash.success && (
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="mb-6 text-green-600 font-semibold bg-green-100 dark:bg-green-800/30 p-3 rounded-lg shadow"
          >
            {flash.success}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            { label: 'Nama Instansi', name: 'instansi', type: 'text' },
            { label: 'Logo URL', name: 'logo_url', type: 'text' },
            { label: 'Tanggal Gajian', name: 'tanggal_gajian', type: 'date' },
            { label: 'Format Nomor Slip', name: 'format_slip', type: 'text' },
          ].map((field) => (
            <div key={field.name}>
              <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
                {field.label}
              </label>
              <input
                type={field.type}
                value={data[field.name]}
                onChange={(e) => setData(field.name, e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all shadow-inner"
              />
              {errors[field.name] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}

          <div>
            <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
              Default Tema
            </label>
            <select
              value={data.default_theme}
              onChange={(e) => setData('default_theme', e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-inner"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={processing}
            className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xl transition transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            Simpan Pengaturan
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}

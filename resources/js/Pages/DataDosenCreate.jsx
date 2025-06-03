import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';

export default function DataDosenCreate() {
  const [nama, setNama] = useState('');
  const [nidn, setNidn] = useState('');
  const [email, setEmail] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    router.post('/data-dosen', { nama, nidn, email });
  }

  return (
    <>
      <Head title="Tambah Data Dosen" />
      <h1 className="text-2xl font-bold mb-6">Tambah Data Dosen</h1>
      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Nama</label>
          <input
            type="text"
            value={nama}
            onChange={e => setNama(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">NIDN</label>
          <input
            type="text"
            value={nidn}
            onChange={e => setNidn(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
        >
          Simpan
        </button>
      </form>
    </>
  );
}

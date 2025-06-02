import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Users,
  DollarSign,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { Link, usePage, router } from '@inertiajs/react';

const menuItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'Data Dosen', icon: Users, href: '/data-dosen' },
  { label: 'Gaji Dosen', icon: DollarSign, href: '/gaji-dosen' },
];

export default function Sidebar({ collapsed, toggle }) {
  const { url } = usePage();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);

  useEffect(() => {
    if (showLogoutModal) {
      setAnimateModal(true);
    }
  }, [showLogoutModal]);

  function closeModal() {
    setAnimateModal(false);
    setTimeout(() => setShowLogoutModal(false), 300);
  }

  function handleLogout() {
    router.post('/logout', {
      onSuccess: () => router.visit('/login'),
    });
  }

  return (
    <>
      <aside
        className="fixed top-0 left-0 h-screen bg-white border-r border-gray-200 flex flex-col justify-between z-30 transition-all duration-500 ease-in-out shadow-sm"
        style={{ width: collapsed ? '5rem' : '16rem' }}
      >
        <div className="p-4">
          {/* Logo + Toggle */}
          <div
            className="flex flex-col items-center justify-center mb-8 relative"
            style={{ minHeight: '3.5rem' }}
          >
            <h1
              className={`text-3xl font-black text-teal-600 tracking-wide select-none overflow-hidden whitespace-nowrap transition-all duration-500 ease-in-out font-poppins text-center
                ${collapsed ? 'opacity-0 max-w-0' : 'opacity-100 max-w-[200px]'}
              `}
              style={{ transitionProperty: 'opacity, max-width' }}
            >
              Smart<span className="text-gray-800">Pay</span>
            </h1>

            <button
              onClick={toggle}
              className="absolute top-0 right-0 p-2 rounded-md hover:bg-teal-100 text-teal-600 transition-colors"
              title="Toggle Sidebar"
            >
              {collapsed ? <Menu size={24} /> : <X size={24} />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="space-y-1 font-poppins">
            {menuItems.map(({ label, icon: Icon, href }, i) => {
              const isActive = url.startsWith(href);
              return (
                <Link
                  key={i}
                  href={href}
                  className={`flex items-center gap-4 px-4 py-2 rounded-lg text-sm font-medium transition-colors select-none whitespace-nowrap
                    ${
                      isActive
                        ? 'bg-teal-50 text-teal-600'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-teal-600'
                    }
                  `}
                  title={collapsed ? label : undefined}
                  preserveScroll
                  as="a"
                  method="get"
                >
                  <span
                    className={`flex items-center justify-center flex-shrink-0 w-8 h-8
                      ${
                        isActive
                          ? 'text-teal-600'
                          : 'text-gray-400 group-hover:text-teal-600'
                      }
                    `}
                  >
                    <Icon size={20} />
                  </span>
                  <span
                    className={`transition-opacity duration-500 ease-in-out inline-block overflow-hidden whitespace-nowrap align-middle
                      ${collapsed ? 'opacity-0 max-w-0' : 'opacity-100 max-w-[140px]'}
                    `}
                    style={{ transitionProperty: 'opacity, max-width' }}
                  >
                    {label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer: Logout */}
        <div
          onClick={() => setShowLogoutModal(true)}
          title="Logout"
          className="flex items-center cursor-pointer gap-4 mb-4 px-4 py-2 rounded-md text-red-600 font-semibold select-none transition-colors hover:bg-red-100"
          style={{ userSelect: 'none' }}
        >
          <span className="w-8 h-8 flex items-center justify-center text-red-600 flex-shrink-0">
            <LogOut size={20} />
          </span>

          <span
            className={`inline-block overflow-hidden whitespace-nowrap align-middle transition-all duration-500 ease-in-out
              ${collapsed ? 'opacity-0 max-w-0' : 'opacity-100 max-w-[100px]'}
            `}
            style={{ transitionProperty: 'opacity, max-width' }}
          >
            Logout
          </span>
        </div>
      </aside>

      {/* Modal Logout */}
      {showLogoutModal && (
        <div
          className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 transition-opacity duration-300 ${
            animateModal ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={closeModal}
        >
          <div
            className={`bg-white rounded-lg shadow-lg p-6 w-80 max-w-full transform transition-all duration-300 ${
              animateModal ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Konfirmasi Logout
            </h2>
            <p className="mb-6 text-gray-600">
              Apakah kamu yakin ingin keluar dari aplikasi?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Batal
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

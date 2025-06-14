import React, { useEffect, useState } from 'react';
import { Search, Bell, Settings, Sun, Moon } from 'lucide-react';
import { router } from '@inertiajs/react';

export default function Navbar({ sidebarWidth }) {
  const [darkMode, setDarkMode] = useState(false);

  const enable = () => document.documentElement.classList.add('dark');
  const disable = () => document.documentElement.classList.remove('dark');

  useEffect(() => {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');

    const isDark = savedTheme
      ? savedTheme === 'dark'
      : systemPrefersDark;

    setDarkMode(isDark);
    isDark ? enable() : disable();
  }, []);

  const toggleDarkMode = () => {
    const newDark = !darkMode;
    setDarkMode(newDark);
    newDark ? enable() : disable();
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
  };

  return (
    <>
      <nav
        className="fixed top-0 right-0 h-16 bg-white dark:bg-gray-900 shadow-md flex items-center px-6 z-20 transition-colors duration-300"
        style={{
          left: sidebarWidth,
          right: 0,
          transition: 'left 0.5s ease-in-out',
        }}
      >
        {/* Search */}
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300"
          />
        </div>

        <div className="flex-1" />

        {/* Toggle Theme */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors mr-4"
          aria-label="Toggle Theme"
        >
          {darkMode ? (
            <Sun size={20} className="text-yellow-400" />
          ) : (
            <Moon size={20} className="text-gray-600" />
          )}
        </button>

        {/* Notifications */}
        <button
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors mr-4"
          aria-label="Notifications"
        >
          <Bell size={20} className="text-gray-600 dark:text-gray-300" />
        </button>

        {/* Settings */}
        <button
          onClick={() => router.visit('/pengaturan')}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Settings"
        >
          <Settings size={20} className="text-gray-600 dark:text-gray-300" />
        </button>
      </nav>
    </>
  );
}

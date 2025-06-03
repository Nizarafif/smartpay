import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useState } from 'react'; // tambahkan ini
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <>
            <Head title="Register" />
            <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-200 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-md mx-4 sm:mx-0"
                >
                    <ApplicationLogo className="mx-auto mb-6 w-24 h-24" />

                    <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-2">
                        Create Account
                    </h2>
                    <p className="text-sm text-center text-gray-500 mb-6">
                        Register to get started
                    </p>

                    <form onSubmit={submit} noValidate>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                autoComplete="name"
                                autoFocus
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            {errors.name && (
                                <p className="text-sm text-red-600 mt-1">{errors.name}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoComplete="username"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            {errors.email && (
                                <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="mb-4 relative">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                required
                                autoComplete="new-password"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute top-[38px] right-3 text-sm text-gray-600 focus:outline-none"
                                tabIndex={-1}
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                            {errors.password && (
                                <p className="text-sm text-red-600 mt-1">{errors.password}</p>
                            )}
                        </div>

                        {/* Password Confirmation */}
                        <div className="mb-4 relative">
                            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <input
                                id="password_confirmation"
                                type={showPasswordConfirm ? 'text' : 'password'}
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                                autoComplete="new-password"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                                className="absolute top-[38px] right-3 text-sm text-gray-600 focus:outline-none"
                                tabIndex={-1}
                            >
                                {showPasswordConfirm ? 'Hide' : 'Show'}
                            </button>
                            {errors.password_confirmation && (
                                <p className="text-sm text-red-600 mt-1">{errors.password_confirmation}</p>
                            )}
                        </div>

                        <motion.button
                            whileTap={{ scale: 0.97 }}
                            whileHover={{ scale: 1.01 }}
                            type="submit"
                            disabled={processing}
                            className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 transition duration-300"
                        >
                            {processing ? 'Registering...' : 'Register'}
                        </motion.button>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-500">
                        Already registered?{' '}
                        <Link href={route('login')} className="text-indigo-600 hover:underline">
                            Login
                        </Link>
                    </p>
                </motion.div>
            </div>
        </>
    );
}

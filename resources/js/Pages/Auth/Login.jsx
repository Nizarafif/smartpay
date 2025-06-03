import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react'; // tambahkan ini
import { motion } from 'framer-motion';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false); // state untuk toggle password

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <>
            <Head title="Login" />
            <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-200 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-md mx-4 sm:mx-0"
                >
                    <ApplicationLogo className="mx-auto mb-6 w-24 h-24" />

                    <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-2">
                        Welcome Back
                    </h2>
                    <p className="text-sm text-center text-gray-500 mb-6">
                        Login to your account
                    </p>

                    {status && (
                        <div className="mb-4 text-sm text-green-600 text-center">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} noValidate>
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
                                autoFocus
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            {errors.email && (
                                <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                            )}
                        </div>

                        <div className="mb-4 relative">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'} // toggle type
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                required
                                autoComplete="current-password"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 pr-10"
                            />
                            {/* Toggle Visibility Button */}
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

                        <div className="mb-4 flex items-center">
                            <input
                                id="remember"
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                            />
                            <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>

                        <motion.button
                            whileTap={{ scale: 0.97 }}
                            whileHover={{ scale: 1.01 }}
                            type="submit"
                            disabled={processing}
                            className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 transition duration-300"
                        >
                            {processing ? 'Logging in...' : 'Login'}
                        </motion.button>
                    </form>

                    {canResetPassword && (
                        <p className="mt-4 text-center text-sm text-gray-500">
                            <Link
                                href={route('password.request')}
                                className="text-indigo-600 hover:underline"
                            >
                                Forgot your password?
                            </Link>
                        </p>
                    )}

                    <p className="mt-6 text-center text-sm text-gray-500">
                        Don&apos;t have an account?{' '}
                        <Link href={route('register')} className="text-indigo-600 hover:underline">
                            Register
                        </Link>
                    </p>
                </motion.div>
            </div>
        </>
    );
}

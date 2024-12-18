import AuthLayout from '@/Layouts/AuthLayout';
import { ShieldCheckIcon } from 'lucide-react';
import { Head, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { FormEventHandler } from 'react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout>
            <Head title="Confirm Password" />

            <div className="flex min-h-[calc(100vh-4rem)] flex-1">
                {/* Left Side - Form */}
                <div className="relative flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="relative mx-auto w-full max-w-sm lg:w-96">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-center"
                        >
                            <ShieldCheckIcon className="mx-auto h-12 w-12 text-purple-500" />
                            <h2 className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
                                Confirm Password
                            </h2>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                This is a secure area of the application. Please
                                confirm your password before continuing.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="mt-10"
                        >
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData('password', e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-lg border-0 bg-white/50 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 backdrop-blur-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm dark:bg-gray-800/50 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500 dark:focus:ring-purple-500"
                                        required
                                    />
                                    {errors.password && (
                                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={processing}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <span className="relative z-10 flex items-center justify-center">
                                        {processing
                                            ? 'Confirming...'
                                            : 'Confirm Password'}
                                    </span>
                                    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>
                </div>

                {/* Right Side - Image */}
                <div className="relative hidden w-0 flex-1 lg:block">
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-900/50 to-purple-900/30" />
                    <img
                        src="/images/auth/register-bg.jpg"
                        alt="K-pop Performance"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                </div>
            </div>
        </AuthLayout>
    );
}

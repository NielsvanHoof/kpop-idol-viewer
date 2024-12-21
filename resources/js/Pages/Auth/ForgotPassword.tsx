import MainLayout from '@/Layouts/MainLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { KeyIcon } from 'lucide-react';
import { FormEventHandler } from 'react';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <MainLayout>
            <Head title="Forgot Password" />

            <div className="flex min-h-[calc(100vh-4rem)] flex-1">
                {/* Left Side - Form */}
                <div className="relative flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="relative mx-auto w-full max-w-sm lg:w-96"
                    >
                        <motion.div
                            variants={itemVariants}
                            className="text-center"
                        >
                            <KeyIcon className="mx-auto h-12 w-12 text-purple-500" />
                            <h2 className="mt-4 text-2xl font-bold tracking-tight text-purple-600 dark:text-purple-400">
                                Forgot Password
                            </h2>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Enter your email address and we'll send you a
                                password reset link.
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="mt-10">
                            {status && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-4 rounded-lg bg-green-50 p-4 text-sm font-medium text-green-600 dark:bg-green-900/50 dark:text-green-400"
                                >
                                    {status}
                                </motion.div>
                            )}

                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                    >
                                        Email address
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full rounded-lg border-0 bg-white/50 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 backdrop-blur-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm dark:bg-gray-800/50 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500 dark:focus:ring-purple-500"
                                        onChange={(e) =>
                                            setData('email', e.target.value)
                                        }
                                        required
                                    />
                                    {errors.email && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mt-2 text-sm text-red-600 dark:text-red-400"
                                        >
                                            {errors.email}
                                        </motion.p>
                                    )}
                                </div>

                                <div className="flex items-center justify-between">
                                    <Link
                                        href={route('login')}
                                        className="text-sm text-purple-600 transition-colors hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300"
                                    >
                                        Back to login
                                    </Link>
                                    <motion.button
                                        type="submit"
                                        disabled={processing}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="group relative overflow-hidden rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-purple-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 dark:bg-purple-600 dark:hover:bg-purple-700"
                                    >
                                        <span className="relative z-10 flex items-center justify-center">
                                            {processing
                                                ? 'Sending...'
                                                : 'Send Reset Link'}
                                        </span>
                                    </motion.button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Right Side - Image */}
                <div className="relative hidden w-0 flex-1 lg:block">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0 bg-purple-900/50 dark:bg-purple-900/70"
                    />
                    <motion.img
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                        src="/images/auth/register-bg.jpg"
                        alt="K-pop Performance"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                </div>
            </div>
        </MainLayout>
    );
}

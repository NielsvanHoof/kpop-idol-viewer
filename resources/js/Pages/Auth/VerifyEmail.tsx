import MainLayout from '@/Layouts/MainLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { MailIcon } from 'lucide-react';
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

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <MainLayout>
            <Head title="Email Verification" />

            <div className="flex min-h-[calc(100vh-4rem)] flex-1">
                {/* Left Side - Content */}
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
                            <MailIcon className="mx-auto h-12 w-12 text-purple-500" />
                            <h2 className="mt-4 text-2xl font-bold tracking-tight text-purple-600 dark:text-purple-400">
                                Verify Your Email
                            </h2>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Thanks for signing up! Please verify your email
                                address to continue.
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="mt-10">
                            <div className="rounded-lg bg-white/80 p-6 shadow-lg ring-1 ring-black/5 backdrop-blur-md dark:bg-gray-800/80 dark:ring-white/10">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Before getting started, could you verify
                                    your email address by clicking on the link
                                    we just emailed to you? If you didn't
                                    receive the email, we will gladly send you
                                    another.
                                </p>

                                {status === 'verification-link-sent' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-4 rounded-lg bg-green-50 p-4 text-sm font-medium text-green-600 dark:bg-green-900/50 dark:text-green-400"
                                    >
                                        A new verification link has been sent to
                                        your email address.
                                    </motion.div>
                                )}

                                <form onSubmit={submit} className="mt-6">
                                    <div className="flex items-center justify-between gap-4">
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
                                                    : 'Resend Verification Email'}
                                            </span>
                                        </motion.button>

                                        <Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="text-sm text-purple-600 transition-colors hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300"
                                        >
                                            Log Out
                                        </Link>
                                    </div>
                                </form>
                            </div>
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

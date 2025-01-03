import MainLayout from '@/Layouts/MainLayout';
import { Button } from '@headlessui/react';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion, Variants } from 'framer-motion';
import { MailIcon, SparklesIcon } from 'lucide-react';
import { FormEventHandler } from 'react';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};

const buttonVariants: Variants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    hover: {
        scale: 1.02,
        transition: {
            duration: 0.2,
            ease: 'easeInOut',
        },
    },
    tap: {
        scale: 0.98,
        transition: {
            duration: 0.1,
            ease: 'easeInOut',
        },
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
                            <motion.div className="mb-8 flex justify-center">
                                <span className="inline-flex items-center gap-2 rounded-2xl bg-purple-500/10 px-4 py-2 text-purple-600 backdrop-blur-sm dark:bg-purple-500/20 dark:text-purple-400">
                                    <SparklesIcon className="h-5 w-5" />
                                    <span className="text-sm font-medium">
                                        Verify Email
                                    </span>
                                </span>
                            </motion.div>
                            <div className="mb-8 flex justify-center">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500/10 backdrop-blur-sm dark:bg-purple-500/20">
                                    <MailIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Verify Your Email
                            </h2>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Thanks for signing up! Please verify your email
                                address to continue.
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="mt-10">
                            <div className="rounded-xl bg-white/80 p-6 shadow-lg ring-1 ring-black/5 backdrop-blur-xl transition-all duration-300 hover:bg-white/90 dark:bg-gray-800/80 dark:ring-white/10 dark:hover:bg-gray-800/90">
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
                                        className="mt-4 rounded-xl bg-green-50/80 p-4 text-sm font-medium text-green-600 backdrop-blur-xl dark:bg-green-900/50 dark:text-green-400"
                                    >
                                        A new verification link has been sent to
                                        your email address.
                                    </motion.div>
                                )}

                                <form onSubmit={submit} className="mt-6">
                                    <div className="flex items-center justify-between gap-4">
                                        <motion.div
                                            variants={buttonVariants}
                                            initial="initial"
                                            animate="animate"
                                            whileHover="hover"
                                            whileTap="tap"
                                        >
                                            <Button
                                                type="submit"
                                                disabled={processing}
                                                className="group relative overflow-hidden rounded-xl bg-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-lg backdrop-blur-xl transition-all duration-300 hover:bg-purple-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 dark:bg-purple-600 dark:hover:bg-purple-700"
                                            >
                                                <span className="relative z-10 flex items-center justify-center">
                                                    {processing
                                                        ? 'Sending...'
                                                        : 'Resend Verification Email'}
                                                </span>
                                            </Button>
                                        </motion.div>

                                        <Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="text-sm font-medium text-purple-600 transition-colors hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300"
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
                        className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-purple-800/30 to-pink-900/50 backdrop-blur-sm dark:from-purple-900/70 dark:via-purple-800/50 dark:to-pink-900/70"
                    />
                    <motion.img
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                        src="/images/auth/verify-bg.jpg"
                        alt="K-pop Performance"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                </div>
            </div>
        </MainLayout>
    );
}

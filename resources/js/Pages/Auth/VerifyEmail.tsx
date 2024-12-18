import AuthLayout from '@/Layouts/AuthLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { MailIcon } from 'lucide-react';
import { FormEventHandler } from 'react';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <AuthLayout>
            <Head title="Email Verification" />

            <div className="flex min-h-[calc(100vh-4rem)] flex-1">
                {/* Left Side - Content */}
                <div className="relative flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="relative mx-auto w-full max-w-sm lg:w-96">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-center"
                        >
                            <MailIcon className="mx-auto h-12 w-12 text-purple-500" />
                            <h2 className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
                                Verify Your Email
                            </h2>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Thanks for signing up! Please verify your email
                                address to continue.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="mt-10"
                        >
                            <div className="rounded-lg bg-white/80 p-6 shadow-lg ring-1 ring-black/5 backdrop-blur-md dark:bg-gray-800/80 dark:ring-white/10">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Before getting started, could you verify
                                    your email address by clicking on the link
                                    we just emailed to you? If you didn't
                                    receive the email, we will gladly send you
                                    another.
                                </p>

                                {status === 'verification-link-sent' && (
                                    <div className="mt-4 rounded-lg bg-green-50 p-4 text-sm font-medium text-green-600 dark:bg-green-900/50 dark:text-green-400">
                                        A new verification link has been sent to
                                        your email address.
                                    </div>
                                )}

                                <form onSubmit={submit} className="mt-6">
                                    <div className="flex items-center justify-between gap-4">
                                        <motion.button
                                            type="submit"
                                            disabled={processing}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <span className="relative z-10 flex items-center justify-center">
                                                {processing
                                                    ? 'Sending...'
                                                    : 'Resend Verification Email'}
                                            </span>
                                            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                        </motion.button>

                                        <Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="text-sm text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300"
                                        >
                                            Log Out
                                        </Link>
                                    </div>
                                </form>
                            </div>
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

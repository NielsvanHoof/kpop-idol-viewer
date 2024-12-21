import MainLayout from '@/Layouts/MainLayout';
import { Head, useForm } from '@inertiajs/react';
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

export default function ResetPassword({
    token,
    email,
}: {
    token: string;
    email: string;
}) {
    const { post, processing, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <MainLayout>
            <Head title="Reset Password" />

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
                                Reset Password
                            </h2>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Enter your new password below
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="mt-10">
                            <form onSubmit={submit} className="space-y-6">
                                {/* ... form fields remain unchanged ... */}

                                <motion.div variants={itemVariants}>
                                    <motion.button
                                        type="submit"
                                        disabled={processing}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="group relative w-full overflow-hidden rounded-lg bg-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-purple-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 dark:bg-purple-600 dark:hover:bg-purple-700"
                                    >
                                        <span className="relative z-10 flex items-center justify-center">
                                            {processing
                                                ? 'Resetting...'
                                                : 'Reset Password'}
                                        </span>
                                    </motion.button>
                                </motion.div>
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

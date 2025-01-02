import MainLayout from '@/Layouts/MainLayout';
import { Button, Field, Fieldset, Input, Label } from '@headlessui/react';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion, Variants } from 'framer-motion';
import { LockIcon, MailIcon, SparklesIcon, UserCircleIcon } from 'lucide-react';
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

interface RegisterProps {
    backGroundVideo: string;
}

export default function Register({ backGroundVideo }: RegisterProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <MainLayout>
            <Head title="Register" />

            <div className="flex min-h-[calc(100vh-4rem)] flex-1">
                {/* Left Side - Register Form */}
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
                                        Join the Community
                                    </span>
                                </span>
                            </motion.div>
                            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                Create an Account
                            </h2>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Already have an account?{' '}
                                <Link
                                    href={route('login')}
                                    className="font-medium text-purple-600 transition-colors hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300"
                                >
                                    Log in
                                </Link>
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="mt-10">
                            <form onSubmit={submit} className="space-y-6">
                                <Fieldset>
                                    <Field>
                                        <Label className="text-gray-700 dark:text-gray-300">
                                            Name
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="name"
                                                name="name"
                                                value={data.name}
                                                className="mt-1 block w-full rounded-xl border-0 bg-white/80 py-2.5 pl-10 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 backdrop-blur-xl transition-all duration-300 placeholder:text-gray-400 hover:bg-white/90 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm dark:bg-gray-800/80 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500 dark:hover:bg-gray-800/90 dark:focus:ring-purple-500"
                                                autoComplete="name"
                                                onChange={(e) =>
                                                    setData(
                                                        'name',
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                            />
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <UserCircleIcon className="h-5 w-5 text-gray-400" />
                                            </div>
                                        </div>
                                        {errors.name && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="mt-2 text-sm text-red-600 dark:text-red-400"
                                            >
                                                {errors.name}
                                            </motion.p>
                                        )}
                                    </Field>
                                </Fieldset>

                                <Fieldset>
                                    <Field>
                                        <Label className="text-gray-700 dark:text-gray-300">
                                            Email address
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                className="mt-1 block w-full rounded-xl border-0 bg-white/80 py-2.5 pl-10 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 backdrop-blur-xl transition-all duration-300 placeholder:text-gray-400 hover:bg-white/90 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm dark:bg-gray-800/80 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500 dark:hover:bg-gray-800/90 dark:focus:ring-purple-500"
                                                autoComplete="username"
                                                onChange={(e) =>
                                                    setData(
                                                        'email',
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                            />
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <MailIcon className="h-5 w-5 text-gray-400" />
                                            </div>
                                        </div>
                                        {errors.email && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="mt-2 text-sm text-red-600 dark:text-red-400"
                                            >
                                                {errors.email}
                                            </motion.p>
                                        )}
                                    </Field>
                                </Fieldset>

                                <Fieldset>
                                    <Field>
                                        <Label className="text-gray-700 dark:text-gray-300">
                                            Password
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                type="password"
                                                name="password"
                                                value={data.password}
                                                className="mt-1 block w-full rounded-xl border-0 bg-white/80 py-2.5 pl-10 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 backdrop-blur-xl transition-all duration-300 placeholder:text-gray-400 hover:bg-white/90 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm dark:bg-gray-800/80 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500 dark:hover:bg-gray-800/90 dark:focus:ring-purple-500"
                                                autoComplete="new-password"
                                                onChange={(e) =>
                                                    setData(
                                                        'password',
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                            />
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <LockIcon className="h-5 w-5 text-gray-400" />
                                            </div>
                                        </div>
                                        {errors.password && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="mt-2 text-sm text-red-600 dark:text-red-400"
                                            >
                                                {errors.password}
                                            </motion.p>
                                        )}
                                    </Field>
                                </Fieldset>

                                <Fieldset>
                                    <Field>
                                        <Label className="text-gray-700 dark:text-gray-300">
                                            Confirm Password
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="password_confirmation"
                                                type="password"
                                                name="password_confirmation"
                                                value={
                                                    data.password_confirmation
                                                }
                                                className="mt-1 block w-full rounded-xl border-0 bg-white/80 py-2.5 pl-10 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 backdrop-blur-xl transition-all duration-300 placeholder:text-gray-400 hover:bg-white/90 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm dark:bg-gray-800/80 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500 dark:hover:bg-gray-800/90 dark:focus:ring-purple-500"
                                                autoComplete="new-password"
                                                onChange={(e) =>
                                                    setData(
                                                        'password_confirmation',
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                            />
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <LockIcon className="h-5 w-5 text-gray-400" />
                                            </div>
                                        </div>
                                        {errors.password_confirmation && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="mt-2 text-sm text-red-600 dark:text-red-400"
                                            >
                                                {errors.password_confirmation}
                                            </motion.p>
                                        )}
                                    </Field>
                                </Fieldset>

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
                                        className="group relative w-full overflow-hidden rounded-xl bg-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-lg backdrop-blur-xl transition-all duration-300 hover:bg-purple-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 dark:bg-purple-600 dark:hover:bg-purple-700"
                                    >
                                        <span className="relative z-10 flex items-center justify-center">
                                            {processing
                                                ? 'Creating account...'
                                                : 'Create account'}
                                        </span>
                                    </Button>
                                </motion.div>
                            </form>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Right Side - Video */}
                <div className="relative hidden w-0 flex-1 lg:block">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-purple-800/30 to-pink-900/50 backdrop-blur-sm dark:from-purple-900/70 dark:via-purple-800/50 dark:to-pink-900/70"
                    />
                    <motion.video
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                        src={backGroundVideo}
                        className="absolute inset-0 h-full w-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                    />
                </div>
            </div>
        </MainLayout>
    );
}
import MainLayout from '@/Layouts/MainLayout';
import { Button, Field, Fieldset, Input, Label } from '@headlessui/react';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
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
                            <h2 className="text-2xl font-bold tracking-tight text-purple-600 dark:text-purple-400">
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
                                        <Input
                                            id="name"
                                            name="name"
                                            value={data.name}
                                            className="mt-1 block w-full rounded-lg border-0 bg-white/50 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 backdrop-blur-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm dark:bg-gray-800/50 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500 dark:focus:ring-purple-500"
                                            autoComplete="name"
                                            onChange={(e) =>
                                                setData('name', e.target.value)
                                            }
                                            required
                                        />
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
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="mt-1 block w-full rounded-lg border-0 bg-white/50 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 backdrop-blur-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm dark:bg-gray-800/50 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500 dark:focus:ring-purple-500"
                                            autoComplete="username"
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
                                    </Field>
                                </Fieldset>

                                <Fieldset>
                                    <Field>
                                        <Label className="text-gray-700 dark:text-gray-300">
                                            Password
                                        </Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className="mt-1 block w-full rounded-lg border-0 bg-white/50 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 backdrop-blur-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm dark:bg-gray-800/50 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500 dark:focus:ring-purple-500"
                                            autoComplete="new-password"
                                            onChange={(e) =>
                                                setData(
                                                    'password',
                                                    e.target.value,
                                                )
                                            }
                                            required
                                        />
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
                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            className="mt-1 block w-full rounded-lg border-0 bg-white/50 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 backdrop-blur-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm dark:bg-gray-800/50 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500 dark:focus:ring-purple-500"
                                            autoComplete="new-password"
                                            onChange={(e) =>
                                                setData(
                                                    'password_confirmation',
                                                    e.target.value,
                                                )
                                            }
                                            required
                                        />
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

                                <motion.div variants={itemVariants}>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="group relative w-full overflow-hidden rounded-lg bg-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-purple-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 dark:bg-purple-600 dark:hover:bg-purple-700"
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
                        className="absolute inset-0 bg-purple-900/50 dark:bg-purple-900/70"
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

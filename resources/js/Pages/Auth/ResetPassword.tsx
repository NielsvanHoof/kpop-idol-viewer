import AuthLayout from '@/Layouts/AuthLayout';
import { Field, Fieldset, Input, Label } from '@headlessui/react';
import { KeyIcon } from 'lucide-react';
import { Head, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { FormEventHandler } from 'react';

export default function ResetPassword({
    token,
    email,
}: {
    token: string;
    email: string;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
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
        <AuthLayout>
            <Head title="Reset Password" />

            <div className="relative min-h-screen py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mx-auto max-w-md"
                    >
                        <div className="rounded-xl bg-white/80 p-6 shadow-lg ring-1 ring-black/5 backdrop-blur-md dark:bg-gray-800/80 dark:ring-white/10">
                            <div className="text-center">
                                <KeyIcon className="mx-auto h-12 w-12 text-purple-500" />
                                <h2 className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-2xl font-bold text-transparent">
                                    Reset Password
                                </h2>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                    Enter your new password below
                                </p>
                            </div>

                            <form onSubmit={submit} className="mt-8 space-y-6">
                                <Fieldset>
                                    <Field>
                                        <Label className="text-gray-700 dark:text-gray-300">
                                            Email
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            className="mt-1 block w-full rounded-lg border-0 bg-white/50 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 backdrop-blur-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 dark:bg-gray-800/50 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500 dark:focus:ring-purple-500"
                                            autoComplete="username"
                                            onChange={(e) =>
                                                setData('email', e.target.value)
                                            }
                                        />
                                        {errors.email && (
                                            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                                {errors.email}
                                            </p>
                                        )}
                                    </Field>
                                </Fieldset>

                                <Fieldset>
                                    <Field>
                                        <Label className="text-gray-700 dark:text-gray-300">
                                            New Password
                                        </Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            value={data.password}
                                            className="mt-1 block w-full rounded-lg border-0 bg-white/50 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 backdrop-blur-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 dark:bg-gray-800/50 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500 dark:focus:ring-purple-500"
                                            autoComplete="new-password"
                                            onChange={(e) =>
                                                setData(
                                                    'password',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        {errors.password && (
                                            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                                {errors.password}
                                            </p>
                                        )}
                                    </Field>
                                </Fieldset>

                                <Fieldset>
                                    <Field>
                                        <Label className="text-gray-700 dark:text-gray-300">
                                            Confirm Password
                                        </Label>
                                        <Input
                                            type="password"
                                            value={data.password_confirmation}
                                            className="mt-1 block w-full rounded-lg border-0 bg-white/50 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 backdrop-blur-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 dark:bg-gray-800/50 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500 dark:focus:ring-purple-500"
                                            autoComplete="new-password"
                                            onChange={(e) =>
                                                setData(
                                                    'password_confirmation',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        {errors.password_confirmation && (
                                            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                                {errors.password_confirmation}
                                            </p>
                                        )}
                                    </Field>
                                </Fieldset>

                                <motion.button
                                    type="submit"
                                    disabled={processing}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <span className="relative z-10 flex items-center justify-center">
                                        {processing
                                            ? 'Resetting...'
                                            : 'Reset Password'}
                                    </span>
                                    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </AuthLayout>
    );
}

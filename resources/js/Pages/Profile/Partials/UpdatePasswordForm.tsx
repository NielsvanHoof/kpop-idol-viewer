import {
    Button,
    Field,
    Fieldset,
    Input,
    Label,
    Transition,
} from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { KeyIcon, LockIcon } from 'lucide-react';
import { FormEventHandler } from 'react';

export default function UpdatePasswordForm({
    className = '',
}: {
    className?: string;
}) {
    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <section className={className}>
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="flex items-center gap-2">
                    <KeyIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        Update Password
                    </h2>
                </div>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Ensure your account is using a long, random password to stay
                    secure.
                </p>
            </motion.header>

            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Fieldset>
                        <Field>
                            <Label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                <LockIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                Current Password
                            </Label>
                            <Input
                                id="current_password"
                                type="password"
                                className="mt-1 block w-full rounded-lg border-0 bg-white/50 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-purple-200 backdrop-blur-sm transition-all duration-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm dark:bg-gray-800/50 dark:text-white dark:ring-purple-800/50 dark:placeholder:text-gray-500 dark:focus:ring-purple-500"
                                value={data.current_password}
                                onChange={(e) =>
                                    setData('current_password', e.target.value)
                                }
                                autoComplete="current-password"
                            />
                            {errors.current_password && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-2 text-sm text-red-600 dark:text-red-400"
                                >
                                    {errors.current_password}
                                </motion.p>
                            )}
                        </Field>
                    </Fieldset>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Fieldset>
                        <Field>
                            <Label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                <LockIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                New Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                className="mt-1 block w-full rounded-lg border-0 bg-white/50 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-purple-200 backdrop-blur-sm transition-all duration-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm dark:bg-gray-800/50 dark:text-white dark:ring-purple-800/50 dark:placeholder:text-gray-500 dark:focus:ring-purple-500"
                                value={data.password}
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                                autoComplete="new-password"
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
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <Fieldset>
                        <Field>
                            <Label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                <LockIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                Confirm Password
                            </Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                className="mt-1 block w-full rounded-lg border-0 bg-white/50 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-purple-200 backdrop-blur-sm transition-all duration-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm dark:bg-gray-800/50 dark:text-white dark:ring-purple-800/50 dark:placeholder:text-gray-500 dark:focus:ring-purple-500"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        'password_confirmation',
                                        e.target.value,
                                    )
                                }
                                autoComplete="new-password"
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
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-4"
                >
                    <Button
                        type="submit"
                        disabled={processing}
                        className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-purple-500 dark:hover:bg-purple-600 dark:focus:ring-purple-500"
                    >
                        {processing ? 'Saving...' : 'Save'}
                    </Button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition ease-in-out duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-green-600 dark:text-green-400">
                            Saved successfully!
                        </p>
                    </Transition>
                </motion.div>
            </form>
        </section>
    );
}

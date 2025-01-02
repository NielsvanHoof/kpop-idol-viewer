import {
    Button,
    Field,
    Fieldset,
    Input,
    Label,
    Transition,
} from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { motion, Variants } from 'framer-motion';
import { KeyIcon, LockIcon } from 'lucide-react';
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
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="space-y-4"
            >
                <div className="flex items-center gap-3">
                    <div className="rounded-full bg-purple-500 p-2.5">
                        <KeyIcon className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Update Password
                    </h2>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Ensure your account is using a long, random password to stay
                    secure.
                </p>
            </motion.header>

            <motion.form
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                onSubmit={updatePassword}
                className="mt-8 space-y-6"
            >
                <motion.div variants={itemVariants}>
                    <Fieldset>
                        <Field>
                            <Label className="text-gray-700 dark:text-gray-300">
                                Current Password
                            </Label>
                            <div className="relative">
                                <Input
                                    id="current_password"
                                    type="password"
                                    className="mt-1 block w-full rounded-xl border-0 bg-white/80 py-2.5 pl-10 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300/50 backdrop-blur-xl transition-all duration-300 placeholder:text-gray-400 hover:bg-white/90 focus:ring-2 focus:ring-inset focus:ring-purple-500 dark:bg-gray-800/80 dark:text-white dark:ring-gray-700/50 dark:placeholder:text-gray-500 dark:hover:bg-gray-800/90"
                                    value={data.current_password}
                                    onChange={(e) =>
                                        setData(
                                            'current_password',
                                            e.target.value,
                                        )
                                    }
                                    autoComplete="current-password"
                                />
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <LockIcon className="h-5 w-5 text-gray-400" />
                                </div>
                            </div>
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

                <motion.div variants={itemVariants}>
                    <Fieldset>
                        <Field>
                            <Label className="text-gray-700 dark:text-gray-300">
                                New Password
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type="password"
                                    className="mt-1 block w-full rounded-xl border-0 bg-white/80 py-2.5 pl-10 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300/50 backdrop-blur-xl transition-all duration-300 placeholder:text-gray-400 hover:bg-white/90 focus:ring-2 focus:ring-inset focus:ring-purple-500 dark:bg-gray-800/80 dark:text-white dark:ring-gray-700/50 dark:placeholder:text-gray-500 dark:hover:bg-gray-800/90"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                    autoComplete="new-password"
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
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Fieldset>
                        <Field>
                            <Label className="text-gray-700 dark:text-gray-300">
                                Confirm Password
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    className="mt-1 block w-full rounded-xl border-0 bg-white/80 py-2.5 pl-10 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300/50 backdrop-blur-xl transition-all duration-300 placeholder:text-gray-400 hover:bg-white/90 focus:ring-2 focus:ring-inset focus:ring-purple-500 dark:bg-gray-800/80 dark:text-white dark:ring-gray-700/50 dark:placeholder:text-gray-500 dark:hover:bg-gray-800/90"
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            'password_confirmation',
                                            e.target.value,
                                        )
                                    }
                                    autoComplete="new-password"
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
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="flex items-center gap-4"
                >
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 rounded-xl bg-purple-500 px-4 py-2.5 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:bg-purple-600 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 dark:bg-purple-600 dark:hover:bg-purple-700"
                        >
                            {processing ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </motion.div>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition ease-in-out duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="rounded-xl bg-green-500/10 px-4 py-2 backdrop-blur-xl dark:bg-green-500/5"
                        >
                            <p className="text-sm font-medium text-green-600 dark:text-green-400">
                                Saved successfully!
                            </p>
                        </motion.div>
                    </Transition>
                </motion.div>
            </motion.form>
        </section>
    );
}

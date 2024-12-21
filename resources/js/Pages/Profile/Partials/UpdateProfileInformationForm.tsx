import {
    Button,
    Field,
    Fieldset,
    Input,
    Label,
    Transition,
} from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { MailIcon, ShieldCheckIcon, UserIcon } from 'lucide-react';
import { FormEventHandler } from 'react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}: {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="flex items-center gap-2">
                    <UserIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        Profile Information
                    </h2>
                </div>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update your account's profile information and email address.
                </p>
            </motion.header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Fieldset>
                        <Field>
                            <Label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                <UserIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                Name
                            </Label>
                            <Input
                                id="name"
                                className="mt-1 block w-full rounded-lg border-0 bg-white/50 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-purple-200 backdrop-blur-sm transition-all duration-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm dark:bg-gray-800/50 dark:text-white dark:ring-purple-800/50 dark:placeholder:text-gray-500 dark:focus:ring-purple-500"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                required
                                autoComplete="name"
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
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Fieldset>
                        <Field>
                            <Label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                <MailIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                className="mt-1 block w-full rounded-lg border-0 bg-white/50 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-purple-200 backdrop-blur-sm transition-all duration-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm dark:bg-gray-800/50 dark:text-white dark:ring-purple-800/50 dark:placeholder:text-gray-500 dark:focus:ring-purple-500"
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                required
                                autoComplete="username"
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
                </motion.div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-lg bg-yellow-50 p-4 ring-1 ring-yellow-200 dark:bg-yellow-900/10 dark:ring-yellow-900/30"
                    >
                        <div className="flex items-center gap-2">
                            <ShieldCheckIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                            <p className="text-sm text-yellow-800 dark:text-yellow-200">
                                Your email address is unverified.
                                <Link
                                    href={route('verification.send')}
                                    method="post"
                                    as="button"
                                    className="ml-2 text-purple-600 underline hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300"
                                >
                                    Click here to re-send the verification
                                    email.
                                </Link>
                            </p>
                        </div>

                        {status === 'verification-link-sent' && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-2 text-sm font-medium text-green-600 dark:text-green-400"
                            >
                                A new verification link has been sent to your
                                email address.
                            </motion.div>
                        )}
                    </motion.div>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
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

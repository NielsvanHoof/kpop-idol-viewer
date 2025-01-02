import {
    Button,
    Field,
    Fieldset,
    Input,
    Label,
    Transition,
} from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { motion, Variants } from 'framer-motion';
import {
    MailIcon,
    ShieldCheckIcon,
    SparklesIcon,
    UserIcon,
} from 'lucide-react';
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
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="space-y-4"
            >
                <div className="flex items-center gap-3">
                    <div className="rounded-full bg-purple-500 p-2.5">
                        <SparklesIcon className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Profile Information
                    </h2>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Update your account's profile information and email address.
                </p>
            </motion.header>

            <motion.form
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                onSubmit={submit}
                className="mt-8 space-y-6"
            >
                <motion.div variants={itemVariants}>
                    <Fieldset>
                        <Field>
                            <Label className="text-gray-700 dark:text-gray-300">
                                Name
                            </Label>
                            <div className="relative">
                                <Input
                                    id="name"
                                    className="mt-1 block w-full rounded-xl border-0 bg-white/80 py-2.5 pl-10 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300/50 backdrop-blur-xl transition-all duration-300 placeholder:text-gray-400 hover:bg-white/90 focus:ring-2 focus:ring-inset focus:ring-purple-500 dark:bg-gray-800/80 dark:text-white dark:ring-gray-700/50 dark:placeholder:text-gray-500 dark:hover:bg-gray-800/90"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    required
                                    autoComplete="name"
                                />
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <UserIcon className="h-5 w-5 text-gray-400" />
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
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Fieldset>
                        <Field>
                            <Label className="text-gray-700 dark:text-gray-300">
                                Email
                            </Label>
                            <div className="relative">
                                <Input
                                    id="email"
                                    type="email"
                                    className="mt-1 block w-full rounded-xl border-0 bg-white/80 py-2.5 pl-10 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300/50 backdrop-blur-xl transition-all duration-300 placeholder:text-gray-400 hover:bg-white/90 focus:ring-2 focus:ring-inset focus:ring-purple-500 dark:bg-gray-800/80 dark:text-white dark:ring-gray-700/50 dark:placeholder:text-gray-500 dark:hover:bg-gray-800/90"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    required
                                    autoComplete="username"
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
                </motion.div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <motion.div
                        variants={itemVariants}
                        className="overflow-hidden rounded-xl bg-yellow-500/10 p-4 backdrop-blur-xl dark:bg-yellow-500/5"
                    >
                        <div className="flex items-center gap-3">
                            <div className="rounded-full bg-yellow-500/20 p-2 backdrop-blur-xl dark:bg-yellow-500/10">
                                <ShieldCheckIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                            </div>
                            <div>
                                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                                    Your email address is unverified.{' '}
                                    <Link
                                        href={route('verification.send')}
                                        method="post"
                                        as="button"
                                        className="text-purple-600 underline hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300"
                                    >
                                        Click here to re-send the verification
                                        email.
                                    </Link>
                                </p>

                                {status === 'verification-link-sent' && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-2 text-sm font-medium text-green-600 dark:text-green-400"
                                    >
                                        A new verification link has been sent to
                                        your email address.
                                    </motion.p>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}

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

import {
    Description,
    Dialog,
    DialogPanel,
    DialogTitle,
    Field,
    Fieldset,
    Input,
    Label,
    Transition,
    TransitionChild,
} from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { motion, Variants } from 'framer-motion';
import { AlertTriangleIcon, LockIcon, TrashIcon } from 'lucide-react';
import { Fragment, useRef, useState } from 'react';

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

export default function DeleteUserForm({
    className = '',
}: {
    className?: string;
}) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e: React.FormEvent) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <motion.header
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="space-y-4"
            >
                <div className="flex items-center gap-3">
                    <div className="rounded-full bg-red-500 p-2.5">
                        <TrashIcon className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Delete Account
                    </h2>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Once your account is deleted, all of its resources and data
                    will be permanently deleted. Before deleting your account,
                    please download any data or information that you wish to
                    retain.
                </p>
            </motion.header>

            <motion.div variants={itemVariants}>
                <motion.button
                    type="button"
                    onClick={confirmUserDeletion}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:bg-red-600 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 dark:bg-red-600 dark:hover:bg-red-700"
                >
                    <TrashIcon className="h-4 w-4" />
                    Delete Account
                </motion.button>
            </motion.div>

            <Transition appear show={confirmingUserDeletion} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25 backdrop-blur-sm dark:bg-black/40" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white/80 p-6 text-left shadow-xl backdrop-blur-xl transition-all dark:bg-gray-800/80">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-full bg-red-500/20 p-2.5 backdrop-blur-xl dark:bg-red-500/10">
                                            <AlertTriangleIcon className="h-5 w-5 text-red-600 dark:text-red-400" />
                                        </div>
                                        <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                                            Are you sure you want to delete your
                                            account?
                                        </DialogTitle>
                                    </div>

                                    <Description className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                                        Once your account is deleted, all of its
                                        resources and data will be permanently
                                        deleted. Please enter your password to
                                        confirm you would like to permanently
                                        delete your account.
                                    </Description>

                                    <form
                                        onSubmit={deleteUser}
                                        className="mt-6"
                                    >
                                        <Fieldset>
                                            <Field>
                                                <Label className="text-gray-700 dark:text-gray-300">
                                                    Password
                                                </Label>
                                                <div className="relative mt-1">
                                                    <Input
                                                        id="password"
                                                        type="password"
                                                        name="password"
                                                        ref={passwordInput}
                                                        value={data.password}
                                                        onChange={(e) =>
                                                            setData(
                                                                'password',
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="block w-full rounded-xl border-0 bg-white/80 py-2.5 pl-10 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300/50 backdrop-blur-xl transition-all duration-300 placeholder:text-gray-400 hover:bg-white/90 focus:ring-2 focus:ring-inset focus:ring-red-500 dark:bg-gray-800/80 dark:text-white dark:ring-gray-700/50 dark:placeholder:text-gray-500 dark:hover:bg-gray-800/90"
                                                        placeholder="Enter your password to confirm"
                                                    />
                                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                        <LockIcon className="h-5 w-5 text-gray-400" />
                                                    </div>
                                                </div>
                                                {errors.password && (
                                                    <motion.p
                                                        initial={{
                                                            opacity: 0,
                                                            y: -10,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            y: 0,
                                                        }}
                                                        className="mt-2 text-sm text-red-600 dark:text-red-400"
                                                    >
                                                        {errors.password}
                                                    </motion.p>
                                                )}
                                            </Field>
                                        </Fieldset>

                                        <div className="mt-6 flex justify-end gap-3">
                                            <motion.button
                                                type="button"
                                                onClick={closeModal}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="inline-flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-700 shadow-lg transition-all duration-300 hover:bg-gray-200 hover:shadow-xl dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                            >
                                                Cancel
                                            </motion.button>
                                            <motion.button
                                                type="submit"
                                                disabled={processing}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="inline-flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:bg-red-600 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 dark:bg-red-600 dark:hover:bg-red-700"
                                            >
                                                {processing ? (
                                                    <>
                                                        <svg
                                                            className="h-4 w-4 animate-spin"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <circle
                                                                className="opacity-25"
                                                                cx="12"
                                                                cy="12"
                                                                r="10"
                                                                stroke="currentColor"
                                                                strokeWidth="4"
                                                                fill="none"
                                                            />
                                                            <path
                                                                className="opacity-75"
                                                                fill="currentColor"
                                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                            />
                                                        </svg>
                                                        Processing...
                                                    </>
                                                ) : (
                                                    <>
                                                        <TrashIcon className="h-4 w-4" />
                                                        Delete Account
                                                    </>
                                                )}
                                            </motion.button>
                                        </div>
                                    </form>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </section>
    );
}

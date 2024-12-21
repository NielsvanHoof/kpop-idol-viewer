import {
    Description,
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
} from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { AlertTriangleIcon, LockIcon, TrashIcon } from 'lucide-react';
import { Fragment, useRef, useState } from 'react';

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
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="flex items-center gap-2">
                    <TrashIcon className="h-5 w-5 text-red-600 dark:text-red-400" />
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                        Delete Account
                    </h2>
                </div>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Once your account is deleted, all of its resources and data
                    will be permanently deleted. Before deleting your account,
                    please download any data or information that you wish to
                    retain.
                </p>
            </motion.header>

            <motion.button
                type="button"
                onClick={confirmUserDeletion}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative overflow-hidden rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-500"
            >
                <span className="relative z-10 flex items-center justify-center gap-2">
                    <TrashIcon className="h-4 w-4" />
                    Delete Account
                </span>
            </motion.button>

            <Transition appear show={confirmingUserDeletion} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25 backdrop-blur-sm dark:bg-black/40" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all dark:bg-gray-800">
                                    <div className="flex items-center gap-2">
                                        <AlertTriangleIcon className="h-5 w-5 text-red-600 dark:text-red-400" />
                                        <DialogTitle className="text-lg font-bold text-gray-900 dark:text-white">
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
                                        <div>
                                            <label
                                                htmlFor="password"
                                                className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                                            >
                                                <LockIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                                Password
                                            </label>
                                            <input
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
                                                className="mt-1 block w-full rounded-lg border-0 bg-white/50 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-red-200 backdrop-blur-sm transition-all duration-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm dark:bg-gray-800/50 dark:text-white dark:ring-red-800/50 dark:placeholder:text-gray-500 dark:focus:ring-red-500"
                                                placeholder="Enter your password to confirm"
                                            />
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
                                        </div>

                                        <div className="mt-6 flex justify-end gap-3">
                                            <motion.button
                                                type="button"
                                                onClick={closeModal}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:focus:ring-gray-500"
                                            >
                                                Cancel
                                            </motion.button>
                                            <motion.button
                                                type="submit"
                                                disabled={processing}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="relative overflow-hidden rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-500"
                                            >
                                                <span className="relative z-10 flex items-center justify-center gap-2">
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
                                                </span>
                                            </motion.button>
                                        </div>
                                    </form>
                                </DialogPanel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </section>
    );
}

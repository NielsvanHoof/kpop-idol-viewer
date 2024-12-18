import {
    Description,
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
} from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
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
            <header>
                <h2 className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-lg font-bold text-transparent">
                    Delete Account
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Once your account is deleted, all of its resources and data
                    will be permanently deleted. Before deleting your account,
                    please download any data or information that you wish to
                    retain.
                </p>
            </header>

            <motion.button
                type="button"
                onClick={confirmUserDeletion}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-red-600 to-pink-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl"
            >
                <span className="relative z-10">Delete Account</span>
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-red-600 via-pink-600 to-red-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
                                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white/80 p-6 text-left shadow-xl backdrop-blur-sm transition-all dark:bg-gray-800/80">
                                    <DialogTitle className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-lg font-bold text-transparent">
                                        Are you sure you want to delete your
                                        account?
                                    </DialogTitle>
                                    <Description className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                        Once your account is deleted, all of its
                                        resources and data will be permanently
                                        deleted. Please enter your password to
                                        confirm you would like to permanently
                                        delete your account.
                                    </Description>

                                    <form
                                        onSubmit={deleteUser}
                                        className="mt-4"
                                    >
                                        <div className="mt-6">
                                            <label
                                                htmlFor="password"
                                                className="sr-only block text-sm font-medium text-gray-700 dark:text-gray-300"
                                            >
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
                                                placeholder="Password"
                                                className="mt-1 block w-full rounded-lg border-0 bg-white/50 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 backdrop-blur-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm dark:bg-gray-800/50 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500 dark:focus:ring-red-500"
                                            />
                                            {errors.password && (
                                                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                                                    {errors.password}
                                                </p>
                                            )}
                                        </div>

                                        <div className="mt-6 flex justify-end gap-3">
                                            <motion.button
                                                type="button"
                                                onClick={closeModal}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                            >
                                                Cancel
                                            </motion.button>
                                            <motion.button
                                                type="submit"
                                                disabled={processing}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-red-600 to-pink-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <span className="relative z-10">
                                                    {processing
                                                        ? 'Processing...'
                                                        : 'Delete Account'}
                                                </span>
                                                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-red-600 via-pink-600 to-red-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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

import MainLayout from '@/Layouts/MainLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <MainLayout>
            <Head title="Profile Settings" />

            <div className="relative py-12">
                <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <span className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-purple-700 ring-1 ring-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:ring-purple-700">
                            <span className="h-2 w-2 rounded-full bg-purple-600 dark:bg-purple-400" />
                            <span className="text-sm font-medium">
                                Profile Settings
                            </span>
                        </span>
                        <h1 className="mt-6 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
                            Manage Your Account
                        </h1>
                    </motion.div>

                    {/* Profile Information Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="rounded-xl bg-white/80 p-4 shadow-lg ring-1 ring-gray-200/50 backdrop-blur-xl sm:p-8 dark:bg-gray-800/80 dark:ring-gray-700/50"
                    >
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </motion.div>

                    {/* Update Password Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="rounded-xl bg-white/80 p-4 shadow-lg ring-1 ring-gray-200/50 backdrop-blur-xl sm:p-8 dark:bg-gray-800/80 dark:ring-gray-700/50"
                    >
                        <UpdatePasswordForm className="max-w-xl" />
                    </motion.div>

                    {/* Delete User Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="rounded-xl bg-white/80 p-4 shadow-lg ring-1 ring-red-200/50 backdrop-blur-xl sm:p-8 dark:bg-gray-800/80 dark:ring-red-700/50"
                    >
                        <DeleteUserForm className="max-w-xl" />
                    </motion.div>
                </div>
            </div>
        </MainLayout>
    );
}

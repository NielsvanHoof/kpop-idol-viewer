import AuthLayout from '@/Layouts/AuthLayout';
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
        <AuthLayout>
            <Head title="Profile Settings" />

            {/* Main Content */}
            <div className="relative py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    {/* Profile Information Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/80 p-4 shadow-lg ring-1 ring-black/5 backdrop-blur-md sm:rounded-lg sm:p-8 dark:bg-gray-800/80 dark:ring-white/5"
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
                        transition={{ delay: 0.1 }}
                        className="bg-white/80 p-4 shadow-lg ring-1 ring-black/5 backdrop-blur-md sm:rounded-lg sm:p-8 dark:bg-gray-800/80 dark:ring-white/5"
                    >
                        <UpdatePasswordForm className="max-w-xl" />
                    </motion.div>

                    {/* Delete User Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/80 p-4 shadow-lg ring-1 ring-black/5 backdrop-blur-md sm:rounded-lg sm:p-8 dark:bg-gray-800/80 dark:ring-white/5"
                    >
                        <DeleteUserForm className="max-w-xl" />
                    </motion.div>
                </div>
            </div>
        </AuthLayout>
    );
}

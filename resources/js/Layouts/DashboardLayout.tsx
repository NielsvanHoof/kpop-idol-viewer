import { motion } from 'framer-motion';
import { ReactNode } from 'react';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

interface DashboardLayoutProps {
    children: ReactNode;
    className?: string;
}

export default function DashboardLayout({
    children,
    className,
}: DashboardLayoutProps) {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className={`relative z-10 space-y-8 ${className}`}
                >
                    {children}
                </motion.div>
            </div>
        </div>
    );
}

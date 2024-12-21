import { AnimatePresence, motion } from 'framer-motion';
import {
    AtSignIcon,
    FacebookIcon,
    LinkedinIcon,
    ShareIcon,
} from 'lucide-react';
import { useState } from 'react';

const shareVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.3 },
    },
};

export default function SocialShare() {
    const [showTooltip, setShowTooltip] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const shareUrl = window.location.href;
    const shareTitle = 'Check out this awesome K-pop content!';

    const shareLinks = [
        {
            name: 'Twitter',
            url: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
            icon: <AtSignIcon className="h-5 w-5" />,
            color: 'bg-[#1DA1F2] hover:bg-[#1a8cd8]',
        },
        {
            name: 'Facebook',
            url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
            icon: <FacebookIcon className="h-5 w-5" />,
            color: 'bg-[#4267B2] hover:bg-[#365899]',
        },
        {
            name: 'LinkedIn',
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
            icon: <LinkedinIcon className="h-5 w-5" />,
            color: 'bg-[#0077B5] hover:bg-[#006399]',
        },
    ];

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(window.location.href);
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 2000);
    };

    return (
        <div className="fixed bottom-6 right-24 z-50 sm:bottom-8">
            <div className="relative">
                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`group relative overflow-hidden rounded-full bg-purple-600 p-3 text-white shadow-lg transition-all duration-300 hover:bg-purple-700 hover:shadow-xl sm:p-4 dark:bg-purple-600 dark:hover:bg-purple-700 ${
                        isOpen
                            ? 'ring-4 ring-purple-300/50 dark:ring-purple-500/50'
                            : ''
                    }`}
                >
                    <span className="relative z-10 flex items-center justify-center">
                        <motion.div
                            animate={{ rotate: isOpen ? 45 : 0 }}
                            transition={{
                                type: 'spring',
                                stiffness: 260,
                                damping: 20,
                            }}
                        >
                            <ShareIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                        </motion.div>
                    </span>
                </motion.button>

                <AnimatePresence>
                    {showTooltip && (
                        <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            className="absolute bottom-full right-0 mb-2 rounded-lg bg-gray-800 px-3 py-2 text-sm text-white shadow-lg dark:bg-gray-700"
                        >
                            <div className="relative">
                                URL Copied!
                                <div className="absolute -bottom-1 right-4 h-2 w-2 rotate-45 transform bg-gray-800 dark:bg-gray-700" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            variants={shareVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="absolute bottom-full right-0 mb-4 space-y-2"
                        >
                            {shareLinks.map((link) => (
                                <motion.a
                                    key={link.name}
                                    variants={itemVariants}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`group relative flex w-full items-center space-x-2 overflow-hidden rounded-lg ${link.color} px-4 py-2 text-sm font-medium text-white shadow-lg transition-all hover:shadow-xl`}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        {link.icon}
                                        <span>Share on {link.name}</span>
                                    </span>
                                </motion.a>
                            ))}
                            <motion.button
                                variants={itemVariants}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    copyToClipboard();
                                }}
                                className="group relative flex w-full items-center space-x-2 overflow-hidden rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 shadow-lg transition-all hover:bg-gray-200 hover:shadow-xl dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <ShareIcon className="h-5 w-5" />
                                    <span>Copy Link</span>
                                </span>
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

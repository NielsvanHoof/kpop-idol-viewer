import { AnimatePresence, motion, Variants } from 'framer-motion';
import {
    AtSignIcon,
    FacebookIcon,
    LinkedinIcon,
    ShareIcon,
} from 'lucide-react';
import { useState } from 'react';

const shareVariants: Variants = {
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
    hidden: { opacity: 0, x: 20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.3 },
    },
};

const buttonVariants: Variants = {
    hover: {
        scale: 1.02,
        transition: {
            duration: 0.2,
            ease: 'easeInOut',
        },
    },
    tap: {
        scale: 0.98,
        transition: {
            duration: 0.1,
            ease: 'easeInOut',
        },
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
            color: 'bg-[#1DA1F2]/80 hover:bg-[#1DA1F2]/90',
        },
        {
            name: 'Facebook',
            url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
            icon: <FacebookIcon className="h-5 w-5" />,
            color: 'bg-[#4267B2]/80 hover:bg-[#4267B2]/90',
        },
        {
            name: 'LinkedIn',
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
            icon: <LinkedinIcon className="h-5 w-5" />,
            color: 'bg-[#0077B5]/80 hover:bg-[#0077B5]/90',
        },
    ];

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(window.location.href);
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 2000);
    };

    return (
        <div className="fixed bottom-6 right-24 z-[60] sm:bottom-8">
            <div className="relative">
                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className={`group relative overflow-hidden rounded-xl bg-white/80 p-3 text-gray-900 shadow-lg backdrop-blur-xl transition-all duration-300 hover:bg-white/90 hover:shadow-xl sm:p-4 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 ${
                        isOpen
                            ? 'ring-2 ring-purple-500/50 dark:ring-purple-400/50'
                            : ''
                    }`}
                >
                    <motion.div
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{
                            type: 'spring',
                            stiffness: 260,
                            damping: 20,
                        }}
                        className="flex items-center justify-center"
                    >
                        <ShareIcon className="h-5 w-5 text-purple-600 sm:h-6 sm:w-6 dark:text-purple-400" />
                    </motion.div>
                </motion.button>

                <AnimatePresence>
                    {showTooltip && (
                        <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            className="absolute bottom-full right-0 mb-2 rounded-xl bg-white/80 px-4 py-2 text-sm font-medium text-gray-900 shadow-lg backdrop-blur-xl dark:bg-white/10 dark:text-white"
                        >
                            <div className="relative">
                                URL Copied!
                                <div className="absolute -bottom-1 right-4 h-2 w-2 rotate-45 transform bg-white/80 backdrop-blur-xl dark:bg-white/10" />
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
                                    whileHover="hover"
                                    whileTap="tap"
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`group flex w-full items-center gap-2 overflow-hidden rounded-xl ${link.color} px-4 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-xl transition-all hover:shadow-xl`}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {link.icon}
                                    <span>Share on {link.name}</span>
                                </motion.a>
                            ))}
                            <motion.button
                                variants={itemVariants}
                                whileHover="hover"
                                whileTap="tap"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    copyToClipboard();
                                }}
                                className="group flex w-full items-center gap-2 overflow-hidden rounded-xl bg-white/80 px-4 py-2 text-sm font-medium text-gray-900 shadow-lg backdrop-blur-xl transition-all hover:bg-white/90 hover:shadow-xl dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
                            >
                                <ShareIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                <span>Copy Link</span>
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

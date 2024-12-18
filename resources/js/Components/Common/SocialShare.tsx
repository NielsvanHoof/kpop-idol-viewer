import { AnimatePresence, motion } from 'framer-motion';
import {
    AtSignIcon,
    FacebookIcon,
    LinkedinIcon,
    ShareIcon,
} from 'lucide-react';
import { useState } from 'react';

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
        <div className="fixed bottom-4 right-24 z-50">
            <div className="relative">
                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg transition-all hover:shadow-xl ${
                        isOpen ? 'ring-4 ring-purple-300 ring-opacity-50' : ''
                    }`}
                >
                    <motion.div
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{
                            type: 'spring',
                            stiffness: 260,
                            damping: 20,
                        }}
                    >
                        <ShareIcon className="h-5 w-5" />
                    </motion.div>
                </motion.button>

                <AnimatePresence>
                    {showTooltip && (
                        <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            className="absolute bottom-full right-0 mb-2 rounded-lg bg-gray-800 px-3 py-2 text-sm text-white shadow-lg"
                        >
                            <div className="relative">
                                URL Copied!
                                <div className="absolute -bottom-1 right-4 h-2 w-2 rotate-45 transform bg-gray-800" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 10 }}
                            transition={{
                                type: 'spring',
                                stiffness: 300,
                                damping: 25,
                            }}
                            className="absolute bottom-full right-0 mb-4 space-y-2"
                        >
                            {shareLinks.map((link, index) => (
                                <motion.a
                                    key={link.name}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex w-full items-center space-x-2 rounded-lg px-4 py-2 text-sm font-medium text-white shadow-lg transition-transform hover:scale-105 ${link.color}`}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {link.icon}
                                    <span>Share on {link.name}</span>
                                </motion.a>
                            ))}
                            <motion.button
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ delay: shareLinks.length * 0.1 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    copyToClipboard();
                                }}
                                className="flex w-full items-center space-x-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 shadow-lg transition-all hover:scale-105 hover:bg-gray-200"
                            >
                                <ShareIcon className="h-5 w-5" />
                                <span>Copy Link</span>
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

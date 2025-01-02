import { motion, Variants } from 'framer-motion';
import {
    FacebookIcon,
    InstagramIcon,
    SparklesIcon,
    TwitterIcon,
    YoutubeIcon,
} from 'lucide-react';
import NewsLetterSection from '../Index/NewsLetterSection';

const footerLinks = {
    company: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
    ],
    resources: [
        { name: 'News', href: '/news' },
        { name: 'Blog', href: '/blog' },
        { name: 'Events', href: '/events' },
        { name: 'FAQs', href: '/faqs' },
    ],
};

const socialLinks = [
    {
        name: 'Facebook',
        href: '#',
        icon: <FacebookIcon className="h-4 w-4" />,
        color: 'hover:bg-blue-500/10 hover:text-blue-500',
    },
    {
        name: 'Twitter',
        href: '#',
        icon: <TwitterIcon className="h-4 w-4" />,
        color: 'hover:bg-sky-500/10 hover:text-sky-500',
    },
    {
        name: 'Instagram',
        href: '#',
        icon: <InstagramIcon className="h-4 w-4" />,
        color: 'hover:bg-pink-500/10 hover:text-pink-500',
    },
    {
        name: 'YouTube',
        href: '#',
        icon: <YoutubeIcon className="h-4 w-4" />,
        color: 'hover:bg-red-500/10 hover:text-red-500',
    },
];

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

export default function Footer() {
    return (
        <footer className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-white py-16 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
            <div className="relative">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                    className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
                >
                    {/* Main Footer Grid */}
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                        {/* Brand Section */}
                        <motion.div
                            variants={itemVariants}
                            className="lg:col-span-2"
                        >
                            <motion.div className="mb-8 flex">
                                <span className="inline-flex items-center gap-2 rounded-2xl bg-purple-500/10 px-4 py-2 text-purple-600 backdrop-blur-sm dark:bg-purple-500/20 dark:text-purple-400">
                                    <SparklesIcon className="h-5 w-5" />
                                    <span className="text-sm font-medium">
                                        KPOP Project
                                    </span>
                                </span>
                            </motion.div>
                            <p className="mt-4 max-w-md text-gray-600 dark:text-gray-400">
                                Your ultimate destination for everything K-pop
                                related. Stay updated with the latest news,
                                events, and exclusive content.
                            </p>
                            {/* Social Links */}
                            <div className="mt-6 flex space-x-4">
                                {socialLinks.map((social) => (
                                    <motion.a
                                        key={social.name}
                                        href={social.href}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`group rounded-xl bg-white/80 p-2.5 text-gray-500 shadow-sm backdrop-blur-xl transition-all duration-300 hover:shadow-md dark:bg-gray-800/80 dark:text-gray-400 ${social.color}`}
                                        aria-label={`Follow us on ${social.name}`}
                                    >
                                        {social.icon}
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>

                        {/* Quick Links */}
                        {Object.entries(footerLinks).map(
                            ([category, links], index) => (
                                <motion.div
                                    key={category}
                                    variants={itemVariants}
                                    transition={{ delay: 0.1 * (index + 1) }}
                                >
                                    <h3 className="text-lg font-semibold capitalize text-gray-900 dark:text-white">
                                        {category}
                                    </h3>
                                    <ul className="mt-4 space-y-3">
                                        {links.map((link) => (
                                            <motion.li
                                                key={link.name}
                                                whileHover={{ x: 4 }}
                                            >
                                                <a
                                                    href={link.href}
                                                    className="inline-block text-gray-600 transition-colors hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400"
                                                >
                                                    {link.name}
                                                </a>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ),
                        )}
                    </div>

                    {/* Newsletter Section */}
                    <NewsLetterSection />

                    {/* Copyright */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-8 border-t border-gray-200/80 pt-8 text-center text-sm text-gray-600 backdrop-blur-sm dark:border-gray-700/80 dark:text-gray-400"
                    >
                        <p>
                            © {new Date().getFullYear()} KPOP Project. All
                            rights reserved.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </footer>
    );
}

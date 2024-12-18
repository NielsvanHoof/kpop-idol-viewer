import {
    FacebookIcon,
    InstagramIcon,
    MailIcon,
    MapPinIcon,
    PhoneIcon,
    TwitterIcon,
    YoutubeIcon,
} from 'lucide-react';
import { motion } from 'motion/react';
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
    },
    {
        name: 'Twitter',
        href: '#',
        icon: <TwitterIcon className="h-4 w-4" />,
    },
    {
        name: 'Instagram',
        href: '#',
        icon: <InstagramIcon className="h-4 w-4" />,
    },
    {
        name: 'YouTube',
        href: '#',
        icon: <YoutubeIcon className="h-4 w-4" />,
    },
];

const contactInfo = [
    {
        icon: <MailIcon className="h-4 w-4" />,
        text: 'contact@kpopproject.com',
        href: 'mailto:contact@kpopproject.com',
    },
    {
        icon: <PhoneIcon className="h-4 w-4" />,
        text: '+1 234 567 890',
        href: 'tel:+1234567890',
    },
    {
        icon: <MapPinIcon className="h-4 w-4" />,
        text: 'Seoul, South Korea',
        href: '#',
    },
];

export default function Footer() {
    return (
        <footer className="relative overflow-hidden bg-white dark:bg-gray-800">
            {/* Animated Background */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 opacity-5">
                    <div className="animate-pulse-slow absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-purple-600/30 blur-3xl" />
                    <div className="animate-pulse-slow absolute right-1/4 top-1/2 h-[600px] w-[600px] rounded-full bg-pink-600/20 blur-3xl" />
                </div>
            </div>

            <div className="relative">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    {/* Main Footer Grid */}
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                        {/* Brand Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-2"
                        >
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                KPOP Project
                            </h3>
                            <p className="mt-4 max-w-md text-gray-600 dark:text-gray-400">
                                Your ultimate destination for everything K-pop
                                related. Stay updated with the latest news,
                                events, and exclusive content.
                            </p>
                            {/* Social Links */}
                            <div className="mt-6 flex space-x-4">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        className="group rounded-full bg-gray-100 p-2.5 text-gray-600 transition-all duration-300 hover:bg-purple-100 hover:text-purple-600 hover:shadow-lg dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-purple-900/50 dark:hover:text-purple-400"
                                        aria-label={`Follow us on ${social.name}`}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </motion.div>

                        {/* Quick Links */}
                        {Object.entries(footerLinks).map(
                            ([category, links], index) => (
                                <motion.div
                                    key={category}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * (index + 1) }}
                                >
                                    <h3 className="text-lg font-semibold capitalize text-gray-900 dark:text-white">
                                        {category}
                                    </h3>
                                    <ul className="mt-4 space-y-3">
                                        {links.map((link) => (
                                            <li key={link.name}>
                                                <a
                                                    href={link.href}
                                                    className="text-gray-600 transition-colors hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400"
                                                >
                                                    {link.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ),
                        )}
                    </div>

                    {/* Newsletter Section */}
                    <NewsLetterSection />

                    {/* Copyright */}
                    <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-600 dark:border-gray-700 dark:text-gray-400">
                        <p>
                            © {new Date().getFullYear()} KPOP Project. All
                            rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

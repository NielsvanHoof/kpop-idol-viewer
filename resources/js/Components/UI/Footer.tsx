import {
    BuildingOfficeIcon,
    CalendarIcon,
    EnvelopeIcon,
    MapPinIcon,
    PhoneIcon,
    ShoppingBagIcon,
    SparklesIcon,
    UserGroupIcon,
} from '@heroicons/react/24/outline';
import { Link } from '@inertiajs/react';

const navItems = [
    {
        name: 'Home',
        icon: <SparklesIcon className="h-5 w-5" />,
        href: route('welcome'),
    },
    {
        name: 'Idols',
        icon: <UserGroupIcon className="h-5 w-5" />,
        href: route('idols.index'),
    },
    {
        name: 'Groups',
        icon: <BuildingOfficeIcon className="h-5 w-5" />,
        href: route('groups.index'),
    },
    {
        name: 'Events',
        icon: <CalendarIcon className="h-5 w-5" />,
        href: '#',
    },
    {
        name: 'Shop',
        icon: <ShoppingBagIcon className="h-5 w-5" />,
        href: '#',
    },
];

const socialLinks = [
    {
        name: 'Facebook',
        href: '#',
        icon: (props: React.SVGProps<SVGSVGElement>) => (
            <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                />
            </svg>
        ),
    },
    {
        name: 'Twitter',
        href: '#',
        icon: (props: React.SVGProps<SVGSVGElement>) => (
            <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
    },
    {
        name: 'Instagram',
        href: '#',
        icon: (props: React.SVGProps<SVGSVGElement>) => (
            <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                />
            </svg>
        ),
    },
    {
        name: 'YouTube',
        href: '#',
        icon: (props: React.SVGProps<SVGSVGElement>) => (
            <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                <path
                    fillRule="evenodd"
                    d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                    clipRule="evenodd"
                />
            </svg>
        ),
    },
];

const contactInfo = [
    {
        icon: EnvelopeIcon,
        text: 'contact@kpopproject.com',
        href: 'mailto:contact@kpopproject.com',
    },
    { icon: PhoneIcon, text: '+1 234 567 890', href: 'tel:+1234567890' },
    { icon: MapPinIcon, text: 'Seoul, South Korea', href: '#' },
];

export default function Footer() {
    return (
        <footer className="relative overflow-hidden bg-white dark:bg-gray-800">
            {/* Background Decoration */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-5">
                <div className="animate-pulse-slow h-[500px] w-[800px] rounded-full bg-purple-600 blur-3xl filter dark:bg-purple-900" />
            </div>

            <div className="relative">
                {/* Main Footer Content */}
                <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-4">
                        {/* About Section */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                About Us
                            </h3>
                            <p className="text-sm leading-relaxed text-gray-600 sm:text-base dark:text-gray-400">
                                Your ultimate destination for everything K-pop
                                related. Stay updated with the latest news,
                                events, and exclusive content.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Quick Links
                            </h3>
                            <ul className="space-y-3">
                                {navItems.map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            className="group inline-flex items-center space-x-2 text-sm text-gray-600 transition-colors hover:text-purple-600 sm:text-base dark:text-gray-400 dark:hover:text-purple-400"
                                        >
                                            <span className="transition-transform duration-300 group-hover:translate-x-1">
                                                {item.icon}
                                            </span>
                                            <span>{item.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Social Links */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Contact
                            </h3>
                            <ul className="space-y-3">
                                {contactInfo.map((info) => (
                                    <li key={info.text}>
                                        <a
                                            href={info.href}
                                            className="group inline-flex items-center space-x-2 text-sm text-gray-600 transition-colors hover:text-purple-600 sm:text-base dark:text-gray-400 dark:hover:text-purple-400"
                                        >
                                            <info.icon className="h-5 w-5" />
                                            <span>{info.text}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Follow Us
                        </h3>
                        <div className="flex space-x-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    className="group rounded-full bg-gray-100 p-2 transition-all hover:bg-purple-100 hover:text-purple-600 dark:bg-gray-700 dark:hover:bg-purple-900/50 dark:hover:text-purple-400"
                                    aria-label={`Follow us on ${social.name}`}
                                >
                                    <social.icon
                                        className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
                                        aria-hidden="true"
                                    />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-700">
                    <form className="mx-auto flex max-w-md flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                        <input
                            type="email"
                            placeholder="Subscribe to our newsletter"
                            className="w-full rounded-full border-gray-300 bg-white px-4 py-2 text-sm focus:border-purple-500 focus:ring-purple-500 sm:text-base dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-purple-400"
                        />
                        <button
                            type="submit"
                            className="inline-flex items-center rounded-full bg-purple-600 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:text-base dark:hover:bg-purple-500"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>

                {/* Copyright */}
                <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-600 sm:text-base dark:border-gray-700 dark:text-gray-400">
                    <p>
                        © {new Date().getFullYear()} KPOP Project. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

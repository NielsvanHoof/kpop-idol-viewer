import FanFavoritesSection from '@/Components/Index/FanFavoriteSection';
import FAQ from '@/Components/Index/FaqItem';
import FeaturesSection from '@/Components/Index/FeaturesSection';
import HeroSection from '@/Components/Index/HeroSection';
import LiveEventsSection from '@/Components/Index/LiveEventSection';
import MerchSection from '@/Components/Index/MerchSection';
import SpotifyPlaylistSection from '@/Components/Index/SpotifyPlayList';
import SubscriptionSection from '@/Components/Index/SubscriptionSection';
import Testimonials from '@/Components/Index/Testimonials';
import Guest from '@/Layouts/GuestLayout';
import { Idol } from '@/types/models';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Welcome({ spotlight }: { spotlight: Idol[] }) {
    return (
        <Guest>
            <Head title="KPop Universe" />
            <div className="relative mt-12 min-h-screen overflow-hidden bg-gray-900 text-gray-200 transition-colors duration-500 dark:bg-gray-100 dark:text-gray-800">
                <motion.div
                    className="absolute left-10 top-10 h-32 w-32 rounded-full bg-gray-700 opacity-40 blur-3xl dark:bg-gray-300 dark:opacity-20"
                    animate={{ x: [0, 100, -50, 0], y: [0, -50, 50, 0] }}
                    transition={{ duration: 12, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-gray-600 opacity-30 blur-3xl dark:bg-gray-400 dark:opacity-20"
                    animate={{ x: [0, -100, 50, 0], y: [0, 50, -50, 0] }}
                    transition={{ duration: 15, repeat: Infinity }}
                />
                <HeroSection />
                <FeaturesSection />
                <FanFavoritesSection spotlight={spotlight} />
                <LiveEventsSection />
                <SpotifyPlaylistSection />
                <Testimonials />
                <FAQ />
                <MerchSection />
                <SubscriptionSection />
            </div>
        </Guest>
    );
}

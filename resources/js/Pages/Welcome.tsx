import React from "react";
import { motion } from "framer-motion";
import Guest from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import HeroSection from "@/Components/Index/HeroSection";
import FeaturesSection from "@/Components/Index/FeaturesSection";
import Testimonials from "@/Components/Index/Testimonials";
import FAQ from "@/Components/Index/FaqItem";
import SubscriptionSection from "@/Components/Index/SubscriptionSection";
import MerchSection from "@/Components/Index/MerchSection";
import FanFavoritesSection from "@/Components/Index/FanFavoriteSection";
import LiveEventsSection from "@/Components/Index/LiveEventSection";
import SpotifyPlaylistSection from "@/Components/Index/SpotifyPlayList";

export default function Welcome() {
    return (
        <Guest>
            <Head title="KPop Universe" />
            <div className="mt-12 bg-gray-900 dark:bg-gray-100 min-h-screen text-gray-200 dark:text-gray-800 relative overflow-hidden transition-colors duration-500">
                {/* Animated Background Elements */}
                <motion.div
                    className="absolute top-10 left-10 w-32 h-32 bg-gray-700 dark:bg-gray-300 rounded-full opacity-40 dark:opacity-20 blur-3xl"
                    animate={{ x: [0, 100, -50, 0], y: [0, -50, 50, 0] }}
                    transition={{ duration: 12, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-10 right-10 w-40 h-40 bg-gray-600 dark:bg-gray-400 rounded-full opacity-30 dark:opacity-20 blur-3xl"
                    animate={{ x: [0, -100, 50, 0], y: [0, 50, -50, 0] }}
                    transition={{ duration: 15, repeat: Infinity }}
                />
                <HeroSection />
                <FeaturesSection />
                <FanFavoritesSection />
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

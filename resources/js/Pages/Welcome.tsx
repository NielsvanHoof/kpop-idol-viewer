import FeatureSection from '@/Components/Index/FeatureSection';
import HeroSection from '@/Components/Index/HeroSection';
import LatestNewsSection from '@/Components/Index/LatestNewsSection';
import PopulairIdols from '@/Components/Index/PopulairIdols';
import SEO from '@/Components/Common/SEO';
import SocialShare from '@/Components/Common/SocialShare';
import MainLayout from '@/Layouts/MainLayout';
import { Article, Idol } from '@/types/models';
import { motion } from 'framer-motion';

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

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};

export default function Welcome({
    spotlight,
    articles,
}: {
    spotlight: Idol[];
    articles: Article[];
}) {
    return (
        <MainLayout>
            <SEO
                title="KPOP Project - Your Ultimate K-pop Destination"
                description="Discover the latest K-pop news, music, and exclusive content."
            />
            <SocialShare />

            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="relative"
            >
                <div className="pointer-events-none fixed inset-0 flex items-center justify-center">
                    <div className="animate-pulse-slow h-[500px] w-[800px] rounded-full bg-purple-100/50 blur-3xl filter dark:bg-purple-900/20" />
                </div>

                {/* Hero Section */}
                <motion.section variants={sectionVariants}>
                    <HeroSection />
                </motion.section>

                {/* Popular Idols Section */}
                <motion.section variants={sectionVariants}>
                    <PopulairIdols spotlight={spotlight} />
                </motion.section>

                {/* Features Section */}
                <motion.section variants={sectionVariants}>
                    <FeatureSection />
                </motion.section>

                {/* Latest News Section */}
                <motion.section variants={sectionVariants}>
                    <LatestNewsSection articles={articles} />
                </motion.section>
            </motion.div>
        </MainLayout>
    );
}

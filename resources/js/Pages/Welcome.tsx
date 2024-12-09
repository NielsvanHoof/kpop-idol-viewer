import LoadingSpinner from '@/Components/LoadingSpinner';
import SEO from '@/Components/SEO';
import SocialShare from '@/Components/SocialShare';
import { useEffect, useState } from 'react';

// Import Swiper styles
import FeatureSection from '@/Components/Index/FeatureSection';
import HeroSection from '@/Components/Index/HeroSection';
import LatestNewsSection from '@/Components/Index/LatestNewsSection';
import NewsLetterSection from '@/Components/Index/NewsLetterSection';
import PopulairIdols from '@/Components/Index/PopulairIdols';
import MainLayout from '@/Layouts/MainLayout';
import { Idol, Merchandise } from '@/types/models';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Welcome({
    spotlight,
    merch,
}: {
    spotlight: Idol[];
    merch: Merchandise[];
}) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) return <LoadingSpinner />;

    return (
        <MainLayout>
            <SEO
                title="KPOP Project - Your Ultimate K-pop Destination"
                description="Discover the latest K-pop news, music, and exclusive content."
            />
            <SocialShare />

            {/* Hero Section */}
            <HeroSection />

            {/* Popular Idols Section */}
            <PopulairIdols spotlight={spotlight} />

            {/* Features Section */}
            <FeatureSection />

            {/* Latest News Section */}
            <LatestNewsSection />

            {/* Newsletter Section */}
            <NewsLetterSection />
        </MainLayout>
    );
}

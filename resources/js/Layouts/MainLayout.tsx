import ScrollToTop from '@/Components/Common/ScrollToTop';
import Footer from '@/Components/UI/Footer';
import Navigation from '@/Components/UI/Navigation';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import LoadingSpinner from '@/Components/Common/LoadingSpinner';

export default function MainLayout({ children }: PropsWithChildren) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) return <LoadingSpinner />;

    return (
        <main>
            <ScrollToTop />
            <div className="min-h-screen bg-gray-50 text-gray-800 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-200">
                <Navigation />
                {children}
                <Footer />
            </div>
        </main>
    );
}

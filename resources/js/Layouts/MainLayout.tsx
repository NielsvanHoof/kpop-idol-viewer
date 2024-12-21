import LoadingSpinner from '@/Components/Common/LoadingSpinner';
import Footer from '@/Components/UI/Footer';
import Navigation from '@/Components/UI/Navigation';
import { PropsWithChildren, useEffect, useState } from 'react';

export default function MainLayout({ children }: PropsWithChildren) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) return <LoadingSpinner />;

    return (
        <main>
            <div className="min-h-screen bg-gray-50 text-gray-800 transition-colors duration-300 dark:bg-gray-900 dark:text-gray-200">
                <Navigation />
                {children}
                <Footer />
            </div>
        </main>
    );
}

import ScrollToTop from '@/Components/ScrollToTop';
import Footer from '@/Components/UI/Footer';
import Navigation from '@/Components/UI/Navigation';
import { PropsWithChildren } from 'react';

export default function MainLayout({ children }: PropsWithChildren) {
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

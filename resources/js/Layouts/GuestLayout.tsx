import React, { PropsWithChildren } from 'react';
import Footer from '@/Components/UI/Footer';
import ScrollToTop from '@/Components/ScrollToTop';
import Navigation from '@/Components/UI/Navigation';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div>
            <Navigation />
            <ScrollToTop />
            {children}
            <Footer />
        </div>
    );
}

import { Head } from '@inertiajs/react';

interface SEOProps {
    title: string;
    description: string;
    keywords?: string;
    ogImage?: string;
}

export default function SEO({ 
    title, 
    description, 
    keywords = 'kpop, music, entertainment, artists',
    ogImage = '/images/og-image.jpg'
}: SEOProps) {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            
            {/* Open Graph / Social Media */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:type" content="website" />
            
            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />
        </Head>
    );
} 
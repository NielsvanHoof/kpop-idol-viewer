import IdolProfileBioPanel from '@/Components/Idols/profile/IdolProfileBioPanel';
import IdolProfileEventsPanel from '@/Components/Idols/profile/IdolProfileEventsPanel';
import IdolProfileGalleryPanel from '@/Components/Idols/profile/IdolProfileGalleryPanel';
import IdolProfileHeroSection from '@/Components/Idols/profile/IdolProfileHeroSection';
import IdolProfileMusicPanel from '@/Components/Idols/profile/IdolProfileMusicPanel';
import IdolProfileOverViewPanel from '@/Components/Idols/profile/IdolProfileOverViewPanel';
import LoadingSpinner from '@/Components/LoadingSpinner';
import SEO from '@/Components/SEO';
import MainLayout from '@/Layouts/MainLayout';
import { Idol } from '@/types/models';
import { Tab, TabGroup, TabList, TabPanels } from '@headlessui/react';
import {
    CalendarIcon,
    MusicalNoteIcon,
    PhotoIcon,
    SparklesIcon,
    UserGroupIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

const tabs = [
    { name: 'Overview', icon: <SparklesIcon className="h-5 w-5" /> },
    { name: 'Biography', icon: <UserGroupIcon className="h-5 w-5" /> },
    { name: 'Gallery', icon: <PhotoIcon className="h-5 w-5" /> },
    { name: 'Events', icon: <CalendarIcon className="h-5 w-5" /> },
    { name: 'Music', icon: <MusicalNoteIcon className="h-5 w-5" /> },
];

export default function IdolProfile({ idol }: { idol: Idol }) {
    const [activeTab, setActiveTab] = useState(0);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) return <LoadingSpinner />;

    return (
        <MainLayout>
            <SEO
                title={`${idol.name} Profile | KPOP Project`}
                description={`Learn more about ${idol.name}, member of ${idol.group.name}`}
            />

            {/* Hero Section */}
            <IdolProfileHeroSection idol={idol} />

            {/* Tab Navigation */}
            <div className="bg-white/80 shadow-sm backdrop-blur-sm dark:bg-gray-900/80">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <TabGroup selectedIndex={activeTab} onChange={setActiveTab}>
                        <TabList className="flex min-w-full space-x-1 overflow-x-auto py-2 sm:py-4">
                            {tabs.map((tab) => (
                                <Tab
                                    key={tab.name}
                                    className={({ selected }) =>
                                        `flex shrink-0 items-center space-x-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all sm:space-x-2 sm:px-4 sm:py-2.5 sm:text-sm ${
                                            selected
                                                ? 'bg-purple-600 text-white'
                                                : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600 dark:text-gray-400 dark:hover:bg-gray-800'
                                        }`
                                    }
                                >
                                    {tab.icon}
                                    <span className="whitespace-nowrap">
                                        {tab.name}
                                    </span>
                                </Tab>
                            ))}
                        </TabList>

                        <TabPanels className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                            {/* Overview Panel */}
                            <IdolProfileOverViewPanel idol={idol} />

                            {/* Biography Panel */}
                            <IdolProfileBioPanel idol={idol} />

                            {/* Gallery Panel */}
                            <IdolProfileGalleryPanel idol={idol} />

                            {/* Events Panel */}
                            <IdolProfileEventsPanel idol={idol} />

                            {/* Music Panel */}
                            <IdolProfileMusicPanel idol={idol} />
                        </TabPanels>
                    </TabGroup>
                </div>
            </div>
        </MainLayout>
    );
}

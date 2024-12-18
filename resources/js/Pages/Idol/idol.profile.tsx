import IdolProfileBioPanel from '@/Components/Idols/Profile/IdolProfileBioPanel';
import IdolProfileEventsPanel from '@/Components/Idols/Profile/IdolProfileEventsPanel';
import IdolProfileGalleryPanel from '@/Components/Idols/Profile/IdolProfileGalleryPanel';
import IdolProfileHeroSection from '@/Components/Idols/Profile/IdolProfileHeroSection';
import IdolProfileMusicPanel from '@/Components/Idols/Profile/IdolProfileMusicPanel';
import IdolProfileOverViewPanel from '@/Components/Idols/Profile/IdolProfileOverViewPanel';
import SEO from '@/Components/Common/SEO';
import MainLayout from '@/Layouts/MainLayout';
import { Idol } from '@/types/models';
import {
    SpotifyAlbumsResponse,
    SpotifyArtistInformationResponse,
} from '@/types/spotify';
import { Tab, TabGroup, TabList, TabPanels } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    AlbumIcon,
    CalendarIcon,
    MusicIcon,
    SparklesIcon,
    UserIcon,
} from 'lucide-react';
import { useState } from 'react';

const tabs = [
    {
        name: 'Overview',
        icon: <SparklesIcon className="h-4 w-4 sm:h-5 sm:w-5" />,
        count: null,
    },
    {
        name: 'Biography',
        icon: <UserIcon className="h-4 w-4 sm:h-5 sm:w-5" />,
        count: null,
    },
    {
        name: 'Gallery',
        icon: <AlbumIcon className="h-4 w-4 sm:h-5 sm:w-5" />,
        count: (idol: Idol) => idol.gallery_count || 0,
    },
    {
        name: 'Events',
        icon: <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5" />,
        count: (idol: Idol) => idol.events_count || 0,
    },
    {
        name: 'Music',
        icon: <MusicIcon className="h-4 w-4 sm:h-5 sm:w-5" />,
        count: (idol: Idol, songs: SpotifyAlbumsResponse | null) =>
            songs?.items?.length || 0,
    },
];

const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: index * 0.05,
        },
    }),
};

export default function IdolProfile({
    idol,
    songs,
    artistInformation,
}: {
    idol: Idol;
    songs: SpotifyAlbumsResponse | null;
    artistInformation: SpotifyArtistInformationResponse | null;
}) {

    const [activeTab, setActiveTab] = useState(0);

    return (
        <MainLayout>
            <SEO
                title={`${idol.name} Profile | KPOP Project`}
                description={`Learn more about ${idol.name}, member of ${idol.group.name}`}
            />

            <IdolProfileHeroSection
                idol={idol}
                artistInformation={artistInformation}
            />

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="sticky top-16 z-30 bg-white/80 shadow-sm backdrop-blur-sm dark:bg-gray-900/80">
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <TabGroup
                            selectedIndex={activeTab}
                            onChange={setActiveTab}
                        >
                            <TabList className="flex min-w-full space-x-1 overflow-x-auto py-2 sm:py-4">
                                {tabs.map((tab, index) => (
                                    <motion.div
                                        key={tab.name}
                                        custom={index}
                                        initial="hidden"
                                        animate="visible"
                                        variants={tabVariants}
                                    >
                                        <Tab
                                            className={({ selected }) =>
                                                `group flex shrink-0 items-center space-x-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all sm:space-x-2 sm:px-4 sm:py-2.5 sm:text-sm ${
                                                    selected
                                                        ? 'bg-purple-600 text-white'
                                                        : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-purple-400'
                                                }`
                                            }
                                        >
                                            {tab.icon}
                                            <span className="whitespace-nowrap">
                                                {tab.name}
                                            </span>
                                            {tab.count && (
                                                <span
                                                    className={`ml-1.5 rounded-full px-2 py-0.5 text-xs ${
                                                        activeTab === index
                                                            ? 'bg-white/20 text-white'
                                                            : 'bg-gray-100 text-gray-600 group-hover:bg-purple-100 group-hover:text-purple-600 dark:bg-gray-800 dark:text-gray-400'
                                                    }`}
                                                >
                                                    {tab.count(idol, songs)}
                                                </span>
                                            )}
                                        </Tab>
                                    </motion.div>
                                ))}
                            </TabList>

                            <AnimatePresence mode="wait">
                                <TabPanels className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                                    <IdolProfileOverViewPanel
                                        idol={idol}
                                        songs={songs}
                                        artistInformation={artistInformation}
                                    />
                                    <IdolProfileBioPanel idol={idol} />
                                    <IdolProfileGalleryPanel
                                        idol={idol}
                                        artistInformation={artistInformation}
                                    />
                                    <IdolProfileEventsPanel idol={idol} />
                                    <IdolProfileMusicPanel songs={songs} />
                                </TabPanels>
                            </AnimatePresence>
                        </TabGroup>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

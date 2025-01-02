import SEO from '@/Components/Common/SEO';
import IdolProfileBioPanel from '@/Components/Idols/Profile/IdolProfileBioPanel';
import IdolProfileEventsPanel from '@/Components/Idols/Profile/IdolProfileEventsPanel';
import IdolProfileGalleryPanel from '@/Components/Idols/Profile/IdolProfileGalleryPanel';
import IdolProfileHeroSection from '@/Components/Idols/Profile/IdolProfileHeroSection';
import IdolProfileMusicPanel from '@/Components/Idols/Profile/IdolProfileMusicPanel';
import IdolProfileOverViewPanel from '@/Components/Idols/Profile/IdolProfileOverViewPanel';
import MainLayout from '@/Layouts/MainLayout';
import { Idol } from '@/types/models';
import {
    SpotifyAlbumsResponse,
    SpotifyArtistInformationResponse,
    SpotifyTopTracksResponse,
} from '@/types/spotify';
import { Tab, TabGroup, TabList, TabPanels } from '@headlessui/react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
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
        color: 'bg-purple-500',
        hoverColor: 'hover:bg-purple-500/10 hover:text-purple-500',
        activeTextColor: 'text-purple-500',
    },
    {
        name: 'Biography',
        icon: <UserIcon className="h-4 w-4 sm:h-5 sm:w-5" />,
        count: null,
        color: 'bg-blue-500',
        hoverColor: 'hover:bg-blue-500/10 hover:text-blue-500',
        activeTextColor: 'text-blue-500',
    },
    {
        name: 'Gallery',
        icon: <AlbumIcon className="h-4 w-4 sm:h-5 sm:w-5" />,
        count: (idol: Idol) => idol.gallery_count || 0,
        color: 'bg-pink-500',
        hoverColor: 'hover:bg-pink-500/10 hover:text-pink-500',
        activeTextColor: 'text-pink-500',
    },
    {
        name: 'Events',
        icon: <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5" />,
        count: (idol: Idol) => idol.events_count || 0,
        color: 'bg-emerald-500',
        hoverColor: 'hover:bg-emerald-500/10 hover:text-emerald-500',
        activeTextColor: 'text-emerald-500',
    },
    {
        name: 'Music',
        icon: <MusicIcon className="h-4 w-4 sm:h-5 sm:w-5" />,
        count: (idol: Idol, songs: SpotifyAlbumsResponse | null) =>
            songs?.items?.length || 0,
        color: 'bg-amber-500',
        hoverColor: 'hover:bg-amber-500/10 hover:text-amber-500',
        activeTextColor: 'text-amber-500',
    },
];

const tabVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: 'easeOut',
        },
    },
};

const panelVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.4,
            ease: 'easeOut',
        },
    },
    exit: {
        opacity: 0,
        x: 20,
        transition: {
            duration: 0.3,
            ease: 'easeIn',
        },
    },
};

export default function IdolProfile({
    idol,
    songs,
    artistInformation,
    topTracks,
}: {
    idol: Idol;
    songs: SpotifyAlbumsResponse | null;
    artistInformation: SpotifyArtistInformationResponse | null;
    topTracks: SpotifyTopTracksResponse | null;
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

            <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
                <div className="sticky top-16 z-30 bg-white/80 shadow-lg backdrop-blur-xl transition-all dark:bg-gray-900/80">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <TabGroup
                            selectedIndex={activeTab}
                            onChange={setActiveTab}
                        >
                            <TabList className="flex min-w-full space-x-2 overflow-x-auto py-4">
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
                                                `group relative overflow-hidden rounded-xl px-3 py-2 text-sm font-medium transition-all sm:px-4 sm:py-2.5 ${
                                                    selected
                                                        ? `${tab.color} text-white shadow-lg`
                                                        : `bg-white/50 text-gray-600 backdrop-blur-sm ${tab.hoverColor} dark:bg-gray-800/50 dark:text-gray-400`
                                                }`
                                            }
                                        >
                                            <span className="relative z-10 flex items-center gap-2">
                                                {tab.icon}
                                                <span>{tab.name}</span>
                                                {tab.count && (
                                                    <span
                                                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${
                                                            activeTab === index
                                                                ? 'bg-white/20 text-white'
                                                                : `bg-gray-100 ${tab.activeTextColor} group-hover:bg-white dark:bg-gray-800`
                                                        }`}
                                                    >
                                                        {tab.count(idol, songs)}
                                                    </span>
                                                )}
                                            </span>
                                        </Tab>
                                    </motion.div>
                                ))}
                            </TabList>

                            <AnimatePresence mode="wait">
                                <TabPanels className="mx-auto max-w-7xl py-8">
                                    <motion.div
                                        key={activeTab}
                                        variants={panelVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                    >
                                        <IdolProfileOverViewPanel
                                            idol={idol}
                                            songs={songs}
                                            artistInformation={
                                                artistInformation
                                            }
                                        />
                                        <IdolProfileBioPanel idol={idol} />
                                        <IdolProfileGalleryPanel idol={idol} />
                                        <IdolProfileEventsPanel idol={idol} />
                                        <IdolProfileMusicPanel
                                            songs={songs}
                                            topTracks={topTracks}
                                        />
                                    </motion.div>
                                </TabPanels>
                            </AnimatePresence>
                        </TabGroup>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

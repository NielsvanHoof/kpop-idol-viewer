import GroupProfileAwardsPanel from '@/Components/Groups/Profile/GroupProfileAwardsPanel';
import GroupProfileDiscoveryPanel from '@/Components/Groups/Profile/GroupProfileDiscoveryPanel';
import GroupProfileEventPanel from '@/Components/Groups/Profile/GroupProfileEventPanel';
import GroupProfileGalleryPanel from '@/Components/Groups/Profile/GroupProfileGalleryPanel';
import GroupProfileHeroSection from '@/Components/Groups/Profile/GroupProfileHeroSection';
import GroupProfileMembersPanel from '@/Components/Groups/Profile/GroupProfileMembersPanel';
import GroupProfileOverViewPanel from '@/Components/Groups/Profile/GroupProfileOverViewPanel';
import SEO from '@/Components/Common/SEO';
import MainLayout from '@/Layouts/MainLayout';
import { Group } from '@/types/models';
import {
    SpotifyAlbumsResponse,
    SpotifyArtistInformationResponse,
} from '@/types/spotify';
import { Tab, TabGroup, TabList, TabPanels } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    CalendarIcon,
    CameraIcon,
    MusicIcon,
    SparklesIcon,
    TrophyIcon,
    UsersIcon,
} from 'lucide-react';
import { useState } from 'react';

const tabs = [
    {
        name: 'Overview',
        icon: <SparklesIcon className="h-4 w-4 sm:h-5 sm:w-5" />,
        count: null,
    },
    {
        name: 'Members',
        icon: <UsersIcon className="h-4 w-4 sm:h-5 sm:w-5" />,
        count: (group: Group) => group.idols_count || 0,
    },
    {
        name: 'Discography',
        icon: <MusicIcon className="h-4 w-4 sm:h-5 sm:w-5" />,
        count: (group: Group, songs: SpotifyAlbumsResponse | null) =>
            songs?.items?.filter((item) => item.album_type === 'album')
                .length || 0,
    },
    {
        name: 'Gallery',
        icon: <CameraIcon className="h-4 w-4 sm:h-5 sm:w-5" />,
        count: (group: Group) => group.gallery_count || 0,
    },
    {
        name: 'Events',
        icon: <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5" />,
        count: (group: Group) => group.events_count || 0,
    },
    {
        name: 'Awards',
        icon: <TrophyIcon className="h-4 w-4 sm:h-5 sm:w-5" />,
        count: (group: Group) => group.awards_count || 0,
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

interface GroupProfileProps {
    group: Group;
    songs: SpotifyAlbumsResponse | null;
    artistInformation: SpotifyArtistInformationResponse | null;
}

export default function GroupProfile({
    group,
    songs,
    artistInformation,
}: GroupProfileProps) {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <MainLayout>
            <SEO
                title={`${group.name} Profile | KPOP Project`}
                description={`Learn more about ${group.name}, their music, members, and achievements`}
            />

            <GroupProfileHeroSection group={group} />

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
                                                    {tab.count(group, songs)}
                                                </span>
                                            )}
                                        </Tab>
                                    </motion.div>
                                ))}
                            </TabList>

                            <AnimatePresence mode="wait">
                                <TabPanels className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                                    <GroupProfileOverViewPanel
                                        group={group}
                                        songs={songs}
                                    />
                                    <GroupProfileMembersPanel group={group} />
                                    <GroupProfileDiscoveryPanel
                                        group={group}
                                        songs={songs}
                                        artistInformation={artistInformation}
                                    />
                                    <GroupProfileGalleryPanel group={group} />
                                    <GroupProfileEventPanel group={group} />
                                    <GroupProfileAwardsPanel group={group} />
                                </TabPanels>
                            </AnimatePresence>
                        </TabGroup>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

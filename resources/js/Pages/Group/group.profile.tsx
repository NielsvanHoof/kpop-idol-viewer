import GroupProfileMembersPanel from '@/Components/groups/profile/GroupProfileMembersPanel';
import GroupProfileOverViewPanel from '@/Components/groups/profile/GroupProfileOverViewPanel';
import LoadingSpinner from '@/Components/LoadingSpinner';
import SEO from '@/Components/SEO';
import MainLayout from '@/Layouts/MainLayout';
import { Group } from '@/types/models';
import { Tab, TabGroup, TabList, TabPanels } from '@headlessui/react';
import {
    CalendarIcon,
    ChartBarIcon,
    MusicalNoteIcon,
    PhotoIcon,
    TrophyIcon,
    UsersIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const tabs = [
    {
        name: 'Overview',
        icon: <ChartBarIcon className="h-4 w-4 sm:h-5 sm:w-5" />,
    },
    { name: 'Members', icon: <UsersIcon className="h-4 w-4 sm:h-5 sm:w-5" /> },
    {
        name: 'Discography',
        icon: <MusicalNoteIcon className="h-4 w-4 sm:h-5 sm:w-5" />,
    },
    { name: 'Gallery', icon: <PhotoIcon className="h-4 w-4 sm:h-5 sm:w-5" /> },
    {
        name: 'Events',
        icon: <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5" />,
    },
    { name: 'Awards', icon: <TrophyIcon className="h-4 w-4 sm:h-5 sm:w-5" /> },
];

export default function GroupProfile({ group }: { group: Group }) {
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
                title={`${group.name} | KPOP Project`}
                description={`Learn about ${group.name}, their music, members, and achievements.`}
            />

            {/* Hero Section with Video Background */}
            <section className="relative h-[70vh] overflow-hidden">
                <div className="absolute inset-0 bg-black/50">
                    {/* <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="h-full w-full object-cover"
                    >
                        <source src={group.promo_video} type="video/mp4" />
                    </video> */}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                        <div className="mx-auto max-w-7xl">
                            <motion.div
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col items-start gap-6"
                            >
                                <div className="flex flex-col gap-4">
                                    <span className="rounded-full bg-purple-600/80 px-4 py-1 text-sm font-medium text-white backdrop-blur-sm">
                                        GIRL GROUP
                                    </span>
                                    <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                                        {group.name}
                                    </h1>
                                    <p className="text-lg text-gray-300">
                                        Debut{' '}
                                        {new Date(
                                            group.debute_date,
                                        ).getFullYear()}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-center gap-2 text-white">
                                        <UsersIcon className="h-5 w-5" />
                                        <span>{group.idols_count} Members</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-white">
                                        <MusicalNoteIcon className="h-5 w-5" />
                                        <span>10 Albums</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-white">
                                        <TrophyIcon className="h-5 w-5" />
                                        <span>4 Awards</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

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
                                                : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600 dark:text-gray-400'
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

                        {/* Tab Panels will go here */}
                        <TabPanels className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                            {/* Overview Panel */}
                            <GroupProfileOverViewPanel group={group} />

                            {/* Members Panel */}
                            <GroupProfileMembersPanel group={group} />
                        </TabPanels>
                    </TabGroup>
                </div>
            </div>
        </MainLayout>
    );
}

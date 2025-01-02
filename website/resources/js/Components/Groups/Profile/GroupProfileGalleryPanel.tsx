import EmptyState from '@/Components/State/EmptyState';
import { Group } from '@/types/models';
import { Button, Dialog, DialogPanel, TabPanel } from '@headlessui/react';
import { motion, Variants } from 'framer-motion';
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    FilterIcon,
    ImageIcon,
    StarIcon,
    XIcon,
} from 'lucide-react';
import { useState } from 'react';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.3 },
    },
};

export default function GroupProfileGalleryPanel({ group }: { group: Group }) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedType, setSelectedType] = useState<string | null>(null);

    const imageTypes = [
        { name: 'All', value: null },
        { name: 'Concept', value: 'concept' },
        { name: 'Behind', value: 'behind' },
        { name: 'Event', value: 'event' },
        { name: 'Photoshoot', value: 'photoshoot' },
    ];

    const filteredGallery = selectedType
        ? group.gallery?.filter((photo) => photo.type === selectedType)
        : group.gallery;

    const navigateImage = (direction: 'prev' | 'next') => {
        if (!filteredGallery) return;

        const currentIndex = filteredGallery.findIndex(
            (photo) => photo.url === selectedImage,
        );
        const newIndex =
            direction === 'next'
                ? (currentIndex + 1) % filteredGallery.length
                : (currentIndex - 1 + filteredGallery.length) %
                  filteredGallery.length;

        setSelectedImage(filteredGallery[newIndex].url);
    };

    return (
        <TabPanel>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
                {/* Main Content - Photo Gallery */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="lg:col-span-8"
                >
                    <div className="overflow-hidden rounded-2xl bg-white/80 p-4 shadow-lg ring-1 ring-gray-200/50 backdrop-blur-xl transition-all duration-300 hover:bg-white/90 sm:p-6 dark:bg-gray-800/80 dark:ring-gray-700/50 dark:hover:bg-gray-800/90">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-2">
                                <ImageIcon className="h-5 w-5 text-purple-500" />
                                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
                                    Group Gallery
                                </h2>
                            </div>

                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                                <span className="rounded-xl bg-purple-100/80 px-3 py-1 text-xs font-medium text-purple-600 backdrop-blur-sm dark:bg-purple-900/30 dark:text-purple-400">
                                    {filteredGallery?.length || 0} Photos
                                </span>

                                <div className="relative">
                                    <div className="hide-scrollbar flex overflow-x-auto pb-2 sm:pb-0">
                                        <div className="flex gap-1.5 px-0.5">
                                            {imageTypes.map((type) => (
                                                <button
                                                    key={type.name}
                                                    onClick={() =>
                                                        setSelectedType(
                                                            type.value,
                                                        )
                                                    }
                                                    className={`flex-shrink-0 whitespace-nowrap rounded-xl px-3 py-1 text-xs font-medium transition-all duration-300 ${
                                                        selectedType ===
                                                        type.value
                                                            ? 'bg-purple-600/90 text-white backdrop-blur-sm'
                                                            : 'bg-gray-100/80 text-gray-600 backdrop-blur-sm hover:bg-purple-100/80 hover:text-purple-600 dark:bg-gray-800/80 dark:text-gray-400 dark:hover:bg-purple-900/30 dark:hover:text-purple-400'
                                                    }`}
                                                >
                                                    {type.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                            {filteredGallery?.map((photo, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl bg-gray-100/80 ring-1 ring-gray-200/50 backdrop-blur-sm transition-all duration-300 hover:ring-purple-200/50 dark:bg-gray-900/50 dark:ring-gray-700/50 dark:hover:ring-purple-900/30"
                                    onClick={() => {
                                        setSelectedImage(photo.url);
                                    }}
                                >
                                    <img
                                        src={photo.url}
                                        alt={`Group photo ${index + 1}`}
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                                        <div className="absolute bottom-0 left-0 right-0 p-4">
                                            <div className="flex items-center justify-between text-white">
                                                <span className="text-sm font-medium">
                                                    {new Date(
                                                        photo.date || '',
                                                    ).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {group.gallery_count === 0 && (
                                <EmptyState
                                    title="No photos yet"
                                    message="Check back later for updates"
                                    icon={
                                        <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                                    }
                                />
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Sidebar Content */}
                <div className="space-y-6 lg:col-span-4">
                    {/* Gallery Stats */}
                    <motion.div
                        variants={itemVariants}
                        className="overflow-hidden rounded-2xl bg-white/80 p-4 shadow-lg ring-1 ring-gray-200/50 backdrop-blur-xl transition-all duration-300 hover:bg-white/90 sm:p-6 dark:bg-gray-800/80 dark:ring-gray-700/50 dark:hover:bg-gray-800/90"
                    >
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                            <StarIcon className="h-5 w-5 text-purple-500" />
                            Gallery Stats
                        </h3>
                        <dl className="mt-4 space-y-4">
                            <div className="group flex justify-between border-b border-gray-100 pb-2 transition-colors duration-300 dark:border-gray-700">
                                <dt className="text-sm text-gray-600 transition-colors group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white">
                                    Most Liked
                                </dt>
                            </div>
                        </dl>
                    </motion.div>

                    {/* Photo Categories */}
                    <motion.div
                        variants={itemVariants}
                        className="overflow-hidden rounded-2xl bg-white/80 p-4 shadow-lg ring-1 ring-gray-200/50 backdrop-blur-xl transition-all duration-300 hover:bg-white/90 sm:p-6 dark:bg-gray-800/80 dark:ring-gray-700/50 dark:hover:bg-gray-800/90"
                    >
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                            <FilterIcon className="h-5 w-5 text-purple-500" />
                            Categories
                        </h3>
                        <div className="mt-4 space-y-2">
                            {imageTypes.slice(1).map((type) => (
                                <div
                                    key={type.name}
                                    className="group flex items-center justify-between rounded-xl bg-gray-50/80 px-4 py-2 backdrop-blur-sm transition-all duration-300 hover:bg-gray-100/80 dark:bg-gray-900/50 dark:hover:bg-gray-900/80"
                                >
                                    <span className="text-sm text-gray-600 transition-colors group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white">
                                        {type.name}
                                    </span>
                                    <span className="rounded-xl bg-purple-100/80 px-3 py-1 text-xs font-medium text-purple-600 backdrop-blur-sm dark:bg-purple-900/30 dark:text-purple-400">
                                        {
                                            group.gallery?.filter(
                                                (p) => p.type === type.value,
                                            ).length
                                        }
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Image Modal */}
            <Dialog
                as="div"
                className="relative z-50"
                open={!!selectedImage}
                onClose={() => setSelectedImage(null)}
            >
                <div className="fixed inset-0 bg-black/90 backdrop-blur-xl" />
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-2xl">
                            <img
                                src={selectedImage || ''}
                                alt="Full size"
                                className="h-full w-full object-contain"
                            />
                            <div className="absolute inset-0 flex items-center justify-between px-4">
                                <Button
                                    onClick={() => navigateImage('prev')}
                                    className="rounded-xl bg-black/20 p-2 text-white backdrop-blur-xl transition-all duration-300 hover:bg-black/40"
                                >
                                    <ChevronLeftIcon className="h-6 w-6" />
                                </Button>
                                <Button
                                    onClick={() => navigateImage('next')}
                                    className="rounded-xl bg-black/20 p-2 text-white backdrop-blur-xl transition-all duration-300 hover:bg-black/40"
                                >
                                    <ChevronRightIcon className="h-6 w-6" />
                                </Button>
                            </div>
                            <Button
                                onClick={() => setSelectedImage(null)}
                                className="absolute right-4 top-4 rounded-xl bg-black/20 p-2 text-white backdrop-blur-xl transition-all duration-300 hover:bg-black/40"
                            >
                                <XIcon className="h-5 w-5" />
                            </Button>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </TabPanel>
    );
}

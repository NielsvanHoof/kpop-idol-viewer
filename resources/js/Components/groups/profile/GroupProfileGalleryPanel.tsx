import EmptyState from '@/Components/State/EmptyState';
import { Group } from '@/types/models';
import { Button, Dialog, DialogPanel, TabPanel } from '@headlessui/react';
import { motion } from 'framer-motion';
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    FilterIcon,
    ImageIcon,
    StarIcon,
    XIcon,
} from 'lucide-react';
import { useState } from 'react';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
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
                    <div className="rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-200 sm:p-6 dark:bg-gray-800 dark:ring-gray-800">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-2">
                                <ImageIcon className="h-5 w-5 text-purple-500" />
                                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
                                    Group Gallery
                                </h2>
                            </div>

                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                                <span className="rounded-full bg-purple-100 px-2.5 py-1 text-xs font-medium text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                                    {filteredGallery?.length || 0} Photos
                                </span>

                                <div className="relative">
                                    <div className="hide-scrollbar flex overflow-x-auto pb-2 sm:pb-0">
                                        <div className="flex gap-1 px-0.5">
                                            {imageTypes.map((type) => (
                                                <button
                                                    key={type.name}
                                                    onClick={() =>
                                                        setSelectedType(
                                                            type.value,
                                                        )
                                                    }
                                                    className={`flex-shrink-0 whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                                                        selectedType ===
                                                        type.value
                                                            ? 'bg-purple-600 text-white'
                                                            : 'bg-gray-100 text-gray-600 hover:bg-purple-50 hover:text-purple-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
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
                                    className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg bg-gray-100"
                                    onClick={() => {
                                        setSelectedImage(photo.url);
                                    }}
                                >
                                    <img
                                        src={photo.url}
                                        alt={`Group photo ${index + 1}`}
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                        <div className="absolute bottom-0 left-0 right-0 p-4">
                                            <div className="flex items-center justify-between text-white">
                                                <span className="text-sm">
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
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-200 sm:p-6 dark:bg-gray-800 dark:ring-gray-800"
                    >
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                            <StarIcon className="h-5 w-5 text-purple-500" />
                            Gallery Stats
                        </h3>
                        <dl className="mt-4 space-y-4">
                            <div className="flex justify-between border-b border-gray-100 pb-2 dark:border-gray-700">
                                <dt className="text-sm text-gray-600 dark:text-gray-400">
                                    Most Liked
                                </dt>
                            </div>
                        </dl>
                    </motion.div>

                    {/* Photo Categories */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-200 sm:p-6 dark:bg-gray-800 dark:ring-gray-800"
                    >
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
                            <FilterIcon className="h-5 w-5 text-purple-500" />
                            Categories
                        </h3>
                        <div className="mt-4 space-y-2">
                            {imageTypes.slice(1).map((type) => (
                                <div
                                    key={type.name}
                                    className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-900"
                                >
                                    <span className="text-sm text-gray-900 dark:text-white">
                                        {type.name}
                                    </span>
                                    <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
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
                <div className="fixed inset-0 bg-black/80" />
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-xl">
                            <img
                                src={selectedImage || ''}
                                alt="Full size"
                                className="h-full w-full object-contain"
                            />
                            <div className="absolute inset-0 flex items-center justify-between px-4">
                                <Button
                                    onClick={() => navigateImage('prev')}
                                    className="rounded-full bg-black/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/30"
                                >
                                    <ChevronLeftIcon className="h-6 w-6" />
                                </Button>
                                <Button
                                    onClick={() => navigateImage('next')}
                                    className="rounded-full bg-black/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/30"
                                >
                                    <ChevronRightIcon className="h-6 w-6" />
                                </Button>
                            </div>
                            <Button
                                onClick={() => setSelectedImage(null)}
                                className="absolute right-4 top-4 rounded-full bg-black/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/30"
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

import EmptyState from '@/Components/State/EmptyState';
import { Idol } from '@/types/models';
import { Button, Dialog, DialogPanel, TabPanel } from '@headlessui/react';
import { motion } from 'framer-motion';
import {
    AlbumIcon,
    ArrowRightCircleIcon,
    CalendarIcon,
    CircleXIcon,
    HeartIcon,
    SparklesIcon,
} from 'lucide-react';
import { useState } from 'react';

const galleryStats = [
    {
        icon: HeartIcon,
        label: 'Total Photos',
        getValue: (idol: Idol) => `${idol.gallery?.length || 0} Photos`,
        color: 'bg-purple-600',
    },
    {
        icon: CalendarIcon,
        label: 'Latest Update',
        getValue: (idol: Idol) => `${idol.gallery?.length || 0} Photos`,
        color: 'bg-blue-600',
    },
];

export default function IdolProfileGalleryPanel({ idol }: { idol: Idol }) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <TabPanel>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
                {/* Main Content - Gallery */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-8"
                >
                    <div className="overflow-hidden rounded-xl bg-white/80 p-4 shadow-lg ring-1 ring-purple-200/50 backdrop-blur-md transition-all hover:shadow-xl sm:p-6 dark:bg-gray-800/80 dark:ring-purple-800/50">
                        <div className="flex items-center justify-between">
                            <motion.div
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-2"
                            >
                                <AlbumIcon className="h-5 w-5 text-purple-500" />
                                <h2 className="text-xl font-bold text-purple-600 sm:text-2xl dark:text-purple-400">
                                    Photo Gallery
                                </h2>
                            </motion.div>
                            <motion.span
                                animate={{ opacity: 1, scale: 1 }}
                                className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-600 backdrop-blur-sm transition-colors hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-400"
                            >
                                {idol.gallery_count || 0} Photos
                            </motion.span>
                        </div>

                        {idol.gallery && idol.gallery.length > 0 ? (
                            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                                {idol.gallery.map((photo, index) => (
                                    <motion.div
                                        key={index}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100 shadow-md ring-1 ring-purple-100 transition-all hover:shadow-lg dark:bg-gray-800 dark:ring-purple-900/30"
                                    >
                                        <img
                                            src={photo.url}
                                            alt={`${idol.name} photo ${index + 1}`}
                                            className="h-full w-full object-cover transition-transform duration-500 will-change-transform group-hover:scale-110"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100" />
                                        <Button
                                            onClick={() =>
                                                setSelectedImage(photo.url)
                                            }
                                            className="absolute bottom-4 left-1/2 flex -translate-x-1/2 translate-y-4 items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/30 group-hover:translate-y-0 group-hover:opacity-100"
                                        >
                                            <ArrowRightCircleIcon className="h-4 w-4" />
                                            View Photo
                                        </Button>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <motion.div
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <EmptyState
                                    title="No photos yet"
                                    message="Check back later for updates to the gallery"
                                    icon={
                                        <AlbumIcon className="mx-auto h-12 w-12 text-purple-400" />
                                    }
                                />
                            </motion.div>
                        )}
                    </div>
                </motion.div>

                {/* Sidebar - Gallery Stats */}
                <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-4"
                >
                    <div className="overflow-hidden rounded-xl bg-white/80 p-4 shadow-lg ring-1 ring-purple-200/50 backdrop-blur-md transition-all hover:shadow-xl sm:p-6 dark:bg-gray-800/80 dark:ring-purple-800/50">
                        <h3 className="flex items-center gap-2 text-lg font-semibold text-purple-600 dark:text-purple-400">
                            <SparklesIcon className="h-5 w-5 text-purple-500" />
                            Gallery Stats
                        </h3>

                        <div className="mt-6 grid grid-cols-1 gap-4">
                            {galleryStats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group relative overflow-hidden rounded-lg bg-white p-4 shadow-md ring-1 ring-purple-100 transition-all hover:shadow-lg dark:bg-gray-800 dark:ring-purple-900/30"
                                >
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-2">
                                            <stat.icon className="h-5 w-5 text-white" />
                                            <h3 className="font-medium text-white">
                                                {stat.label}
                                            </h3>
                                        </div>
                                        <p className="mt-2 text-sm text-white">
                                            {stat.getValue(idol)}
                                        </p>
                                    </div>
                                    <div
                                        className={`absolute inset-0 ${stat.color} opacity-90 transition-opacity duration-300 group-hover:opacity-100`}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Image Modal */}
            <Dialog
                open={!!selectedImage}
                onClose={() => setSelectedImage(null)}
                className="relative z-50"
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm"
                    aria-hidden="true"
                />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel
                        as={motion.div}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-xl bg-white/10 backdrop-blur-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={selectedImage!}
                            alt="Full size"
                            className="h-full w-full object-contain"
                        />
                        <Button
                            onClick={() => setSelectedImage(null)}
                            className="absolute right-4 top-4 rounded-full bg-black/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/30"
                        >
                            <span className="sr-only">Close</span>
                            <CircleXIcon className="h-5 w-5" />
                        </Button>
                    </DialogPanel>
                </div>
            </Dialog>
        </TabPanel>
    );
}

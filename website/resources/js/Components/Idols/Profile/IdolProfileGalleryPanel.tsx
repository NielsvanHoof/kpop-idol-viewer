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
        color: 'bg-pink-500/90',
        iconColor: 'text-pink-100',
    },
    {
        icon: CalendarIcon,
        label: 'Latest Update',
        getValue: (idol: Idol) => `${idol.gallery?.length || 0} Photos`,
        color: 'bg-purple-500/90',
        iconColor: 'text-purple-100',
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
                    <div className="overflow-hidden rounded-2xl bg-white/80 p-6 shadow-lg backdrop-blur-xl transition-all hover:bg-white/90 dark:bg-gray-800/80 dark:hover:bg-gray-800/90">
                        <div className="flex items-center justify-between">
                            <motion.div
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-3"
                            >
                                <div className="rounded-full bg-pink-500 p-2.5">
                                    <AlbumIcon className="h-5 w-5 text-white" />
                                </div>
                                <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                                    Photo Gallery
                                </h2>
                            </motion.div>
                            <motion.div
                                animate={{ opacity: 1, scale: 1 }}
                                className="rounded-full bg-pink-500/10 px-4 py-1 text-sm font-medium text-pink-500 backdrop-blur-xl transition-colors hover:bg-pink-500/20 dark:text-pink-400"
                            >
                                {idol.gallery_count || 0} Photos
                            </motion.div>
                        </div>

                        {idol.gallery && idol.gallery.length > 0 ? (
                            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                                {idol.gallery.map((photo, index) => (
                                    <motion.div
                                        key={index}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="group relative aspect-square overflow-hidden rounded-2xl bg-gray-100 shadow-lg transition-all hover:shadow-xl dark:bg-gray-800"
                                    >
                                        <img
                                            src={photo.url}
                                            alt={`${idol.name} photo ${index + 1}`}
                                            className="h-full w-full object-cover transition-transform duration-500 will-change-transform group-hover:scale-105"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 backdrop-blur-[1px] transition-all duration-300 group-hover:opacity-100" />
                                        <Button
                                            onClick={() =>
                                                setSelectedImage(photo.url)
                                            }
                                            className="absolute bottom-4 left-1/2 flex -translate-x-1/2 translate-y-4 items-center gap-2 rounded-xl bg-white/90 px-4 py-2 text-sm font-medium text-gray-900 opacity-0 shadow-lg backdrop-blur-xl transition-all duration-300 hover:bg-white group-hover:translate-y-0 group-hover:opacity-100"
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
                                        <AlbumIcon className="mx-auto h-12 w-12 text-pink-400" />
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
                    <div className="overflow-hidden rounded-2xl bg-white/80 p-6 shadow-lg backdrop-blur-xl transition-all hover:bg-white/90 dark:bg-gray-800/80 dark:hover:bg-gray-800/90">
                        <div className="flex items-center gap-3">
                            <div className="rounded-full bg-pink-500 p-2.5">
                                <SparklesIcon className="h-5 w-5 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Gallery Stats
                            </h3>
                        </div>

                        <div className="mt-6 space-y-3">
                            {galleryStats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`group relative overflow-hidden rounded-xl ${stat.color} p-4 shadow-lg backdrop-blur-md transition-all hover:shadow-xl`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-full bg-white/10 p-2 backdrop-blur-xl">
                                            <stat.icon
                                                className={`h-5 w-5 ${stat.iconColor}`}
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-white">
                                                {stat.label}
                                            </h3>
                                            <p className="mt-1 text-sm text-white/90">
                                                {stat.getValue(idol)}
                                            </p>
                                        </div>
                                    </div>
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
                    className="fixed inset-0 bg-black/90 backdrop-blur-md"
                    aria-hidden="true"
                />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel
                        as={motion.div}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-2xl bg-white/10 backdrop-blur-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={selectedImage!}
                            alt="Full size"
                            className="h-full w-full object-contain"
                        />
                        <Button
                            onClick={() => setSelectedImage(null)}
                            className="absolute right-4 top-4 rounded-xl bg-white/90 p-2 text-gray-900 backdrop-blur-xl transition-colors hover:bg-white"
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

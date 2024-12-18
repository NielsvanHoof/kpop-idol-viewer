import EmptyState from '@/Components/State/EmptyState';
import { Idol } from '@/types/models';
import { SpotifyArtistInformationResponse } from '@/types/spotify';
import { Button, Dialog, DialogPanel, TabPanel } from '@headlessui/react';
import { motion } from 'framer-motion';
import {
    AlbumIcon,
    ArrowRightCircleIcon,
    CalendarIcon,
    CircleXIcon,
    HeartIcon,
} from 'lucide-react';
import { useState } from 'react';

export default function IdolProfileGalleryPanel({
    idol,
    artistInformation,
}: {
    idol: Idol;
    artistInformation: SpotifyArtistInformationResponse | null;
}) {
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
                    <div className="rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-200 sm:p-6 dark:bg-gray-800 dark:ring-gray-800">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <AlbumIcon className="h-5 w-5 text-purple-500" />
                                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
                                    Photo Gallery
                                </h2>
                            </div>
                            <span className="rounded-full bg-purple-100 px-2.5 py-1 text-xs font-medium text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                                {idol.gallery_count || 0} Photos
                            </span>
                        </div>

                        {idol.gallery && idol.gallery.length > 0 ? (
                            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                                {idol.gallery.map((photo, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100 ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700"
                                    >
                                        <img
                                            src={photo.url}
                                            alt={`${idol.name} photo ${index + 1}`}
                                            className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 transition-all duration-300 group-hover:opacity-100" />
                                        <Button
                                            onClick={() =>
                                                setSelectedImage(photo.url)
                                            }
                                            className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-white/30 group-hover:opacity-100"
                                        >
                                            <ArrowRightCircleIcon className="h-4 w-4" />
                                            View
                                        </Button>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <EmptyState
                                title="No photos yet"
                                message="Check back later for updates to the gallery"
                                icon={
                                    <AlbumIcon className="mx-auto h-12 w-12 text-gray-400" />
                                }
                            />
                        )}
                    </div>
                </motion.div>

                {/* Sidebar - Gallery Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-4"
                >
                    <div className="rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-200 sm:p-6 dark:bg-gray-800 dark:ring-gray-800">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Gallery Stats
                        </h3>
                        <dl className="mt-4 space-y-4 sm:mt-6">
                            <div className="flex justify-between">
                                <dt className="text-sm text-gray-600 dark:text-gray-400">
                                    Total Photos
                                </dt>
                                <dd className="text-sm font-medium text-gray-900 dark:text-white">
                                    {idol.gallery?.length || 0}
                                </dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-sm text-gray-600 dark:text-gray-400">
                                    Latest Update
                                </dt>
                                <dd className="text-sm font-medium text-gray-900 dark:text-white">
                                    {new Date().toLocaleDateString()}
                                </dd>
                            </div>
                        </dl>

                        {/* Quick Stats */}
                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <div className="rounded-lg bg-purple-50 p-3 text-center ring-1 ring-purple-100 dark:bg-purple-900/10 dark:ring-purple-900/30">
                                <HeartIcon className="mx-auto h-5 w-5 text-purple-600 dark:text-purple-400" />
                                <div className="mt-1.5 text-sm font-medium text-purple-600 dark:text-purple-400">
                                    {idol.gallery?.length || 0} Total
                                </div>
                            </div>
                            <div className="rounded-lg bg-purple-50 p-3 text-center ring-1 ring-purple-100 dark:bg-purple-900/10 dark:ring-purple-900/30">
                                <CalendarIcon className="mx-auto h-5 w-5 text-purple-600 dark:text-purple-400" />
                                <div className="mt-1.5 text-sm font-medium text-purple-600 dark:text-purple-400">
                                    {new Date().getFullYear()}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Image Modal */}
            {selectedImage && (
                <Dialog
                    open={!!selectedImage}
                    onClose={() => setSelectedImage(null)}
                    className="relative z-50"
                >
                    <div
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
                        aria-hidden="true"
                    />
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <DialogPanel
                            className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-xl bg-white"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedImage}
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
            )}
        </TabPanel>
    );
}

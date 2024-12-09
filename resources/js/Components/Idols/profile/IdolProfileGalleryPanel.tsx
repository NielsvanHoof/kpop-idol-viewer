import { Idol } from '@/types/models';
import { TabPanel } from '@headlessui/react';
import { ArrowsPointingOutIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function IdolProfileGalleryPanel({ idol }: { idol: Idol }) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <TabPanel>
            <div className="space-y-6 sm:space-y-8">
                {/* Gallery Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <PhotoIcon className="h-5 w-5 text-purple-500" />
                        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
                            Photo Gallery
                        </h2>
                    </div>
                    <span className="rounded-full bg-purple-100 px-2.5 py-1 text-xs font-medium text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                        {idol.gallery?.length || 0} Photos
                    </span>
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                    {idol.gallery?.map((photo, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: index * 0.1,
                            }}
                            className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100 ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700"
                        >
                            {/* Image */}
                            <img
                                src={photo}
                                alt={`${idol.name} photo ${index + 1}`}
                                className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                                loading="lazy"
                            />

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 transition-all duration-300 group-hover:opacity-100" />

                            {/* Action Button */}
                            <button
                                onClick={() => setSelectedImage(photo)}
                                className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-white/30 group-hover:opacity-100"
                            >
                                <ArrowsPointingOutIcon className="h-4 w-4" />
                                View
                            </button>

                            {/* Photo Number Badge */}
                            <div className="absolute right-3 top-3 rounded-full bg-black/20 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
                                {index + 1}/{idol.gallery?.length}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Image Modal */}
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedImage}
                                alt="Full size"
                                className="h-full w-full object-contain"
                            />
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute right-4 top-4 rounded-full bg-black/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/30"
                            >
                                <span className="sr-only">Close</span>
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </motion.div>
                    </motion.div>
                )}

                {/* Empty State */}
                {(!idol.gallery || idol.gallery.length === 0) && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center rounded-xl bg-gray-50 py-12 dark:bg-gray-800/50"
                    >
                        <PhotoIcon className="h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                            No photos yet
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Check back later for updates to the gallery
                        </p>
                    </motion.div>
                )}
            </div>
        </TabPanel>
    );
}

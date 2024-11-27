import Guest from '@/Layouts/GuestLayout';
import { Idol } from '@/types/models';
import { Button } from '@headlessui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { remark } from 'remark';

export default function IdolProfilePage({ idol }: { idol: Idol }) {
    const [gallery, setGallery] = useState(idol.gallery);
    const [showAllGallery, setShowAllGallery] = useState(false);

    console.log(idol);

    const loadMoreGallery = () => {
        const moreImages = idol.gallery.slice(
            gallery.length,
            gallery.length + 6,
        );
        setGallery((prev) => [...prev, ...moreImages]);
        setShowAllGallery(true);
    };

    const bio = remark().processSync(idol.bio).toString();

    return (
        <Guest>
            <div className="relative mt-12 min-h-screen bg-gray-900 py-12 text-gray-300 dark:bg-gray-100 dark:text-gray-800">
                {/* Hero Section */}
                <section className="mx-auto max-w-5xl px-6 text-center">
                    <motion.h1
                        className="text-5xl font-extrabold text-gray-100 dark:text-gray-900"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        {idol.name}
                    </motion.h1>
                    <motion.p
                        className="mt-4 text-lg text-gray-400 dark:text-gray-600"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        {idol.group.name}
                    </motion.p>
                </section>

                {/* Profile Section */}
                <section className="mx-auto mt-12 grid max-w-6xl grid-cols-1 items-center gap-8 px-6 md:grid-cols-2">
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <img
                            src={idol.cover_photo}
                            alt={idol.name}
                            style={{
                                maxWidth: '30rem',
                                maxHeight: '30rem',
                            }}
                            className="h-full w-full rounded-lg object-cover"
                            loading="lazy"
                        />
                    </motion.div>
                    <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <h2 className="text-3xl font-bold text-gray-100 dark:text-gray-900">
                            Biography
                        </h2>
                        <p className="text-gray-400 dark:text-gray-600">
                            {idol.birth_date && (
                                <span>
                                    <strong>Birth Date:</strong>{' '}
                                    {new Date(
                                        idol.birth_date,
                                    ).toLocaleDateString()}
                                </span>
                            )}
                        </p>
                        <div
                            className="text-gray-400 dark:text-gray-600"
                            dangerouslySetInnerHTML={{ __html: bio }}
                        />
                        {/*<div className="mt-6 grid grid-cols-3 gap-4 text-center">*/}
                        {/*    {Object.entries(idol.stats).map(([key, value]) => (*/}
                        {/*        <div key={key}>*/}
                        {/*            <p className="text-2xl font-bold text-pink-500 dark:text-yellow-400">*/}
                        {/*                {value}*/}
                        {/*            </p>*/}
                        {/*            <p className="text-sm capitalize text-gray-400 dark:text-gray-600">*/}
                        {/*                {key}*/}
                        {/*            </p>*/}
                        {/*        </div>*/}
                        {/*    ))}*/}
                        {/*</div>*/}
                    </motion.div>
                </section>

                {/* Gallery Section */}
                <motion.section
                    className="mx-auto mt-16 max-w-6xl px-6"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="mb-8 text-center text-3xl font-bold text-gray-100 dark:text-gray-900">
                        Gallery
                    </h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {gallery.map((image, index) => (
                            <motion.img
                                key={index}
                                src={image}
                                alt={`Gallery Image ${index + 1}`}
                                className="h-auto w-full transform rounded-lg shadow-md transition-transform hover:scale-105 hover:shadow-pink-500 dark:hover:shadow-yellow-400"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.2,
                                }}
                            />
                        ))}
                    </div>
                    {!showAllGallery && (
                        <Button
                            onClick={loadMoreGallery}
                            className="mx-auto mt-6 block transform rounded-lg bg-pink-500 px-6 py-2 font-bold text-gray-900 transition-transform hover:scale-105 hover:bg-pink-400 focus:outline-none focus:ring-4 focus:ring-pink-500/50 dark:bg-yellow-400 dark:hover:bg-yellow-300 dark:focus:ring-yellow-500/50"
                        >
                            Load More
                        </Button>
                    )}
                </motion.section>

                {/* Merchandise Section */}
                <motion.section
                    className="mx-auto mt-16 max-w-6xl px-6"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="mb-8 text-center text-3xl font-bold text-gray-100 dark:text-gray-900">
                        {(idol.merchandises.length > 0 && (
                            <span>Merchandise</span>
                        )) || <span>No Merchandise Available</span>}
                    </h2>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
                        {idol.merchandises?.map((item, index) => (
                            <motion.div
                                key={index}
                                className="transform rounded-lg bg-gray-800 p-4 text-gray-300 shadow-md transition-transform hover:scale-105 hover:shadow-pink-500 dark:bg-gray-200 dark:text-gray-800 dark:hover:shadow-yellow-400"
                            >
                                <img
                                    src={'#'}
                                    alt={item.name}
                                    className="mb-4 h-40 w-full rounded-lg object-cover"
                                />
                                <h3 className="text-lg font-bold">
                                    {item.name}
                                </h3>
                                <p className="mt-2 text-gray-400 dark:text-gray-600">
                                    {item.price}
                                </p>
                                <button className="mt-4 rounded-lg bg-pink-500 px-4 py-2 font-bold text-gray-900 transition hover:bg-pink-400 focus:outline-none focus:ring-4 focus:ring-pink-500/50 dark:bg-yellow-400 dark:hover:bg-yellow-300 dark:focus:ring-yellow-500/50">
                                    Buy Now
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* Spotify Playlist */}
                <section className="mx-auto mt-16 max-w-6xl px-6 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-gray-100 dark:text-gray-900">
                        Listen to {idol.name} on Spotify
                    </h2>
                    <iframe
                        width="100%"
                        height="380"
                        allowFullScreen={true}
                        src="https://open.spotify.com/embed/artist/41MozSoPIsD1dJM0CLPjZF?utm_source=generator"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                    />
                </section>
            </div>
        </Guest>
    );
}

import { Idol } from '@/types/models';
import { AnimatePresence, motion } from 'framer-motion';
import { HeartIcon, SparklesIcon, UsersIcon } from 'lucide-react';
import { Variants } from 'motion/react';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5 },
    },
    hover: {
        y: -5,
        scale: 1.02,
        transition: { duration: 0.2 },
    },
};

export default function PopularIdols({ spotlight }: { spotlight: Idol[] }) {
    const [likedIdols, setLikedIdols] = useState<number[]>([]);
    const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

    const handleLike = (e: React.MouseEvent, idolId: number) => {
        e.preventDefault();
        e.stopPropagation();
        setLikedIdols((prev) =>
            prev.includes(idolId)
                ? prev.filter((id) => id !== idolId)
                : [...prev, idolId],
        );
    };

    const handleImageLoad = (imageUrl: string) => {
        setLoadedImages((prev) => new Set(prev).add(imageUrl));
    };

    return (
        <section className="relative bg-gradient-to-br from-white via-gray-50 to-white py-16 sm:py-32 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
                className="relative"
            >
                {/* Header Section */}
                <motion.div
                    variants={itemVariants}
                    className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8"
                >
                    <motion.div
                        variants={itemVariants}
                        className="mb-8 flex justify-center"
                    >
                        <span className="inline-flex items-center gap-2 rounded-2xl bg-purple-500/10 px-4 py-2 text-purple-600 backdrop-blur-sm dark:bg-purple-500/20 dark:text-purple-400">
                            <SparklesIcon className="h-5 w-5" />
                            <span className="text-sm font-medium">
                                Featured Artists
                            </span>
                        </span>
                    </motion.div>

                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white"
                    >
                        Popular Idols
                    </motion.h2>
                    <motion.p
                        variants={itemVariants}
                        className="mx-auto mt-4 max-w-2xl text-base text-gray-600 sm:text-lg dark:text-gray-300"
                    >
                        Discover trending K-pop artists and their latest
                        achievements
                    </motion.p>
                </motion.div>

                {/* Carousel Section */}
                <motion.div variants={itemVariants} className="mt-12 sm:mt-16">
                    <Swiper
                        modules={[Autoplay, Navigation, Pagination]}
                        slidesPerView={1.2}
                        centeredSlides={true}
                        spaceBetween={30}
                        navigation
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
                        breakpoints={{
                            640: { slidesPerView: 2.2, spaceBetween: 40 },
                            1024: { slidesPerView: 3.2, spaceBetween: 50 },
                        }}
                        className="!pb-16"
                    >
                        <AnimatePresence>
                            {spotlight.map((idol) => (
                                <SwiperSlide key={idol.id}>
                                    <motion.div
                                        variants={cardVariants}
                                        whileHover="hover"
                                        className="group relative overflow-hidden rounded-2xl bg-white/80 shadow-lg backdrop-blur-xl transition-all duration-300 hover:bg-white/90 hover:shadow-xl dark:bg-gray-800/80 dark:hover:bg-gray-800/90"
                                    >
                                        <div className="relative aspect-[4/5] overflow-hidden">
                                            {/* Loading Skeleton */}
                                            <AnimatePresence>
                                                {!loadedImages.has(
                                                    idol.cover_photo.url,
                                                ) && (
                                                    <motion.div
                                                        initial={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        className="absolute inset-0 animate-pulse bg-purple-100/50 dark:bg-purple-900/30"
                                                    />
                                                )}
                                            </AnimatePresence>

                                            {/* Image */}
                                            <motion.img
                                                src={idol.cover_photo.url}
                                                alt={idol.name}
                                                onLoad={() =>
                                                    handleImageLoad(
                                                        idol.cover_photo.url,
                                                    )
                                                }
                                                initial={{
                                                    opacity: 0,
                                                    scale: 1.1,
                                                }}
                                                animate={{
                                                    opacity: loadedImages.has(
                                                        idol.cover_photo.url,
                                                    )
                                                        ? 1
                                                        : 0,
                                                    scale: 1,
                                                }}
                                                transition={{ duration: 0.3 }}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />

                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-60 backdrop-blur-[1px] transition-all duration-300 group-hover:opacity-70" />

                                            {/* Like Button */}
                                            <motion.button
                                                onClick={(e) =>
                                                    handleLike(e, idol.id)
                                                }
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="absolute right-4 top-4 z-10 rounded-xl bg-white/90 p-2.5 shadow-lg backdrop-blur-xl transition-all hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800"
                                            >
                                                <HeartIcon
                                                    className={`h-5 w-5 transition-colors ${
                                                        likedIdols.includes(
                                                            idol.id,
                                                        )
                                                            ? 'text-pink-500'
                                                            : 'text-gray-400 hover:text-pink-500'
                                                    }`}
                                                />
                                            </motion.button>

                                            {/* Content */}
                                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                                <motion.div
                                                    initial={{
                                                        y: 20,
                                                        opacity: 0,
                                                    }}
                                                    animate={{
                                                        y: 0,
                                                        opacity: 1,
                                                    }}
                                                    transition={{
                                                        duration: 0.3,
                                                    }}
                                                    className="space-y-3"
                                                >
                                                    <h3 className="text-2xl font-bold text-white">
                                                        {idol.name}
                                                    </h3>
                                                    <p className="text-lg text-white/90">
                                                        {idol.group.name ??
                                                            'Solo'}
                                                    </p>
                                                    <div className="flex items-center gap-3 pt-2">
                                                        <span className="inline-flex items-center gap-1.5 rounded-xl bg-white/20 px-3 py-1 text-sm text-white backdrop-blur-xl">
                                                            <UsersIcon className="h-4 w-4" />
                                                            {
                                                                idol.followers_count
                                                            }{' '}
                                                            {idol.followers_count ===
                                                            1
                                                                ? 'Follower'
                                                                : 'Followers'}
                                                        </span>
                                                    </div>
                                                </motion.div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </SwiperSlide>
                            ))}
                        </AnimatePresence>
                    </Swiper>
                </motion.div>
            </motion.div>
        </section>
    );
}

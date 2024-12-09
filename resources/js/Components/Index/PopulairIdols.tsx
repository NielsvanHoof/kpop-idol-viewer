import { Idol } from '@/types/models';
import { Button } from '@headlessui/react';
import { HeartIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useState } from 'react';
import {
    Autoplay,
    EffectCoverflow,
    Navigation,
    Pagination,
} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function PopularIdols({ spotlight }: { spotlight: Idol[] }) {
    const [likedIdols, setLikedIdols] = useState<number[]>([]);

    const handleLike = (e: React.MouseEvent, idolId: number) => {
        e.preventDefault();
        e.stopPropagation();
        setLikedIdols((prev) =>
            prev.includes(idolId)
                ? prev.filter((id) => id !== idolId)
                : [...prev, idolId],
        );
    };

    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-16 sm:py-32 dark:from-gray-900 dark:to-gray-800">
            {/* Background Decoration */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="animate-pulse-slow h-[800px] w-[1200px] rounded-full bg-purple-100/50 blur-3xl filter dark:bg-purple-900/20" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <span className="mb-4 inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                        <SparklesIcon className="mr-1.5 h-4 w-4" />
                        Featured Artists
                    </span>
                    <h2 className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl lg:text-5xl">
                        Popular Idols
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 sm:text-lg dark:text-gray-400">
                        Discover trending K-pop artists and their latest
                        achievements
                    </p>
                </motion.div>

                {/* Swiper Carousel */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="mt-12 sm:mt-16"
                >
                    <Swiper
                        modules={[
                            Autoplay,
                            EffectCoverflow,
                            Pagination,
                            Navigation,
                        ]}
                        effect="coverflow"
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={2.5}
                        initialSlide={1}
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 100,
                            modifier: 2,
                            slideShadows: false,
                        }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        pagination={{
                            clickable: true,
                            bulletActiveClass:
                                'swiper-pagination-bullet-active !bg-purple-500 !w-3 !h-3',
                            bulletClass:
                                'swiper-pagination-bullet !bg-gray-300 !rounded-full !w-2 !h-2 !mx-1 transition-all duration-300',
                        }}
                        breakpoints={{
                            320: {
                                slidesPerView: 1.2,
                                spaceBetween: 20,
                            },
                            640: {
                                slidesPerView: 1.5,
                                spaceBetween: 30,
                            },
                            1024: {
                                slidesPerView: 2.5,
                                spaceBetween: 40,
                            },
                        }}
                        className="!pb-16"
                    >
                        {spotlight.map((idol) => (
                            <SwiperSlide key={idol.id}>
                                <div className="group relative overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-200 transition-all duration-300 hover:scale-[1.03] dark:bg-gray-800 dark:ring-gray-700">
                                    <div className="relative h-[28rem] overflow-hidden">
                                        <img
                                            src={idol.cover_photo}
                                            alt={idol.name}
                                            className="h-full w-full object-cover transition-transform duration-700 will-change-transform group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                        {/* Like Button */}
                                        <Button
                                            onClick={(e) =>
                                                handleLike(e, idol.id)
                                            }
                                            className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-sm transition-all hover:scale-110 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800"
                                        >
                                            <HeartIcon
                                                className={`h-5 w-5 transition-colors ${
                                                    likedIdols.includes(idol.id)
                                                        ? 'text-red-500'
                                                        : 'text-gray-400 hover:text-red-500'
                                                }`}
                                            />
                                        </Button>
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-bold text-white">
                                                {idol.name}
                                            </h3>
                                            <p className="text-lg text-purple-200">
                                                {idol.group.name}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </motion.div>
            </div>
        </section>
    );
}

import { Idol } from '@/types/models';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function FanFavoritesSlider({
    spotlight,
}: {
    spotlight: Idol[];
}) {
    return (
        <section className="mt-12 bg-gray-900 px-6 py-12 text-center transition-colors duration-500 dark:bg-gray-100">
            <h2
                className="mb-6 text-3xl font-bold text-gray-100 dark:text-gray-900"
                aria-label="Fan Favorites"
            >
                Fan Favorites
            </h2>
            <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                spaceBetween={20}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 5000 }}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                className="pb-10"
            >
                {spotlight.map((idol, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className="transform rounded-lg bg-gray-800 p-6 text-gray-300 shadow-lg transition-transform hover:scale-105 hover:shadow-pink-500/50 dark:bg-gray-200 dark:text-gray-800 dark:hover:shadow-pink-300/50"
                            aria-label={`Card for ${idol.name}`}
                        >
                            <img
                                src={idol.cover_photo}
                                alt={`${idol.name} from ${idol.group.name}`}
                                className="h-40 w-full rounded-lg object-cover shadow-md object-center"
                            />
                            <h3 className="mt-4 text-lg font-bold text-gray-100 dark:text-gray-900">
                                {idol.name}
                            </h3>
                            <p className="mt-2 text-sm text-gray-400 dark:text-gray-600">
                                {idol.group.name}
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}

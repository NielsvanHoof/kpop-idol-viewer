import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

const idols = [
    { name: "Lisa", group: "BLACKPINK", image: "https://i.pravatar.cc/300?img=1" },
    { name: "V", group: "BTS", image: "https://i.pravatar.cc/300?img=2" },
    { name: "Jisoo", group: "BLACKPINK", image: "https://i.pravatar.cc/300?img=3" },
    { name: "Jungkook", group: "BTS", image: "https://i.pravatar.cc/300?img=4" },
    { name: "Rose", group: "BLACKPINK", image: "https://i.pravatar.cc/300?img=5" },
];

export default function FanFavoritesSlider() {
    return (
        <section
            className="mt-12 px-6 py-12 bg-gray-900 dark:bg-gray-100 text-center transition-colors duration-500"
        >
            <h2 className="text-3xl font-bold text-gray-100 dark:text-gray-900 mb-6">
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
                {idols.map((idol, index) => (
                    <SwiperSlide key={index}>
                        <div className="bg-gray-800 dark:bg-gray-200 text-gray-300 dark:text-gray-800 rounded-lg shadow-lg hover:shadow-pink-500/50 dark:hover:shadow-pink-300/50 p-6 transition-transform transform hover:scale-105">
                            <img
                                src={idol.image}
                                alt={idol.name}
                                className="w-full h-40 object-cover rounded-lg shadow-md"
                            />
                            <h3 className="text-lg font-bold mt-4 text-gray-100 dark:text-gray-900">
                                {idol.name}
                            </h3>
                            <p className="text-sm text-gray-400 dark:text-gray-600 mt-2">
                                {idol.group}
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}

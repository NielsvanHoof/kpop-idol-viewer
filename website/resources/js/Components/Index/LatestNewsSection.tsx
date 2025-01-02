import { Article } from '@/types/models';
import { Button } from '@headlessui/react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { ArrowRightIcon, CalendarIcon, SparklesIcon } from 'lucide-react';
import { remark } from 'remark';

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
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
    hover: {
        y: -4,
        transition: { duration: 0.2 },
    },
};

export default function LatestNewsSection({
    articles,
}: {
    articles: Article[];
}) {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-white py-16 sm:py-24 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
                className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
            >
                {/* Section Header */}
                <motion.div variants={itemVariants} className="text-center">
                    <motion.div className="mb-8 flex justify-center">
                        <span className="inline-flex items-center gap-2 rounded-2xl bg-purple-500/10 px-4 py-2 text-purple-600 backdrop-blur-sm dark:bg-purple-500/20 dark:text-purple-400">
                            <SparklesIcon className="h-5 w-5" />
                            <span className="text-sm font-medium">
                                Latest Updates
                            </span>
                        </span>
                    </motion.div>

                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white"
                    >
                        Stay in the Loop
                    </motion.h2>
                    <motion.p
                        variants={itemVariants}
                        className="mx-auto mt-4 max-w-2xl text-base text-gray-600 sm:text-lg dark:text-gray-300"
                    >
                        Get the latest news and updates from the K-pop world
                    </motion.p>
                </motion.div>

                {/* News Grid */}
                <motion.div
                    variants={itemVariants}
                    className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 md:grid-cols-2 lg:mt-20 lg:grid-cols-3"
                >
                    <AnimatePresence>
                        {articles.map((item) => (
                            <motion.div
                                key={item.id}
                                variants={cardVariants}
                                whileHover="hover"
                                className="group relative overflow-hidden rounded-2xl bg-white/80 shadow-lg backdrop-blur-xl transition-all duration-300 hover:bg-white/90 hover:shadow-xl dark:bg-gray-800/80 dark:hover:bg-gray-800/90"
                            >
                                {/* Image Container */}
                                <div className="relative aspect-[16/9] overflow-hidden">
                                    <motion.img
                                        src={'#'}
                                        alt={item.title}
                                        initial={{ scale: 1 }}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.6 }}
                                        className="h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-60 backdrop-blur-[1px] transition-opacity duration-300 group-hover:opacity-70" />
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className="absolute right-4 top-4 rounded-xl bg-purple-500/90 px-3 py-1 text-xs font-medium text-white shadow-lg backdrop-blur-xl dark:bg-purple-600"
                                    >
                                        {item.type}
                                    </motion.div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="mb-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <CalendarIcon className="h-4 w-4" />
                                        {new Date(item.date).toLocaleDateString(
                                            'en-US',
                                            {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric',
                                            },
                                        )}
                                    </div>
                                    <motion.h3
                                        variants={itemVariants}
                                        className="mb-2 text-xl font-semibold text-gray-900 dark:text-white"
                                    >
                                        {item.title}
                                    </motion.h3>
                                    <motion.p
                                        variants={itemVariants}
                                        className="mb-4 text-base text-gray-600 dark:text-gray-300"
                                        dangerouslySetInnerHTML={{
                                            __html: remark()
                                                .processSync(item.description)
                                                .toString(),
                                        }}
                                    ></motion.p>
                                    <motion.div
                                        whileHover={{ x: 4 }}
                                        className="inline-block"
                                    >
                                        <Button className="inline-flex items-center font-medium text-purple-500 transition-colors hover:text-purple-600 dark:text-purple-400 dark:hover:text-purple-300">
                                            Read More
                                            <ArrowRightIcon className="ml-2 h-4 w-4" />
                                        </Button>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </section>
    );
}

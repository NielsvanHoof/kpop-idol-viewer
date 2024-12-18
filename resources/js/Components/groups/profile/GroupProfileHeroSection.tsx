import { Group } from '@/types/models';
import { motion } from 'motion/react';

export default function GroupProfileHeroSection({ group }: { group: Group }) {
    return (
        <section className="relative h-[70vh] overflow-hidden">
            <div className="absolute inset-0 bg-black/50">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                >
                    <source src={group.background_video} type="video/mp4" />
                </video>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <div className="mx-auto max-w-7xl">
                        <motion.div
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col items-start gap-6"
                        >
                            <div className="flex flex-col gap-4">
                                <span className="rounded-full bg-purple-600/80 px-4 py-1 text-sm font-medium text-white backdrop-blur-sm">
                                    GIRL GROUP
                                </span>
                                <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                                    {group.name}
                                </h1>
                                <p className="text-lg text-gray-300">
                                    Debut{' '}
                                    {new Date(group.debute_date).getFullYear()}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

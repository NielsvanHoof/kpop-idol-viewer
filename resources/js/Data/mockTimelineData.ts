import { TimelineEvent } from '@/Components/Timeline/TimelineFeature';

export const mockTimelineEvents: TimelineEvent[] = [
    {
        date: new Date('2024-03-15'),
        type: 'comeback',
        title: 'BLACKPINK "Pink Venom" Comeback',
        description:
            'BLACKPINK makes their highly anticipated comeback with "Pink Venom", featuring a powerful new concept.',
        media: '/images/mock/timeline/blackpink-comeback.jpg',
        artist: {
            id: 1,
            name: 'BLACKPINK',
            type: 'group',
            profile_photo: '/images/mock/blackpink.jpg',
        },
    },
    {
        date: new Date('2024-02-28'),
        type: 'debut',
        title: 'NewJeans Debut Showcase',
        description:
            'NewJeans makes their spectacular debut with "Attention", introducing a fresh take on K-pop.',
        media: '/images/mock/timeline/newjeans-debut.jpg',
        artist: {
            id: 2,
            name: 'NewJeans',
            type: 'group',
            profile_photo: '/images/mock/newjeans.jpg',
        },
    },
    {
        date: new Date('2024-02-15'),
        type: 'award',
        title: 'IVE Wins Album of the Year',
        description:
            'IVE takes home their first Album of the Year award at the Golden Disk Awards.',
        media: '/images/mock/timeline/ive-award.jpg',
        artist: {
            id: 3,
            name: 'IVE',
            type: 'group',
            profile_photo: '/images/mock/ive.jpg',
        },
    },
    {
        date: new Date('2024-01-30'),
        type: 'event',
        title: 'LE SSERAFIM World Tour Announcement',
        description:
            'LE SSERAFIM announces their first world tour "FLAME RISES" spanning 15 countries.',
        media: '/images/mock/timeline/lesserafim-tour.jpg',
        artist: {
            id: 4,
            name: 'LE SSERAFIM',
            type: 'group',
            profile_photo: '/images/mock/lesserafim.jpg',
        },
    },
    {
        date: new Date('2024-01-15'),
        type: 'comeback',
        title: 'aespa "Drama" Release',
        description:
            'aespa returns with their new single "Drama", showcasing their signature sound.',
        media: '/images/mock/timeline/aespa-comeback.jpg',
        artist: {
            id: 5,
            name: 'aespa',
            type: 'group',
            profile_photo: '/images/mock/aespa.jpg',
        },
    },
    {
        date: new Date('2023-12-20'),
        type: 'award',
        title: 'BLACKPINK Artist of the Year',
        description:
            'BLACKPINK receives the prestigious Artist of the Year award at MAMA 2023.',
        media: '/images/mock/timeline/blackpink-award.jpg',
        artist: {
            id: 1,
            name: 'BLACKPINK',
            type: 'group',
            profile_photo: '/images/mock/blackpink.jpg',
        },
    },
];

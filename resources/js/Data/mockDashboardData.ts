import { Article, Event, Idol } from '@/types/models';
import { SpotifyAlbum } from '@/types/spotify';

export const mockRecommendedTracks: SpotifyAlbum[] = [
    {
        id: '1',
        name: 'UNFORGIVEN (feat. Nile Rodgers)',
        artists: [{ name: 'LE SSERAFIM' }],
        album: {
            images: [{ url: '/images/mock/album1.jpg' }],
            name: 'UNFORGIVEN',
            release_date: '2023-05-01',
        },
    },
    {
        id: '2',
        name: 'Queencard',
        artists: [{ name: '(G)I-DLE' }],
        album: {
            images: [{ url: '/images/mock/album2.jpg' }],
            name: 'I feel',
            release_date: '2023-05-15',
        },
    },
    {
        id: '3',
        name: 'Spicy',
        artists: [{ name: 'aespa' }],
        album: {
            images: [{ url: '/images/mock/album3.jpg' }],
            name: 'MY WORLD',
            release_date: '2023-05-08',
        },
    },
];

export const mockUpcomingEvents: Event[] = [
    {
        id: 1,
        title: 'BLACKPINK World Tour [BORN PINK]',
        date: '2024-03-15',
        location: 'Seoul Olympic Stadium',
        type: 'concert',
        participants: [
            {
                id: 1,
                name: 'BLACKPINK',
                profile_photo: '/images/mock/blackpink.jpg',
            },
        ],
    },
    {
        id: 2,
        title: 'K-Pop Festival 2024',
        date: '2024-04-01',
        location: 'Tokyo Dome',
        type: 'festival',
        participants: [
            {
                id: 2,
                name: 'NewJeans',
                profile_photo: '/images/mock/newjeans.jpg',
            },
            {
                id: 3,
                name: 'IVE',
                profile_photo: '/images/mock/ive.jpg',
            },
        ],
    },
    {
        id: 3,
        title: 'Fan Meeting: Spring Day',
        date: '2024-04-15',
        location: 'COEX Hall',
        type: 'fan_meeting',
        participants: [
            {
                id: 4,
                name: 'LE SSERAFIM',
                profile_photo: '/images/mock/lesserafim.jpg',
            },
        ],
    },
];

export const mockTrendingArticles: Article[] = [
    {
        id: 1,
        title: 'NewJeans Breaks Streaming Record with Latest Release',
        slug: 'newjeans-breaks-streaming-record',
        cover_image: '/images/mock/article1.jpg',
        published_at: '2024-02-28',
        trending: true,
        related_idols: [
            {
                id: 2,
                name: 'NewJeans',
                profile_photo: '/images/mock/newjeans.jpg',
            },
        ],
    },
    {
        id: 2,
        title: 'BLACKPINK Announces New World Tour Dates',
        slug: 'blackpink-world-tour-2024',
        cover_image: '/images/mock/article2.jpg',
        published_at: '2024-02-27',
        trending: true,
        related_idols: [
            {
                id: 1,
                name: 'BLACKPINK',
                profile_photo: '/images/mock/blackpink.jpg',
            },
        ],
    },
    {
        id: 3,
        title: 'IVE Wins Multiple Awards at Music Show',
        slug: 'ive-wins-music-show',
        cover_image: '/images/mock/article3.jpg',
        published_at: '2024-02-26',
        trending: true,
        related_idols: [
            {
                id: 3,
                name: 'IVE',
                profile_photo: '/images/mock/ive.jpg',
            },
        ],
    },
    {
        id: 4,
        title: 'LE SSERAFIM Announces Comeback Date',
        slug: 'le-sserafim-comeback',
        cover_image: '/images/mock/article4.jpg',
        published_at: '2024-02-25',
        trending: true,
        related_idols: [
            {
                id: 4,
                name: 'LE SSERAFIM',
                profile_photo: '/images/mock/lesserafim.jpg',
            },
        ],
    },
];

export const mockFollowedIdols: Idol[] = [
    {
        id: 1,
        name: 'BLACKPINK',
        profile_photo: '/images/mock/blackpink.jpg',
        followers: [],
        group: { name: 'BLACKPINK' },
    },
    {
        id: 2,
        name: 'NewJeans',
        profile_photo: '/images/mock/newjeans.jpg',
        followers: [],
        group: { name: 'NewJeans' },
    },
    {
        id: 3,
        name: 'IVE',
        profile_photo: '/images/mock/ive.jpg',
        followers: [],
        group: { name: 'IVE' },
    },
    {
        id: 4,
        name: 'LE SSERAFIM',
        profile_photo: '/images/mock/lesserafim.jpg',
        followers: [],
        group: { name: 'LE SSERAFIM' },
    },
];

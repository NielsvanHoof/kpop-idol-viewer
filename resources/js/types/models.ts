export interface PaginatedResponse<T> {
    data: T;
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
    meta: {
        next_cursor: string;
        path: string;
        per_page: number;
        prev_cursor: string;
    };
}

export interface Idol {
    id: number;
    name: string;
    bio: string;
    slug: string;
    debute_date: string;
    birth_date: string;
    active: boolean;
    position: string;
    stage_name: string;
    cover_photo: Media;
    awards: Award[];
    background_image: Media;
    spotify_id: string;
    events_count: number | null;
    cover_photos_count: number | null;
    awards_count: number | null;
    gallery_count: number | null;
    followers_count: number | null;
    likes_count: number | null;
    followers: Follower[];
    gallery: Media[];
    likes: Like[];
    social_links: {
        platform: string;
        url: string;
    };
    created_at: string;
    updated_at: string;
    group: Group;
    events: Event[];
    merchandises: Merchandise[];
}

export interface Group {
    id: number;
    name: string;
    bio: string;
    active: boolean;
    type: GroupTypes;
    agency: string;
    fandom_name: string;
    slug: string;
    cover_photo: Media;
    spotify_id: string;
    debute_date: string;
    awards: Award[];
    followers: Follower[];
    likes: Like[];
    gallery: Media[];
    background_video: string;
    idols_count: number | null;
    events_count: number | null;
    awards_count: number | null;
    cover_photos_count: number | null;
    gallery_count: number | null;
    social_links: string;
    created_at: string;
    updated_at: string;
    idols: Idol[];
    events: Event[];
    merchandise: Merchandise[];
}

export interface Merchandise {
    id: number;
    name: string;
    description: string;
    price: number;
    available: boolean;
    release_date: string;
    created_at: string;
    updated_at: string;
}

export interface Event {
    id: number;
    name: string;
    location: {
        lat: number;
        lng: number;
    } | null;
    date: string;
    type: EventTypes;
    venue: string;
    created_at: string;
    updated_at: string;
}


export interface Article {
    id: number;
    title: string;
    description: string;
    slug: string;
    date: string;
    type: ArticleTypes;
    created_at: string;
    updated_at: string;
}

export interface Media {
    url: string;
    type: MediaTypes;
    date: string | null;
}

export interface Follower {
    id: number;
    user_id: number;
    followable_id: number;
    followable_type: string;
    created_at: string;
    updated_at: string;
}

export interface Like {
    id: number;
    user_id: number;
    likeable_id: number;
    likeable_type: string;
    created_at: string;
    updated_at: string;
}

export interface RecentlyViewedItem {
    id: number;
    type: string;
    name: string;
    cover_photo: Media;
    group?: string;
    slug: string;
}

export interface Award {
    id: number;
    title: string;
    from: string;
    description?: string;
    type: AwardTypes;
}

export enum EventTypes {
    CONCERT = 'concert',
    SIGNING = 'signing',
    FANMEETING = 'fan meeting',
    OTHER = 'other',
}

export enum AwardTypes {
    DAESANG = 'daesang',
    BONSANG = 'bonsang',
    ROOKIE = 'rookie',
    OTHER = 'other',
    POPULARITY = 'popularity',
    SPECIAL = 'special',
}

export enum MediaTypes {
    CONCEPT = 'concept',
    PHOTOSHOOT = 'photoshoot',
    BEHIND = 'behind',
    EVENT = 'event',
}

export enum GroupTypes {
    GIRL_GROUP = 'Girl Group',
    BOY_GROUP = 'Boy Group',
}

export enum ArticleTypes {
    NEWS = 'news',
    INTERVIEW = 'interview',
    REVIEW = 'review',
    FEATURE = 'feature',
    EVENTS = 'events',
    OTHER = 'other',
}

export interface PaginatedResponse<T> {
    data: T;
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
    meta: {
        next_cursor: number;
        path: string;
        per_page: number;
        prev_cursor: number;
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
    cover_photo: string;
    rating: number;
    spotify_id: string;
    gallery: string[];
    followers: number;
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
    slug: string;
    cover_photo: string;
    spotify_id: string;
    debute_date: string;
    idols_count: number | null;
    events_count: number | null;
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
    venue: string;
    created_at: string;
    updated_at: string;
}

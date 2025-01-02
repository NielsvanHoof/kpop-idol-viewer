export interface BaseModel {
    id: number;
    created_at: string;
    updated_at: string;
}

export interface User extends BaseModel {
    name: string;
    email: string;
    profile_photo: string;
}

export interface Idol extends BaseModel {
    name: string;
    slug: string;
    cover_photo: {
        url: string;
        type: string;
    };
    group?: Group;
    likes_count: number;
    followers_count: number;
}

export interface Group extends BaseModel {
    name: string;
    slug: string;
    cover_photo: {
        url: string;
        type: string;
    };
    idols?: Idol[];
    likes_count: number;
    followers_count: number;
}

export interface InteractableItem {
    id: number;
    type: 'idol' | 'group';
    name: string;
    model: Idol | Group;
    cover_photo: {
        url: string;
        type: string;
    };
    slug: string;
    likes_count: number;
    followers_count: number;
}

export interface Article extends BaseModel {
    title: string;
    content: string;
    date: string;
    type: string;
}

export interface RecentlyViewedItem {
    id: number;
    type: string;
    name: string;
    viewable: Idol | Group;
    cover_photo: {
        url: string;
        type: string;
    };
    slug: string;
}

export interface DashboardData {
    interactions: {
        liked: InteractableItem[];
        followed: InteractableItem[];
        merged: InteractableItem[];
    };
    stats: {
        totalLikes: number;
        totalFollowing: number;
        joinDate: string;
        activityScore: number;
    };
    recentlyViewed: RecentlyViewedItem[];
    timeline: Article[];
}

export interface Comment {
    id: number;
    content: string;
    user: User;
    likes: number;
    dislikes: number;
    created_at: string;
    updated_at: string;
}

export interface Award {
    id: number;
    title: string;
    from: string;
    description?: string;
    type: AwardTypes;
}

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    profile_photo: string;
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

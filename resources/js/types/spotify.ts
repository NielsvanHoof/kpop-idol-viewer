export interface SpotifyArtist {
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}

export interface SpotifyImage {
    height: number;
    width: number;
    url: string;
}

export interface SpotifyAlbum {
    album_group: string;
    album_type: string;
    artists: SpotifyArtist[];
    external_urls: {
        spotify: string;
    };
    href: string;
    id: string;
    images: SpotifyImage[];
    is_playable: boolean;
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
}

export interface SpotifyAlbumsResponse {
    href: string;
    items: SpotifyAlbum[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
}

export interface SpotifyArtistInformationResponse {
    external_urls: {
        spotify: string;
    };
    followers: {
        href: null;
        total: number;
    };
    genres: string[];
    href: string;
    id: string;
    images: SpotifyImage[];
    name: string;
    popularity: number;
    type: 'artist';
    uri: string;
}

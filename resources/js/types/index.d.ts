export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    profile_photo: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    filters?: {
        name: string;
        active: boolean;
        sort: string;
    };
    flash: {
        message: string;
    };
};

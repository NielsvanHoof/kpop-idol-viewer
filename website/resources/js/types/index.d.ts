import { User } from './models';

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
        status: string;
        message: string;
    };
};

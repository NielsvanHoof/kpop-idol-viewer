import { ArticleTypes } from '@/types/models';

export const NEWS_FILTERS: ArticleTypes[] = [
    ArticleTypes.NEWS,
    ArticleTypes.INTERVIEW,
    ArticleTypes.REVIEW,
    ArticleTypes.FEATURE,
    ArticleTypes.EVENTS,
    ArticleTypes.OTHER,
] as const;

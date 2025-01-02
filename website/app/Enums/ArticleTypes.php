<?php

namespace App\Enums;

enum ArticleTypes: string
{
    case FEATURE = 'feature';
    case INTERVIEW = 'interview';
    case NEWS = 'news';
    case REVIEW = 'review';
    case OTHER = 'other';
    case EVENTS = 'events';

    public static function values(): array
    {
        return array_map(fn (self $case) => $case->value, self::cases());
    }
}

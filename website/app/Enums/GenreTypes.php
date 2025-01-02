<?php

namespace App\Enums;

enum GenreTypes: string
{
    case KPOP = 'kpop';
    case JPOP = 'jpop';

    public static function values(): array
    {
        return array_map(fn (self $case) => $case->value, self::cases());
    }
}

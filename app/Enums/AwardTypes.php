<?php

namespace App\Enums;

enum AwardTypes: string
{
    case DAESANG = 'daesang';
    case BONSANG = 'bonsang';
    case ROOKIE = 'rookie';
    case POPULARITY = 'popularity';
    case SPECIAL = 'special';
    case OTHER = 'other';

    public static function values(): array
    {
        return array_map(fn (self $case) => $case->value, self::cases());
    }
}

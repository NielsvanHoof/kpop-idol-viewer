<?php

namespace App\Enums;

enum GroupTypes: string
{
    case GIRL_GROUP = 'girl_group';
    case BOY_GROUP = 'boy_group';

    public static function values(): array
    {
        return array_map(fn (self $case) => $case->value, self::cases());
    }
}

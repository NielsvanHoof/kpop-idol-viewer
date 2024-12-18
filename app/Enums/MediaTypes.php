<?php

namespace App\Enums;

enum MediaTypes: string
{
    case CONCEPT = 'concept';
    case BEHIND = 'behind';
    case EVENT = 'event';
    case PHOTOSHOOT = 'photoshoot';

    public static function values(): array
    {
        return array_map(fn (self $case) => $case->value, self::cases());
    }
}

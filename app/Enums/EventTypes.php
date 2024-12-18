<?php

namespace App\Enums;

enum EventTypes: string
{
    case CONCERT = 'concert';
    case SIGNING = 'signing';
    case FANMEETING = 'fan meeting';
    case OTHER = 'other';

    public static function values(): array
    {
        return array_map(fn (self $case) => $case->value, self::cases());
    }
}

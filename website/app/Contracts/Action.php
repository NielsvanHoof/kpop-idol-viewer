<?php

namespace App\Contracts;

/**
 * @template TInput
 * @template TOutput
 */
interface Action
{
    /**
     * @param  TInput  $args
     * @return TOutput
     */
    public function execute(mixed $args): mixed;
}

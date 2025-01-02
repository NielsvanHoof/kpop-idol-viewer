<?php

namespace App\Http\Integrations\Spotify\Requests;

use Saloon\Enums\Method;
use Saloon\Http\Request;

class GetArtistTopTracksRequest extends Request
{
    public function __construct(
        protected readonly string $artistId,
    ) {}

    /**
     * The HTTP method of the request
     */
    protected Method $method = Method::GET;

    /**
     * The endpoint for the request
     */
    public function resolveEndpoint(): string
    {
        return "/artists/{$this->artistId}/top-tracks";
    }
}

<?php

namespace App\Http\Integrations\Spotify\Requests;

use Saloon\Enums\Method;
use Saloon\Http\Request;

class GetArtistInformationRequest extends Request
{
    public function __construct(
        protected readonly string $artistId,
    ) {}

    protected Method $method = Method::GET;

    public function resolveEndpoint(): string
    {
        return "/artists/{$this->artistId}";
    }
}

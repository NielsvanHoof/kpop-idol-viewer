<?php

namespace App\Http\Integrations\Spotify\Requests;

use Saloon\Enums\Method;
use Saloon\Http\Request;

class GetArtistAlbumsRequest extends Request
{
    protected Method $method = Method::GET;

    public function __construct(
        protected readonly string $artistId,
        protected readonly ?int $limit = 50,
        protected readonly ?int $offset = 0
    ) {}

    public function resolveEndpoint(): string
    {
        return "/artists/{$this->artistId}/albums";
    }

    protected function defaultQuery(): array
    {
        return [
            'include_groups' => 'album,single', // Only include albums and singles
            'limit' => $this->limit,
            'offset' => $this->offset,
            'market' => 'US', // You might want to make this configurable
        ];
    }
}

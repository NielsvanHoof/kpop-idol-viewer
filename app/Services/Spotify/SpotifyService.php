<?php

namespace App\Services\Spotify;

use App\Http\Integrations\Spotify\SpotifyConnector;
use Saloon\Http\Response;

readonly class SpotifyService
{
    public function __construct(
        protected SpotifyConnector $spotifyIntegration
    ) {
        //
    }

    public function getArtistAlbums(string $artistId): Response
    {
        return $this->spotifyIntegration->getArtistAlbums($artistId);
    }

    public function getArtistInformation(string $artistId): Response
    {
        return $this->spotifyIntegration->getArtistInformation($artistId);
    }
}

<?php

namespace App\Http\Integrations\Spotify;

use App\Http\Integrations\Spotify\Requests\GetArtistAlbumsRequest;
use App\Http\Integrations\Spotify\Requests\GetArtistInformationRequest;
use App\Http\Integrations\Spotify\Requests\GetArtistTopTracksRequest;
use Saloon\Helpers\OAuth2\OAuthConfig;
use Saloon\Http\Connector;
use Saloon\Http\Response;
use Saloon\Traits\OAuth2\ClientCredentialsGrant;
use Saloon\Traits\Plugins\AcceptsJson;

class SpotifyConnector extends Connector
{
    use AcceptsJson;
    use ClientCredentialsGrant;

    /**
     * The Base URL of the API
     */
    public function resolveBaseUrl(): string
    {
        return 'https://api.spotify.com/v1';
    }

    protected function defaultOauthConfig(): OAuthConfig
    {
        return OAuthConfig::make()
            ->setClientId(config('spotify.client_id'))
            ->setClientSecret(config('spotify.client_secret'))
            ->setTokenEndpoint(config('spotify.token_endpoint'));
    }

    /**
     * Default headers for every request
     */
    protected function defaultHeaders(): array
    {
        return [
            'Accept' => 'application/json',
        ];
    }

    /**
     * Default HTTP client options
     */
    protected function defaultConfig(): array
    {
        return [];
    }

    /**
     * Fetch all albums for an artist (idol)
     */
    public function getArtistAlbums(string $artistId): Response
    {
        return $this->send(new GetArtistAlbumsRequest($artistId));
    }

    /**
     * Fetch all albums for an artist with pagination
     */
    public function getArtistAlbumsWithPagination(string $artistId, int $limit = 50, int $offset = 0): Response
    {
        return $this->send(new GetArtistAlbumsRequest($artistId, $limit, $offset));
    }

    public function getArtistInformation(string $artistId): Response
    {
        return $this->send(new GetArtistInformationRequest($artistId));
    }

    public function getArtistTopTracks(string $artistId): Response
    {
        return $this->send(new GetArtistTopTracksRequest($artistId));
    }
}

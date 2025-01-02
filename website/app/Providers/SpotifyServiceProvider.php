<?php

namespace App\Providers;

use App\Http\Integrations\Spotify\SpotifyConnector;
use App\Services\Spotify\SpotifyService;
use Illuminate\Support\ServiceProvider;

class SpotifyServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(SpotifyConnector::class, function () {
            $connector = new SpotifyConnector;

            $authenticator = $connector->getAccessToken();

            $connector->authenticate($authenticator);

            return $connector;
        });

        $this->app->singleton(SpotifyService::class, function ($app) {
            return new SpotifyService(
                $app->make(SpotifyConnector::class)
            );
        });
    }

    public function boot(): void
    {
        //
    }
}

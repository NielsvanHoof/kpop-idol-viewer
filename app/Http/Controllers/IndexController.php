<?php

namespace App\Http\Controllers;

use App\Http\Resources\IdolResource;
use App\Http\Resources\MerchandiseResource;
use App\Models\Idol;
use App\Models\Merchandise;
use Inertia\Inertia;

class IndexController extends Controller
{
    public function __invoke()
    {
        $spotlight = Idol::query()
            ->with(['group', 'followers'])
            ->inRandomOrder()
            ->limit(4)
            ->get();

        $merch = Merchandise::query()
            ->inRandomOrder()
            ->limit(4)
            ->get();

        return Inertia::render('Welcome', [
            'spotlight' => IdolResource::collection($spotlight),
            'merch' => MerchandiseResource::collection($merch),
        ]);
    }
}

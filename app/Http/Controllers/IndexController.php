<?php

namespace App\Http\Controllers;

use App\Http\Resources\IdolResource;
use App\Models\Idol;
use Inertia\Inertia;

class IndexController extends Controller
{
    public function __invoke()
    {
        $spotlight = Idol::query()
            ->with(['group'])
            ->inRandomOrder()
            ->limit(4)
            ->get();

        return Inertia::render('Welcome', [
            'spotlight' => IdolResource::collection($spotlight),
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Resources\IdolResource;
use App\Models\Idol;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IdolController extends Controller
{
    public function index(Request $request)
    {
        $idols = Idol::query()
            ->with(['group', 'followers'])
            ->paginate(
                perPage: $request->input('perPage', 10),
            );

        return Inertia::render('Idol/idol.overview', [
            'idols' => IdolResource::collection($idols),
        ]);
    }

    public function show(Idol $idol)
    {
        $idol->load(['merchandises', 'group', 'events', 'followers']);

        return Inertia::render('Idol/idol.profile', [
            'idol' => IdolResource::make($idol),
        ]);
    }
}

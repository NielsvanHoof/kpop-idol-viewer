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
            ->with(['group'])
            ->cursorPaginate(
                perPage: $request->input('perPage', 4),
            );

        return Inertia::render('Idol/overview', [
            'initialIdols' => IdolResource::collection($idols),
        ]);
    }

    public function show(Idol $idol)
    {
        $idol->load(['merchandises', 'group', 'events']);

        return Inertia::render('Idol/profile', [
            'idol' => IdolResource::make($idol),
        ]);
    }
}

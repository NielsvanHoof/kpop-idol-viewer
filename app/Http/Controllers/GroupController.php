<?php

namespace App\Http\Controllers;

use App\Http\Resources\GroupResource;
use App\Models\Group;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GroupController extends Controller
{
    public function index(Request $request)
    {
        $groups = Group::query()
            ->withCount(['idols', 'events'])
            ->cursorPaginate(
                perPage: $request->input('perPage', 10),
            );

        return Inertia::render('Group/overview', [
            'initialGroups' => GroupResource::collection($groups),
        ]);
    }
}

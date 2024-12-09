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
            ->paginate(
                perPage: $request->input('perPage', 10),
            );

        return Inertia::render('Group/group.overview', [
            'groups' => GroupResource::collection($groups),
        ]);
    }

    public function show(Group $group)
    {
        $group->load(['idols.followers', 'events']);

        return Inertia::render('Group/group.profile', [
            'group' => GroupResource::make($group),
        ]);
    }
}

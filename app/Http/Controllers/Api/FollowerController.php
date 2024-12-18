<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Group;
use App\Models\Idol;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FollowerController extends Controller
{
    public function follow(Request $request)
    {
        $user = Auth::user();

        switch ($request->input('type')) {
            case 'idol':
                $idol = Idol::query()->find($request->input('idol_id'));

                $idol->followers()->create([
                    'user_id' => $user->id,
                ]);
                break;
            case 'group':
                $group = Group::query()->find($request->input('group_id'));

                $group->followers()->create([
                    'user_id' => $user->id,
                ]);
                break;
        }
    }

    public function unfollow(Request $request)
    {
        $user = Auth::user();

        switch ($request->input('type')) {
            case 'idol':
                $idol = Idol::query()->find($request->input('idol_id'));
                $idol->followers()->where([
                    'user_id' => $user->id,
                ])->delete();
                break;

            case 'group':
                $group = Group::query()->find($request->input('group_id'));
                $group->followers()->where([
                    'user_id' => $user->id,
                ])->delete();
                break;
        }
    }
}

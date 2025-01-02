<?php

namespace App\Http\Controllers\Api;

use App\Events\InvalidateDashBoardCacheEvent;
use App\Http\Controllers\Controller;
use App\Http\Requests\FollowRequest;
use App\Http\Requests\UnFollowRequest;
use App\Models\Group;
use App\Models\Idol;
use Illuminate\Support\Facades\Auth;

class FollowerController extends Controller
{
    public function follow(FollowRequest $request)
    {
        if (! Auth::check()) {
            abort(401);
        }

        $user = Auth::user();

        switch ($request->input('type')) {
            case 'idol':
                $idol = Idol::query()->find($request->input('id'));

                $idol->followers()->create([
                    'user_id' => $user->id,
                ]);
                break;
            case 'group':
                $group = Group::query()->find($request->input('id'));

                $group->followers()->create([
                    'user_id' => $user->id,
                ]);
                break;
        }

        InvalidateDashBoardCacheEvent::dispatch($user);

        return back();
    }

    public function unfollow(UnFollowRequest $request)
    {
        if (! Auth::check()) {
            abort(401);
        }

        $request->validate([
            'type' => ['required', 'string', 'in:idol,group'],
            'id' => ['required', 'integer'],
        ]);

        $user = Auth::user();

        switch ($request->input('type')) {
            case 'idol':
                $idol = Idol::query()->find($request->input('id'));
                $idol->followers()->where([
                    'user_id' => $user->id,
                ])->delete();
                break;

            case 'group':
                $group = Group::query()->find($request->input('id'));
                $group->followers()->where([
                    'user_id' => $user->id,
                ])->delete();
                break;
        }

        InvalidateDashBoardCacheEvent::dispatch($user);

        return back();
    }
}

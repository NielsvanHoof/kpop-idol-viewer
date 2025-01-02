<?php

namespace App\Http\Controllers\Api;

use App\Events\InvalidateDashBoardCacheEvent;
use App\Http\Controllers\Controller;
use App\Http\Requests\LikeRequest;
use App\Http\Requests\UnLikeRequest;
use App\Models\Group;
use App\Models\Idol;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    public function like(LikeRequest $request)
    {
        if (! Auth::check()) {
            abort(401);
        }

        $user = Auth::user();

        switch ($request->input('type')) {
            case 'idol':
                $idol = Idol::query()->find($request->input('id'));

                $idol->likes()->create([
                    'user_id' => $user->id,
                ]);

                break;
            case 'group':
                $group = Group::query()->find($request->input('id'));

                $group->likes()->create([
                    'user_id' => $user->id,
                ]);
                break;

        }

        InvalidateDashBoardCacheEvent::dispatch($user);

        return back();
    }

    public function unlike(UnLikeRequest $request)
    {
        if (! Auth::check()) {
            abort(401);
        }

        $user = Auth::user();

        switch ($request->input('type')) {
            case 'idol':
                $idol = Idol::query()->find($request->input('id'));

                $idol->likes()->where('user_id', $user->id)->delete();
                break;

            case 'group':
                $group = Group::query()->find($request->input('id'));
                $group->likes()->where('user_id', $user->id)->delete();
                break;
        }

        InvalidateDashBoardCacheEvent::dispatch($user);

        return back();
    }
}

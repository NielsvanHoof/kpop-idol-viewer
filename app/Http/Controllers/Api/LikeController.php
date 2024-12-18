<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Group;
use App\Models\Idol;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    public function like(Request $request)
    {
        $user = Auth::user();

        switch ($request->input('type')) {
            case 'idol':
                $idol = Idol::query()->find($request->input('idol_id'));

                $idol->likes()->create([
                    'user_id' => $user->id,
                ]);

                break;
            case 'group':
                $group = Group::query()->find($request->input('group_id'));

                $group->likes()->create([
                    'user_id' => $user->id,
                ]);
                break;

        }
    }

    public function unlike(Request $request)
    {
        $user = Auth::user();

        switch ($request->input('type')) {
            case 'idol':
                $idol = Idol::query()->find($request->input('idol_id'));
                $idol->likes()->where('user_id', $user->id)->delete();
                break;

            case 'group':
                $group = Group::query()->find($request->input('group_id'));
                $group->likes()->where('user_id', $user->id)->delete();
                break;
        }
    }
}

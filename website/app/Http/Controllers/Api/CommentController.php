<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCommentRequest;
use App\Models\Comment;
use App\Models\Group;
use App\Models\Idol;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class CommentController extends Controller
{
    public function store(StoreCommentRequest $request)
    {
        if (! Auth::check()) {
            abort(401);
        }

        $user = Auth::user();

        switch ($request->input('type')) {
            case 'idol':
                $idol = Idol::query()->findOrFail($request->input('id'));

                $idol->comments()->create([
                    'content' => $request->input('content'),
                    'user_id' => $user->id,
                ]);
                break;
            case 'group':
                $group = Group::query()->findOrFail($request->input('id'));

                $group->comments()->create([
                    'content' => $request->input('content'),
                    'user_id' => $user->id,
                ]);
                break;
        }

        return Redirect::back()->with('message', 'Your comment has been posted successfully');
    }

    public function destroy(Comment $comment)
    {
        if ($comment->user_id !== Auth::id()) {
            abort(403);
        }

        $comment->delete();

        return Redirect::back()->with('message', 'Your comment has been deleted successfully');
    }

    public function like(Comment $comment)
    {

        if ($comment->user_id === Auth::id()) {
            return Redirect::back()->with([
                'status' => 'error',
                'message' => 'You cannot like your own comment',
            ]);
        }

        $comment->increment('likes');

        return Redirect::back()->with([
            'status' => 'success',
            'message' => 'Your comment has been liked successfully',
        ]);
    }

    public function dislike(Comment $comment)
    {
        if ($comment->user_id === Auth::id()) {
            return Redirect::back()->with([
                'status' => 'error',
                'message' => 'You cannot dislike your own comment',
            ]);
        }

        $comment->increment('dislikes');

        return Redirect::back()->with([
            'status' => 'success',
            'message' => 'Your comment has been disliked successfully',
        ]);
    }
}

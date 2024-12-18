<?php

namespace App\Http\Controllers;

use App\Http\Resources\ArticleResource;
use App\Models\Article;
use Inertia\Inertia;
use Spatie\QueryBuilder\QueryBuilder;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $articles = QueryBuilder::for(Article::class)
            ->allowedFilters(['title', 'description'])
            ->allowedSorts(['title', 'created_at'])
            ->cursorPaginate(10);

        return Inertia::render('News/News.overview', [
            'articles' => fn () => Inertia::merge(ArticleResource::collection($articles)),
        ]);
    }

    public function show(Article $article)
    {
        //
    }
}

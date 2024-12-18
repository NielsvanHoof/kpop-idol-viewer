<?php

use App\Http\Controllers\Api\FollowerController;
use App\Http\Controllers\Api\LikeController;
use App\Http\Controllers\Api\NewsLetterController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\DashBoardController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\IdolController;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RecentlyViewedController;
use Illuminate\Support\Facades\Route;

Route::get('/', IndexController::class)->name('welcome');

Route::resource('idols', IdolController::class)->only(['index', 'show']);

Route::resource('groups', GroupController::class)->only(['index', 'show']);

Route::resource('articles', ArticleController::class)->only(['index', 'show']);

Route::post('/subscribe', [NewsLetterController::class, 'subscribe'])->name('subscribe');

Route::post('/follow', [FollowerController::class, 'follow'])->name('follow');
Route::post('/unfollow', [FollowerController::class, 'unfollow'])->name('unfollow');

Route::post('/like', [LikeController::class, 'like'])->name('like');
Route::post('/unlike', [LikeController::class, 'unlike'])->name('unlike');

Route::get('/dashboard', DashBoardController::class)->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/recently-viewed', RecentlyViewedController::class)->name('recently-viewed');
    Route::get('/favorites', FavoriteController::class)->name('favorites');
});

require __DIR__.'/auth.php';

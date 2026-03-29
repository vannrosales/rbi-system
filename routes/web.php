<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\InhabitantController;
use App\Http\Controllers\DashboardController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public Landing Page
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::prefix('inhabitants')->name('inhabitants.')->group(function () {
        Route::get('/', [InhabitantController::class, 'index'])->name('index');
        Route::get('/create', [InhabitantController::class, 'create'])->name('create');
        Route::post('/', [InhabitantController::class, 'store'])->name('store');
        Route::get('/{inhabitant}/edit', [InhabitantController::class, 'edit'])->name('edit');
        Route::patch('/{inhabitant}', [InhabitantController::class, 'update'])->name('update');
        Route::put('/{inhabitant}', [InhabitantController::class, 'update']);
        Route::delete('/{inhabitant}', [InhabitantController::class, 'destroy'])->name('destroy');
    });
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

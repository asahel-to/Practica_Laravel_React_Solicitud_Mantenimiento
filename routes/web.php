<?php

use App\Http\Controllers\Tecnico\SolicitudMantenimientoController as TecnicoSolicitudController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Solicitante\SolicitudMantenimientoController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {

    // ── SOLICITANTE ──────────────────────────────────────────────
    Route::get('solicitante/SolicitudMantenimiento/{id}/imprimir',
        [SolicitudMantenimientoController::class, 'imprimir'])
        ->name('solicitante.sol_mant.imprimir');

    Route::resource('solicitante/SolicitudMantenimiento', SolicitudMantenimientoController::class)
        ->names([
            'index'   => 'solicitante.sol_mant.index',
            'store'   => 'solicitante.sol_mant.store',
            'update'  => 'solicitante.sol_mant.update',
            'destroy' => 'solicitante.sol_mant.destroy',
            'show'    => 'solicitante.sol_mant.show',
        ]);

    // ── TECNICO ──────────────────────────────────────────────────
  Route::get('tecnico/SolicitudMantenimiento/{id}/imprimir',
    [TecnicoSolicitudController::class, 'imprimir'])
    ->name('tecnico.sol_mant.imprimir');

Route::put('tecnico/SolicitudMantenimiento/{id}/estado',
    [TecnicoSolicitudController::class, 'cambiarEstado'])
    ->name('tecnico.sol_mant.estado');

Route::put('tecnico/SolicitudMantenimiento/{id}/tomar',
    [TecnicoSolicitudController::class, 'tomar'])
    ->name('tecnico.sol_mant.tomar');



    Route::resource('tecnico/SolicitudMantenimiento', TecnicoSolicitudController::class)
        ->names([
            'index' => 'tecnico.sol_mant.index',
            'show'  => 'tecnico.sol_mant.show',
        ])
        ->only(['index', 'show']);


    Route::get('/SolicitudMantenimiento', function () {
        $user = Auth::user();
        if ($user->rol === 'tecnico') {
            return redirect()->route('tecnico.sol_mant.index');
        }
        return redirect()->route('solicitante.sol_mant.index');
    })->name('SolicitudMantenimiento');

});

require __DIR__.'/auth.php';
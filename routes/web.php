<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StockController;
use App\Http\Controllers\ProductController;


Route::get('/', [ProductController::class, 'index'])->name('index');

Route::get('/product/create', [ProductController::class, 'create'])->name('product.create');
Route::post('/product/store', [ProductController::class, 'store'])->name('product.store');
Route::get('/product/{id}/edit', [ProductController::class, 'edit'])->name('product.edit');
Route::patch('/product/{id}', [ProductController::class, 'update'])->name('product.update');


Route::get('/stock/{id}/edit', [StockController::class, 'edit'])->name('stock.edit');
Route::post('/stock/store/{id}', [StockController::class, 'store'])->name('stock.store');

require __DIR__.'/auth.php';

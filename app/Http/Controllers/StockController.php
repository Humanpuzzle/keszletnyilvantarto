<?php

namespace App\Http\Controllers;

use App\Models\Stock;
use Illuminate\Http\Request;
use Illuminate\Foundation\Application;

class StockController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $id)
    {
        $request->merge(['product_id' => $id]);
        $validated = $request->validate([
            'product_id' => 'required|integer',
            'amount' => 'required|integer',
            'move_type' => 'required|in:in,out' // Két típus: bevételezés vagy kiadás
        ]);
    
        // Az aktuális összes készlet kiszámítása
        $stock = Stock::where('product_id', $id)->get();

        $actual_stock = 0;
        foreach ($stock as $k => $s) {
            if ($s['move_type'] == "in" || $s['move_type'] == "start") {
                $actual_stock += $s['amount']; 
            }
            if ($s['move_type'] == "out") {
                $actual_stock -= $s['amount']; 
            }
        }
    
        // Kiadás esetén ellenőrizzük, hogy a készlet ne legyen negatív
        if ($validated['move_type'] == 'kiadas' && ($actual_stock + $validated['amount']) < 0) {
            return response()->json(['error' => 'A készlet nem lehet negatív.'], 400);
        }
        
        Stock::create($validated);
    
        return response()->json(['message' => 'Készlet sikeresen frissítve.']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Stock $stock)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $stock = Stock::where('product_id', $id)->get();

        $actual_stock = 0;
        foreach ($stock as $k => $s) {
            if ($s['move_type'] == "in" || $s['move_type'] == "start") {
                $actual_stock += $s['amount']; 
            }
            if ($s['move_type'] == "out") {
                $actual_stock -= $s['amount']; 
            }
        }
        return inertia("Stock/Edit", [
            'product_id' => $id,
            'stock' => $stock,
            'actual_stock' => $actual_stock,
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'csrfToken' => csrf_token() 
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Stock $stock)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Stock $stock)
    {
        //
    }
}

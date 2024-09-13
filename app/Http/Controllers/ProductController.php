<?php

namespace App\Http\Controllers;

use App\Models\Stock;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Foundation\Application;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $produts = Product::all();
        $products = Product::with('stock')->latest()->get();


        foreach ($products as $key => $p) {
            $products[$key]['description_short'] = $this->trimWords($p['description']);
            $products[$key]['entry_date'] = date("Y-m-d", strtotime($p['created_at']) );
            $actual_stock = 0;
            foreach ($p['stock'] as $k => $s) {
                if ($s['move_type'] == "in" || $s['move_type'] == "start") {
                    $actual_stock += $s['amount']; 
                }
                if ($s['move_type'] == "out") {
                    $actual_stock -= $s['amount']; 
                }
            }
            $products[$key]['actual_stock'] = $actual_stock;
        }


        return inertia("Index", [
            "products" => $products,
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION        
        ]);         
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Product/Create", [
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'csrfToken' => csrf_token() 
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'item_number'   => 'required|string|max:7',
            'name'          => 'required|string|max:255',
            'entry_value'   => 'required|integer|gt:0',
            'description'   => 'nullable|string',
            'condition'     => 'nullable|string',
        ], [
            'item_number.required'     => 'A cikkszám mező kitöltése kötelező.',
            'item_number.string'       => 'A cikkszám mező csak szöveget tartalmazhat.',
            'item_number.max'          => 'A cikkszám nem lehet hosszabb, mint 7 karakter.',
            'name.required'            => 'A megnevezés mező kitöltése kötelező.',
            'name.string'              => 'A megnevezés mező csak szöveget tartalmazhat.',
            'name.max'                 => 'A megnevezés nem lehet hosszabb, mint 255 karakter.',

            'entry_value.required'     => 'Az induló készlet mező kitöltése kötelező.',
            'entry_value.integer'      => 'Számot kell megadnod.',
            'entry_value.gt'           => 'A szám nem nem lehet negativ vagy nulla.',
        ]);

        // Remove entry_value if exists in request
        $entry_value = $validatedData['entry_value'];
        if ($request->has('entry_value')) {
            unset($validatedData['entry_value']);
        }

        $new_product = Product::create($validatedData);
        $id = $new_product->id;
        Stock::create([
            'product_id'    => $id,
            'amount'        => $entry_value,
            'move_type'          => 'start'
        ]);        

        return response()->json(['message' => 'Form submitted successfully!']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $item = Product::find($id);

        return inertia("Product/Edit", [
            'item' => $item,
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'csrfToken' => csrf_token() 
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'item_number'   => 'required|string|max:7',
            'name'          => 'required|string|max:255',
            'description'   => 'nullable|string',
            'condition'     => 'nullable|string',
        ], [
            'item_number.required'     => 'A cikkszám mező kitöltése kötelező.',
            'item_number.string'       => 'A cikkszám mező csak szöveget tartalmazhat.',
            'item_number.max'          => 'A cikkszám nem lehet hosszabb, mint 7 karakter.',
            'name.required'            => 'A megnevezés mező kitöltése kötelező.',
            'name.string'              => 'A megnevezés mező csak szöveget tartalmazhat.',
            'name.max'                 => 'A megnevezés nem lehet hosszabb, mint 255 karakter.'
        ]);

        $product = Product::findOrFail($id);
        $product->update($validatedData);

        return response()->json(['message' => 'Form updated successfully!']);      
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }


    public function trimWords($text, $limit = 3) {
        // $limit = rand(2,8);
        // Split the text into an array of words
        $words = explode(' ', $text);
    
        // If the number of words is less than or equal to the limit, return the original text
        if (count($words) <= $limit) {
            return $text;
        }
    
        // Slice the array to include only the first $limit words
        $trimmedWords = array_slice($words, 0, $limit);
    
        // Join the words back into a string and append "..."
        return implode(' ', $trimmedWords) . '...';
    }        
}

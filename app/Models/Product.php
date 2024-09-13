<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'item_number',
        'name',
        'description', 
        'condition'
    ];    

    public function stock()
    {
        return $this->hasMany(Stock::class, 'product_id');
    } 
   
}

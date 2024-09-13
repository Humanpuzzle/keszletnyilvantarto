<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $table = 'stock';
    
    protected $fillable = ['product_id', 'amount', 'move_type'];  
    
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }    
}

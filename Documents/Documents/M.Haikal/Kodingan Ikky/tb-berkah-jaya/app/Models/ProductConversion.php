<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductConversion extends Model
{
    protected $fillable = ['product_id', 'unit_name', 'value_in_base_unit'];

    protected $casts = [
        'value_in_base_unit' => 'decimal:2'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PosCashDrawer extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'date',
        'opening_cash',
        'closing_cash',
    ];

    protected $casts = [
        'date' => 'date',
        'opening_cash' => 'decimal:2',
        'closing_cash' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

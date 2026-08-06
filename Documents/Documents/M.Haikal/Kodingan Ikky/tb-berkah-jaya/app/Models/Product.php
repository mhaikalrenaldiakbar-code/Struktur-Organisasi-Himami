<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'code',
        'name',
        'category_id',
        'base_unit',
        'purchase_price',
        'selling_price',
        'stock',
        'min_stock'
    ];

    protected $casts = [
        'purchase_price' => 'decimal:2',
        'selling_price' => 'decimal:2',
        'stock' => 'decimal:2',
        'min_stock' => 'decimal:2',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function conversions()
    {
        return $this->hasMany(ProductConversion::class);
    }

    public function mutations()
    {
        return $this->hasMany(StockMutation::class);
    }

    public function transactionDetails()
    {
        return $this->hasMany(TransactionDetail::class);
    }

    // Smart Stock Alert Badges
    public function getStockBadgeAttribute(): string
    {
        $stock = $this->stock;
        $min = $this->min_stock;

        if ($stock <= 0) {
            return '<span class="badge bg-danger">Habis (0)</span>';
        } elseif ($stock <= ($min / 2)) {
            return '<span class="badge bg-danger">Kritis</span>';
        } elseif ($stock <= $min) {
            return '<span class="badge bg-warning text-dark">Menipis</span>';
        } else {
            return '<span class="badge bg-success">Aman</span>';
        }
    }

    // Weekly Sales calculation: sum of quantity sold (converted to base unit) over past 7 days
    public function getWeeklySalesAttribute(): float
    {
        return (float) $this->transactionDetails()
            ->whereHas('transaction', function ($query) {
                $query->where('created_at', '>=', now()->subDays(7));
            })
            ->sum(\DB::raw('quantity * conversion_factor'));
    }

    // Prediksi estimasi habis stok berdasarkan tren penjualan mingguan
    public function getStockPredictionAttribute(): string
    {
        $weeklySales = $this->weekly_sales;
        if ($weeklySales <= 0) {
            return 'Stabil (Tidak ada penjualan)';
        }

        $dailyAverage = $weeklySales / 7;
        $daysLeft = $this->stock / $dailyAverage;

        if ($daysLeft <= 0) {
            return 'Sudah Habis';
        } elseif ($daysLeft < 1) {
            return 'Habis < 24 jam';
        } else {
            return '~' . round($daysLeft) . ' hari';
        }
    }
}

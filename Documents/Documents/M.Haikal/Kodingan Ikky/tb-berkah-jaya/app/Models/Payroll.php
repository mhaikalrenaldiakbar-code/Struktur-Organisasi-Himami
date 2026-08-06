<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payroll extends Model
{
    protected $fillable = [
        'user_id',
        'month',
        'week_number',
        'basic_salary',
        'total_allowance',
        'allowance',
        'bonus',
        'deductions_alpha',
        'kasbon_deduction',
        'deductions_kasbon',
        'net_salary',
        'status'
    ];

    protected $casts = [
        'week_number' => 'integer',
        'basic_salary' => 'decimal:2',
        'total_allowance' => 'decimal:2',
        'allowance' => 'decimal:2',
        'bonus' => 'decimal:2',
        'deductions_alpha' => 'decimal:2',
        'kasbon_deduction' => 'decimal:2',
        'deductions_kasbon' => 'decimal:2',
        'net_salary' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

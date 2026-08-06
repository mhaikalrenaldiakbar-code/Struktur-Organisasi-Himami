<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'phone',
        'basic_salary',
        'allowance',
        'kasbon_limit',
        'photo',
        'qr_code_token',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'basic_salary' => 'decimal:2',
            'allowance' => 'decimal:2',
            'kasbon_limit' => 'decimal:2',
        ];
    }

    public function getAttendanceTokenAttribute()
    {
        return $this->attributes['qr_code_token'] ?? null;
    }

    public function getDailyAllowanceAttribute()
    {
        return $this->attributes['allowance'] ?? 0;
    }

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function isPegawai(): bool
    {
        return $this->role === 'pegawai';
    }

    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }

    public function kasbons()
    {
        return $this->hasMany(Kasbon::class);
    }

    public function payrolls()
    {
        return $this->hasMany(Payroll::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Inhabitant extends Model
{
    use HasFactory;

    protected $fillable = [
        // Geographic Info
        'region',
        'province',
        'city_municipality',
        'barangay',
        'street_name',

        // Personal Info
        'last_name',
        'first_name',
        'middle_name',
        'extension_name',
        'place_of_birth',
        'date_of_birth',
        'age',
        'sex',
        'civil_status',
        'citizenship',
        'occupation',
        'special_indication',
        'relationship_to_head',
    ];

    protected $casts = [
        'date_of_birth' => 'date',
    ];

    public function getFullNameAttribute(): string
    {
        return "{$this->last_name}, {$this->first_name} " . ($this->middle_name ? substr($this->middle_name, 0, 1) . '.' : '');
    }

    public function calculateAge(): int
    {
        return Carbon::parse($this->date_of_birth)->age;
    }
}

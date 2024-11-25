<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cities extends Model
{
    protected $table = 'cities';
    protected $fillable = [
        'name',
        'postal_code',
        'country',
        'region',
        'latitude',
        'longitude',
        'timezone_id',
        'utc_offset'
    ];

    public function weatherForecasts()
    {
        return $this->hasMany(WeatherForecasts::class, 'city_id', 'id');
    }
    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}

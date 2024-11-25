<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WeatherForecasts extends Model
{
    use HasFactory;

    /**
     * A tabela associada ao modelo.
     *
     * @var string
     */
    protected $table = 'weather_forecasts';

    /**
     * Os atributos que podem ser preenchidos em massa.
     *
     * @var array
     */
    protected $fillable = [
        'city_id',
        'temperature',
        'feelslike',
        'humidity',
        'cloudcover',
        'wind_speed',
        'wind_degree',
        'wind_dir',
        'pressure',
        'precip',
        'uv_index',
        'visibility',
        'weather_description',
        'weather_icon',
        'is_day',
        'date_of_forecast',
        'is_favorite',
    ];

    /**
     * Os tipos de atributos do modelo.
     *
     * @var array
     */
    protected $casts = [
        'is_day' => 'boolean',
        'date_of_forecast' => 'datetime',
    ];

    /**
     * Relacionamento com a model `City`.
     */
    public function city()
    {
        return $this->belongsTo(Cities::class, 'city_id');
    }

    /**
     * Relacionamento com a model `User`.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}

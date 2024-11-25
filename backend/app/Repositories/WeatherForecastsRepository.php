<?php

namespace App\Repositories;

use App\Models\Cities;
use App\Models\WeatherForecasts;
use App\Services\WeatherService;
use Carbon\Carbon;

class WeatherForecastsRepository
{
    private $weatherForecasts;

    public function __construct(WeatherForecasts $weatherForecasts)
    {
        $this->weatherForecasts = $weatherForecasts;
    }

    public function getWeatherForecasts(array $filters, int $perPage = 10)
    {
        $query = $this->weatherForecasts->with('city');

        if (!empty($filters['cep'])) {
            $query->whereHas('city', function ($q) use ($filters) {
                $q->where('postal_code', 'LIKE', "%{$filters['cep']}%");
            });
        }

        if (!empty($filters['cidade'])) {
            $query->whereHas('city', function ($q) use ($filters) {
                $q->where('name', 'LIKE', "%{$filters['cidade']}%");
            });
        }

        if (!empty($filters['mes'])) {
            $query->whereMonth('date_of_forecast', $filters['mes']);
        }

        if (!empty($filters['ano'])) {
            $query->whereYear('date_of_forecast', $filters['ano']);
        }

        if (!empty($filters['periodoInicio'])) {
            $query->where('date_of_forecast', '>=', Carbon::parse($filters['periodoInicio'])->startOfDay());;
        }

        if (!empty($filters['periodoInicio']) && !empty($filters['periodoFim'])) {
            $query->whereBetween('date_of_forecast', [
                Carbon::parse($filters['periodoInicio'])->startOfDay(),
                Carbon::parse($filters['periodoFim'])->endOfDay()
            ]);
        }        

        return $query->paginate($perPage);
    }

    public function fetchAndSaveForecast(array $data, WeatherService $weatherService)
    {
        $cityName = $data['query'];

        $weatherData = $weatherService->getWeatherByCity($cityName);

        $isFavorite = isset($data['is_favorite']) ? (bool) $data['is_favorite'] : false;

        $postalCode = $data['postal_code'] ?? null;
    
        $forecast = $this->saveWeatherForecast(
        [
            'city' => $cityName, 
            'is_favorite' => $isFavorite,
            'postal_code' => $postalCode
        ], $weatherData);

        $forecast->load('city');

        return $forecast;
    }

    public function saveWeatherForecast(array $data, array $weatherData)
    {
        $city = Cities::firstOrCreate(
            ['name' => $weatherData['location']['name'], 'country' => $weatherData['location']['country']],
            [
                'region' => $weatherData['location']['region'],
                'latitude' => $weatherData['location']['lat'],
                'longitude' => $weatherData['location']['lon'],
                'timezone_id' => $weatherData['location']['timezone_id'],
                'utc_offset' => $weatherData['location']['utc_offset'],
                'postal_code' => $data['postal_code'], 
            ]
        );

        if (isset($data['is_favorite']) && $data['is_favorite'] === true) {
            return $this->createWeatherForecast($data, $city, $weatherData);
        }

        $forecast = $this->weatherForecasts->where('city_id', $city->id)
            ->where('date_of_forecast', now()->format('Y-m-d'))
            ->with('city')
            ->first();

        return $forecast ?? $this->createWeatherForecast($data, $city, $weatherData);
    }

    private function createWeatherForecast(array $data, Cities $city, array $weatherData)
    {
        return $this->weatherForecasts->create([
            'city_id' => $city->id,
            'temperature' => $weatherData['current']['temperature'],
            'feelslike' => $weatherData['current']['feelslike'],
            'humidity' => $weatherData['current']['humidity'],
            'cloudcover' => $weatherData['current']['cloudcover'],
            'wind_speed' => $weatherData['current']['wind_speed'],
            'wind_degree' => $weatherData['current']['wind_degree'],
            'wind_dir' => $weatherData['current']['wind_dir'],
            'pressure' => $weatherData['current']['pressure'],
            'precip' => $weatherData['current']['precip'],
            'uv_index' => $weatherData['current']['uv_index'],
            'visibility' => $weatherData['current']['visibility'],
            'weather_description' => $weatherData['current']['weather_descriptions'][0] ?? 'No description',
            'weather_icon' => $weatherData['current']['weather_icons'][0] ?? null,
            'is_day' => $weatherData['current']['is_day'] === 'yes',
            'date_of_forecast' => now(),
            'is_favorite' => $data['is_favorite'] ?? false,
        ]);
    }
}

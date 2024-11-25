<?php

namespace App\Repositories;

use App\Models\ForecastComparisons;
use App\Models\WeatherForecasts;

class ForecastComparisonRepository
{
    private $forecastComparison;

    public function __construct(ForecastComparisons $forecastComparison)
    {
        $this->forecastComparison = $forecastComparison;
    }

    public function all(array $filters)
    {
        $query = $this->forecastComparison->query();

        return $query->paginate($filters['per_page'] ?? 15);
    }

    public function store(array $data)
    {
        return $this->forecastComparison->create([
            'first_city_id' => $data['first_city_id'],
            'second_city_id' => $data['second_city_id']
        ]);
    }

    public function compareAndStore(int $city1Id, int $city2Id)
    {
        $city1Forecast = $this->getLatestForecastByCity($city1Id);
        $city2Forecast = $this->getLatestForecastByCity($city2Id);

        if (!$city1Forecast || !$city2Forecast) {
            throw new \Exception('Previsão não encontrada para uma das cidades.');
        }

        $comparison = $this->forecastComparison->create([
            'first_city_id' => $city1Id,
            'second_city_id' => $city2Id,
        ]);

        return $comparison;
    }

    private function getLatestForecastByCity($cityId)
    {
        return WeatherForecasts::where('city_id', $cityId)->latest('date_of_forecast')->first();
    }
}

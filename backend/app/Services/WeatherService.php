<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class WeatherService
{
    private $apiKey;

    public function __construct()
    {
        $this->apiKey = config('services.weatherstack.key');
    }

    public function getWeatherByCity($city)
    {
        $response = Http::get('http://api.weatherstack.com/current', [
            'access_key' => $this->apiKey,
            'query' => $city,
        ]);


        if ($response->failed() || isset($response['error'])) {
            throw new \Exception('Erro ao acessar a API Weatherstack.');
        }

        return $response->json();
    }
}

<?php

use App\Http\Controllers\CitiesController;
use App\Http\Controllers\ForecastComparisonController;
use App\Http\Controllers\WeatherForecastController;
use Illuminate\Support\Facades\Route;

Route::prefix('/v1')->group(function () {
    Route::post('cities/cep', [CitiesController::class, 'fetchCityByCep']);

    Route::post('weather', [WeatherForecastController::class, 'fetchWeather']); 
    Route::get('weather-history', [WeatherForecastController::class, 'index']); 

    Route::post('forecast-comparisons/compare', [ForecastComparisonController::class, 'compare']);
});

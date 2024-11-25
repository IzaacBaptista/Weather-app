<?php

namespace App\Http\Controllers;

use App\Repositories\WeatherForecastsRepository;
use Illuminate\Http\Request;
use App\Services\WeatherService;

class WeatherForecastController extends Controller
{
    private $weatherForecastsRepository;

    public function __construct(WeatherForecastsRepository $weatherForecastsRepository)
    {
        $this->weatherForecastsRepository = $weatherForecastsRepository;
    }

    public function index(Request $request)
    {
        try {
            $filters = [
                'cep' => $request->input('cep'),
                'cidade' => $request->input('cidade'),
                'mes' => $request->input('mes'),
                'ano' => $request->input('ano'),
                'periodoInicio' => $request->input('periodoInicio'),
                'periodoFim' => $request->input('periodoFim'),
                'isFavorite' => $request->input('isFavorite')
            ];

            $perPage = $request->input('per_page', 10); 
            $forecasts = $this->weatherForecastsRepository->getWeatherForecasts($filters, $perPage);

            return response()->json($forecasts, 200);
        } catch (\Throwable $error) {
            return response()->json([
                'message' => 'Erro ao carregar histórico.',
                'error' => $error->getMessage(),
            ], 500);
        }
    }

    public function fetchWeather(Request $request, WeatherService $weatherService)
    {
        try {
            $data = $request->validate([
                'query' => 'required|string',
                'postal_code' => 'sometimes|string|max:10',
                'is_favorite' => 'sometimes|boolean'
            ]);

            $forecast = $this->weatherForecastsRepository->fetchAndSaveForecast($data, $weatherService);

            return response()->json($forecast, 201);
        } catch (\Exception $error) {
            return response()->json([
                'message' => 'Erro ao buscar ou salvar a previsão do tempo.',
                'error' => $error->getMessage(),
            ], 500);
        }
    }
}

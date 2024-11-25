<?php

namespace App\Http\Controllers;

use App\Repositories\CitiesRepository;
use Illuminate\Http\Request;
use Throwable;
use App\Exceptions\ApiExceptionHandler;
use Illuminate\Support\Facades\Http;

class CitiesController extends Controller
{
    private $citiesRepository;

    public function __construct(CitiesRepository $citiesRepository)
    {
        $this->citiesRepository = $citiesRepository;
    }

    public function index(Request $request)
    {
        try {
            return $this->citiesRepository->all(
                $request->validated(),
                $request->query('per_page'),
                $request->query('pesquisar'),
                $request->query('ordenar_por'),
                $request->query('ordem')
            );
        } catch (Throwable $erro) {
            return ApiExceptionHandler::handle($erro);
        }
    }

    public function fetchCityByCep(Request $request)
    {
        $validated = $request->validate(['cep' => 'required|string']);

        $response = Http::get("https://viacep.com.br/ws/{$validated['cep']}/json/");
        if ($response->failed() || isset($response['erro'])) {
            return response()->json(['error' => 'CEP inválido ou erro na API.'], 500);
        }
        $data = $response->json();

        if (!isset($data['localidade']) || !isset($data['uf'])) {
            return response()->json(['error' => 'Dados incompletos retornados pela API.'], 400);
        }

        return response()->json(['city' => $data['localidade'], 'state' => $data['uf']]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Repositories\ForecastComparisonRepository;
use Illuminate\Http\Request;

class ForecastComparisonController extends Controller
{
    private $forecastComparisonRepository;

    public function __construct(ForecastComparisonRepository $forecastComparisonRepository)
    {
        $this->forecastComparisonRepository = $forecastComparisonRepository;
    }

    public function index(Request $request)
    {
        return response()->json($this->forecastComparisonRepository->all($request->all()), 200);
    }

    public function store(Request $request)
    {
        $comparison = $this->forecastComparisonRepository->store($request->validated());

        return response()->json($comparison, 201);
    }

    public function compare(Request $request)
    {
        $validated = $request->validate([
            'city1_id' => 'required|exists:cities,id',
            'city2_id' => 'required|exists:cities,id',
        ]);

        try {
            $comparison = $this->forecastComparisonRepository->compareAndStore($validated['city1_id'], $validated['city2_id']);
            return response()->json($comparison, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}

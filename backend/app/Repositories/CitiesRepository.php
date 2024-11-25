<?php

namespace App\Repositories;

use App\Models\Cities;

class CitiesRepository
{
    private $cities;

    public function __construct(Cities $cities)
    {
        $this->cities = $cities;
    }

    public function all(
        array $data,
        int $perPage,
        string|null $pesquisar,
        string|null $ordenarPor,
        string|null $ordem
    )
    {
        if (!isset($ordem)) {
            $ordem = 'DESC';
        }

        return Cities::with('weatherForecasts')->when(!empty($pesquisar), function ($query, $pesquisar) {
            $query->where('name', 'LIKE', "%$pesquisar%")
                ->orWhere('country', 'LIKE', "%$pesquisar%")
                ->orWhere('region', 'LIKE', "%$pesquisar%")
                ->orWhere('latitude', 'LIKE', "%$pesquisar%")
                ->orWhere('longitude', 'LIKE', "%$pesquisar%")
                ->orWhere('timezone_id', 'LIKE', "%$pesquisar%")
                ->orWhere('utc_offset', 'LIKE', "%$pesquisar%");
        })
        ->when(isset($ordenarPor), function ($query, $ordenarPor) use ($ordem) {
            $query->orderBy($ordenarPor, $ordem);
        })
        ->paginate($perPage);
    }
}

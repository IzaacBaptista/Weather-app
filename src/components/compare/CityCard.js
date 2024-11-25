import React, { useState } from "react";
import WeatherDetailsCard from "../WeatherDetailsCard";
import api from "../../services/api";

function CityCard({ city, setCity }) {
  const [searchCity, setSearchCity] = useState("");
  const [editing, setEditing] = useState(false);

  const fetchCityWeather = async () => {
    try {
      const response = await api.post("/weather", { query: searchCity });
      setCity(response.data);
      setEditing(false);
    } catch (error) {
      console.error(`Erro ao buscar dados de ${searchCity}:`, error);
    }
  };

  return (
    <div className="compare-card">
      {!city ? (
        editing ? (
          <div className="search-card">
            <input
              type="text"
              placeholder="Digite o nome da cidade"
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
            />
            <button onClick={fetchCityWeather}>Buscar</button>
          </div>
        ) : (
          <button onClick={() => setEditing(true)}>+</button>
        )
      ) : (
        <div className="city-card-container">
          <span className="remove-btn" onClick={() => setCity(null)}>&times;</span>
          <WeatherDetailsCard data={city} isExpanded />
        </div>
      )}
    </div>
  );
}

export default CityCard;

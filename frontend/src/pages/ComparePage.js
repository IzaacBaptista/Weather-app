import React, { useState, useEffect } from "react";
import CityCard from "../components/compare/CityCard";
import ComparisonCard from "../components/compare/ComparisonCard";
import api from "../services/api";
import "../assets/styles/ComparePage.css";

function ComparePage() {
  const [city1, setCity1] = useState(null);
  const [city2, setCity2] = useState(null);
  const [comparison, setComparison] = useState(null);

  useEffect(() => {
    const compareCities = async () => {
      if (city1?.city_id && city2?.city_id) {
        try {
          await api.post("/forecast-comparisons/compare", {
            city1_id: city1.city_id,
            city2_id: city2.city_id,
          });
          setComparison({
            temperatureDiff: Math.abs(city1.temperature - city2.temperature),
            feelsLikeDiff: Math.abs(city1.feelslike - city2.feelslike),
            humidityDiff: Math.abs(city1.humidity - city2.humidity),
            wind_speedDiff: Math.abs(city1.wind_speed - city2.wind_speed),
            pressureDiff: Math.abs(city1.pressure - city2.pressure),
            uv_indexDiff: Math.abs(city1.uv_index - city2.uv_index),
            conditionDiff:
              city1.weather_descriptions?.[0] !== city2.weather_descriptions?.[0],
          });
        } catch (error) {
          console.error("Erro ao salvar comparação no banco:", error);
        }
      } else {
        setComparison(null);
      }
    };

    compareCities();
  }, [city1, city2]);

  return (
    <div className="compare-page">
      <h1>Comparar Clima</h1>
      <p>Compare o clima e as condições meteorológicas entre duas cidades. Clique no "+" para buscar.</p>

      <div className="compare-container">
        <CityCard city={city1} setCity={setCity1} cardNumber={1} />
        <CityCard city={city2} setCity={setCity2} cardNumber={2} />
      </div>

      {comparison && <ComparisonCard comparison={comparison} />}
    </div>
  );
}

export default ComparePage;

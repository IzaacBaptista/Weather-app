import React from "react";
import "../../assets/styles/ComparisonCard.css";

function ComparisonCard({ comparison }) {
  return (
    <div className="comparison-card">
      <h3>Comparação</h3>
      <p>Diferença de Temperatura: {comparison.temperatureDiff}°C</p>
      <p>Diferença de Sensação Térmica: {comparison.feelsLikeDiff}°C</p>
      <p>Diferença de Umidade: {comparison.humidityDiff}%</p>
      <p>Diferença de Velocidade do Vento: {comparison.wind_speedDiff}km/h</p>
      <p>Diferença de Pressão: {comparison.pressureDiff}hPa</p>
      <p>Diferença de Índice UV: {comparison.uv_indexDiff}</p>
      {comparison.conditionDiff && <p>As condições climáticas são diferentes.</p>}
    </div>
  );
}

export default ComparisonCard;

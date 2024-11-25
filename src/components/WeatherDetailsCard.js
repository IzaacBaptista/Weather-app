import React from "react";

function WeatherDetailsCard({ data, isExpanded, onToggle }) {
  return (
    <div className="weather-details-card">
        <h3>{data.city?.name}, {data.city?.region || data.city?.country}</h3>
        <div className="card-header">
            <p><strong>CEP:</strong> {data.city?.postal_code || "N/A"}</p>
            <p><strong>Data:</strong> {new Date(data.date_of_forecast).toLocaleDateString()}</p>
            <p><strong>Temperatura:</strong> {data.temperature}°C</p>
        </div>

        {isExpanded && (
            <div className="card-content">
            <div className="card-grid">
                <div>
                <p><strong>Sensação Térmica:</strong> {data.feelslike}°C</p>
                <p><strong>Umidade:</strong> {data.humidity}%</p>
                <p><strong>Nuvens:</strong> {data.cloudcover}%</p>
                </div>
                <div>
                <p><strong>Velocidade do Vento:</strong> {data.wind_speed}km/h</p>
                <p><strong>Direção do Vento:</strong> {data.wind_dir}</p>
                <p><strong>Pressão:</strong> {data.pressure}hPa</p>
                </div>
                <div>
                <p><strong>Precipitação:</strong> {data.precip}mm</p>
                <p><strong>Índice UV:</strong> {data.uv_index}</p>
                <p><strong>Visibilidade:</strong> {data.visibility}km</p>
                </div>
            </div>
            <div className="additional-info">
                <p><strong>Descrição do Tempo:</strong> {data.weather_description}</p>
                <img src={data.weather_icon} alt="Ícone do tempo" />
                <p><strong>Dia:</strong> {data.is_day ? "Sim" : "Não"}</p>
                {data.is_favorite !== undefined && (
                <p><strong>Favorito:</strong> {data.is_favorite ? "Sim" : "Não"}</p>
                )}
            </div>
            </div>
        )}

        {onToggle && (
            <button className="toggle-button" onClick={onToggle}>
            {isExpanded ? "Ver menos" : "Ver mais"}
            </button>
        )}
    </div>
  );
}

export default WeatherDetailsCard;

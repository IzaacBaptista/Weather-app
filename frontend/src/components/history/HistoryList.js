import React, { useState } from "react";

function HistoryList({ historico }) {
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleCard = (index) => {
    setExpandedCard(index === expandedCard ? null : index);
  };

  return (
    <div className="historico-list">
      {historico.map((item, index) => (
        <div
          className={`historico-item ${expandedCard === index ? "expanded" : ""}`}
          key={index}
        >
          <div className="card-header">
            <p>
              <strong>Cidade:</strong> {item.city.name}, {item.city.region}
            </p>
            <p>
              <strong>CEP:</strong> {item.city.postal_code}
            </p>
            <p>
              <strong>Data:</strong> {new Date(item.date_of_forecast).toLocaleDateString()}
            </p>
            <p>
              <strong>Temperatura:</strong> {item.temperature}°C
            </p>
          </div>

          {expandedCard === index && (
            <div className="card-content">
              <div className="card-grid">
                <div>
                  <p><strong>Sensação Térmica:</strong> {item.feelslike}°C</p>
                  <p><strong>Umidade:</strong> {item.humidity}%</p>
                  <p><strong>Nuvens:</strong> {item.cloudcover}%</p>
                </div>
                <div>
                  <p><strong>Velocidade do Vento:</strong> {item.wind_speed}km/h</p>
                  <p><strong>Direção do Vento:</strong> {item.wind_dir}</p>
                  <p><strong>Pressão:</strong> {item.pressure}hPa</p>
                </div>
                <div>
                  <p><strong>Precipitação:</strong> {item.precip}mm</p>
                  <p><strong>Índice UV:</strong> {item.uv_index}</p>
                  <p><strong>Visibilidade:</strong> {item.visibility}km</p>
                </div>
              </div>
              <div className="additional-info">
                <p><strong>Descrição do Tempo:</strong> {item.weather_description}</p>
                <img src={item.weather_icon} alt="Ícone do tempo" />
                <p><strong>Dia:</strong> {item.is_day ? "Sim" : "Não"}</p>
                <p><strong>Favorito:</strong> {item.is_favorite ? "Sim" : "Não"}</p>
              </div>
            </div>
          )}

          <button className="toggle-button" onClick={() => toggleCard(index)}>
            {expandedCard === index ? "Ver menos" : "Ver mais"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default HistoryList;

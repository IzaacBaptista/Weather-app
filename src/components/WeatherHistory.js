import React, { useEffect, useState } from "react";
import api from "../services/api";

function WeatherHistory() {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get("/weather-forecasts");
        setHistory(response.data.data);
      } catch (err) {
        setError("Erro ao buscar histórico de previsões.");
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="mt-5">
      <h3>Histórico de Previsões</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      {history.length > 0 ? (
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Cidade</th>
              <th>Temperatura</th>
              <th>Umidade</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
                <tr key={index}>
                <td>{item.city.name}</td>
                <td>{item.temperature}°C</td>
                <td>{item.humidity}%</td>
                <td>{new Date(item.date_of_forecast).toLocaleString()}</td>
                </tr>
            ))}
            </tbody>
        </table>
      ) : (
        <p className="text-muted">Nenhum histórico disponível.</p>
      )}
    </div>
  );
}

export default WeatherHistory;

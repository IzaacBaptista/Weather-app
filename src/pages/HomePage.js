import React, { useState } from "react";
import api from "../services/api";
import WeatherCard from "../components/WeatherCard";
import CustomModal from "../components/CustomModal";
import Alert from "../components/Alert";

function HomePage() {
  const [cep, setCep] = useState("");
  const [cidade, setCidade] = useState("");
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const buscarCidadePorCep = async () => {
    try {
      const response = await api.post("/cities/cep", { cep });
      setCidade(response.data.city);
      setError("");
    } catch (err) {
      console.error("Erro ao buscar cidade pelo CEP:", err);
      setError("Erro ao buscar cidade pelo CEP. Verifique os dados e tente novamente.");
    }
  };

  const buscarClima = async () => {
    if (!cidade) {
      setError("Por favor, informe ao menos o nome da cidade.");
      return;
    }
    try {
      const response = await api.post("/weather", {
        query: cidade,
        postal_code: cep || undefined,
      });
      setForecast(response.data);
      setError("");
    } catch (err) {
      console.error("Erro ao buscar previsão do tempo:", err);
      setError("Erro ao buscar previsão. Verifique os dados e tente novamente.");
    }
  };

  const salvarComoFavorito = async () => {
    try {
      await api.post("/weather", { query: cidade, is_favorite: true });
      setModalIsOpen(true);
      setError("");
    } catch (err) {
      console.error("Erro ao salvar como favorito:", err);
      setError("Erro ao salvar como favorito. Verifique os dados e tente novamente.");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Previsão do Tempo</h1>

      {error && <Alert message={error} onClose={() => setError("")} />}

      <div className="row mt-4">
        <div className="col-md-6">
          <label htmlFor="cep">CEP:</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="cep"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              placeholder="Ex.: 60000-000"
            />
            <button onClick={buscarCidadePorCep}>Buscar Cidade</button>
          </div>
        </div>
        <br />

        <div className="col-md-6">
          <label htmlFor="cidade">Cidade:</label>
          <input
            type="text"
            className="form-control"
            id="cidade"
            value={cidade}
            onChange={(e) => {
              setCidade(e.target.value);
              if (e.target.value) setError("");
            }}
            placeholder="Ex.: Fortaleza"
          />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-12">
          <button className="btn w-100" onClick={buscarClima}>
            Buscar Previsão
          </button>
        </div>
      </div>

      {forecast && (
        <>
          <WeatherCard forecast={forecast} />
          <div className="row mt-3">
            <div className="col-md-12">
              <button className="btn btn-success w-100" onClick={salvarComoFavorito}>
                Salvar como Favorito
              </button>
            </div>
          </div>
        </>
      )}

      <CustomModal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        message="Previsão salva como favorita com sucesso!"
      />
    </div>
  );
}

export default HomePage;

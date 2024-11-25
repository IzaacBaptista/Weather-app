import React, { useEffect, useState, useCallback } from "react";
import api from "../services/api";
import Filters from "../components/history/Filters";
import HistoryList from "../components/history/HistoryList";
import Pagination from "../components/history/Pagination";
import Ordenar from "../components/history/Ordenar";
import "../assets/styles/HistoryPage.css";

function HistoryPage() {
  const [filters, setFilters] = useState({
    cep: "",
    cidade: "",
    mes: "",
    ano: "",
    periodoInicio: "",
    periodoFim: "",
    isFavorite: "",
  });
  const [ordenar, setOrdenar] = useState("");
  const [historico, setHistorico] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  const itensPorPagina = 10;

  const buscarHistorico = useCallback(async () => {
    setCarregando(true);
    try {
      const response = await api.get("/weather-history", {
        params: { 
          ...filters, 
          page: paginaAtual, 
          per_page: itensPorPagina 
        },
      });

      setHistorico(response.data.data || []);
      setTotalPaginas(response.data.last_page || 1);
    } catch (err) {
      console.error("Erro ao buscar histórico:", err);
    } finally {
      setCarregando(false);
    }
  }, [filters, paginaAtual]);

  useEffect(() => {
    buscarHistorico();
  }, [buscarHistorico]);

  const historicoOrdenado = () => {
    if (ordenar === "asc") {
      return [...historico].sort(
        (a, b) => new Date(a.date_of_forecast) - new Date(b.date_of_forecast)
      );
    } else if (ordenar === "desc") {
      return [...historico].sort(
        (a, b) => new Date(b.date_of_forecast) - new Date(a.date_of_forecast)
      );
    }
    return historico;
  };

  return (
    <div className="history-page">
      <h1>Histórico de Consultas</h1>

      <Filters filters={filters} setFilters={setFilters} buscarHistorico={buscarHistorico} />

      {historico.length > 0 && (
        <Ordenar ordenar={ordenar} setOrdenar={setOrdenar} />
      )}

      {carregando ? (
        <p>Carregando...</p>
      ) : historico.length > 0 ? (
        <>
          <HistoryList historico={historicoOrdenado()} />
          <Pagination
            paginaAtual={paginaAtual}
            totalPaginas={totalPaginas}
            setPaginaAtual={setPaginaAtual}
          />
        </>
      ) : (
        <p>Nenhum resultado encontrado.</p>
      )}
    </div>
  );
}

export default HistoryPage;

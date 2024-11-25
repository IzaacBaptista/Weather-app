import React from "react";
import "../../assets/styles/Filters.css";

function Filters({ filters, setFilters, buscarHistorico }) {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const limparFiltros = () => {
    setFilters({
      cep: "",
      cidade: "",
      mes: "",
      ano: "",
      periodoInicio: "",
      periodoFim: "",
      isFavorite: "",
    });
  };

  return (
    <div className="filters">
      <div className="input-group">
        <label>CEP</label>
        <input
          type="text"
          name="cep"
          value={filters.cep}
          onChange={handleChange}
          maxLength={9}
          placeholder="Digite o CEP"
        />
      </div>

      <div className="input-group">
        <label>Cidade</label>
        <input
          type="text"
          name="cidade"
          value={filters.cidade}
          onChange={handleChange}
          placeholder="Digite a cidade"
        />
      </div>

      <div className="input-group">
        <label>Mês</label>
        <select name="mes" value={filters.mes} onChange={handleChange}>
          <option value="">Selecione o mês</option>
          <option value="01">Janeiro</option>
          <option value="02">Fevereiro</option>
          <option value="03">Março</option>
          <option value="04">Abril</option>
          <option value="05">Maio</option>
          <option value="06">Junho</option>
          <option value="07">Julho</option>
          <option value="08">Agosto</option>
          <option value="09">Setembro</option>
          <option value="10">Outubro</option>
          <option value="11">Novembro</option>
          <option value="12">Dezembro</option>
        </select>
      </div>

      <div className="input-group">
        <label>Ano</label>
        <select name="ano" value={filters.ano} onChange={handleChange}>
          <option value="">Selecione o ano</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
        </select>
      </div>

      <div className="input-group">
        <label>Período de Início</label>
        <input
          type="date"
          name="periodoInicio"
          value={filters.periodoInicio}
          onChange={handleChange}
        />
      </div>

      <div className="input-group">
        <label>Período de Fim</label>
        <input
          type="date"
          name="periodoFim"
          value={filters.periodoFim}
          onChange={handleChange}
        />
      </div>

      <div className="input-group">
        <label>Favoritas</label>
        <select name="isFavorite" value={filters.isFavorite} onChange={handleChange}>
          <option value="">Selecione</option>
          <option value="true">Sim</option>
          <option value="false">Não</option>
        </select>
      </div>

      <button className="clear-button" onClick={limparFiltros}>
        Limpar Filtros
      </button>
    </div>
  );
}

export default Filters;

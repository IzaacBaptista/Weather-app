import React from "react";

function Ordenar({ ordenar, setOrdenar }) {
  return (
    <div className="ordenar-group">
      <label>Ordenar</label>
      <select
        value={ordenar}
        onChange={(e) => setOrdenar(e.target.value)}
        className="ordenar-select"
      >
        <option value="asc">🔼 Mais antigas</option>
        <option value="desc">🔽 Mais recentes</option>
      </select>
      <br />
      <br />
    </div>
  );
}

export default Ordenar;

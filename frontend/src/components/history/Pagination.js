import React from "react";

function Pagination({ paginaAtual, totalPaginas, setPaginaAtual }) {
  const gerarPaginas = () => {
    const paginas = [];
    const limiteExibicao = 5;
    const inicio = Math.max(1, paginaAtual - Math.floor(limiteExibicao / 2));
    const fim = Math.min(totalPaginas, inicio + limiteExibicao - 1);

    for (let i = inicio; i <= fim; i++) {
      paginas.push(
        <button
          key={i}
          className={`pagination-button ${i === paginaAtual ? "active" : ""}`}
          onClick={() => setPaginaAtual(i)}
        >
          {i}
        </button>
      );
    }

    if (inicio > 1) paginas.unshift(<span key="start">...</span>);
    if (fim < totalPaginas) paginas.push(<span key="end">...</span>);

    return paginas;
  };

  return (
    <div className="pagination">
      <button
        className="pagination-button"
        onClick={() => setPaginaAtual((prev) => Math.max(prev - 1, 1))}
        disabled={paginaAtual === 1}
      >
        {"<"}
      </button>
      {gerarPaginas()}
      <button
        className="pagination-button"
        onClick={() => setPaginaAtual((prev) => Math.min(prev + 1, totalPaginas))}
        disabled={paginaAtual === totalPaginas}
      >
        {">"}
      </button>
    </div>
  );
}

export default Pagination;

import { useState } from "react";

export function Ej2() {
  const [valor, setValor] = useState(0);

  function restar() {
    if (valor > 0) {
      setValor(valor - 1);
    }
  }

  function sumar() {
    if (valor < 10) {
      setValor(valor + 1);
    }
  }

  function reiniciar() {
    setValor(0);
  }

  return (
    <div>
      <p style={{ fontSize: "2.5rem", fontWeight: "bold", margin: "0.5rem 0" }}>
        {valor}
      </p>

      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <button onClick={restar} disabled={valor === 0}>
          -
        </button>
        <button onClick={sumar} disabled={valor === 10}>
          +
        </button>
        <button onClick={reiniciar}>Reiniciar</button>
      </div>

      {valor === 10 && <p>Llegaste al máximo</p>}
    </div>
  );
}
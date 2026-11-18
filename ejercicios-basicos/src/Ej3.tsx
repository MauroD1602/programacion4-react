import { useState } from "react";

export function Ej3() {
  const [visible, setVisible] = useState(false);

  return (
    <article
      style={{
        border: "1px solid #d1d5db",
        borderRadius: "8px",
        padding: "1rem",
        maxWidth: "520px",
      }}
    >
      <h3>¿Qué es JSX?</h3>

      <button onClick={() => setVisible(!visible)}>
        {visible ? "Ocultar respuesta" : "Mostrar respuesta"}
      </button>

      {visible && (
        <p style={{ marginTop: "0.75rem" }}>
          Una sintaxis que permite escribir estructura parecida a HTML dentro de
          JavaScript. Se transforma en llamadas a funciones de React.
        </p>
      )}
    </article>
  );
}
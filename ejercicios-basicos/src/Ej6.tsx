import { useState } from "react";

const LENGUAJES = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C#",
  "Go",
  "Rust",
  "PHP",
];

export function Ej6() {
  const [busqueda, setBusqueda] = useState("");

  const filtrados = LENGUAJES.filter((l) =>
    l.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar lenguaje..."
        style={{
          padding: "0.5rem",
          borderRadius: "6px",
          border: "1px solid #d1d5db",
        }}
      />

      <p style={{ color: "#4b5563", margin: "0.75rem 0" }}>
        {filtrados.length} {filtrados.length === 1 ? "resultado" : "resultados"}
      </p>

      <ul>
        {filtrados.map((lenguaje) => (
          <li key={lenguaje}>{lenguaje}</li>
        ))}
      </ul>
    </div>
  );
}
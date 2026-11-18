import { useState } from "react";

export function Ej4() {
  const [celsius, setCelsius] = useState("");

  const valorCelsius = Number(celsius);
  const fahrenheit = (valorCelsius * 9) / 5 + 32;

  return (
    <div>
      <input
        type="number"
        value={celsius}
        onChange={(e) => setCelsius(e.target.value)}
        placeholder="Grados Celsius"
        style={{
          padding: "0.5rem",
          borderRadius: "6px",
          border: "1px solid #d1d5db",
        }}
      />

      <p style={{ fontSize: "2rem", fontWeight: "bold", margin: "0.75rem 0" }}>
        {Number.isNaN(valorCelsius) ? "0.0" : fahrenheit.toFixed(1)} °F
      </p>

      {celsius !== "" && valorCelsius > 30 && <p>Hace calor</p>}
    </div>
  );
}
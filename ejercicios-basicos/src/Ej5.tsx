import { useState, type SubmitEvent } from "react";

interface Item {
  id: number;
  texto: string;
}

export function Ej5() {
  const [texto, setTexto] = useState("");
  const [items, setItems] = useState<Item[]>([]);

  function agregar(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const textoLimpio = texto.trim();
    if (textoLimpio === "") return;

    const nuevo: Item = {
      id: Date.now(),
      texto: textoLimpio,
    };

    setItems([...items, nuevo]);
    setTexto("");
  }

  function eliminar(id: number) {
    setItems(items.filter((i) => i.id !== id));
  }

  return (
    <div>
      <form
        onSubmit={agregar}
        style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}
      >
        <input
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Ej: yerba"
          style={{
            padding: "0.5rem",
            borderRadius: "6px",
            border: "1px solid #d1d5db",
          }}
        />
        <button type="submit">Agregar</button>
      </form>

      {items.length === 0 ? (
        <p>No hay nada para comprar</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id} style={{ marginBottom: "0.5rem" }}>
              {item.texto}{" "}
              <button type="button" onClick={() => eliminar(item.id)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
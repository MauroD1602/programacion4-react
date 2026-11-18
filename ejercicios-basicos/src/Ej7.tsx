interface ProductoProps {
  nombre: string;
  precio: number;
  stock: number;
  oferta?: boolean;
}

function Producto({ nombre, precio, stock, oferta }: ProductoProps) {
  return (
    <article
      style={{
        border: "1px solid #d1d5db",
        borderRadius: "8px",
        padding: "1rem",
        minWidth: "180px",
      }}
    >
      <h3>{nombre}</h3>
      {oferta && <p style={{ fontWeight: "bold" }}>¡Oferta!</p>}
      <p>${precio}</p>
      <p>{stock === 0 ? "Sin stock" : `Stock: ${stock}`}</p>
    </article>
  );
}

export function Ej7() {
  return (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <Producto nombre="Teclado" precio={45000} stock={12} oferta />
      <Producto nombre="Mouse" precio={18000} stock={0} />
    </div>
  );
}
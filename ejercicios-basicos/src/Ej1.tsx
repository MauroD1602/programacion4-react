interface ProductoProps {
  nombre: string;
  precio: number;
  stock: number;
}

function Producto({ nombre, precio, stock }: ProductoProps) {
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
      <p>${precio}</p>
      <p>{stock === 0 ? "Sin stock" : `Stock: ${stock} unidades`}</p>
    </article>
  );
}

export function Ej1() {
  return (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <Producto nombre="Teclado" precio={45000} stock={12} />
      <Producto nombre="Mouse" precio={18000} stock={0} />
      <Producto nombre="Monitor" precio={320000} stock={3} />
    </div>
  );
}
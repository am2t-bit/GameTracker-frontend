import { useState } from "react";

export default function FormularioJuego() {
  const [titulo, setTitulo] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [rating, setRating] = useState(0);
  const [estado, setEstado] = useState("");
  const [imagen, setImagen] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoJuego = {
      titulo,
      plataforma,
      rating,
      estado,
      portaada:imagen
    };

    const res = await fetch("http://localhost:3000/juegos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoJuego)
    });

    const data = await res.json();
    console.log("Juego agregado:", data);

    // Limpiar campos
    setTitulo("");
    setPlataforma("");
    setRating(0);
    setEstado("");
    setImagen("");
  };

  return (
    <form onSubmit={handleSubmit} className="formulario-juego">
      <h2>Agregar Juego</h2>

      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Plataforma"
        value={plataforma}
        onChange={(e) => setPlataforma(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Rating 1-5"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        min="1"
        max="5"
        required
      />

      <select value={estado} onChange={(e) => setEstado(e.target.value)} required>
        <option value="">Selecciona estado</option>
        <option value="Completado">Completado</option>
        <option value="Pendiente">Pendiente</option>
      </select>

      <input
        type="text"
        placeholder="URL de la portada"
        value={imagen}
        onChange={(e) => setImagen(e.target.value)}
        
      />

      <button type="submit">Agregar</button>
    </form>
  );
}

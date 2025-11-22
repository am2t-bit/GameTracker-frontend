import { useState } from "react";

export default function TarjetaJuego({ juego, resenas, recargarResenas, recargarJuegos }) {
  const [descripcion, setDescripcion] = useState("");
  const [editando, setEditando] = useState(false);
  const [tituloEdit, setTituloEdit] = useState(juego.titulo);
  const [ratingEdit, setRatingEdit] = useState(juego.rating);
  const [plataformaEdit, setPlataformaEdit] = useState(juego.plataforma);
  const [estadoEdit, setEstadoEdit] = useState(juego.estado);
  const [mostrarImagen, setMostrarImagen] = useState(false);

  // Crear nueva reseña
  const enviarResena = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:3000/resenas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        juegoId: juego._id,
        texto: descripcion,
        estrellas: 5
      })
    });

    setDescripcion("");
    recargarResenas();
  };

  // Eliminar juego
  const eliminarJuego = async () => {
    await fetch(`http://localhost:3000/juegos/${juego._id}`, {
      method: "DELETE"
    });

    recargarJuegos();
  };

  // Editar juego
  const editarJuego = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:3000/juegos/${juego._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo: tituloEdit,
        rating: ratingEdit,
        plataforma: plataformaEdit,
        estado: estadoEdit,
        portada: juego.portada
      })

    });

    setEditando(false);
    recargarJuegos();
  };

  // Eliminar reseña
  const eliminarResena = async (id) => {
    await fetch(`http://localhost:3000/resenas/${id}`, {
      method: "DELETE"
    });

    recargarResenas();
  };

  // Editar reseña
  const editarResena = async (id, nuevoTexto) => {
    await fetch(`http://localhost:3000/resenas/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        texto: nuevoTexto
      })
    });

    recargarResenas();
  };

  return (
    <>

      {/* MODAL DE IMAGEN */}
      {mostrarImagen && (
        <div
          onClick={() => setMostrarImagen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            cursor: "pointer"
          }}
        >
          <img
            src={juego.portada}
            alt={juego.titulo}
            className="img-juego"
            onError={(e) => e.target.src = "https://via.placeholder.com/200x300?text=Sin+Imagen"}
          />


        </div>
      )}

      {/* TARJETA */}
      <div className="card-juego">

        <img
          src={juego.portada}
          alt={juego.titulo}
          onClick={() => setMostrarImagen(true)}
          className="img-juego"
        />


        {editando ? (
          <form onSubmit={editarJuego}>
            <input
              value={tituloEdit}
              onChange={(e) => setTituloEdit(e.target.value)}
            />

            <input
              type="number"
              value={ratingEdit}
              onChange={(e) => setRatingEdit(e.target.value)}
            />

            <input
              value={plataformaEdit}
              onChange={(e) => setPlataformaEdit(e.target.value)}
            />
            <select
              value={estadoEdit}
              onChange={(e) => setEstadoEdit(e.target.value)}
            >
              <option value="Completado">Completado</option>
              <option value="Pendiente">Pendiente</option>
            </select>

            <button>Guardar</button>
          </form>


        ) : (
          <>
            <h3>{juego.titulo}</h3>
            <p>{juego.plataforma}</p>
            <p>⭐ {juego.rating}/5</p>
            <p>{juego.completado ? "✔ Completado" : "⏳ Pendiente"}</p>

            <button onClick={() => setEditando(true)}>✏ Editar Juego</button>
            <button onClick={eliminarJuego}>🗑 Eliminar Juego</button>
          </>
        )}

        <h4>Reseñas:</h4>
        {resenas.length === 0 && <p>No hay reseñas.</p>}

        {resenas.map(r => (
          <div key={r._id} style={{ marginBottom: "10px" }}>

            <div className="resena">

              {r.texto}
            </div>

            <button
              onClick={() => eliminarResena(r._id)}
              style={{ marginTop: "5px" }}
            >
              Eliminar
            </button>
          </div>
        ))}



        <form onSubmit={enviarResena}>
          <textarea
            placeholder="Escribe una reseña..."
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            style={{
              width: "100%",
              height: "50px",
              marginTop: "10px"
            }}
          ></textarea>

          <button type="submit">Agregar Reseña</button>
        </form>
      </div>
    </>
  );
}

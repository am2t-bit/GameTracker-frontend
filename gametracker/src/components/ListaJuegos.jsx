import { useEffect, useState } from "react";
import TarjetaJuego from "./TarjetaJuego";

export default function ListaJuegos() {
  const [juegos, setJuegos] = useState([]);
  const [resenas, setResenas] = useState([]);

  const cargarJuegos = async () => {
    const res = await fetch("http://localhost:3000/juegos");
    const data = await res.json();
    setJuegos(data);
  };

  const cargarResenas = async () => {
    const res = await fetch("http://localhost:3000/resenas");
    const data = await res.json();
    setResenas(data);
  };

  useEffect(() => {
    cargarJuegos();
    cargarResenas();
  }, []);
  

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Biblioteca de Juegos</h2>

      <div style={{
        marginTop: "20px",
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "center"
      }}>
        {juegos.map(juego => (
          <TarjetaJuego
            key={juego._id}
            juego={juego}
            resenas={resenas.filter(r => r.juegoId?._id === juego._id)}
            recargarResenas={cargarResenas}
            recargarJuegos={cargarJuegos}
          />
        ))}
      </div>
    </div>
  );
}

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FormularioJuego from "./components/FormularioJuego";
import ListaJuegos from "./components/ListaJuegos";

function App() {
  return (
    <>
      <div className="contenedor">
        <div id="Titulo">
          <h1>GameTracker</h1>
        </div>
        <ListaJuegos />
        <FormularioJuego />
      </div>

      <footer className="footer">
        <p>GameTracker — Proyecto Final Jovenes Creativos 2025</p>
        <p>Hecho con ❤️ por Angie Muelas</p>
      </footer>

    </>
  );
}

export default App;

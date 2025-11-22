import { useState } from "react";

export default function FormularioResena({ juegoId }) {
    const [descripcion, setDescripcion] = useState("");

    const enviarResena = async (e) => {
        e.preventDefault();

        const nuevaResena = {
            juegoId: juegoId,
            texto: descripcion,
            estrellas: 5
        };

        const res = await fetch("http://localhost:3000/resenas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevaResena)
        });

        const data = await res.json();
        console.log("Reseña agregada:", data);

        setDescripcion("");
    };

    return (
        <form onSubmit={enviarResena} className="formulario-resena">
            <textarea
                placeholder="Escribe una reseña..."
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
            ></textarea>

            <button type="submit">Guardar Reseña</button>
        </form>
    );
}

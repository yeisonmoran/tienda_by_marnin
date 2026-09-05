import { useState } from "react";
import axios from "axios";


function RegistrarCategoria() {

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [mensaje, setMensaje] = useState("");

    const manejarSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        axios.post(`${import.meta.env.VITE_API_URL}/api/categorias`,
            { nombre, descripcion },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then(respuesta => {
                setMensaje("Categoria creada con exito: " + respuesta.data.nombre);
                setNombre("");
                setDescripcion("");
            })
            .catch(error => {
                console.error(error)
                setMensaje("Error al crear categoria");
            });
    };

    return (
        <div className="card p-4" style={{ maxWidth: "500px" }}>
            <h2 className="mb-4">Nueva categoría</h2>
            <form onSubmit={manejarSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre: </label>
                    <input
                        className="form-control"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form label">Descripción: </label>
                    <input className="form-control"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-success">Registrar</button>
            </form>
            {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
        </div>
    );
}

export default RegistrarCategoria;
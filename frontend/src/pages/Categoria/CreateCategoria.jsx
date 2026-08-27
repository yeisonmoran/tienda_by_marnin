import { useState } from "react";
import axios from "axios";


function RegistrarCategoria() {

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [mensaje, setMensaje] = useState("");

    const manejarSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        axios.post("http://localhost:3000/api/categorias",
            { nombre, descripcion },
            {
                headers:{
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
        <div>
            <h2>Crear categoria</h2>
            <form onSubmit={manejarSubmit}>
                <div>
                    <label>Nombre: </label>
                    <input
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div>
                    <label>Descripcion: </label>
                    <input
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    /> <br />
                    <button type="submit">Registrar</button>
                </div>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
}

export default RegistrarCategoria;
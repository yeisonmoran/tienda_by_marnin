import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


function EditarCategoria() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [mensaje, setMensaje] = useState("");


    useEffect(() => {
        axios.get(`http://localhost:3000/api/categorias/${id}`)
            .then(respuesta => {
                setNombre(respuesta.data.nombre);
                setDescripcion(respuesta.data.descripcion);
            })
            .catch(error => {
                console.error(error);
            });
    }, [id]);

    const manejarSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        axios.put(`http://localhost:3000/api/categorias/${id}`,
            { nombre, descripcion },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((respuesta) => {
                setMensaje("Categoria actualizada con exito: " + respuesta.data.nombre);
                navigate("/");
            })
            .catch(error => {
                console.error(error)
                setMensaje("Error al actualizar");
            });
    };

    return (
        <div>
            <h2>Editar categoria</h2>
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
                    <button type="submit">Guradar</button>
                </div>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
}

export default EditarCategoria;
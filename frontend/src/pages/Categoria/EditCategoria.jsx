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
        axios.get(`${import.meta.env.VITE_API_URL}/api/categorias/${id}`)
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

        axios.put(`${import.meta.env.VITE_API_URL}/api/categorias/${id}`,
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
        <div className="card p-4" style={{ maxWidth: "500px" }}>
            <h2 className="mb-4">Editar categoría</h2>
            <form onSubmit={manejarSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre: </label>
                    <input className="form-control"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Descripción: </label>
                    <input className="form-control"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    /> 
                </div>
                <button className="btn btn-primary" type="submit">Actualizar</button>
            </form>
            {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
        </div>
    );
}

export default EditarCategoria;
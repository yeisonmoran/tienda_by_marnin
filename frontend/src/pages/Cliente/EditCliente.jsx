import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";


function EditarCliente() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [telefono, setTelefono] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [mensaje, setMensaje] = useState("");


    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/clientes/${id}`)
            .then(respuesta => {
                setNombre(respuesta.data.nombre);
                setCorreo(respuesta.data.correo);
                setTelefono(respuesta.data.telefono);
                setCiudad(respuesta.data.ciudad);
            })

            .catch(error => {
                console.error(error);
            });
    }, [id]);




    const manejarSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        axios.put(`${import.meta.env.VITE_API_URL}/api/clientes/${id}`,
            {
                nombre, correo, telefono, ciudad
            },

            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((respuesta) => {
                setMensaje("Cliente actualizado con exito: " + respuesta.data.nombre);
                navigate("/");
            })
            .catch(error => {
                console.error(error)
                setMensaje("Error al actualizar");
            });
    };



    return (
        <div className="card p-4" style={{ maxWidth: "500px" }}>
            <h2 className="mb-4">Editar cliente</h2>
            <form onSubmit={manejarSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre: </label>
                    <input className="form-control"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Correo: </label>
                    <input className="form-control"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Teléfono: </label>
                    <input className="form-control"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Ciudad: </label>
                    <input className="form-control"
                        value={ciudad}
                        onChange={(e) => setCiudad(e.target.value)}
                    />
                </div>

                <div className="d-flex aling-items-center gap-2 mt-4">
                    <button type="submit" className="btn btn-primary">
                        <i className="fas fa-check me-1"></i>Actualizar</button>
                    <Link to="/list-clientes" className="btn btn-secondary">
                        <i className="fas fa-arrow-left me-1"></i> Cancelar
                    </Link>
                </div>
            </form>
            {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
        </div>
    );
}

export default EditarCliente;
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


function EditarUsuario() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [idRol, setIdRol] = useState("");
    const [mensaje, setMensaje] = useState("");

    const [roles, setRoles] = useState([]);

    useEffect(() => {
        axios.get("${import.meta.env.VITE_API_URL}/api/roles-users")

            .then(respuesta => {
                setRoles(respuesta.data);
            })

            .catch(error => {
                console.error(error);
            });

    }, []);



    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/usuarios/${id}`)
            .then(respuesta => {
                setNombre(respuesta.data.nombre);
                setCorreo(respuesta.data.correo);
                setIdRol(respuesta.data.idRol);
            })

            .catch(error => {
                console.error(error);
            });
    }, [id]);




    const manejarSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        axios.put(`${import.meta.env.VITE_API_URL}/api/usuarios/${id}`,
            {
                nombre, correo, contrasena, idRol: Number(idRol)
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then(() => {
                setMensaje("Usuario actualizado con exito");
                navigate("/");
            })
            .catch(error => {
                console.error(error)
                setMensaje("Error al actualizar");
            });
    };



    return (
        <div className="card p-4" style={{maxWidth: "500px"}}>
            <h2 className="mb-4">Editar usuario</h2>
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
                    <label className="form-label">Contraseña: </label>
                    <input className="form-control"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Roles: </label>
                    <select className="form-control"
                        value={idRol}
                        onChange={(e) => setIdRol(e.target.value)}
                    >
                        <option value="">Seleccione un rol</option>
                        {roles.map(rol => (
                            <option key={rol.id_rol} value={rol.id_rol}>
                                {rol.nombreRol}
                            </option>
                        ))}
                    </select>
                </div>
                    <button type="submit" className="btn btn-primary">Actualizar</button>
            </form>
            {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
        </div>
    );
}

export default EditarUsuario;
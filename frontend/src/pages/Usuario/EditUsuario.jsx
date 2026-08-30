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
        axios.get("http://localhost:3000/api/roles-users")

            .then(respuesta => {
                setRoles(respuesta.data);
            })

            .catch(error => {
                console.error(error);
            });

    }, []);



    useEffect(() => {
        axios.get(`http://localhost:3000/api/usuarios/${id}`)
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

        axios.put(`http://localhost:3000/api/usuarios/${id}`,
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
        <div>
            <h2>Editar usuario</h2>
            <form onSubmit={manejarSubmit}>
                <div>
                    <label>Nombre: </label>
                    <input
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div>
                    <label>Correo: </label>
                    <input
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                    />
                </div>
                <div>
                    <label>Contraseña: </label>
                    <input
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                    />
                </div>
                <div>
                    <label>Roles: </label>
                    <select
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
                <div>
                    <button type="submit">Actualizar</button>
                </div>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
}

export default EditarUsuario;
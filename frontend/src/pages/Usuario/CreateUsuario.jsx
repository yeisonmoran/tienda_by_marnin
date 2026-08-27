import { useState, useEffect } from "react";
import axios from "axios";


function RegistrarUsuario() {

    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [idRol, setIdRol] = useState("");
    const [idTipoDocumento, setIdTipoDocumento] = useState("");
    const [numDocumento, setNumDocumento] = useState("");
    const [mensaje, setMensaje] = useState("");

    const [Tipo, setTipo] = useState([]);


    useEffect(() => {
        axios.get("http://localhost:3000/api/tipos-documento")

            .then(respuesta => {
                setTipo(respuesta.data);
            })

            .catch(error => {
                console.error(error);
            });

    }, []);

    const [rols, setRols] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/roles-users")

            .then(respuesta => {
                setRols(respuesta.data);
            })

            .catch(error => {
                console.error(error);
            });

    }, []);


    const manejarSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        axios.post("http://localhost:3000/api/usuarios",
            {
                nombre, correo, contrasena, idRol: Number(idRol), idTipoDocumento: Number(idTipoDocumento),
                numDocumento
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then(respuesta => {
                setMensaje("Usuario registrado con exito: " + respuesta.data.nombre);
                setNombre("");
                setCorreo("");
                setContrasena("");
                setIdRol("");
                setIdTipoDocumento("");
                setNumDocumento("");
            })
            .catch(error => {
                console.error(error)
                setMensaje("Error al registrar usuario");
            });
    };

    return (
        <div>
            <h2>Añadir usuario</h2>
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
                        type="email"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                    />
                </div>
                <div>
                    <label>Contraseña: </label>
                    <input
                    type="password"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                    />
                </div>
                <div>
                    <label>Identificacion: </label>
                    <select
                        value={idTipoDocumento}
                        onChange={(e) => setIdTipoDocumento(e.target.value)}
                    >
                        <option value="">Tipo</option>
                        {Tipo.map(tipoDocumento => (
                            <option key={tipoDocumento.id_tipo_documento} value={tipoDocumento.id_tipo_documento}>
                                {tipoDocumento.abreviatura} - {tipoDocumento.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Roles: </label>
                    <select
                        value={idRol}
                        onChange={(e) => setIdRol(e.target.value)}
                    >
                        <option value="">Seleccione un rol</option>
                        {rols.map(rol => (
                            <option key={rol.id_rol} value={rol.id_rol}>
                                {rol.nombreRol}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Numero de documento: </label>
                    <input
                        value={numDocumento}
                        onChange={(e) => setNumDocumento(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">Registrar</button>
                </div>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
}

export default RegistrarUsuario;
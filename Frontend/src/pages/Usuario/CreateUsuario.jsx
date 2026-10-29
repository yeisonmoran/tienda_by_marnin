import { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";


function RegistrarUsuario() {

    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [idRol, setIdRol] = useState("");
    const [idTipoDocumento, setIdTipoDocumento] = useState("");
    const [numDocumento, setNumDocumento] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [esError, setEsError] = useState(false);

    const [Tipo, setTipo] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/tipos-documento`)

            .then(respuesta => {
                setTipo(respuesta.data);
            })

            .catch(error => {
                console.error(error);
            });

    }, []);

    const [rols, setRols] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/roles-users`)

            .then(respuesta => {
                setRols(respuesta.data);
            })

            .catch(error => {
                console.error(error);
            });

    }, []);


    const manejarSubmit = (e) => {
        e.preventDefault();
        setEsError(false);

        const token = localStorage.getItem("token");

        axios.post(`${import.meta.env.VITE_API_URL}/api/usuarios/registrar_usuario`,
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
                navigate("/list-usuarios");
            })
            .catch(error => {
                console.error(error)
                setMensaje(error.response?.data?.error || "Error al registrar usuario");
                setEsError(true);
            });
    };

    return (
        <div className="card shadow p-4" style={{ maxWidth: "500px" }}>
            <h2 className="mb-4">Nuevo usuario</h2>
            <form onSubmit={manejarSubmit}>
                <div className="mb-3">
                    <label className="form-label" >Nombre: </label>
                    <input className="form-control"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Correo: </label>
                    <input className="form-control"
                        type="email"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Contraseña: </label>
                    <input className="form-control"
                        type="password"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Identificación: </label>
                    <select className="form-select"
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
                <div className="mb-3">
                    <label className="form-label">Roles: </label>
                    <select className="form-select"
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
                <div className="mb-3">
                    <label className="form-label">Número de documento: </label>
                    <input className="form-control"
                        value={numDocumento}
                        onChange={(e) => setNumDocumento(e.target.value)}
                    />
                </div>

                <div className="d-flex align-items-center gap-2 mt-4">
                    <button type="submit" className="btn btn-success">
                        <i className="fas fa-check me-1"></i>Registrar</button>
                    <Link to="/list-usuarios" className="btn btn-secondary">
                        <i className="fas fa-arrow-left me-1"></i> Cancelar
                    </Link>
                </div>

            </form>
            {mensaje && <div className={`alert ${esError ? "alert-danger" : "alert-success"} mt-3`}>{mensaje}</div>}
        </div>
    );
}

export default RegistrarUsuario;
import { useState, useEffect } from "react";
import axios from "axios";


function RegistrarCliente() {

    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [telefono, setTelefono] = useState("");
    const [ciudad, setCiudad] = useState("");
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


    const manejarSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        axios.post("http://localhost:3000/api/clientes",
            {
                nombre, correo, telefono, ciudad, idTipoDocumento: Number(idTipoDocumento),
                numDocumento
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then(respuesta => {
                setMensaje("Cliente registrado con exito: " + respuesta.data.nombre);
                setNombre("");
                setCorreo("");
                setTelefono("");
                setCiudad("");
                setIdTipoDocumento("");
                setNumDocumento("");
            })
            .catch(error => {
                console.error(error)
                setMensaje("Error al registrar cliente");
            });
    };

    return (
        <div className="card p-4" style={{ maxWidth: "500px"}}>
            <h2 className="mb-4">Crear cliente</h2>
            <form onSubmit={manejarSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre: </label>
                    <input className="form-control"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="from-label">Correo: </label>
                    <input className="form-control"
                        type="email"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Telefono: </label>
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
                <div className="mb-3">
                    <label className="form-label">Identificacion: </label>
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
                    <label className="form-label">Numero de documento: </label>
                    <input className="form-control"
                        value={numDocumento}
                        onChange={(e) => setNumDocumento(e.target.value)}
                    />
                </div>
                    <button type="submit" className="btn btn-primary">Registrar</button>
            </form>
            {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
        </div>
    );
}

export default RegistrarCliente;
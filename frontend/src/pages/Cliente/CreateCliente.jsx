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
        <div>
            <h2>Añadir cliente</h2>
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
                    <label>Telefono: </label>
                    <input
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                    />
                </div>
                <div>
                    <label>Ciudad: </label>
                    <input
                        value={ciudad}
                        onChange={(e) => setCiudad(e.target.value)}
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

export default RegistrarCliente;
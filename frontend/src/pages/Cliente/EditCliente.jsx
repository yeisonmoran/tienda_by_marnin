import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
        axios.get(`http://localhost:3000/api/clientes/${id}`)
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

        axios.put(`http://localhost:3000/api/clientes/${id}`,
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
        <div>
            <h2>Editar cliente</h2>
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
                    <button type="submit">Actualizar</button>
                </div>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
}

export default EditarCliente;
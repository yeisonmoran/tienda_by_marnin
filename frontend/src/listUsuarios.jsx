import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Usuarios() {

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {

        axios.get("http://localhost:3000/api/usuarios")
            .then(respuesta => {
                setUsuarios(respuesta.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

        const eliminarUsuario = (id) => {
        const confirmar = window.confirm("¡Deseas eliminar este usuario!");

        if (!confirmar) return;

        const token = localStorage.getItem("token");

        axios.delete(`http://localhost:3000/api/usuarios/${id}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            })

            .then(() => {
                setUsuarios(usuarios.filter(usu => usu.id_usuario !== id));
            })
            .catch(error => {
                console.error(error);
            });
    };


    return (
        <div>
            <h1>Usuarios</h1>
            <ul>
                {usuarios.map(usuario => (
                    <li key={usuario.id_usuario}>
                        {usuario.nombre} - {usuario.correo} -
                        {usuario.contrasena} - {usuario.numDocumento}
                        <Link to={`/usuarios/editar/${usuario.id_usuario}`}>Editar</Link>
                        <button onClick={() => eliminarUsuario(usuario.id_usuario)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );

}
export default Usuarios



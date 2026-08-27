import { useEffect, useState } from "react";

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

    return (
        <div>
            <h1>Usuarios</h1>
            <ul>
                {usuarios.map(usuario => (
                    <li key={usuario.id_usuario}>
                        {usuario.nombre} - {usuario.correo} -
                        {usuario.contrasena} - {usuario.numDocumento}
                    </li>
                ))}
            </ul>
        </div>
    );

}
export default Usuarios



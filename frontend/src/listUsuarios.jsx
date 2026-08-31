import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
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

    const [tipo_documentos, setIdTipoDocumentos] = useState([]);

    useEffect(() => {

        axios.get("http://localhost:3000/api/tipos-documento")
            .then(respuesta => {
                setIdTipoDocumentos(respuesta.data);
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
            <div className="mb-3"><Link to="/registrar-usuario" className="btn btn-primary">Nuevo usuario</Link></div>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Contraseña</th>
                        <th>Documento</th>
                        <th>Identificación</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario, index) => (
                        <tr key={usuario.id_usuario}>
                            <td>{index + 1}</td>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.correo}</td>
                            <td>{usuario.contrasena}</td>

                            <td>{tipo_documentos.find(
                                tipoDocumento => tipoDocumento.id_tipo_documento === usuario.idTipoDocumento)?.nombre}
                            </td>

                            <td>{usuario.numDocumento}</td>

                            <td>{roles.find(
                                rol => rol.id_rol === usuario.idRol)?.nombreRol}
                            </td>

                            <td>
                                <div className="mb-3">
                                    <Button variant="warning" style={{ width: "89px" }}><Link to={`/usuarios/editar/${usuario.id_usuario}`}>Editar</Link></Button>
                                </div>
                                <Button variant="danger" onClick={() => eliminarUsuario(usuario.id_usuario)}>Eliminar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>

    );

}
export default Usuarios



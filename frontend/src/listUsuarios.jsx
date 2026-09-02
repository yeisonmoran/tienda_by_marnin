import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]);
  const [tipoDocumentos, setTipoDocumentos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/usuarios")
      .then((respuesta) => {
        setUsuarios(respuesta.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get("http://localhost:3000/api/roles-users")
      .then((respuesta) => {
        setRoles(respuesta.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get("http://localhost:3000/api/tipos-documento")
      .then((respuesta) => {
        setTipoDocumentos(respuesta.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const eliminarUsuario = (id) => {
    const confirmar = window.confirm("¡Deseas eliminar este usuario!");
    if (!confirmar) return;

    const token = localStorage.getItem("token");

    axios
      .delete(`http://localhost:3000/api/usuarios/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setUsuarios(usuarios.filter((usu) => usu.id_usuario !== id));
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          alert("No tienes permisos para eliminar usuarios");
        } else {
          alert("Error al eliminar usuario");
        }
      });
  };

  return (
    <div>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Control de Usuarios</h1>
        <Link
          to="/registrar-usuario"
          className="btn btn-primary btn-sm shadow-sm"
        >
          <i className="fas fa-user-plus fa-sm text-white-50 mr-1"></i> Nuevo Usuario
        </Link>
      </div>

      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            Usuarios del Sistema
          </h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table
              className="table table-bordered table-hover mb-0"
              width="100%"
              cellSpacing="0"
            >
              <thead className="thead-light">
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Tipo Doc.</th>
                  <th>Documento</th>
                  <th>Rol</th>
                  <th>Estado</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario, index) => (
                  <tr key={usuario.id_usuario}>
                    <td>{index + 1}</td>
                    <td className="font-weight-bold">{usuario.nombre}</td>
                    <td>{usuario.correo}</td>
                    <td>
                      {tipoDocumentos.find(
                        (t) => t.id_tipo_documento === usuario.idTipoDocumento
                      )?.nombre || "N/A"}
                    </td>
                    <td>{usuario.numDocumento}</td>
                    <td>
                      <span className="badge bg-primary text-white">
                        {roles.find((rol) => rol.id_rol === usuario.idRol)
                          ?.nombreRol || "Usuario"}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          usuario.activo ? "bg-success" : "bg-danger"
                        }`}
                      >
                        {usuario.activo ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center gap-1">
                        <Link
                          to={`/usuarios/editar/${usuario.id_usuario}`}
                          className="btn btn-warning btn-sm"
                          title="Editar"
                        >
                          <i className="fas fa-edit"></i>
                        </Link>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => eliminarUsuario(usuario.id_usuario)}
                          title="Eliminar"
                          type="button"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Usuarios;

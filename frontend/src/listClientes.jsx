import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [tipoDocumentos, setTipoDocumentos] = useState([]);

  let usuario = null;
  try {
    usuario = JSON.parse(localStorage.getItem("usuario") || "null");
  } catch {
    usuario = null;
  }
  const esAdmin = Number(usuario?.idRol) === 1;

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/clientes")
      .then((respuesta) => {
        setClientes(respuesta.data);
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

  const eliminarCliente = (id) => {
    const confirmar = window.confirm("¡Deseas eliminar este cliente!");
    if (!confirmar) return;

    const token = localStorage.getItem("token");

    axios
      .delete(`http://localhost:3000/api/clientes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setClientes(clientes.filter((cli) => cli.id_cliente !== id));
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          alert("No tienes permisos para eliminar clientes");
        } else {
          alert("Error al eliminar cliente");
        }
      });
  };

  return (
    <div>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Clientes</h1>
        <Link
          to="/registrar-cliente"
          className="btn btn-primary btn-sm shadow-sm"
        >
          <i className="fas fa-user-plus fa-sm text-white-50 mr-1"></i> Nuevo Cliente
        </Link>
      </div>

      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            Directorio de Clientes
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
                  <th>Teléfono</th>
                  <th>Ciudad</th>
                  <th>Tipo Doc.</th>
                  <th>Número Doc.</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map((cliente, index) => (
                  <tr key={cliente.id_cliente}>
                    <td>{index + 1}</td>
                    <td className="font-weight-bold">{cliente.nombre}</td>
                    <td>{cliente.correo}</td>
                    <td>{cliente.telefono}</td>
                    <td>{cliente.ciudad}</td>
                    <td>
                      <span className="badge bg-light text-dark border">
                        {tipoDocumentos.find(
                          (t) => t.id_tipo_documento === cliente.idTipoDocumento
                        )?.nombre || "N/A"}
                      </span>
                    </td>
                    <td>{cliente.numDocumento}</td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center gap-1">
                        <Link
                          to={`/clientes/editar/${cliente.id_cliente}`}
                          className="btn btn-warning btn-sm"
                          title="Editar"
                        >
                          <i className="fas fa-edit"></i>
                        </Link>
                        {esAdmin && (
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => eliminarCliente(cliente.id_cliente)}
                            title="Eliminar"
                            type="button"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        )}
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

export default Clientes;

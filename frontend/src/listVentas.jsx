import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Ventas() {
  const [usuarios, setUsuarios] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [ventas, setVentas] = useState([]);

  let usuario = null;
  try {
    usuario = JSON.parse(localStorage.getItem("usuario") || "null");
  } catch {
    usuario = null;
  }
  const esAdmin = Number(usuario?.idRol) === 1;

  useEffect(() => {
    axios
      .get("${import.meta.env.VITE_API_URL}/api/usuarios")
      .then((respuesta) => {
        setUsuarios(respuesta.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get("${import.meta.env.VITE_API_URL}/api/clientes")
      .then((respuesta) => {
        setClientes(respuesta.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get("${import.meta.env.VITE_API_URL}/api/ventas")
      .then((respuesta) => {
        setVentas(respuesta.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const anularVenta = (id) => {
    const confirmar = window.confirm("¡Deseas anular esta venta!");
    if (!confirmar) return;

    const token = localStorage.getItem("token");

    axios
      .patch(
        `${import.meta.env.VITE_API_URL}/api/ventas/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        setVentas(
          ventas.map((ven) =>
            ven.id_venta === id ? { ...ven, estado: "Anulada" } : ven
          )
        );
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          alert("No tienes permisos para anular ventas");
        } else {
          alert("Error al anular la venta");
        }
      });
  };

  return (
    <div>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Ventas</h1>
        <Link to="/registrar-venta" className="btn btn-primary btn-sm shadow-sm">
          <i className="fas fa-cash-register fa-sm text-white-50 mr-1"></i> Nueva Venta
        </Link>
      </div>

      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            Historial de Ventas
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
                  <th>Cliente</th>
                  <th>Vendedor</th>
                  <th>Fecha</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Método de Pago</th>
                  {esAdmin && <th className="text-center">Acciones</th>}
                </tr>
              </thead>
              <tbody>
                {ventas.map((venta, index) => (
                  <tr key={venta.id_venta}>
                    <td>{index + 1}</td>
                    <td className="font-weight-bold">
                      {clientes.find(
                        (cliente) => cliente.id_cliente === venta.idCliente
                      )?.nombre || "N/A"}
                    </td>
                    <td>
                      {usuarios.find(
                        (usuario) => usuario.id_usuario === venta.idUsuario
                      )?.nombre || "N/A"}
                    </td>
                    <td>{new Date(venta.fecha).toLocaleDateString()}</td>
                    <td className="font-weight-bold text-gray-800">
                      ${Number(venta.total).toLocaleString("es-CO")}
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          venta.estado === "Completada"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {venta.estado}
                      </span>
                    </td>
                    <td>{venta.metodoPago}</td>
                    {esAdmin && (
                      <td className="text-center">
                        {venta.estado !== "Anulada" && (
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => anularVenta(venta.id_venta)}
                            type="button"
                            title="Anular venta"
                          >
                            <i className="fas fa-ban mr-1"></i> Anular
                          </button>
                        )}
                      </td>
                    )}
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

export default Ventas;
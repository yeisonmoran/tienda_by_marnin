import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function DetalleVenta() {
  const { id } = useParams();
  const [venta, setVenta] = useState(null);
  const [productos, setProductos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  let usuarioActual = null;
  try {
    usuarioActual = JSON.parse(localStorage.getItem("usuario") || "null");
  } catch {
    usuarioActual = null;
  }
  const esAdminRol = Number(usuarioActual?.idRol) === 1;

  useEffect(() => {
    const token = localStorage.getItem("token");

    setCargando(true);
    setError(null);

    Promise.all([
      axios.get(`${import.meta.env.VITE_API_URL}/api/ventas/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axios.get(`${import.meta.env.VITE_API_URL}/api/productos`),
      axios.get(`${import.meta.env.VITE_API_URL}/api/clientes`),
      axios.get(`${import.meta.env.VITE_API_URL}/api/usuarios`),
    ])
      .then(([resVenta, resProductos, resClientes, resUsuarios]) => {
        setVenta(resVenta.data);
        setProductos(resProductos.data || []);
        setClientes(resClientes.data || []);
        setUsuarios(resUsuarios.data || []);
      })
      .catch((err) => {
        console.error("Error al cargar detalles de la venta:", err);
        setError(
          err.response?.data?.error ||
            "No se pudo cargar la información de la venta. Verifica tus permisos o la conexión."
        );
      })
      .finally(() => {
        setCargando(false);
      });
  }, [id]);

  if (cargando) {
    return (
      <div className="container-fluid py-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2 text-gray-600">Cargando detalle de la venta...</p>
      </div>
    );
  }

  if (error || !venta) {
    return (
      <div className="container-fluid py-4">
        <div className="alert alert-danger" role="alert">
          <h5 className="alert-heading">
            <i className="fas fa-exclamation-triangle mr-2"></i> Error al cargar la venta
          </h5>
          <p>{error || "Venta no encontrada."}</p>
          <hr />
          <Link to="/list-ventas" className="btn btn-secondary btn-sm">
            <i className="fas fa-arrow-left mr-1"></i> Volver a Ventas
          </Link>
        </div>
      </div>
    );
  }

  const tieneGanancia =
    esAdminRol &&
    Array.isArray(venta.detalles) &&
    venta.detalles.length > 0 &&
    "ganancia" in venta.detalles[0];

  const clienteEncontrado = clientes.find(
    (c) => c.id_cliente === venta.idCliente
  );
  const vendedorEncontrado = usuarios.find(
    (u) => u.id_usuario === venta.idUsuario
  );

  return (
    <div>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">
          Detalle de Venta #{venta.id_venta}
        </h1>
        <Link to="/list-ventas" className="btn btn-secondary btn-sm shadow-sm">
          <i className="fas fa-arrow-left fa-sm text-white-50 mr-1"></i> Volver a Ventas
        </Link>
      </div>

      <div className="row mb-4">
        <div className="col-md-6 col-lg-3 mb-3">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                Cliente
              </div>
              <div className="h6 mb-0 font-weight-bold text-gray-800">
                {clienteEncontrado
                  ? `${clienteEncontrado.nombre} (${clienteEncontrado.numDocumento})`
                  : `Cliente #${venta.idCliente}`}
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 mb-3">
          <div className="card border-left-info shadow h-100 py-2">
            <div className="card-body">
              <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                Vendedor / Fecha
              </div>
              <div className="h6 mb-0 font-weight-bold text-gray-800">
                {vendedorEncontrado ? vendedorEncontrado.nombre : `Usuario #${venta.idUsuario}`}
              </div>
              <small className="text-muted">
                {new Date(venta.fecha).toLocaleDateString()}
              </small>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 mb-3">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                Total Venta
              </div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">
                ${Number(venta.total).toLocaleString("es-CO")}
              </div>
              <small className="text-muted">Método: {venta.metodoPago}</small>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 mb-3">
          <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body">
              <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                Estado
              </div>
              <div>
                <span
                  className={`badge ${
                    venta.estado === "Completada" ? "bg-success" : "bg-danger"
                  }`}
                >
                  {venta.estado}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            Productos de la Venta
          </h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-hover mb-0" width="100%" cellSpacing="0">
              <thead className="thead-light">
                <tr>
                  <th>#</th>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio Unitario</th>
                  <th>Subtotal</th>
                  {tieneGanancia && <th>Ganancia</th>}
                </tr>
              </thead>
              <tbody>
                {venta.detalles && venta.detalles.length > 0 ? (
                  venta.detalles.map((linea, index) => {
                    const prod = productos.find(
                      (p) => p.id_producto === linea.idProducto
                    );
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td className="font-weight-bold">
                          {prod ? prod.nombre : `Producto #${linea.idProducto}`}
                        </td>
                        <td>{linea.cantidad}</td>
                        <td>${Number(linea.precioUnitario).toLocaleString("es-CO")}</td>
                        <td>${Number(linea.subtotal).toLocaleString("es-CO")}</td>
                        {tieneGanancia && (
                          <td className="text-success font-weight-bold">
                            ${Number(linea.ganancia || 0).toLocaleString("es-CO")}
                          </td>
                        )}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={tieneGanancia ? 6 : 5} className="text-center text-muted">
                      No hay productos registrados en esta venta.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {tieneGanancia && typeof venta.gananciaTotal !== "undefined" && (
            <div className="mt-4 p-3 bg-light rounded d-flex justify-content-between align-items-center">
              <span className="font-weight-bold text-gray-800">
                Ganancia total de esta venta:
              </span>
              <span className="h5 mb-0 font-weight-bold text-success">
                ${Number(venta.gananciaTotal || 0).toLocaleString("es-CO")}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetalleVenta;
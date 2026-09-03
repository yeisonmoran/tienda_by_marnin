import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [ventas, setVentas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    axios
      .get("${import.meta.env.VITE_API_URL}/api/ventas")
      .then((respuesta) => {
        setVentas(respuesta.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get("${import.meta.env.VITE_API_URL}/api/productos")
      .then((respuesta) => {
        setProductos(respuesta.data);
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
  }, []);

  const totalVentas = ventas.reduce((total, venta) => {
    return total + Number(venta.total || 0);
  }, 0);

  const productosStockBajo = productos.filter((producto) => {
    return Number(producto.stock) <= Number(producto.stockMinimo);
  });

  const cantidadVentas = ventas.length;
  const totalProductos = productos.length;
  const ultimasVentas = ventas.slice(-5).reverse();

  return (
    <div>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
      </div>

      <div className="row">
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Ventas Totales
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    ${totalVentas.toLocaleString("es-CO")}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Ventas Registradas
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {cantidadVentas}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-shopping-cart fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-info shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                    Productos Activos
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {totalProductos}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-box fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                    Alertas de Stock
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {productosStockBajo.length}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-exclamation-triangle fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6 mb-4">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">
                Alertas de Stock Bajo
              </h6>
              <Link to="/inventario" className="btn btn-sm btn-outline-primary">
                Ver Inventario
              </Link>
            </div>
            <div className="card-body">
              {productosStockBajo.length === 0 ? (
                <div className="text-center py-4 text-muted">
                  <i className="fas fa-check-circle fa-2x text-success mb-2 d-block"></i>
                  Niveles de inventario óptimos.
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-bordered table-hover mb-0">
                    <thead className="thead-light">
                      <tr>
                        <th>Código</th>
                        <th>Producto</th>
                        <th>Stock</th>
                        <th>Mínimo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productosStockBajo.slice(0, 5).map((producto) => (
                        <tr key={producto.id_producto}>
                          <td>{producto.codigo}</td>
                          <td>{producto.nombre}</td>
                          <td>
                            <span className="badge bg-danger">
                              {producto.stock} uds.
                            </span>
                          </td>
                          <td>{producto.stockMinimo} uds.</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-6 mb-4">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">
                Ventas Recientes
              </h6>
              <Link to="/list-ventas" className="btn btn-sm btn-outline-primary">
                Ver Todas
              </Link>
            </div>
            <div className="card-body">
              {ultimasVentas.length === 0 ? (
                <div className="text-center py-4 text-muted">
                  <i className="fas fa-receipt fa-2x mb-2 d-block"></i>
                  No hay ventas registradas.
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-bordered table-hover mb-0">
                    <thead className="thead-light">
                      <tr>
                        <th>Fecha</th>
                        <th>Total</th>
                        <th>Método</th>
                        <th>Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ultimasVentas.map((venta) => (
                        <tr key={venta.id_venta}>
                          <td>{new Date(venta.fecha).toLocaleDateString()}</td>
                          <td>${Number(venta.total).toLocaleString("es-CO")}</td>
                          <td>{venta.metodoPago}</td>
                          <td>
                            <span
                              className={`badge ${venta.estado === "Completada"
                                  ? "bg-success"
                                  : "bg-danger"
                                }`}
                            >
                              {venta.estado}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
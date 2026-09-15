import { useEffect, useState } from "react";
import axios from "axios";

function Inventario() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [soloStockB, setSoloStockB] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/productos`)
      .then((respuesta) => {
        setProductos(respuesta.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/categorias`)
      .then((respuesta) => {
        setCategorias(respuesta.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const productosFiltrados = soloStockB
    ? productos.filter(
        (producto) =>
          Number(producto.stock) <= Number(producto.stockMinimo)
      )
    : productos;

  return (
    <div>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Inventario</h1>
        <div className="form-check form-switch bg-white px-3 py-2 rounded shadow-sm">
          <input
            className="form-check-input ms-0 me-2"
            type="checkbox"
            id="stockCheck"
            checked={soloStockB}
            onChange={(e) => setSoloStockB(e.target.checked)}
          />
          <label
            className="form-check-label font-weight-bold text-gray-700"
            htmlFor="stockCheck"
          >
            Solo stock bajo
          </label>
        </div>
      </div>

      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            Existencias y Control de Stock
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
                  <th>Código</th>
                  <th>Producto</th>
                  <th>Marca</th>
                  <th>Categoría</th>
                  <th>Stock Actual</th>
                  <th>Stock Mínimo</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {productosFiltrados.map((producto, index) => {
                  const esBajo =
                    Number(producto.stock) <= Number(producto.stockMinimo);
                  return (
                    <tr key={producto.id_producto}>
                      <td>{index + 1}</td>
                      <td>{producto.codigo}</td>
                      <td className="font-weight-bold">{producto.nombre}</td>
                      <td>{producto.marca}</td>
                      <td>
                        <span className="badge bg-info text-white">
                          {categorias.find(
                            (c) => c.id_categoria === producto.idCategoria
                          )?.nombre || "Sin categoría"}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            esBajo ? "bg-danger" : "bg-success"
                          }`}
                        >
                          {producto.stock} uds.
                        </span>
                      </td>
                      <td>{producto.stockMinimo} uds.</td>
                      <td>
                        <span
                          className={`badge ${
                            esBajo ? "bg-warning text-dark" : "bg-success"
                          }`}
                        >
                          {esBajo ? "Stock Bajo" : "Disponible"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inventario;
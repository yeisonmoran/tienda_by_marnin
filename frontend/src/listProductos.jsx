import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Producto() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  let usuario = null;
  try {
    usuario = JSON.parse(localStorage.getItem("usuario") || "null");
  } catch {
    usuario = null;
  }
  const esAdmin = Number(usuario?.idRol) === 1;

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/productos")
      .then((respuesta) => {
        setProductos(respuesta.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios
      .get("http://localhost:3000/api/categorias")
      .then((respuesta) => {
        setCategorias(respuesta.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const eliminarProducto = (id) => {
    const confirmar = window.confirm("¡Deseas eliminar este producto!");
    if (!confirmar) return;

    const token = localStorage.getItem("token");

    axios
      .delete(`http://localhost:3000/api/productos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setProductos(productos.filter((pro) => pro.id_producto !== id));
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          alert("No tienes permisos para eliminar este producto");
        } else {
          alert("Error al eliminar el producto");
        }
      });
  };

  return (
    <div>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Productos</h1>
        {esAdmin && (
          <Link to="/registrar-producto" className="btn btn-primary btn-sm shadow-sm">
            <i className="fas fa-plus fa-sm text-white-50 mr-1"></i> Nuevo Producto
          </Link>
        )}
      </div>

      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Listado de Productos</h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-hover mb-0" width="100%" cellSpacing="0">
              <thead className="thead-light">
                <tr>
                  <th>#</th>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Marca</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Mínimo</th>
                  <th>Descripción</th>
                  {esAdmin && <th className="text-center">Acciones</th>}
                </tr>
              </thead>
              <tbody>
                {productos.map((producto, index) => (
                  <tr key={producto.id_producto}>
                    <td>{index + 1}</td>
                    <td>{producto.codigo}</td>
                    <td className="font-weight-bold">{producto.nombre}</td>
                    <td>{producto.marca}</td>
                    <td>
                      <span className="badge bg-info text-white">
                        {categorias.find(
                          (categoria) =>
                            categoria.id_categoria === producto.idCategoria
                        )?.nombre || "Sin categoría"}
                      </span>
                    </td>
                    <td>${Number(producto.precio).toLocaleString("es-CO")}</td>
                    <td>
                      <span
                        className={`badge ${
                          Number(producto.stock) <= Number(producto.stockMinimo)
                            ? "bg-danger"
                            : "bg-success"
                        }`}
                      >
                        {producto.stock} uds.
                      </span>
                    </td>
                    <td>{producto.stockMinimo} uds.</td>
                    <td>{producto.descripcion}</td>
                    {esAdmin && (
                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-1">
                          <Link
                            to={`/productos/editar/${producto.id_producto}`}
                            className="btn btn-warning btn-sm"
                            title="Editar"
                          >
                            <i className="fas fa-edit"></i>
                          </Link>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => eliminarProducto(producto.id_producto)}
                            title="Eliminar"
                            type="button"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
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

export default Producto;
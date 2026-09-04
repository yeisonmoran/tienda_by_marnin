import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Producto() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filtros, setFiltros] = useState({
    codigo: "",
    categoria: "",
    marca: "",
    linea: "",
  });

  let usuario = null;
  try {
    usuario = JSON.parse(localStorage.getItem("usuario") || "null");
  } catch {
    usuario = null;
  }
  const esAdmin = Number(usuario?.idRol) === 1;

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

  const handleFiltro = (e) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));
  };

  const limpiarFiltros = () => {
    setFiltros({ codigo: "", categoria: "", marca: "", linea: "" });
  };

  const productosFiltrados = useMemo(() => {
    return productos.filter((producto) => {
      const matchCodigo =
        !filtros.codigo ||
        producto.codigo?.toLowerCase().includes(filtros.codigo.toLowerCase().trim());

      const matchCategoria =
        !filtros.categoria ||
        String(producto.idCategoria) === String(filtros.categoria);

      const matchMarca =
        !filtros.marca ||
        producto.marca?.toLowerCase().includes(filtros.marca.toLowerCase().trim());

      const matchLinea =
        !filtros.linea ||
        producto.linea?.toLowerCase().includes(filtros.linea.toLowerCase().trim());

      return matchCodigo && matchCategoria && matchMarca && matchLinea;
    });
  }, [productos, filtros]);

  const eliminarProducto = (id) => {
    const confirmar = window.confirm("¡Deseas eliminar este producto!");
    if (!confirmar) return;

    const token = localStorage.getItem("token");

    axios
      .delete(`${import.meta.env.VITE_API_URL}/api/productos/${id}`, {
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

  const hayFiltrosActivos = Boolean(
    filtros.codigo || filtros.categoria || filtros.marca || filtros.linea
  );

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
        <div className="card-header py-3 d-flex justify-content-between align-items-center">
          <h6 className="m-0 font-weight-bold text-primary">Listado de Productos</h6>
          {hayFiltrosActivos && (
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={limpiarFiltros}
              type="button"
            >
              <i className="fas fa-eraser mr-1"></i> Limpiar filtros
            </button>
          )}
        </div>

        <div className="card-body">
          {/* Barra de Filtros */}
          <div className="row g-2 mb-3">
            <div className="col-md-3">
              <input
                type="text"
                name="codigo"
                className="form-control form-control-sm"
                placeholder="Filtrar por código..."
                value={filtros.codigo}
                onChange={handleFiltro}
              />
            </div>
            <div className="col-md-3">
              <select
                name="categoria"
                className="form-control form-control-sm"
                value={filtros.categoria}
                onChange={handleFiltro}
              >
                <option value="">Todas las categorías</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id_categoria} value={categoria.id_categoria}>
                    {categoria.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <input
                type="text"
                name="marca"
                className="form-control form-control-sm"
                placeholder="Filtrar por marca..."
                value={filtros.marca}
                onChange={handleFiltro}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                name="linea"
                className="form-control form-control-sm"
                placeholder="Filtrar por línea..."
                value={filtros.linea}
                onChange={handleFiltro}
              />
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered table-hover mb-0" width="100%" cellSpacing="0">
              <thead className="thead-light">
                <tr>
                  <th>#</th>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Marca</th>
                  <th>Línea</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Precio compra</th>
                  <th>Mínimo</th>
                  <th>Descripción</th>
                  {esAdmin && <th className="text-center">Acciones</th>}
                </tr>
              </thead>
              <tbody>
                {productosFiltrados.length > 0 ? (
                  productosFiltrados.map((producto, index) => (
                    <tr key={producto.id_producto}>
                      <td>{index + 1}</td>
                      <td>{producto.codigo}</td>
                      <td className="font-weight-bold">{producto.nombre}</td>
                      <td>{producto.marca}</td>
                      <td>{producto.linea}</td>
                      <td>
                        <span className="badge bg-info text-white">
                          {categorias.find(
                            (categoria) =>
                              categoria.id_categoria === producto.idCategoria
                          )?.nombre || "Sin categoría"}
                        </span>
                      </td>
                      <td>${Number(producto.precio).toLocaleString("es-CO")}</td>
                      <td>${Number(producto.precioCompra).toLocaleString("es-CO")}</td>
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
                  ))
                ) : (
                  <tr>
                    <td colSpan={esAdmin ? 11 : 10} className="text-center py-4 text-muted">
                      <i className="fas fa-box-open mr-2"></i> No se encontraron productos con los filtros aplicados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Producto;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Categoria() {
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
      .get("http://localhost:3000/api/categorias")
      .then((respuesta) => {
        setCategorias(respuesta.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const eliminarCategoria = (id) => {
    const confirmar = window.confirm("¡Deseas eliminar esta categoria!");
    if (!confirmar) return;

    const token = localStorage.getItem("token");

    axios
      .delete(`http://localhost:3000/api/categorias/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setCategorias(categorias.filter((cat) => cat.id_categoria !== id));
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          alert("No tienes permisos para eliminar esta categoría");
        } else {
          alert("Error al eliminar la categoría");
        }
      });
  };

  return (
    <div>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Categorías</h1>
        {esAdmin && (
          <Link
            to="/registrar-categoria"
            className="btn btn-primary btn-sm shadow-sm"
          >
            <i className="fas fa-plus fa-sm text-white-50 mr-1"></i> Nueva Categoría
          </Link>
        )}
      </div>

      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            Listado de Categorías
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
                  <th>Descripción</th>
                  {esAdmin && <th className="text-center">Acciones</th>}
                </tr>
              </thead>
              <tbody>
                {categorias.map((categoria, index) => (
                  <tr key={categoria.id_categoria}>
                    <td>{index + 1}</td>
                    <td className="font-weight-bold">{categoria.nombre}</td>
                    <td>{categoria.descripcion}</td>
                    {esAdmin && (
                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-1">
                          <Link
                            to={`/categorias/editar/${categoria.id_categoria}`}
                            className="btn btn-warning btn-sm"
                            title="Editar"
                          >
                            <i className="fas fa-edit"></i>
                          </Link>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              eliminarCategoria(categoria.id_categoria)
                            }
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

export default Categoria;

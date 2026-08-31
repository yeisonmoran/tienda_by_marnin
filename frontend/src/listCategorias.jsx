import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import axios from "axios";


function Categoria() {

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:3000/api/categorias")

      .then(respuesta => {
        setCategorias(respuesta.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);


  const eliminarCategoria = (id) => {
    const confirmar = window.confirm("¡Deseas eliminar esta categoria!");

    if (!confirmar) return;

    const token = localStorage.getItem("token");

    axios.delete(`http://localhost:3000/api/categorias/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      })

      .then(() => {
        setCategorias(categorias.filter(cat => cat.id_categoria !== id));
      })
      .catch(error => {
        console.error(error);
      });
  };



  return (

    <div>
      <h1>Categorías</h1>

      <div className="mb-2"><Link to="/registrar-categoria" className="btn btn-primary">Nueva Categoría</Link></div>

      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria, index) => (
            <tr key={categoria.id_categoria}>
              <td>{index + 1}</td>
              <td>{categoria.nombre}</td>
              <td>{categoria.descripcion}</td>
              <td>
                <div className="mb-3">
                  <Button variant="warning" style={{ width: "89px" }}><Link to={`/categorias/editar/${categoria.id_categoria}`}>Editar</Link></Button>
                </div>
                <Button variant="danger" onClick={() => eliminarCategoria(categoria.id_categoria)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );

}
export default Categoria



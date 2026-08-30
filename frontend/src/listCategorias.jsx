import { useEffect, useState } from "react";
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
      <h1>Categorias</h1>
      <ul>
        {categorias.map(categoria => (
          <li key={categoria.id_categoria}>
            {categoria.nombre} - {categoria.descripcion}
            <Link to={`/categorias/editar/${categoria.id_categoria}`}>Editar</Link>
            <button onClick={() => eliminarCategoria(categoria.id_categoria)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );

}
export default Categoria



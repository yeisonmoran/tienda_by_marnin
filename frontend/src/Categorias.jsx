import { useEffect, useState } from "react";

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

  return (
    <div>
      <h1>Categorias</h1>
      <ul>
        {categorias.map(categoria => (
          <li key={categoria.id_categoria}>
            {categoria.nombre} - {categoria.descripcion}
          </li>
        ))}
      </ul>
    </div>
  );

}
export default Categoria



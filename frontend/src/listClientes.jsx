import { useEffect, useState } from "react";

import axios from "axios";

function Clientes() {

  const [clientes, setClientes] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:3000/api/clientes")
      .then(respuesta => {
        setClientes(respuesta.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Clientes</h1>
      <ul>
        {clientes.map(cliente => (
          <li key={cliente.id_cliente}>
            {cliente.idCliente} - {cliente.nombre} -
            {cliente.correo} - {cliente.telefono} -
            {cliente.ciudad} - {cliente.numDocumento} {cliente.idTipoDocumento}
          </li>
        ))}
      </ul>
    </div>
  );

}
export default Clientes



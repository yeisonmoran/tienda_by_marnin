import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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


  const eliminarCliente = (id) => {
    const confirmar = window.confirm("¡Deseas eliminar este cliente!");

    if (!confirmar) return;

    const token = localStorage.getItem("token");

    axios.delete(`http://localhost:3000/api/clientes/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      })

      .then(() => {
        setClientes(clientes.filter(cli => cli.id_cliente !== id));
      })
      .catch(error => {
        console.error(error);
      });
  };



  return (
    <div>
      <h1>Clientes</h1>
      <ul>
        {clientes.map(cliente => (
          <li key={cliente.id_cliente}>
            {cliente.nombre} - {cliente.correo} - {cliente.telefono} - {cliente.ciudad}
            <Link to={`/clientes/editar/${cliente.id_cliente}`}>Editar</Link>
            <button onClick={() => eliminarCliente(cliente.id_cliente)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );

}
export default Clientes



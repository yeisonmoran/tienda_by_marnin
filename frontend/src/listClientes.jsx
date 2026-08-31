import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
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

  const [tipo_documentos, setIdTipoDocumentos] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:3000/api/tipos-documento")
      .then(respuesta => {
        setIdTipoDocumentos(respuesta.data);
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
      <div className="mb-3"><Link to="/registrar-cliente" className="btn btn-primary">Nuevo cliente</Link></div>

      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Telefono</th>
            <th>Ciudad</th>
            <th>Documento</th>
            <th>Identificación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente, index) => (
            <tr key={cliente.id_cliente}>
              <td>{index + 1}</td>
              <td>{cliente.nombre}</td>
              <td>{cliente.correo}</td>
              <td>{cliente.telefono}</td>
              <td>{cliente.ciudad}</td>
              <td>

                {tipo_documentos.find(

                  tipoDocuemto => tipoDocuemto.id_tipo_documento === cliente.idTipoDocumento)?.nombre}

              </td>
              <td>{cliente.numDocumento}</td>
              <td>
                <div className="mb-3">
                  <Button variant="warning" style={{ width: "89px" }}><Link to={`/clientes/editar/${cliente.id_cliente}`}>Editar</Link></Button>
                </div>
                <Button variant="danger" onClick={() => eliminarCliente(cliente.id_cliente)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );

}
export default Clientes



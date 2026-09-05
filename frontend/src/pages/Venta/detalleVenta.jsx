import { useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import Table from "react-bootstrap/Table";
import axios from "axios";


function DetalleVenta() {
  const { id } = useParams();
  const [venta, setVenta] = useState(null);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get(`${import.meta.env.VITE_API_URL}/api/ventas/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(respuesta => setVenta(respuesta.data))
      .catch(error => console.error(error));

    axios.get(`${import.meta.env.VITE_API_URL}/api/productos`)
      .then(respuesta => setProductos(respuesta.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!venta) return <p>Cargando...</p>;

  const esAdmin = venta.detalles[0] && "ganancia" in venta.detalles[0];

  return (
    <div>
      <h1>Detalle de Venta #{venta.id_venta}</h1>
      <p><strong>Fecha:</strong> {new Date(venta.fecha).toLocaleDateString()}</p>
      <p><strong>Total:</strong> ${venta.total}</p>
      <p><strong>Estado:</strong> {venta.estado}</p>

      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Subtotal</th>
            {esAdmin && <th>Ganancia</th>}
          </tr>
        </thead>
        <tbody>
          {venta.detalles.map((linea, index) => (
            <tr key={index}>
              <td>{productos.find(p => p.id_producto === linea.idProducto)?.nombre}</td>
              <td>{linea.cantidad}</td>
              <td>${linea.precioUnitario}</td>
              <td>${linea.subtotal}</td>
              {esAdmin && <td>${linea.ganancia.toFixed(2)}</td>}
            </tr>
          ))}
        </tbody>
      </Table>

      {esAdmin && (
        <h4>Ganancia total de esta venta: ${venta.gananciaTotal.toFixed(2)}</h4>
      )}
    </div>
  );
}

export default DetalleVenta;
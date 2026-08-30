import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Producto() {

    const [productos, setProductos] = useState([]);

    useEffect(() => {

        axios.get("http://localhost:3000/api/productos")

            .then(respuesta => {
                setProductos(respuesta.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const eliminarProducto = (id) => {
        const confirmar = window.confirm("¡Deseas eliminar este producto!");

        if (!confirmar) return;

        const token = localStorage.getItem("token");

        axios.delete(`http://localhost:3000/api/productos/${id}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            })

            .then(() => {
                setProductos(productos.filter(pro => pro.id_producto !== id));
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div>
            <h1>Productos</h1>

            <ul>
                {productos.map(producto => (
                    <li key={producto.id_producto}>
                        {producto.codigo} - {producto.nombre} - {producto.marca} -
                        {producto.precio} - {producto.stock} - {producto.stockMinimo} -
                        {producto.descripcion}
                        <Link to={`/productos/editar/${producto.id_producto}`}>Editar</Link>
                        <button onClick={() => eliminarProducto(producto.id_producto)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Producto
import { useEffect, useState } from "react";

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

    return (
        <div>
            <h1>Productos</h1>

            <ul>
                {productos.map(producto =>(
                    <li key = {producto.id_producto}>
                        {producto.codigo} - {producto.nombre} - 
                        {producto.idCategoria} - {producto.precio} - 
                        {producto.stock} - {producto.stockMinimo} - {producto.descripcion} 
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Producto
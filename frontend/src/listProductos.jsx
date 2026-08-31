import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
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
            <div className="mb-3"><Link to="/registrar-producto" className="btn btn-primary">Nuevo producto</Link></div>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Codigo</th>
                        <th>Nombre</th>
                        <th>Marca</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Stock Minimo</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto, index) => (
                        <tr key={producto.id_producto}>
                            <td>{index + 1}</td>
                            <td>{producto.codigo}</td>
                            <td>{producto.nombre}</td>
                            <td>{producto.marca}</td>

                            <td>{categorias.find(
                                categoria => categoria.id_categoria === producto.idCategoria)?.nombre}
                            </td>

                            <td>{producto.precio}</td>
                            <td>{producto.stock}</td>
                            <td>{producto.stockMinimo}</td>
                            <td>{producto.descripcion}</td>
                            <td>
                                <div className="mb-3">
                                    <Button variant="warning" style={{ width: "89px" }}><Link to={`/productos/editar/${producto.id_producto}`}>Editar</Link></Button>
                                </div>
                                <Button variant="danger" onClick={() => eliminarProducto(producto.id_producto)}>Eliminar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default Producto
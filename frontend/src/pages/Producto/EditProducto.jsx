import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


function EditarProducto() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [codigo, setCodigo] = useState("");
    const [nombre, setNombre] = useState("");
    const [marca, setMarca] = useState("");
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState("");
    const [stockMinimo, setStockMinimo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [mensaje, setMensaje] = useState("");


    useEffect(() => {
        axios.get(`http://localhost:3000/api/productos/${id}`)
            .then(respuesta => {
                setCodigo(respuesta.data.codigo);
                setNombre(respuesta.data.nombre);
                setMarca(respuesta.data.marca);
                setPrecio(respuesta.data.precio);
                setStock(respuesta.data.stock);
                setStockMinimo(respuesta.data.stockMinimo);
                setDescripcion(respuesta.data.descripcion);
            })

            .catch(error => {
                console.error(error);
            });
    }, [id]);




    const manejarSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        axios.put(`http://localhost:3000/api/productos/${id}`,
            {
                codigo, nombre, marca, stock: Number(stock),
                precio: Number(precio), stockMinimo: Number(stockMinimo), descripcion
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((respuesta) => {
                setMensaje("Producto actualizado con exito: " + respuesta.data.nombre);
                navigate("/");
            })
            .catch(error => {
                console.error(error)
                setMensaje("Error al actualizar");
            });
    };



    return (
        <div>
            <h2>Editar producto</h2>
            <form onSubmit={manejarSubmit}>
                <div>
                    <label>Codigo: </label>
                    <input
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                    />
                </div>
                <div>
                    <label>Nombre: </label>
                    <input
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div>
                    <label>Marca: </label>
                    <input
                        value={marca}
                        onChange={(e) => setMarca(e.target.value)}
                    />
                </div>
                <div>
                    <label>Precio: </label>
                    <input
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                    />
                </div>
                <div>
                    <label>Stock: </label>
                    <input
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                    />
                </div>
                <div>
                    <label>Stock Minimo: </label>
                    <input
                        value={stockMinimo}
                        onChange={(e) => setStockMinimo(e.target.value)}
                    />
                </div>
                <div>
                    <label>Descripcion: </label>
                    <input
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    /> <br />
                </div>
                <div>
                    <button type="submit">Actualizar</button>
                </div>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
}

export default EditarProducto;
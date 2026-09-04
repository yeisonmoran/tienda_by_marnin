import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


function EditarProducto() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [codigo, setCodigo] = useState("");
    const [nombre, setNombre] = useState("");
    const [marca, setMarca] = useState("");
    const [linea, setLinea] = useState("");
    const [precio, setPrecio] = useState("");
    const [precioCompra, setPrecioCompra] = useState("");
    const [stock, setStock] = useState("");
    const [stockMinimo, setStockMinimo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [mensaje, setMensaje] = useState("");


    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/productos/${id}`)
            .then(respuesta => {
                setCodigo(respuesta.data.codigo || "");
                setNombre(respuesta.data.nombre || "");
                setMarca(respuesta.data.marca || "");
                setLinea(respuesta.data.linea || "");
                setPrecio(respuesta.data.precio || "");
                setPrecioCompra(respuesta.data.precioCompra || "");
                setStock(respuesta.data.stock || "");
                setStockMinimo(respuesta.data.stockMinimo || "");
                setDescripcion(respuesta.data.descripcion || "");
            })

            .catch(error => {
                console.error(error);
            });
    }, [id]);




    const manejarSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        axios.put(`${import.meta.env.VITE_API_URL}/api/productos/${id}`,
            {
                codigo, nombre, marca, linea, stock: Number(stock),
                precio: Number(precio), precioCompra: Number(precioCompra), stockMinimo: Number(stockMinimo), descripcion
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((respuesta) => {
                setMensaje("Producto actualizado con éxito: " + respuesta.data.nombre);
                navigate("/");
            })
            .catch(error => {
                console.error(error)
                setMensaje("Error al actualizar");
            });
    };



    return (
        <div className="card p-4" style={{maxWidth: "500px"}}>
            <h2 className="">Editar producto</h2>
            <form onSubmit={manejarSubmit}>
                <div className="mb-3">
                    <label className="form-label">Código: </label>
                    <input className="form-control"
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Nombre: </label>
                    <input className="form-control"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Marca: </label>
                    <input className="form-control"
                        value={marca}
                        onChange={(e) => setMarca(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Línea: </label>
                    <input className="form-control"
                        value={linea}
                        onChange={(e) => setLinea(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Precio: </label>
                    <input className="form-control" placeholder="$"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                    />
                </div>

                 <div className="mb-3">
                    <label className="form-label">Precio de compra: </label>
                    <input
                        className="form-control"
                        type="number"
                        value={precioCompra}
                        onChange={(e) => setPrecioCompra(e.target.value)}
                    />
                </div>
                
                <div className="mb-3">
                    <label className="form-label">Stock: </label>
                    <input className="form-control" placeholder="uds."
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Stock Mínimo: </label>
                    <input className="form-control" placeholder="uds."
                        value={stockMinimo}
                        onChange={(e) => setStockMinimo(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Descripción: </label>
                    <input className="form-control"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    /> <br />
                </div>
                    <button type="submit" className="btn btn-primary">Actualizar</button>
            </form>
            {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
        </div>
    );
}

export default EditarProducto;
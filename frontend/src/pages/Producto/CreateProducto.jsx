import { useState, useEffect } from "react";
import axios from "axios";


function RegistrarProducto() {

    const [codigo, setCodigo] = useState("");
    const [nombre, setNombre] = useState("");
    const [marca, setMarca] = useState("");
    const [idCategoria, setIdCategoria] = useState("");
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState("");
    const [stockMinimo, setStockMinimo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [mensaje, setMensaje] = useState("");

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

    const manejarSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        axios.post("http://localhost:3000/api/productos",
            {
                codigo, nombre, marca, idCategoria: Number(idCategoria), stock: Number(stock),
                precio: Number(precio), stockMinimo: Number(stockMinimo), descripcion
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then(respuesta => {
                setMensaje("Producto registrado con exito: " + respuesta.data.nombre);
                setCodigo("");
                setNombre("");
                setMarca("");
                setIdCategoria("");
                setPrecio("");
                setStock("");
                setStockMinimo("");
                setDescripcion("");
            })
            .catch(error => {
                console.error(error)
                setMensaje("Error al registrar producto");
            });
    };

    return (
        <div className="card p-4" style={{ maxWidth: "500px"}}>
            <h2 className="mb-4">Crear producto</h2>
            <form onSubmit={manejarSubmit}>
                <div className="mb-3">
                    <label className="form-label">Codigo: </label>
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
                    <label className="form-label">Categoría: </label>
                    <select className="form-select"
                        value={idCategoria}
                        onChange={(e) => setIdCategoria(e.target.value)}
                    >
                        <option value="">Selecciona la categoría</option>
                        {categorias.map(categoria => (
                            <option key={categoria.id_categoria} value={categoria.id_categoria}>
                                {categoria.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Precio: </label>
                    <input className="form-control" placeholder="$"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
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
                    <label className="form-label">Stock Minimo: </label>
                    <input className="form-control" placeholder="uds."
                        value={stockMinimo}
                        onChange={(e) => setStockMinimo(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Descripcion: </label>
                    <input className="form-control"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    /> <br />
                </div>
                    <button type="submit" className="btn btn-success">Registrar</button>
            </form>
            {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
        </div>
    );
}

export default RegistrarProducto;
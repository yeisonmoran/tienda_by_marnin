import { useState, useEffect } from "react";
import axios from "axios";


function RegistrarProducto() {

    const [codigo, setCodigo] = useState("");
    const [nombre, setNombre] = useState("");
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
                codigo, nombre, idCategoria: Number(idCategoria), stock: Number(stock),
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
        <div>
            <h2>Crear producto</h2>
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
                    <label>Categoria: </label>
                    <select
                        value={idCategoria}
                        onChange={(e) => setIdCategoria(e.target.value)}
                    >
                        <option value="">Selecciona la categoria</option>
                        {categorias.map(categoria => (
                            <option key={categoria.id_categoria} value={categoria.id_categoria}>
                                {categoria.nombre}
                            </option>
                        ))}
                    </select>
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
                    <button type="submit">Registrar</button>
                </div>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
}

export default RegistrarProducto;
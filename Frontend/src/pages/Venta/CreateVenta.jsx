import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";


function RegistrarVenta() {

    const navigate = useNavigate();

    const [busqueda, setBusqueda] = useState("");
    const [mostrarLista, setMostrarLista] = useState(false);
    const [clientes, setClientes] = useState([]);
    const [metodoPago, setMetodoPago] = useState("efectivo");
    const [productos, setProductos] = useState([]);
    const [idCliente, setIdCliente] = useState("");
    const [detalles, setDetalles] = useState([{ idProducto: "", cantidad: 1 }]);
    const [mensaje, setMensaje] = useState("");

    const seleccionarCliente = (cliente) => {
        setIdCliente(cliente.id_cliente);
        setBusqueda(`${cliente.numDocumento} - ${cliente.nombre}`);
        setMostrarLista(false);
    };


    const clientesFiltrados = clientes.filter(cliente => {
        const doc = String(cliente.numDocumento || "").toLowerCase();
        const nombre = String(cliente.nombre || "").toLowerCase();
        const termino = busqueda.toLowerCase().trim();
        return doc.includes(termino) || nombre.includes(termino);
    });





    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/clientes`)

            .then(respuesta => {
                setClientes(respuesta.data);
            })

            .catch(error => {
                console.error(error);
            });

    }, []);


    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/productos`)

            .then(respuesta => {
                setProductos(respuesta.data);
            })

            .catch(error => {
                console.error(error);
            });

    }, []);

    const agregarLinea = () => {
        setDetalles([...detalles, { idProducto: "", cantidad: 1 }]);
    };

    const quitarLinea = (index) => {
        setDetalles(detalles.filter((_, i) => i !== index));
    };

    const actualizarLinea = (index, campo, valor) => {
        const nuevosDetalles = [...detalles];
        nuevosDetalles[index][campo] = valor;
        setDetalles(nuevosDetalles);
    };

    const calcularTotal = () => {
        return detalles.reduce((total, linea) => {
            const producto = productos.find(p => p.id_producto === Number(linea.idProducto))
            if (!producto) return total;
            return total + (Number(producto.precio) * Number(linea.cantidad));
        }, 0);
    };

    const manejarSubmit = (e) => {
        e.preventDefault();
        setMensaje("");

        const token = localStorage.getItem("token");

        const detallesFormateados = detalles.map(linea => ({
            idProducto: Number(linea.idProducto),
            cantidad: Number(linea.cantidad),
        }));

        axios.post(
            `${import.meta.env.VITE_API_URL}/api/ventas`,
            {
                idCliente: Number(idCliente),
                idUsuario: JSON.parse(localStorage.getItem("usuario")).id_usuario,
                metodoPago,
                detalles: detallesFormateados,
            },
            { headers: { Authorization: `Bearer ${token}` } }
        )
            .then(() => {
                navigate("/list-ventas");
            })
            .catch(error => {
                console.error(error);
                if (error.response?.data?.error === "stock_insuficiente") {
                    setMensaje("Stock insuficiente en uno o más productos.");
                } else {
                    setMensaje("Error al registrar la venta.");
                }
            });
    };



    return (
        <div>
            <h1>Registrar Venta</h1>
            <form onSubmit={manejarSubmit}>

                <div className="mb-3 position-relative">
                    <label className="form-label">Cliente</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Escribe documento o nombre del cliente..."
                        value={busqueda}
                        onChange={(e) => {
                            setBusqueda(e.target.value);
                            setIdCliente("");
                            setMostrarLista(true);
                        }}
                        onFocus={() => {
                            if (busqueda) setMostrarLista(true);
                        }}
                    />

                    {mostrarLista && busqueda && !idCliente && (
                        <ul
                            className="list-group position-absolute w-100 shadow mt-1"
                            style={{ zIndex: 1000, maxHeight: "200px", overflowY: "auto" }}
                        >
                            {clientesFiltrados.length > 0 ? (
                                clientesFiltrados.map(cliente => (
                                    <li
                                        key={cliente.id_cliente}
                                        className="list-group-item list-group-item-action"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => seleccionarCliente(cliente)}
                                    >
                                        <strong>{cliente.numDocumento}</strong> - {cliente.nombre}
                                    </li>
                                ))
                            ) : (
                                <li className="list-group-item text-muted">
                                    No se encontraron clientes
                                </li>
                            )}
                        </ul>
                    )}

                    {idCliente && (
                        <small className="text-success d-block mt-1">
                            ✓ Cliente seleccionado correctamente
                        </small>
                    )}
                </div>

                <div className="mb-3">
                    <label className="form-label">Método de Pago</label>
                    <select
                        className="form-select"
                        value={metodoPago}
                        onChange={(e) => setMetodoPago(e.target.value)}
                    >
                        <option value="Efectivo">Efectivo</option>
                        <option value="Tarjeta">Tarjeta</option>
                        <option value="Transferencia">Transferencia</option>
                    </select>
                </div>

                <h4>Productos</h4>
                {detalles.map((linea, index) => (
                    <div key={index} className="row mb-2 align-items-center">
                        <div className="col-md-6">
                            <select
                                className="form-select"
                                value={linea.idProducto}
                                onChange={(e) => actualizarLinea(index, "idProducto", e.target.value)}
                            >
                                <option value="">-- Selecciona un producto --</option>
                                {productos.map(producto => (
                                    <option key={producto.id_producto} value={producto.id_producto}>
                                        {producto.nombre} - ${producto.precio} (Stock: {producto.stock})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-3">
                            <input
                                type="number"
                                min="1"
                                className="form-control"
                                value={linea.cantidad}
                                onChange={(e) => actualizarLinea(index, "cantidad", e.target.value)}
                            />
                        </div>
                        <div className="col-md-3">
                            <button
                                type="button"
                                className="btn btn-outline-danger"
                                onClick={() => quitarLinea(index)}
                            >
                                Quitar
                            </button>
                        </div>
                    </div>
                ))}

                <button type="button" className="btn btn-secondary mb-3" onClick={agregarLinea}>
                    + Agregar producto
                </button>

                <h4>Total: ${calcularTotal().toFixed(2)}</h4>

                <div className="d-flex aling-items-center gap-2 mt-4">
                    <button type="submit" className="btn btn-success">
                        <i className="fas fa-check me-1"></i>Registrar</button>
                    <Link to="/list-ventas" className="btn btn-secondary">
                        <i className="fas fa-arrow-left me-1"></i> Cancelar
                    </Link>
                </div>
            </form>

            {mensaje && <div className="alert alert-danger mt-3">{mensaje}</div>}
        </div>
    );
}

export default RegistrarVenta;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function RegistrarVenta() {

    const navigate = useNavigate();

    const [clientes, setClientes] = useState([]);
    const [metodoPago, setMetodoPago] = useState("efectivo");
    const [productos, setProductos] = useState([]);
    const [idCliente, setIdCliente] = useState("");
    const [detalles, setDetalles] = useState([{ idProducto: "", cantidad: 1 }]);
    const [mensaje, setMensaje] = useState("");



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
                <div className="mb-3">
                    <label className="form-label">Cliente</label>
                    <select
                        className="form-select"
                        value={idCliente}
                        onChange={(e) => setIdCliente(e.target.value)}
                    >
                        <option value="">-- Selecciona un cliente --</option>
                        {clientes.map(cliente => (
                            <option key={cliente.id_cliente} value={cliente.id_cliente}>
                                {cliente.nombre}
                            </option>
                        ))}
                    </select>
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

                <button type="submit" className="btn btn-success">Registrar</button>
            </form>

            {mensaje && <div className="alert alert-danger mt-3">{mensaje}</div>}
        </div>
    );
}

export default RegistrarVenta;
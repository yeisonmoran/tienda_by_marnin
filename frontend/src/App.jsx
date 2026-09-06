import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Categoria from "./listCategorias";
import Producto from "./listProductos";
import Clientes from "./listClientes"
import Usuarios from "./listUsuarios";
import Ventas from "./listVentas";
import Dashboard from "./pages/Dashboard";
import Inventario from "./pages/Inventario/listInventario";
import RegistrarCategoria from "./pages/Categoria/CreateCategoria";
import RegistrarProducto from "./pages/Producto/CreateProducto"
import EditarCategoria from "./pages/Categoria/EditCategoria";
import EditarProducto from "./pages/Producto/EditProducto";
import EditarCliente from "./pages/Cliente/EditCliente";
import EditarUsuario from "./pages/Usuario/EditUsuario";
import RegistrarCliente from "./pages/Cliente/CreateCliente";
import RegistrarUsuario from "./pages/Usuario/CreateUsuario";
import RegistrarVenta from "./pages/Venta/CreateVenta";
import DetalleVenta from "./pages/Venta/detalleVenta";
import Login from "./pages/Login/Login";
import RutaPrivada from "./routes/RutaPrivada";
import RutaAdmin from "./routes/RutaAdmin";
import NoAutorizado from "./routes/NoAutorizado";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login-users" element={<Login />} />

        <Route element={<RutaPrivada />} >
          <Route element={<Layout />}>
            <Route path="/" element={<Categoria />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/list-productos" element={<Producto />} />
            <Route path="/list-clientes" element={<Clientes />} />
            <Route path="/list-ventas" element={<Ventas />} />
            <Route path="/inventario" element={<Inventario />} />
            <Route path="/no-autorizado" element={<NoAutorizado />}></Route>
            <Route path="/ventas/detalle/:id" element={<DetalleVenta />}></Route>
            <Route path="/venta/detalle/:id" element={<DetalleVenta />}></Route>

            <Route element={<RutaAdmin />}>
              <Route path="/list-usuarios" element={<Usuarios />} />
              <Route path="/registrar-usuario" element={<RegistrarUsuario />} />
              <Route path="/usuarios/editar/:id" element={<EditarUsuario />} />
              <Route path="/registrar-categoria" element={<RegistrarCategoria />} />
              <Route path="/categorias/editar/:id" element={<EditarCategoria />} />
              <Route path="/registrar-producto" element={<RegistrarProducto />} />
              <Route path="/productos/editar/:id" element={<EditarProducto />} />
            </Route>



            <Route path="/clientes/editar/:id" element={<EditarCliente />} />
            <Route path="/registrar-cliente" element={<RegistrarCliente />} />
            <Route path="/registrar-venta" element={<RegistrarVenta />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );

}

export default App;
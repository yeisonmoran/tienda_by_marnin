import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Categoria from "./listCategorias";
import Producto from "./listProductos";
import Clientes from "./listClientes"
import Usuarios from "./listUsuarios";
import RegistrarCategoria from "./pages/Categoria/CreateCategoria";
import RegistrarProducto from "./pages/Producto/CreateProducto"
import EditarCategoria from "./pages/Categoria/EditCategoria";
import EditarProducto from "./pages/Producto/EditProducto";
import EditarCliente from "./pages/Cliente/EditCliente";
import EditarUsuario from "./pages/Usuario/EditUsuario";
import RegistrarCliente from "./pages/Cliente/CreateCliente";
import RegistrarUsuario from "./pages/Usuario/CreateUsuario";
import Login from "./pages/Login/Login";


function App() {
  return (
    <BrowserRouter>
      <nav className="container">
        <ul>
          <li><strong>Sistema Ventas</strong></li>
        </ul>
        <ul>
          <li><Link to="/">Categorias</Link></li>
          <li><Link to="/list-Productos">Productos</Link></li>
          <li><Link to="/list-clientes">Clientes</Link></li>
          <li><Link to="/list-usuarios">Usuarios</Link></li>
          <li><Link to="/registrar-categoria">Registrar categoria</Link></li>
          <li><Link to="/registrar-producto">Registrar producto</Link></li>
          <li><Link to="/registrar-cliente">Registrar cliente</Link></li>
          <li><Link to="/registrar-usuario">Registrar usuario</Link></li>
          <li><Link to="/Login-users">Login</Link></li>
        </ul>
      </nav>

      <main className="container">
        <Routes>
          <Route path="/" element={<Categoria />} />
          <Route path="/list-Productos" element={<Producto />} />
          <Route path="/list-clientes" element={<Clientes />} />
          <Route path="/list-usuarios" element={<Usuarios />} />
          <Route path="/registrar-categoria" element={<RegistrarCategoria />} />
          <Route path="/categorias/editar/:id" element={<EditarCategoria />} />
          <Route path="/productos/editar/:id" element={<EditarProducto />} />
          <Route path="/clientes/editar/:id" element={<EditarCliente />} />
          <Route path="/usuarios/editar/:id" element={<EditarUsuario />} />
          <Route path="/registrar-producto" element={<RegistrarProducto />} />
          <Route path="/registrar-cliente" element={<RegistrarCliente />} />
          <Route path="/registrar-usuario" element={<RegistrarUsuario />} />
          <Route path="/Login-users" element={<Login />} />
        </Routes>
      </main>
    </BrowserRouter>
  );

}

export default App;
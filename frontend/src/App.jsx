import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Categoria from "./listCategorias";
import Producto from "./listProductos";
import Clientes from "./listClientes"
import Usuarios from "./listUsuarios";
import RegistrarCategoria from "./pages/Categoria/CreateCategoria";
import RegistrarProducto from "./pages/Producto/CreateProducto";
import RegistrarCliente from "./pages/Cliente/CreateCliente";
import RegistrarUsuario from "./pages/Usuario/CreateUsuario";
import Login from "./pages/Login/Login";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Categorias</Link>
        {" | "}
        <Link to="/list-Productos">Productos</Link>
        {" | "}
        <Link to="/list-clientes">Clientes</Link>
        {" | "}
        <Link to="/list-usuarios">Usuarios</Link>
        {" | "}
        <Link to="/registrar-categoria">Registrar Categoria</Link>
        {" | "}
        <Link to="/registrar-producto">Registrar Producto</Link>
        {" | "}
        <Link to="/registrar-cliente">Registrar cliente</Link>
        {" | "}
        <Link to="/registrar-usuario">Registrar usuario</Link>
        {" | "}
        <Link to="/Login-users">Login</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Categoria />} />
        <Route path="/list-Productos" element={<Producto />} />
        <Route path="/list-clientes" element={<Clientes />} />
        <Route path="/list-usuarios" element={<Usuarios />} />
        <Route path="/registrar-categoria" element={<RegistrarCategoria />} />
        <Route path="/registrar-producto" element={<RegistrarProducto />} />
        <Route path="/registrar-cliente" element={<RegistrarCliente />} />
        <Route path="/registrar-usuario" element={<RegistrarUsuario />} />
        <Route path="/Login-users" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );

}

export default App;
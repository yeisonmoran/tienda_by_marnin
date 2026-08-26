import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Categoria from "./Categorias";
import Producto from "./Productos";
import RegistrarCategoria from "./pages/Categoria/CrearCategoria";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Categorias</Link>
        {" | "}
        <Link to="/Producto">Productos</Link>
        {" | "}
        <Link to="/registrar-categoria">RegistrarCategoria</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Categoria />} />
        <Route path="/Producto" element={<Producto />} />
        <Route path="/registrar-categoria" element={<RegistrarCategoria />} />
      </Routes>
    </BrowserRouter>
  );

}

export default App;
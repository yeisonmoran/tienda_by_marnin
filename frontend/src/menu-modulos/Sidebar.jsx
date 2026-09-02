import { Link, useLocation, useNavigate } from "react-router-dom";

function Sidebar({ toggled, setToggled }) {
  const location = useLocation();
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/login-users");
  };

  let usuario = null;
  try {
    usuario = JSON.parse(localStorage.getItem("usuario") || "null");
  } catch {
    usuario = null;
  }
  const esAdmin = Number(usuario?.idRol) === 1;

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <ul className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${toggled ? "toggled" : ""}`} id="accordionSidebar">
      <Link className="sidebar-brand d-flex align-items-center justify-content-center py-3" to="/Dashboard">
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-store"></i>
        </div>
        <div className="sidebar-brand-text mx-2 font-weight-bold">By Marnin</div>
      </Link>

      <hr className="sidebar-divider my-0" />

      <div className="sidebar-heading mt-3">Principal</div>

      <li className={`nav-item ${isActive("/Dashboard") ? "active" : ""}`}>
        <Link className="nav-link" to="/Dashboard">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </Link>
      </li>

      <hr className="sidebar-divider" />

      <div className="sidebar-heading">Catálogo</div>

      <li className={`nav-item ${isActive("/list-productos") ? "active" : ""}`}>
        <Link className="nav-link" to="/list-productos">
          <i className="fas fa-fw fa-box"></i>
          <span>Productos</span>
        </Link>
      </li>

      <li className={`nav-item ${isActive("/") ? "active" : ""}`}>
        <Link className="nav-link" to="/">
          <i className="fas fa-fw fa-tags"></i>
          <span>Categorías</span>
        </Link>
      </li>

      <hr className="sidebar-divider" />

      <div className="sidebar-heading">Operaciones</div>

      <li className={`nav-item ${isActive("/list-ventas") ? "active" : ""}`}>
        <Link className="nav-link" to="/list-ventas">
          <i className="fas fa-fw fa-cash-register"></i>
          <span>Ventas</span>
        </Link>
      </li>

      <li className={`nav-item ${isActive("/list-clientes") ? "active" : ""}`}>
        <Link className="nav-link" to="/list-clientes">
          <i className="fas fa-fw fa-users"></i>
          <span>Clientes</span>
        </Link>
      </li>

      <li className={`nav-item ${isActive("/inventario") ? "active" : ""}`}>
        <Link className="nav-link" to="/inventario">
          <i className="fas fa-fw fa-clipboard-list"></i>
          <span>Inventario</span>
        </Link>
      </li>

      {esAdmin && (
        <>
          <hr className="sidebar-divider" />
          <div className="sidebar-heading">Administración</div>
          <li className={`nav-item ${isActive("/list-usuarios") ? "active" : ""}`}>
            <Link className="nav-link" to="/list-usuarios">
              <i className="fas fa-fw fa-user-shield"></i>
              <span>Usuarios</span>
            </Link>
          </li>
        </>
      )}

      <hr className="sidebar-divider d-none d-md-block" />

      <li className="nav-item">
        <button className="nav-link btn btn-link text-white text-left w-100 border-0" onClick={cerrarSesion}>
          <i className="fas fa-fw fa-sign-out-alt"></i>
          <span>Cerrar sesión</span>
        </button>
      </li>

      <div className="text-center d-none d-md-inline mt-3">
        <button
          className="rounded-circle border-0"
          id="sidebarToggle"
          onClick={() => setToggled(!toggled)}
          type="button"
        ></button>
      </div>
    </ul>
  );
}

export default Sidebar;
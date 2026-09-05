import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../menu-modulos/Sidebar";

function Layout() {
  const [toggled, setToggled] = useState(false);
  const navigate = useNavigate();

  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/login-users");
  };

  return (
    <div id="wrapper">
      <Sidebar toggled={toggled} setToggled={setToggled} />

      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow px-4">
            <button
              id="sidebarToggleTop"
              className="btn btn-link d-md-none rounded-circle mr-3"
              onClick={() => setToggled(!toggled)}
              type="button"
            >
              <i className="fa fa-bars"></i>
            </button>

            <div className="d-none d-sm-inline-block mr-auto my-2 my-md-0 mw-100">
              <span className="text-gray-600 font-weight-bold">
                &bull; Panel de Administración
              </span>
            </div>

            <ul className="navbar-nav ml-auto align-items-center">
              <li className="nav-item d-flex align-items-center">
                <span className="mr-2 d-none d-lg-inline text-gray-600 small font-weight-bold">
                  {usuario.nombre || "Administrador"}
                </span>
                <div
                  className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center shadow-sm"
                  style={{ width: "36px", height: "36px" }}
                >
                  <i className="fas fa-user-circle fa-lg"></i>
                </div>
              
              </li>
            </ul>
          </nav>

          <div className="container-fluid px-4 pb-4">
            <Outlet />
          </div>
        </div>

        <footer className="sticky-footer bg-white mt-auto py-3">
          <div className="container my-auto">
            <div className="copyright text-center my-auto">
              <span>Copyright &copy; By Marnin Makeup {new Date().getFullYear()}</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Layout;
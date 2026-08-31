import { Link } from "react-router-dom";


function Sidebar() {
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">


            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink"></i>
                </div>
                <div className="sidebar-brand-text mx-3">By Marnin<p>Mokup</p></div>
            </a>

            <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-store"></i>
                </div>
            </Link>

            <hr className="sidebar-divider my-0" />

            <li className="nav-item">
                <Link className="nav-link" to="/">
                    <i className="fas fa-fw fa-tags"></i>
                    <span>Categorías</span>
                </Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" to="/list-productos">
                    <i className="fas fa-fw fa-box"></i>
                    <span>Productos</span>
                </Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" to="/list-clientes">
                    <i className="fas fa-fw fa-users"></i>
                    <span>Clientes</span>
                </Link>
            </li>

            <li className="nav-item">
                <Link className="nav-link" to="/list-usuarios">
                    <i className="fas fa-fw fa-user-shield"></i>
                    <span>Usuarios</span>
                </Link>
            </li>

            <hr className="sidebar-divider d-none d-md-block" />

        </ul>
    );
}

export default Sidebar;
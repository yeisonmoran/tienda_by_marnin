import { Navigate, Outlet } from "react-router-dom";

function RutaPrivada() {

    const token = localStorage.getItem("token");

    return token ? <Outlet /> : <Navigate to="/login-users"/>;

}

export default RutaPrivada;
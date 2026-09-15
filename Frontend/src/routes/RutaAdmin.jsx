import { Navigate, Outlet } from "react-router-dom";

function RutaAdmin() {
  const usuarioGuardado = localStorage.getItem("usuario");
  let usuario = null;

  try {
    usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
  } catch {
    usuario = null;
  }

  const esAdmin = Number(usuario?.idRol) === 1;

  return esAdmin ? <Outlet /> : <Navigate to="/no-autorizado" />;
}

export default RutaAdmin;
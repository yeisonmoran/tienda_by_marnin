import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {

    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/");

        }
    }, []);

    const manejarSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:3000/api/usuarios/login", { correo, contrasena })

            .then(respuesta => {
                const { token, usuario } = respuesta.data;

                localStorage.setItem("token", token);
                localStorage.setItem("usuario", JSON.stringify(usuario));

                navigate("/");
            })

            .catch(err => {
                console.error(err)
                setError("Correo o contraseña incorrecta");
            });
    };

    return (

        <div className="bg-gradient-primary d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="container">
                <div className="row justify-content-center w-100">
                    <div className="col-xl-10 col-lg-3 col-md-10">

                        <div className="card o-hidden border-0 shadow-lg">
                            <div className="card-body p-0">
                                <div className="row">

                                    {/* Columna izquierda: logo de la empresa */}
                                    <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center bg-primary">
                                        <img
                                            src="./img/Logo.png"
                                            alt="Logo"
                                            style={{ maxWidth: "110%", height: "100%" }}
                                        />
                                    </div>

                                    {/* Columna derecha: formulario */}
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Bienvenido</h1>
                                            </div>
                                            <form className="user" onSubmit={manejarSubmit}>
                                                <div className="form-group mb-3">
                                                    <input
                                                        type="email"
                                                        className="form-control form-control-user"
                                                        placeholder="Correo electrónico"
                                                        value={correo}
                                                        onChange={(e) => setCorreo(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group mb-3">
                                                    <input
                                                        type="password"
                                                        className="form-control form-control-user"
                                                        placeholder="Contraseña"
                                                        value={contrasena}
                                                        onChange={(e) => setContrasena(e.target.value)}
                                                    />
                                                </div>
                                                <button type="submit" className="btn btn-primary btn-user btn-block w-100">
                                                    Iniciar sesión
                                                </button>
                                            </form>
                                            {error && (
                                                <div className="alert alert-danger mt-3 text-center">{error}</div>
                                            )}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    );
}


export default Login
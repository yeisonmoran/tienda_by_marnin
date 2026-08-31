import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {

    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

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
        <div className="card p-4" style={{maxWidth: "500px"}}>
            <h2 className="mb-4">Iniciar seccion</h2>
            <form onSubmit={manejarSubmit}>
                <div className="mb-3">
                    <label className="form-label">correo: </label>
                    <input className="form-control"
                        type="email"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Contraseña: </label>
                    <input className="form-control"
                        type="Password"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                    /> <br />
                </div>
                <button className="btn btn-primary" type="submit">Ingresar</button>
            </form>
            {error && <div style={{ color: "red" }} className="alert alert-info mt-3">{error}</div>}
        </div>
    );
}


export default Login
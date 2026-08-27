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
        <div>
            <h2>Iniciar seccion</h2>
            <form onSubmit={manejarSubmit}>
                <div>
                    <label>correo: </label>
                    <input
                        type="email"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                    />
                </div>
                <div>
                    <label>Contraseña: </label>
                    <input
                        type="Password"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                    /> <br />
                </div>
                <button type="submit">Ingresar</button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}


export default Login
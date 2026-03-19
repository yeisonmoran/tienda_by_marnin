<h1>Login</h1>

<form method="POST">
    <label for="correo">Correo electronico</label><br>

    <input type="email" name="correo" required><br><br>

    <label for="contrasena">Contraseña</label><br>

    <input type="password" name="contrasena" required><br><br>

    <button type="submit">Ingresar</button>

</form>

<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    include('../config/conexion.php');

    $correo = $_POST['correo'];
    $contrasena = $_POST['contrasena'];


    $sql = "SELECT * FROM usuarios WHERE correo = '$correo' AND contrasena = '$contrasena'";

    $resultado = $conexion->query($sql);

    if ($resultado->num_rows > 0) {
        $usuario = $resultado->fetch_assoc();
        $id_rol = $usuario['id_rol'];

        if ($id_rol == 1) {
            echo '¡Bienvenido Adminsitrador¡';

        } elseif ($id_rol == 2) {
            echo '!Ingreso como usuario¡';
        } elseif ($id_rol == 3) {
            echo '!Ingreso como vendedor¡';
        } else {
            echo '!No se reconoce este error¡';
        }
    } else {
        echo '!Correo o contraseña incorrectos.¡';
    }

}


?>
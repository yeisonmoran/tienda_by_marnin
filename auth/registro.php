<h1>Registro</h1>

<form method="POST">
    <label>Nombre</label><br>
    <input type="text" name="nombre"><br><br>

    <label>Correo electronico</label><br>
    <input type="email" name="correo"><br><br>

    <label>Contraseña</label><br>
    <input type="password" name="contrasena" required><br><br>

    <label>Tipo de rol</label><br>

    <select name="id_rol" required>
        <option value="">Seleccione un rol</option>
        <option value="1">Administrador</option>
        <option value="2">Usuario</option>
        <option value="3">Vendedor</option>
    </select><br><br>

    <button type="submit">Registrar</button>
</form>

<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    include('../config/conexion.php');

    $nombre = $_POST['nombre'];
    $correo = $_POST['correo'];
    $contrasena = $_POST['contrasena'];
    $id_rol = $_POST['id_rol'];

    $sql = "INSERT INTO usuarios(nombre, correo, contrasena, id_rol)
    VALUES('$nombre', '$correo', '$contrasena', '$id_rol')";

    if ($conexion->query($sql)) {
        echo "Usuario registrado correctamente";
    } else {
        echo "Error: " . $conexion->error;
    }
}
?>
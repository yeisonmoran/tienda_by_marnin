<h1>Registrar cliente</h1>

<Form method="POST">

    <button type="submit">New cliente</button><br><br>
    
    <label for="nombre">Nombre</label><br>
    <input type="text" name="nombre" required><br><br>

    <label for="correo">Correo electronico</label><br>
    <input type="text" name="correo" required><br><br>

    <label for="telefono">Telefono</label><br>
    <input type="number" name="telefono" required><br><br>
    
    <label for="ciudad">Ciudad</label><br>
    <input type="text" name="ciudad" required><br><br>

    <label for="numero_documento">Numero de documento</label><br>
    <input type="number" name="numero_documento" required><br><br>
    

    <label for="">Tipo de documento</label><br>

    <select name="id_tipo_documento" required>
        <option value="">Seleccione</option>
        <option value="1">(CC) Cedula ciudadania</option>
        <option value="2">(TI) Tarjeta identidad</option>
        <option value="3">(CE) Cedula extranjera</option>
        <option value="4">(PAS) Pasaporte</option>
    </select>

</Form>

<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    include('../../config/conexion.php');

    $nombre = $_POST['nombre'];
    
    $correo = $_POST['correo'];

    $telefono = $_POST['telefono'];

    $numero_documento = $_POST['numero_documento'];
    
    $ciudad = $_POST['ciudad'];

    $id_tipo_documento = $_POST['id_tipo_documento'];


    $sql = "INSERT INTO clientes(nombre, correo, telefono, numero_documento, ciudad, id_tipo_documento)
    VALUES('$nombre', '$correo', '$telefono', '$numero_documento', '$ciudad', '$id_tipo_documento')";


    if ($conexion->query($sql)) {
        echo "Cliente registrado correctamente";
    } else {
        echo "Error: " . $conexion->error;
    }
}
?>
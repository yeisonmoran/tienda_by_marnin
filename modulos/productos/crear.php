<h1>Registro de productos</h1>

<form method="POST">
    <label for="">Codigo</label><br>
    <input type="num" name="codigo"><br><br>
    <label for="">Nombre</label>
    <input type="text" name="nombre"><br>
    <label for="">Precio</label>
    <input type="number" name="precio"><br>
    <label for="">Stock</label>
    <input type="number" name="stock"><br>
    <button type="submit">Guardar</button>
</form>

<?php

include("../../config/conexion.php");

if ($_POST) {

    $codigo = $_POST['codigo'];
    $nombre = $_POST['nombre'];
    $precio = $_POST['precio'];
    $stock = $_POST['stock'];


    $sql = "INSERT INTO productos (codigo, nombre, precio, stock)
VALUES ('$codigo', '$nombre', '$precio', '$stock')";

    if ($conexion->query($sql)) {

        echo "Producto guardado correctamente";

    } else {
        echo "Error: " . $conexion->error;
    }

}

?>
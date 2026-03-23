<h1>Registro de productos</h1>

<form method="POST">
    <label for="">Codigo</label><br>
    <input type="num" name="codigo"><br><br>
    <label for="">Nombre</label><br>
    <input type="text" name="nombre"><br>
    <label for="">Precio</label><br>
    <input type="number" name="precio"><br>
    <label for="">Stock</label><br>
    <input type="number" name="stock"><br>
    <label for="">Categoria</label><br>
    <input type="text" name="categoria"><br>
    <label for="">Descripcion</label><br>
    <input type="text" name="descripcion"><br><br>
    <button type="submit">Guardar</button>
</form>

<?php

include("../../config/conexion.php");

if ($_POST) {

    $codigo = $_POST['codigo'];
    $nombre = $_POST['nombre'];
    $precio = $_POST['precio'];
    $stock = $_POST['stock'];
    $categoria = $_POST['categoria'];
    $descripcion = $_POST['descripcion'];


    $sql = "INSERT INTO productos (codigo, nombre, precio, stock, categoria, descripcion)
VALUES ('$codigo', '$nombre', '$precio', '$stock', '$categoria', '$descripcion')";

    if ($conexion->query($sql)) {

        echo "Producto guardado correctamente";

    } else {
        echo "Error: " . $conexion->error;
    }

}

?>
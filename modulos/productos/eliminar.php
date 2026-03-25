<?php
include('../../config/conexion.php');

// Verificamos que se haya enviado un ID por la URL
if (isset($_GET['id'])) {
    $id = $_GET['id'];

    // Usamos el objeto $conexion (mysqli) y el nombre de columna correcto: id_producto
    $sql = "DELETE FROM productos WHERE id_producto = $id";

    // Ejecutamos la consulta
    if ($conexion->query($sql)) {
        // Si se elimina correctamente, redirigimos de vuelta a la lista
        header("Location: listar.php");
        exit();
    } else {
        echo "Error al eliminar el producto: " . $conexion->error;
    }
} else {
    echo "Error: No se recibio el ID del producto a eliminar.";
}
?>
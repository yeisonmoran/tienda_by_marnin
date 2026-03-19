<?php

include("../../config/conexion.php");

$sql = "SELECT id_producto, codigo, nombre, precio, stock FROM productos";
$resultado = $conexion->query($sql);

?>


<h1>Productos</h1>

<table border="1">
<tr>
    <th>Código</th>
    <th>Nombre</th>
    <th>Precio</th>
    <th>Stock</th>
    <th>Acciones</th>
</tr>


<?php while ($fila = $resultado->fetch_assoc()) { ?>
    <tr>
        <td><?= $fila['codigo'] ?></td>
        <td><?= $fila['nombre'] ?></td>
        <td><?= $fila['precio'] ?></td>
        <td><?= $fila['stock'] ?></td>
        <td><a href="editar.php?id=<?= $fila['id_producto'] ?>">Editar</a></td>
    </tr>
<?php } 

?>

</table>
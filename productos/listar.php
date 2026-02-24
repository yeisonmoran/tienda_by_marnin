<?php

include("../config/conexion.php");

$sql = "SELECT codigo, nombre, precio, stock FROM productos";
$resultado = $conexion->query($sql);

?>


<h1>Productos</h1>

<table border="1">
<tr>
    <th>codigo</th>
    <th>Nombre</th>
    <th>Precio</th>
    <th>Stock</th>
</tr>


<?php while ($fila = $resultado->fetch_assoc()) { ?>
    <tr>
        <td><?= $fila['codigo'] ?></td>
        <td><?= $fila['nombre'] ?></td>
        <td><?= $fila['precio'] ?></td>
        <td><?= $fila['stock'] ?></td>
    </tr>
<?php } 

?>

</table>
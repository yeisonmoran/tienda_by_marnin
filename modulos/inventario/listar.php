<?php 

include("../../config/conexion.php");

$sql = "SELECT nombre, stock FROM productos";

$resultado = $conexion->query($sql);

?>


<h1>Inventario</h1>

<table border="1">

<tr>
    <th>Productos</th>
    <th>Stock</th>
    <th>Estado</th>
</tr>


<?php while ($fila = $resultado->fetch_assoc()) { ?>


<?php

if ($fila['stock'] > 0) {

    $estado = "Disponible";
  
} else {
    $estado = "Agotado";
}

?>

<tr>
    <td><?php echo $fila['nombre']?></td>
    <td><?php echo $fila['stock']?></td>
    <td><?php echo $estado; ?></td>
</tr>

<?php
} 

?>
</table>
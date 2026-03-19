
<?php

include('../../config/conexion.php');

$sql = "DELETE FROM productos WHERE id_producto

VALUES ('codigo', 'nombre', 'precio', 'stock')"


?>

<form method="POST">
    <label for="">Ingrese id del producto a eliminar</label>
    <input type="num" name="id_producto">
</form>


<?php

?>



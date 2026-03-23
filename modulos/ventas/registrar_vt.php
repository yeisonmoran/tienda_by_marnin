<?php

include("../../config/conexion.php");

?>



<h2>Registrar Ventas</h2>

<form method="POST">

    <label>Producto</label>
    <select name="id_producto">

        <?php
        $productos = $conexion->query("SELECT id_producto, nombre FROM productos");
        while ($p = $productos->fetch_assoc()) {

            ?>

            <option value="<?php echo $p['id_producto']; ?>">

                <?php echo $p['nombre']; ?>

            </option>

        <?php } ?>

    </select><br><br>


    <label>Cantidad</label><br>

    <input type="number" name="cantidad" min="1" required><br><br>

    <label for="time">Fecha de registro</label><br>

    <input type="date" name="fecha" required><br><br>

    <label for="estado">Estado</label>

    <input type="text" name="estado" required>

    <button type="submit">Vender</button><br>

    


</form>


<?php

    if ($_POST) {
        $id_producto = $_POST['id_producto'];
        $cantidad = $_POST['cantidad'];

        // 1️⃣ Consultar stock actual
        $consulta = $conexion->query(
            "SELECT stock FROM productos WHERE id_producto = $id_producto"
        );
        $producto = $consulta->fetch_assoc();

        // 2️⃣ Validar stock
        if ($producto['stock'] >= $cantidad) {

            // 3️⃣ Restar stock
            $nuevo_stock = $producto['stock'] - $cantidad;

            $conexion->query(
                "UPDATE productos 
             SET stock = $nuevo_stock 
             WHERE id_producto = $id_producto"
            );

            echo "Venta registrada correctamente";


        } else {
            echo "No hay stock suficiente";
        }
    }


?>
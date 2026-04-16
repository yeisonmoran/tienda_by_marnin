<?php
include('../../includes/header.php');
include("../../config/conexion.php");

$mensaje = "";
if ($_POST) {
    // Recibimos los datos del formulario, incluyendo el nuevo id_cliente
    $id_producto = $_POST['id_producto'];
    $id_cliente  = $_POST['id_cliente'];
    $cantidad    = $_POST['cantidad'];
    $fecha       = $_POST['fecha'];
    $estado      = $_POST['estado'];

    // 1. Consultar stock actual
    $consulta = $conexion->query("SELECT stock FROM productos WHERE id_producto = $id_producto");
    $producto = $consulta->fetch_assoc();

    // 2. Validar stock
    if ($producto['stock'] >= $cantidad) {
        // 3. Restar stock
        $nuevo_stock = $producto['stock'] - $cantidad;
        $conexion->query("UPDATE productos SET stock = $nuevo_stock WHERE id_producto = $id_producto");
        
        $mensaje = "<div class='alert alert-success'>Venta registrada y stock actualizado correctamente.</div>";
    } else {
        $mensaje = "<div class='alert alert-danger'>Error: No hay stock suficiente para esta venta.</div>";
    }
}
?>

<section class="content mt-3">
    <div class="container-fluid">
        <div class="card card-primary">
            <div class="card-header">
                <h3 class="card-title">Registrar Nueva Venta</h3>
            </div>
            <div class="card-body">
                <?= $mensaje ?>
                
                <!-- ¡REGLA DE ORO DE HTML! NUNCA metas una etiqueta <form> dentro de otro <form> -->
                <form method="POST">
                    
                    <div class="row">
                        <!-- COLUMNA 1: CLIENTE -->
                        <div class="col-md-6 form-group">
                            <label>Cliente</label>
                            <select name="id_cliente" class="form-control" required>
                                <option value="">Seleccione el cliente...</option>
                                <?php
                                // Nos traemos todos los clientes de la BD
                                $clientes = $conexion->query("SELECT id_cliente, nombre, numero_documento FROM clientes");
                                while ($c = $clientes->fetch_assoc()) {
                                    // Y los inyectamos en las opciones del selector
                                    echo "<option value='{$c['id_cliente']}'>{$c['nombre']} - Doc: {$c['numero_documento']}</option>";
                                }
                                ?>
                            </select>
                        </div>

                        <!-- COLUMNA 2: PRODUCTO -->
                        <div class="col-md-6 form-group">
                            <label>Producto a vender</label>
                            <select name="id_producto" class="form-control" required>
                                <option value="">Seleccione un producto...</option>
                                <?php
                                $productos = $conexion->query("SELECT id_producto, nombre, stock, precio FROM productos");
                                while ($p = $productos->fetch_assoc()) {
                                    echo "<option value='{$p['id_producto']}'>{$p['nombre']} (Stock: {$p['stock']} | $ {$p['precio']})</option>";
                                }
                                ?>
                            </select>
                        </div>

                        <!-- COLUMNA 3: CANTIDAD -->
                        <div class="col-md-4 form-group">
                            <label>Cantidad (Ej: 2 unidades)</label>
                            <input type="number" name="cantidad" class="form-control" min="1" required>
                        </div>

                        <!-- COLUMNA 4: FECHA -->
                        <div class="col-md-4 form-group">
                            <label>Fecha de la venta</label>
                            <input type="date" name="fecha" class="form-control" required>
                        </div>

                        <!-- COLUMNA 5: ESTADO -->
                        <div class="col-md-4 form-group">
                            <label>Estado (Ej: Pagado, Pendiente)</label>
                            <input type="text" name="estado" class="form-control" placeholder="Ej: Completada" required>
                        </div>
                    </div>

                    <br>
                    <button type="submit" class="btn btn-primary"><i class="fas fa-shopping-cart"></i> Registrar Venta</button>
                    <a href="/tienda_by_marnin/index.php" class="btn btn-secondary">Cancelar</a>
                </form>

            </div>
        </div>
    </div>
</section>

<?php include('../../includes/footer.php'); ?>
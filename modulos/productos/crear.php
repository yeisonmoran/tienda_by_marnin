<?php
include('../../includes/header.php');
include("../../config/conexion.php");

$mensaje = "";
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
        $mensaje = "<div class='alert alert-success'>Producto guardado correctamente.</div>";
    } else {
        $mensaje = "<div class='alert alert-danger'>Error: " . $conexion->error . "</div>";
    }
}
?>

<section class="content mt-3">
    <div class="container-fluid">
        <div class="card card-primary">
            <div class="card-header">
                <h3 class="card-title">Registro de Nuevo Producto</h3>
            </div>
            <div class="card-body">
                <?= $mensaje ?>
                
                <form method="POST">
                    <div class="form-group">
                        <label>Código</label>
                        <input type="number" name="codigo" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label>Nombre del Producto</label>
                        <input type="text" name="nombre" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label>Precio</label>
                        <input type="number" step="0.01" name="precio" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label>Stock Inicial</label>
                        <input type="number" name="stock" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label>Categoría</label>
                        <input type="text" name="categoria" class="form-control">
                    </div>
                    <div class="form-group">
                        <label>Descripción</label>
                        <input type="text" name="descripcion" class="form-control">
                    </div>

                    <button type="submit" class="btn btn-primary">Guardar Producto</button>
                    <a href="listar.php" class="btn btn-secondary">Cancelar</a>
                </form>
            </div>
        </div>
    </div>
</section>

<?php include('../../includes/footer.php'); ?>
<?php 
include('../../includes/header.php');
include("../../config/conexion.php");

$sql = "SELECT nombre, stock FROM productos";
$resultado = $conexion->query($sql);
?>

<section class="content mt-3">
    <div class="container-fluid">
        <div class="card card-primary">
            <div class="card-header">
                <h3 class="card-title">Control de Inventario</h3>
            </div>
            <div class="card-body p-0">
                <table class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Stock Disponible</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php while ($fila = $resultado->fetch_assoc()) { 
                            if ($fila['stock'] > 0) {
                                $estado = "<span class='badge badge-success'>Disponible</span>";
                            } else {
                                $estado = "<span class='badge badge-danger'>Agotado</span>";
                            }
                        ?>
                        <tr>
                            <td><?php echo $fila['nombre']; ?></td>
                            <td><?php echo $fila['stock']; ?> Unds.</td>
                            <td><?php echo $estado; ?></td>
                        </tr>
                        <?php } ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</section>

<?php include('../../includes/footer.php'); ?>
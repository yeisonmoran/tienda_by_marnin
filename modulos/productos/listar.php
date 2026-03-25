<?php
include('../../includes/header.php');
include("../../config/conexion.php");

$sql = "SELECT id_producto, codigo, nombre, precio, stock FROM productos";
$resultado = $conexion->query($sql);

?>

<section class="content mt-3">
    <div class="container-fluid">
        <div class="card card-primary">
            <div class="card-header">
                <h3 class="card-title">Lista de Productos</h3>
            </div>
            <div class="card-body pb-0">
                <a href="crear.php" class="btn btn-success mb-3"><i class="fas fa-plus"></i> Nuevo Producto</a>
            </div>
            <div class="card-body p-0">
                <table class="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php while ($fila = $resultado->fetch_assoc()) { ?>
                            <tr>
                                <td><?= $fila['codigo'] ?></td>
                                <td><?= $fila['nombre'] ?></td>
                                <td>$ <?= $fila['precio'] ?></td>
                                <td><?= $fila['stock'] ?> Unds.</td>
                                <td>
                                    <a href="editar.php?id=<?= $fila['id_producto'] ?>" class="btn btn-warning btn-sm"><i class="fas fa-edit"></i> Editar</a> 
                                    <a href="eliminar.php?id=<?= $fila['id_producto'] ?>" class="btn btn-danger btn-sm" onclick="return confirm('¿Estás seguro de que deseas eliminar este producto?');"><i class="fas fa-trash"></i> Eliminar</a>
                                </td>
                            </tr>
                        <?php } ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</section>

<?php include('../../includes/footer.php'); ?>
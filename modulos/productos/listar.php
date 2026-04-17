<?php
include('../../includes/header.php');
include('../../config/conexion.php');

$resultado = $conexion->query("
    SELECT p.*, c.nombre AS categoria
    FROM productos p
    JOIN categorias c ON p.id_categoria = c.id_categoria
    ORDER BY p.nombre ASC
");
?>

<div class="content-header">
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-6"><h1 class="m-0"><i class="fas fa-boxes mr-2 text-primary"></i>Productos</h1></div>
      <div class="col-sm-6">
        <ol class="breadcrumb float-sm-right">
          <li class="breadcrumb-item"><a href="/tienda_by_marnin/index.php">Inicio</a></li>
          <li class="breadcrumb-item active">Productos</li>
        </ol>
      </div>
    </div>
  </div>
</div>

<section class="content">
  <div class="container-fluid">
    <?php if (isset($_GET['ok'])): ?>
      <div class="alert alert-success alert-dismissible fade show">
        <i class="fas fa-check-circle mr-2"></i>
        <?= match($_GET['ok']) {
          'add'  => 'Producto creado correctamente.',
          'edit' => 'Producto actualizado correctamente.',
          'del'  => 'Producto eliminado correctamente.',
          default => 'Operación realizada.'
        } ?>
        <button type="button" class="close" data-dismiss="alert">&times;</button>
      </div>
    <?php endif; ?>

    <div class="card card-primary card-outline">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-list mr-2"></i>Catálogo de Productos</h3>
        <div class="card-tools">
          <a href="crear.php" class="btn btn-sm btn-success"><i class="fas fa-plus mr-1"></i>Nuevo Producto</a>
        </div>
      </div>
      <div class="card-body p-0">
        <table class="table table-bordered table-striped table-hover mb-0">
          <thead class="thead-dark">
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Mín.</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <?php if ($resultado->num_rows === 0): ?>
              <tr><td colspan="8" class="text-center py-4 text-muted">No hay productos registrados.</td></tr>
            <?php else: ?>
              <?php while ($p = $resultado->fetch_assoc()):
                if ($p['stock'] == 0) {
                  $badge = 'badge-danger'; $estado = 'Agotado';
                } elseif ($p['stock'] <= $p['stock_minimo']) {
                  $badge = 'badge-warning'; $estado = 'Stock bajo';
                } else {
                  $badge = 'badge-success'; $estado = 'Disponible';
                }
              ?>
                <tr class="<?= $p['stock'] <= $p['stock_minimo'] && $p['stock'] > 0 ? 'table-warning' : '' ?><?= $p['stock'] == 0 ? 'table-danger' : '' ?>">
                  <td><code><?= htmlspecialchars($p['codigo']) ?></code></td>
                  <td><b><?= htmlspecialchars($p['nombre']) ?></b>
                    <?php if ($p['descripcion']): ?>
                      <br><small class="text-muted"><?= htmlspecialchars($p['descripcion']) ?></small>
                    <?php endif; ?>
                  </td>
                  <td><span class="badge badge-info"><?= htmlspecialchars($p['categoria']) ?></span></td>
                  <td>$ <?= number_format($p['precio'], 0, ',', '.') ?></td>
                  <td><?= $p['stock'] ?> uds.</td>
                  <td><?= $p['stock_minimo'] ?></td>
                  <td><span class="badge <?= $badge ?>"><?= $estado ?></span></td>
                  <td>
                    <a href="editar.php?id=<?= $p['id_producto'] ?>" class="btn btn-warning btn-sm" title="Editar">
                      <i class="fas fa-edit"></i>
                    </a>
                    <a href="eliminar.php?id=<?= $p['id_producto'] ?>"
                       class="btn btn-danger btn-sm"
                       onclick="return confirm('¿Eliminar el producto <?= htmlspecialchars(addslashes($p['nombre'])) ?>?')"
                       title="Eliminar">
                      <i class="fas fa-trash"></i>
                    </a>
                  </td>
                </tr>
              <?php endwhile; ?>
            <?php endif; ?>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</section>

<?php include('../../includes/footer.php'); ?>
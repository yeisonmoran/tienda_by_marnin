<?php
include('../../includes/header.php');
include('../../config/conexion.php');

$categorias = $conexion->query("
    SELECT c.*, COUNT(p.id_producto) as total_productos
    FROM categorias c
    LEFT JOIN productos p ON p.id_categoria = c.id_categoria
    GROUP BY c.id_categoria
    ORDER BY c.nombre ASC
");
?>

<div class="content-header">
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-6"><h1 class="m-0"><i class="fas fa-tags mr-2 text-primary"></i>Categorías</h1></div>
      <div class="col-sm-6">
        <ol class="breadcrumb float-sm-right">
          <li class="breadcrumb-item"><a href="/tienda_by_marnin/index.php">Inicio</a></li>
          <li class="breadcrumb-item active">Categorías</li>
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
          'add'  => 'Categoría creada correctamente.',
          'edit' => 'Categoría actualizada correctamente.',
          'del'  => 'Categoría eliminada correctamente.',
          default => 'Operación realizada.'
        } ?>
        <button type="button" class="close" data-dismiss="alert">&times;</button>
      </div>
    <?php endif; ?>

    <?php if (isset($_GET['error'])): ?>
      <div class="alert alert-danger alert-dismissible fade show">
        <i class="fas fa-exclamation-triangle mr-2"></i>
        <?php if ($_GET['error'] === 'fk'): ?>
          <b>No se puede eliminar <?= htmlspecialchars($_GET['nombre'] ?? 'este registro') ?>.</b>
          <?= htmlspecialchars($_GET['detalle'] ?? '') ?>
        <?php elseif ($_GET['error'] === 'db'): ?>
          Error en la base de datos al intentar eliminar.
        <?php endif; ?>
        <button type="button" class="close" data-dismiss="alert">&times;</button>
      </div>
    <?php endif; ?>

    <div class="card card-primary card-outline">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-list mr-2"></i>Lista de Categorías</h3>
        <div class="card-tools">
          <a href="crear.php" class="btn btn-sm btn-success"><i class="fas fa-plus mr-1"></i>Nueva Categoría</a>
        </div>
      </div>
      <div class="card-body p-0">
        <table class="table table-bordered table-striped table-hover mb-0">
          <thead class="thead-dark">
            <tr>
              <th>#</th>
              <th><i class="fas fa-tag mr-1"></i>Nombre</th>
              <th><i class="fas fa-info-circle mr-1"></i>Descripción</th>
              <th><i class="fas fa-box mr-1"></i>Productos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <?php if ($categorias->num_rows === 0): ?>
              <tr><td colspan="5" class="text-center py-4 text-muted">No hay categorías registradas.</td></tr>
            <?php else: ?>
              <?php while ($cat = $categorias->fetch_assoc()): ?>
                <tr>
                  <td><?= $cat['id_categoria'] ?></td>
                  <td><b><?= htmlspecialchars($cat['nombre']) ?></b></td>
                  <td><?= htmlspecialchars($cat['descripcion'] ?? '—') ?></td>
                  <td><span class="badge badge-primary"><?= $cat['total_productos'] ?> productos</span></td>
                  <td>
                    <a href="editar.php?id=<?= $cat['id_categoria'] ?>" class="btn btn-warning btn-sm" title="Editar">
                      <i class="fas fa-edit"></i>
                    </a>
                    <a href="eliminar.php?id=<?= $cat['id_categoria'] ?>"
                       class="btn btn-danger btn-sm"
                       onclick="return confirm('¿Eliminar la categoría <?= htmlspecialchars(addslashes($cat['nombre'])) ?>? Los productos asociados quedarán sin categoría.')"
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

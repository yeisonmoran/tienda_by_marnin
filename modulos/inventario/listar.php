<?php
include('../../includes/header.php');
include('../../config/conexion.php');

$productos = $conexion->query("
    SELECT p.*, c.nombre AS categoria
    FROM productos p
    JOIN categorias c ON p.id_categoria = c.id_categoria
    ORDER BY p.stock ASC, p.nombre ASC
");
?>

<div class="content-header">
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-6"><h1 class="m-0"><i class="fas fa-warehouse mr-2 text-primary"></i>Control de Inventario</h1></div>
      <div class="col-sm-6">
        <ol class="breadcrumb float-sm-right">
          <li class="breadcrumb-item"><a href="/tienda_by_marnin/index.php">Inicio</a></li>
          <li class="breadcrumb-item active">Inventario</li>
        </ol>
      </div>
    </div>
  </div>
</div>

<section class="content">
  <div class="container-fluid">

    <!-- Leyenda -->
    <div class="row mb-3">
      <div class="col-md-12">
        <div class="callout callout-info">
          <h5><i class="fas fa-info-circle mr-2"></i>Leyenda de colores</h5>
          <span class="badge badge-success mr-2">Disponible</span> Stock normal &nbsp;|&nbsp;
          <span class="badge badge-warning mr-2">Stock bajo</span> Stock igual o menor al mínimo &nbsp;|&nbsp;
          <span class="badge badge-danger mr-2">Agotado</span> Sin stock
        </div>
      </div>
    </div>

    <div class="card card-primary card-outline">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-list mr-2"></i>Estado del Inventario</h3>
        <div class="card-tools">
          <a href="/tienda_by_marnin/modulos/productos/crear.php" class="btn btn-sm btn-success">
            <i class="fas fa-plus mr-1"></i> Añadir Producto
          </a>
        </div>
      </div>
      <div class="card-body p-0">
        <table class="table table-bordered table-hover mb-0">
          <thead class="thead-dark">
            <tr>
              <th>Código</th>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Stock actual</th>
              <th>Stock mínimo</th>
              <th>Diferencia</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <?php if ($productos->num_rows === 0): ?>
              <tr><td colspan="8" class="text-center py-4 text-muted">No hay productos en el inventario.</td></tr>
            <?php else: ?>
              <?php while ($p = $productos->fetch_assoc()):
                $diff = $p['stock'] - $p['stock_minimo'];
                if ($p['stock'] == 0) {
                  $rowClass = 'table-danger';
                  $badge    = 'badge-danger';
                  $estado   = 'Agotado';
                  $icon     = 'fas fa-times-circle';
                } elseif ($p['stock'] <= $p['stock_minimo']) {
                  $rowClass = 'table-warning';
                  $badge    = 'badge-warning';
                  $estado   = 'Stock bajo';
                  $icon     = 'fas fa-exclamation-triangle';
                } else {
                  $rowClass = '';
                  $badge    = 'badge-success';
                  $estado   = 'Disponible';
                  $icon     = 'fas fa-check-circle';
                }
              ?>
                <tr class="<?= $rowClass ?>">
                  <td><code><?= htmlspecialchars($p['codigo']) ?></code></td>
                  <td><b><?= htmlspecialchars($p['nombre']) ?></b></td>
                  <td><span class="badge badge-info"><?= htmlspecialchars($p['categoria']) ?></span></td>
                  <td>
                    <span class="font-weight-bold"><?= $p['stock'] ?></span> uds.
                    <!-- Barra de progreso -->
                    <?php $pct = $p['stock_minimo'] > 0 ? min(100, round(($p['stock'] / ($p['stock_minimo'] * 2)) * 100)) : 100; ?>
                    <div class="progress mt-1" style="height:6px">
                      <div class="progress-bar bg-<?= $p['stock'] == 0 ? 'danger' : ($p['stock'] <= $p['stock_minimo'] ? 'warning' : 'success') ?>"
                           style="width:<?= $pct ?>%"></div>
                    </div>
                  </td>
                  <td><?= $p['stock_minimo'] ?> uds.</td>
                  <td>
                    <?php if ($diff >= 0): ?>
                      <span class="text-success">+<?= $diff ?></span>
                    <?php else: ?>
                      <span class="text-danger"><?= $diff ?></span>
                    <?php endif; ?>
                  </td>
                  <td><span class="badge <?= $badge ?>"><i class="<?= $icon ?> mr-1"></i><?= $estado ?></span></td>
                  <td>
                    <a href="/tienda_by_marnin/modulos/productos/editar.php?id=<?= $p['id_producto'] ?>"
                       class="btn btn-warning btn-sm" title="Ajustar stock">
                      <i class="fas fa-edit"></i> Ajustar
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
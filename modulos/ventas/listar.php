<?php
include('../../includes/header.php');
include('../../config/conexion.php');

$ventas = $conexion->query("
    SELECT v.*, c.nombre AS cliente, u.nombre AS vendedor
    FROM ventas v
    JOIN clientes  c ON v.id_cliente = c.id_cliente
    JOIN usuarios  u ON v.id_usuario = u.id_usuario
    ORDER BY v.created_at DESC
");
?>

<div class="content-header">
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-6"><h1 class="m-0"><i class="fas fa-history mr-2 text-primary"></i>Historial de Ventas</h1></div>
      <div class="col-sm-6">
        <ol class="breadcrumb float-sm-right">
          <li class="breadcrumb-item"><a href="/tienda_by_marnin/index.php">Inicio</a></li>
          <li class="breadcrumb-item active">Ventas</li>
        </ol>
      </div>
    </div>
  </div>
</div>

<section class="content">
  <div class="container-fluid">
    <div class="card card-primary card-outline">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-list mr-2"></i>Registro de Ventas</h3>
        <div class="card-tools">
          <a href="registrar_vt.php" class="btn btn-sm btn-success"><i class="fas fa-plus mr-1"></i>Nueva Venta</a>
        </div>
      </div>
      <div class="card-body p-0">
        <table class="table table-bordered table-striped table-hover mb-0">
          <thead class="thead-dark">
            <tr>
              <th>#</th>
              <th>Cliente</th>
              <th>Vendedor</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Método pago</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <?php if ($ventas->num_rows === 0): ?>
              <tr><td colspan="8" class="text-center py-4 text-muted">No hay ventas registradas.</td></tr>
            <?php else: ?>
              <?php while ($v = $ventas->fetch_assoc()):
                $badge = match($v['estado']) {
                    'Completada' => 'success',
                    'Pendiente'  => 'warning',
                    'Anulada'    => 'danger',
                    default      => 'secondary'
                };
              ?>
                <tr>
                  <td><b>#<?= $v['id_venta'] ?></b></td>
                  <td><?= htmlspecialchars($v['cliente']) ?></td>
                  <td><?= htmlspecialchars($v['vendedor']) ?></td>
                  <td><?= date('d/m/Y', strtotime($v['fecha'])) ?></td>
                  <td><b>$ <?= number_format($v['total'], 0, ',', '.') ?></b></td>
                  <td><span class="badge badge-<?= $badge ?>"><?= $v['estado'] ?></span></td>
                  <td><?= htmlspecialchars($v['metodo_pago']) ?></td>
                  <td>
                    <a href="detalle.php?id=<?= $v['id_venta'] ?>" class="btn btn-info btn-sm" title="Ver detalle">
                      <i class="fas fa-eye"></i> Detalle
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

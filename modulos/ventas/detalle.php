<?php
include('../../includes/header.php');
include('../../config/conexion.php');

$id = (int)($_GET['id'] ?? 0);
if ($id === 0) { header('Location: listar.php'); exit; }

// Venta general
$stmtV = $conexion->prepare("
    SELECT v.*, c.nombre AS cliente, c.correo AS correo_cliente, c.telefono,
           u.nombre AS vendedor
    FROM ventas v
    JOIN clientes c ON v.id_cliente = c.id_cliente
    JOIN usuarios u ON v.id_usuario = u.id_usuario
    WHERE v.id_venta = ? LIMIT 1
");
$stmtV->bind_param("i", $id);
$stmtV->execute();
$venta = $stmtV->get_result()->fetch_assoc();
if (!$venta) { header('Location: listar.php'); exit; }

// Detalle de productos
$detalle = $conexion->query("
    SELECT d.*, p.nombre AS producto, p.codigo
    FROM detalle_ventas d
    JOIN productos p ON d.id_producto = p.id_producto
    WHERE d.id_venta = $id
");

$badge = match($venta['estado']) {
    'Completada' => 'success',
    'Pendiente'  => 'warning',
    'Anulada'    => 'danger',
    default      => 'secondary'
};
?>

<div class="content-header">
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-6"><h1 class="m-0"><i class="fas fa-receipt mr-2 text-info"></i>Detalle de Venta #<?= $id ?></h1></div>
      <div class="col-sm-6">
        <ol class="breadcrumb float-sm-right">
          <li class="breadcrumb-item"><a href="/tienda_by_marnin/index.php">Inicio</a></li>
          <li class="breadcrumb-item"><a href="listar.php">Ventas</a></li>
          <li class="breadcrumb-item active">Detalle</li>
        </ol>
      </div>
    </div>
  </div>
</div>

<section class="content">
  <div class="container-fluid">
    <div class="row">
      <!-- Info de la venta -->
      <div class="col-md-4">
        <div class="card card-info card-outline">
          <div class="card-header">
            <h3 class="card-title"><i class="fas fa-info-circle mr-2"></i>Información de la Venta</h3>
          </div>
          <div class="card-body">
            <dl class="row mb-0">
              <dt class="col-sm-5">Número:</dt>
              <dd class="col-sm-7"><b>#<?= $venta['id_venta'] ?></b></dd>

              <dt class="col-sm-5">Fecha:</dt>
              <dd class="col-sm-7"><?= date('d/m/Y', strtotime($venta['fecha'])) ?></dd>

              <dt class="col-sm-5">Estado:</dt>
              <dd class="col-sm-7"><span class="badge badge-<?= $badge ?>"><?= $venta['estado'] ?></span></dd>

              <dt class="col-sm-5">Método pago:</dt>
              <dd class="col-sm-7"><?= htmlspecialchars($venta['metodo_pago']) ?></dd>

              <dt class="col-sm-5">Vendedor:</dt>
              <dd class="col-sm-7"><?= htmlspecialchars($venta['vendedor']) ?></dd>

              <dt class="col-sm-5">Total:</dt>
              <dd class="col-sm-7"><h4 class="text-success mb-0"><b>$ <?= number_format($venta['total'], 0, ',', '.') ?></b></h4></dd>
            </dl>
          </div>
        </div>

        <!-- Info del cliente -->
        <div class="card card-secondary card-outline">
          <div class="card-header">
            <h3 class="card-title"><i class="fas fa-user mr-2"></i>Cliente</h3>
          </div>
          <div class="card-body">
            <dl class="row mb-0">
              <dt class="col-sm-4">Nombre:</dt>
              <dd class="col-sm-8"><b><?= htmlspecialchars($venta['cliente']) ?></b></dd>
              <dt class="col-sm-4">Correo:</dt>
              <dd class="col-sm-8"><?= htmlspecialchars($venta['correo_cliente']) ?></dd>
              <dt class="col-sm-4">Teléfono:</dt>
              <dd class="col-sm-8"><?= htmlspecialchars($venta['telefono'] ?? '—') ?></dd>
            </dl>
          </div>
        </div>
      </div>

      <!-- Tabla de productos -->
      <div class="col-md-8">
        <div class="card card-primary card-outline">
          <div class="card-header">
            <h3 class="card-title"><i class="fas fa-boxes mr-2"></i>Productos Vendidos</h3>
          </div>
          <div class="card-body p-0">
            <table class="table table-bordered table-striped mb-0">
              <thead class="thead-dark">
                <tr>
                  <th>Código</th>
                  <th>Producto</th>
                  <th>Precio unit.</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                <?php if ($detalle->num_rows === 0): ?>
                  <tr><td colspan="5" class="text-center text-muted py-3">Sin detalles registrados.</td></tr>
                <?php else: ?>
                  <?php while ($d = $detalle->fetch_assoc()): ?>
                    <tr>
                      <td><code><?= htmlspecialchars($d['codigo']) ?></code></td>
                      <td><?= htmlspecialchars($d['producto']) ?></td>
                      <td>$ <?= number_format($d['precio_unitario'], 0, ',', '.') ?></td>
                      <td><?= $d['cantidad'] ?></td>
                      <td><b>$ <?= number_format($d['subtotal'], 0, ',', '.') ?></b></td>
                    </tr>
                  <?php endwhile; ?>
                <?php endif; ?>
              </tbody>
              <tfoot class="table-success">
                <tr>
                  <td colspan="4" class="text-right font-weight-bold">TOTAL:</td>
                  <td class="font-weight-bold">$ <?= number_format($venta['total'], 0, ',', '.') ?></td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div class="card-footer">
            <a href="listar.php" class="btn btn-secondary"><i class="fas fa-arrow-left mr-1"></i>Volver</a>
            <a href="registrar_vt.php" class="btn btn-success ml-2"><i class="fas fa-plus mr-1"></i>Nueva Venta</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<?php include('../../includes/footer.php'); ?>

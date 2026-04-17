<?php
include('includes/header.php');
include('config/conexion.php');

// Estadísticas reales desde la BD
$total_productos  = $conexion->query("SELECT COUNT(*) as c FROM productos")->fetch_assoc()['c'];
$total_ventas     = $conexion->query("SELECT COUNT(*) as c FROM ventas")->fetch_assoc()['c'];
$total_clientes   = $conexion->query("SELECT COUNT(*) as c FROM clientes")->fetch_assoc()['c'];
$alertas_stock    = $conexion->query("SELECT COUNT(*) as c FROM productos WHERE stock <= stock_minimo")->fetch_assoc()['c'];
$ingresos_mes     = $conexion->query("SELECT COALESCE(SUM(total),0) as s FROM ventas WHERE MONTH(fecha)=MONTH(CURDATE()) AND YEAR(fecha)=YEAR(CURDATE())")->fetch_assoc()['s'];

// Últimas 5 ventas
$ultimas_ventas = $conexion->query("
    SELECT v.id_venta, c.nombre as cliente, v.fecha, v.total, v.estado, v.metodo_pago
    FROM ventas v
    JOIN clientes c ON v.id_cliente = c.id_cliente
    ORDER BY v.created_at DESC LIMIT 5
");

// Productos con stock bajo
$productos_bajos = $conexion->query("
    SELECT nombre, stock, stock_minimo FROM productos
    WHERE stock <= stock_minimo ORDER BY stock ASC LIMIT 5
");
?>

<!-- Content Header -->
<div class="content-header">
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-6">
        <h1 class="m-0"><i class="fas fa-tachometer-alt mr-2 text-primary"></i>Panel de Control</h1>
      </div>
      <div class="col-sm-6">
        <ol class="breadcrumb float-sm-right">
          <li class="breadcrumb-item active">Dashboard</li>
        </ol>
      </div>
    </div>
  </div>
</div>

<section class="content">
  <div class="container-fluid">

    <!-- Tarjetas de estadísticas -->
    <div class="row">
      <div class="col-lg-3 col-6">
        <div class="small-box bg-info">
          <div class="inner">
            <h3><?= number_format($total_productos) ?></h3>
            <p>Productos en Catálogo</p>
          </div>
          <div class="icon"><i class="ion ion-bag"></i></div>
          <a href="/tienda_by_marnin/modulos/productos/listar.php" class="small-box-footer">Ver productos <i class="fas fa-arrow-circle-right"></i></a>
        </div>
      </div>

      <div class="col-lg-3 col-6">
        <div class="small-box bg-success">
          <div class="inner">
            <h3><?= number_format($total_ventas) ?></h3>
            <p>Ventas Realizadas</p>
          </div>
          <div class="icon"><i class="ion ion-stats-bars"></i></div>
          <a href="/tienda_by_marnin/modulos/ventas/registrar_vt.php" class="small-box-footer">Nueva venta <i class="fas fa-arrow-circle-right"></i></a>
        </div>
      </div>

      <div class="col-lg-3 col-6">
        <div class="small-box bg-warning">
          <div class="inner">
            <h3><?= number_format($total_clientes) ?></h3>
            <p>Clientes Registrados</p>
          </div>
          <div class="icon"><i class="ion ion-person-add"></i></div>
          <a href="/tienda_by_marnin/modulos/clientes/listar.php" class="small-box-footer">Ver clientes <i class="fas fa-arrow-circle-right"></i></a>
        </div>
      </div>

      <div class="col-lg-3 col-6">
        <div class="small-box <?= $alertas_stock > 0 ? 'bg-danger' : 'bg-secondary' ?>">
          <div class="inner">
            <h3><?= number_format($alertas_stock) ?></h3>
            <p>Alertas de Stock Bajo</p>
          </div>
          <div class="icon"><i class="ion ion-pie-graph"></i></div>
          <a href="/tienda_by_marnin/modulos/inventario/listar.php" class="small-box-footer">Ver inventario <i class="fas fa-arrow-circle-right"></i></a>
        </div>
      </div>
    </div>

    <!-- Fila con ingresos y gráfica -->
    <div class="row">
      <!-- Card ingresos del mes -->
      <div class="col-md-4">
        <div class="info-box bg-gradient-primary">
          <span class="info-box-icon"><i class="fas fa-dollar-sign"></i></span>
          <div class="info-box-content">
            <span class="info-box-text">Ingresos del mes</span>
            <span class="info-box-number">$ <?= number_format($ingresos_mes, 0, ',', '.') ?></span>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="info-box bg-gradient-success">
          <span class="info-box-icon"><i class="fas fa-shopping-bag"></i></span>
          <div class="info-box-content">
            <span class="info-box-text">Ventas este mes</span>
            <span class="info-box-number">
              <?= $conexion->query("SELECT COUNT(*) as c FROM ventas WHERE MONTH(fecha)=MONTH(CURDATE()) AND YEAR(fecha)=YEAR(CURDATE())")->fetch_assoc()['c'] ?>
            </span>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="info-box bg-gradient-warning">
          <span class="info-box-icon"><i class="fas fa-boxes"></i></span>
          <div class="info-box-content">
            <span class="info-box-text">Total unidades en stock</span>
            <span class="info-box-number">
              <?= number_format($conexion->query("SELECT COALESCE(SUM(stock),0) as s FROM productos")->fetch_assoc()['s']) ?>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Tablas -->
    <div class="row">
      <!-- Últimas ventas -->
      <div class="col-md-8">
        <div class="card card-primary card-outline">
          <div class="card-header">
            <h3 class="card-title"><i class="fas fa-history mr-2"></i>Últimas Ventas</h3>
            <div class="card-tools">
              <a href="/tienda_by_marnin/modulos/ventas/listar.php" class="btn btn-sm btn-primary">Ver todas</a>
            </div>
          </div>
          <div class="card-body p-0">
            <table class="table table-sm table-striped table-hover mb-0">
              <thead class="thead-light">
                <tr>
                  <th>#</th><th>Cliente</th><th>Fecha</th><th>Total</th><th>Estado</th><th>Método</th>
                </tr>
              </thead>
              <tbody>
                <?php if ($ultimas_ventas->num_rows === 0): ?>
                  <tr><td colspan="6" class="text-center text-muted py-3">No hay ventas registradas</td></tr>
                <?php else: ?>
                  <?php while ($v = $ultimas_ventas->fetch_assoc()): ?>
                    <?php
                      $badge = match($v['estado']) {
                          'Completada' => 'success',
                          'Pendiente'  => 'warning',
                          'Anulada'    => 'danger',
                          default      => 'secondary'
                      };
                    ?>
                    <tr>
                      <td><?= $v['id_venta'] ?></td>
                      <td><?= htmlspecialchars($v['cliente']) ?></td>
                      <td><?= date('d/m/Y', strtotime($v['fecha'])) ?></td>
                      <td>$ <?= number_format($v['total'], 0, ',', '.') ?></td>
                      <td><span class="badge badge-<?= $badge ?>"><?= $v['estado'] ?></span></td>
                      <td><?= htmlspecialchars($v['metodo_pago']) ?></td>
                    </tr>
                  <?php endwhile; ?>
                <?php endif; ?>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Stock bajo -->
      <div class="col-md-4">
        <div class="card card-danger card-outline">
          <div class="card-header">
            <h3 class="card-title"><i class="fas fa-exclamation-triangle mr-2"></i>Stock bajo</h3>
            <div class="card-tools">
              <a href="/tienda_by_marnin/modulos/inventario/listar.php" class="btn btn-sm btn-danger">Ver todo</a>
            </div>
          </div>
          <div class="card-body p-0">
            <table class="table table-sm mb-0">
              <thead class="thead-light">
                <tr><th>Producto</th><th>Stock</th><th>Mín</th></tr>
              </thead>
              <tbody>
                <?php if ($productos_bajos->num_rows === 0): ?>
                  <tr><td colspan="3" class="text-center text-muted py-3"><i class="fas fa-check-circle text-success"></i> Sin alertas</td></tr>
                <?php else: ?>
                  <?php while ($p = $productos_bajos->fetch_assoc()): ?>
                    <tr>
                      <td><?= htmlspecialchars($p['nombre']) ?></td>
                      <td><span class="badge badge-danger"><?= $p['stock'] ?></span></td>
                      <td><?= $p['stock_minimo'] ?></td>
                    </tr>
                  <?php endwhile; ?>
                <?php endif; ?>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

  </div>
</section>

<?php include('includes/footer.php'); ?>
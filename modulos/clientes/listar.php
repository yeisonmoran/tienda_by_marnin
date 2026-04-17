<?php
include('../../includes/header.php');
include('../../config/conexion.php');

$clientes = $conexion->query("
    SELECT c.*, td.abreviatura
    FROM clientes c
    JOIN tipos_documento td ON c.id_tipo_documento = td.id_tipo_documento
    ORDER BY c.nombre ASC
");
?>

<div class="content-header">
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-6"><h1 class="m-0"><i class="fas fa-users mr-2 text-primary"></i>Clientes</h1></div>
      <div class="col-sm-6">
        <ol class="breadcrumb float-sm-right">
          <li class="breadcrumb-item"><a href="/tienda_by_marnin/index.php">Inicio</a></li>
          <li class="breadcrumb-item active">Clientes</li>
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
        <?= $_GET['ok'] === 'edit' ? 'Cliente actualizado correctamente.' : 'Cliente eliminado correctamente.' ?>
        <button type="button" class="close" data-dismiss="alert">&times;</button>
      </div>
    <?php endif; ?>

    <div class="card card-primary card-outline">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-list mr-2"></i>Lista de Clientes</h3>
        <div class="card-tools">
          <a href="registrar_client.php" class="btn btn-sm btn-success">
            <i class="fas fa-plus mr-1"></i>Nuevo Cliente
          </a>
        </div>
      </div>
      <div class="card-body p-0">
        <table class="table table-bordered table-striped table-hover mb-0">
          <thead class="thead-dark">
            <tr>
              <th>#</th>
              <th><i class="fas fa-user mr-1"></i>Nombre</th>
              <th><i class="fas fa-envelope mr-1"></i>Correo</th>
              <th><i class="fas fa-phone mr-1"></i>Teléfono</th>
              <th><i class="fas fa-id-card mr-1"></i>Documento</th>
              <th><i class="fas fa-city mr-1"></i>Ciudad</th>
              <th><i class="fas fa-calendar mr-1"></i>Registro</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <?php if ($clientes->num_rows === 0): ?>
              <tr><td colspan="8" class="text-center py-4 text-muted">No hay clientes registrados.</td></tr>
            <?php else: ?>
              <?php while ($c = $clientes->fetch_assoc()): ?>
                <tr>
                  <td><?= $c['id_cliente'] ?></td>
                  <td><b><?= htmlspecialchars($c['nombre']) ?></b></td>
                  <td><?= htmlspecialchars($c['correo']) ?></td>
                  <td><?= htmlspecialchars($c['telefono'] ?? '—') ?></td>
                  <td><span class="badge badge-info"><?= $c['abreviatura'] ?></span> <?= htmlspecialchars($c['numero_documento']) ?></td>
                  <td><?= htmlspecialchars($c['ciudad'] ?? '—') ?></td>
                  <td><?= date('d/m/Y', strtotime($c['created_at'])) ?></td>
                  <td>
                    <a href="editar.php?id=<?= $c['id_cliente'] ?>" class="btn btn-warning btn-sm" title="Editar">
                      <i class="fas fa-edit"></i>
                    </a>
                    <a href="eliminar.php?id=<?= $c['id_cliente'] ?>"
                       class="btn btn-danger btn-sm"
                       onclick="return confirm('¿Eliminar al cliente <?= htmlspecialchars(addslashes($c['nombre'])) ?>?')"
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

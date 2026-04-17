<?php
include('../../includes/header.php');
include('../../config/conexion.php');

// Solo admin puede ver esto
if ($_SESSION['id_rol'] != 1) {
    echo '<div class="content mt-4"><div class="container-fluid"><div class="alert alert-danger"><i class="fas fa-lock mr-2"></i>Acceso denegado. Solo administradores.</div></div></div>';
    include('../../includes/footer.php');
    exit;
}

$usuarios = $conexion->query("
    SELECT u.*, r.nombre_rol, td.abreviatura
    FROM usuarios u
    JOIN roles r ON u.id_rol = r.id_rol
    JOIN tipos_documento td ON u.id_tipo_documento = td.id_tipo_documento
    ORDER BY u.nombre ASC
");
?>

<div class="content-header">
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-6"><h1 class="m-0"><i class="fas fa-user-cog mr-2 text-primary"></i>Usuarios del Sistema</h1></div>
      <div class="col-sm-6">
        <ol class="breadcrumb float-sm-right">
          <li class="breadcrumb-item"><a href="/tienda_by_marnin/index.php">Inicio</a></li>
          <li class="breadcrumb-item active">Usuarios</li>
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
        <?= match($_GET['ok']) { 'edit' => 'Usuario actualizado.', 'del' => 'Usuario eliminado.', default => 'Operación exitosa.' } ?>
        <button type="button" class="close" data-dismiss="alert">&times;</button>
      </div>
    <?php endif; ?>

    <div class="card card-primary card-outline">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-list mr-2"></i>Lista de Usuarios</h3>
        <div class="card-tools">
          <a href="/tienda_by_marnin/auth/registro.php" class="btn btn-sm btn-success">
            <i class="fas fa-plus mr-1"></i> Nuevo Usuario
          </a>
        </div>
      </div>
      <div class="card-body p-0">
        <table class="table table-bordered table-striped table-hover mb-0">
          <thead class="thead-dark">
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Documento</th>
              <th>Registro</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <?php if ($usuarios->num_rows === 0): ?>
              <tr><td colspan="7" class="text-center py-4 text-muted">Sin usuarios.</td></tr>
            <?php else: ?>
              <?php while ($u = $usuarios->fetch_assoc()):
                $rolBadge = match($u['id_rol']) { 1 => 'danger', 2 => 'warning', default => 'secondary' };
              ?>
                <tr>
                  <td><?= $u['id_usuario'] ?></td>
                  <td><b><?= htmlspecialchars($u['nombre']) ?></b></td>
                  <td><?= htmlspecialchars($u['correo']) ?></td>
                  <td><span class="badge badge-<?= $rolBadge ?>"><?= htmlspecialchars($u['nombre_rol']) ?></span></td>
                  <td><span class="badge badge-info"><?= $u['abreviatura'] ?></span> <?= htmlspecialchars($u['numero_documento']) ?></td>
                  <td><?= date('d/m/Y', strtotime($u['created_at'])) ?></td>
                  <td>
                    <a href="editar.php?id=<?= $u['id_usuario'] ?>" class="btn btn-warning btn-sm"><i class="fas fa-edit"></i></a>
                    <?php if ($u['id_usuario'] != $_SESSION['id_usuario']): ?>
                    <a href="eliminar.php?id=<?= $u['id_usuario'] ?>"
                       class="btn btn-danger btn-sm"
                       onclick="return confirm('¿Eliminar usuario <?= htmlspecialchars(addslashes($u['nombre'])) ?>?')">
                      <i class="fas fa-trash"></i>
                    </a>
                    <?php endif; ?>
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

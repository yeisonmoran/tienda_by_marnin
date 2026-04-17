<?php
include('../../includes/header.php');
include('../../config/conexion.php');

if ($_SESSION['id_rol'] != 1) { header('Location: /tienda_by_marnin/index.php'); exit; }

$id = (int)($_GET['id'] ?? 0);
if ($id === 0) { header('Location: listar.php'); exit; }

$stmt = $conexion->prepare("SELECT * FROM usuarios WHERE id_usuario = ? LIMIT 1");
$stmt->bind_param("i", $id);
$stmt->execute();
$u = $stmt->get_result()->fetch_assoc();
if (!$u) { header('Location: listar.php'); exit; }

$mensaje = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre            = trim($_POST['nombre']);
    $correo            = trim($_POST['correo']);
    $id_rol            = (int)$_POST['id_rol'];
    $id_tipo_documento = (int)$_POST['id_tipo_documento'];
    $numero_documento  = trim($_POST['numero_documento']);
    $nueva_pass        = $_POST['nueva_pass'] ?? '';

    if (!empty($nueva_pass)) {
        $hash = password_hash($nueva_pass, PASSWORD_BCRYPT);
        $upd = $conexion->prepare("UPDATE usuarios SET nombre=?, correo=?, contrasena=?, id_rol=?, id_tipo_documento=?, numero_documento=? WHERE id_usuario=?");
        $upd->bind_param("sssiisi", $nombre, $correo, $hash, $id_rol, $id_tipo_documento, $numero_documento, $id);
    } else {
        $upd = $conexion->prepare("UPDATE usuarios SET nombre=?, correo=?, id_rol=?, id_tipo_documento=?, numero_documento=? WHERE id_usuario=?");
        $upd->bind_param("ssiisi", $nombre, $correo, $id_rol, $id_tipo_documento, $numero_documento, $id);
    }

    if ($upd->execute()) {
        header('Location: listar.php?ok=edit');
        exit;
    } else {
        $mensaje = "<div class='alert alert-danger'>Error: " . htmlspecialchars($conexion->error) . "</div>";
    }
}

$roles = $conexion->query("SELECT * FROM roles");
$tipos = $conexion->query("SELECT * FROM tipos_documento ORDER BY nombre");
?>

<div class="content-header">
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-6"><h1 class="m-0"><i class="fas fa-user-edit mr-2 text-warning"></i>Editar Usuario</h1></div>
      <div class="col-sm-6">
        <ol class="breadcrumb float-sm-right">
          <li class="breadcrumb-item"><a href="/tienda_by_marnin/index.php">Inicio</a></li>
          <li class="breadcrumb-item"><a href="listar.php">Usuarios</a></li>
          <li class="breadcrumb-item active">Editar</li>
        </ol>
      </div>
    </div>
  </div>
</div>

<section class="content">
  <div class="container-fluid">
    <div class="card card-warning">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-edit mr-2"></i>Editando: <?= htmlspecialchars($u['nombre']) ?></h3>
      </div>
      <div class="card-body">
        <?= $mensaje ?>
        <form method="POST">
          <div class="row">
            <div class="col-md-6 form-group">
              <label><b>Nombre</b></label>
              <input type="text" name="nombre" class="form-control" value="<?= htmlspecialchars($u['nombre']) ?>" required>
            </div>
            <div class="col-md-6 form-group">
              <label><b>Correo</b></label>
              <input type="email" name="correo" class="form-control" value="<?= htmlspecialchars($u['correo']) ?>" required>
            </div>
            <div class="col-md-4 form-group">
              <label><b>Rol</b></label>
              <select name="id_rol" class="form-control" required>
                <?php while ($r = $roles->fetch_assoc()): ?>
                  <option value="<?= $r['id_rol'] ?>" <?= $r['id_rol'] == $u['id_rol'] ? 'selected' : '' ?>><?= htmlspecialchars($r['nombre_rol']) ?></option>
                <?php endwhile; ?>
              </select>
            </div>
            <div class="col-md-4 form-group">
              <label><b>Tipo de documento</b></label>
              <select name="id_tipo_documento" class="form-control" required>
                <?php while ($t = $tipos->fetch_assoc()): ?>
                  <option value="<?= $t['id_tipo_documento'] ?>" <?= $t['id_tipo_documento'] == $u['id_tipo_documento'] ? 'selected' : '' ?>>
                    (<?= $t['abreviatura'] ?>) <?= htmlspecialchars($t['nombre']) ?>
                  </option>
                <?php endwhile; ?>
              </select>
            </div>
            <div class="col-md-4 form-group">
              <label><b>Número de documento</b></label>
              <input type="text" name="numero_documento" class="form-control" value="<?= htmlspecialchars($u['numero_documento']) ?>" required>
            </div>
            <div class="col-md-6 form-group">
              <label><b>Nueva contraseña</b> <small class="text-muted">(dejar vacío para no cambiar)</small></label>
              <input type="password" name="nueva_pass" class="form-control" placeholder="Mínimo 6 caracteres" minlength="6">
            </div>
          </div>
          <button type="submit" class="btn btn-warning"><i class="fas fa-save mr-2"></i>Actualizar Usuario</button>
          <a href="listar.php" class="btn btn-secondary ml-2"><i class="fas fa-times mr-1"></i>Cancelar</a>
        </form>
      </div>
    </div>
  </div>
</section>

<?php include('../../includes/footer.php'); ?>

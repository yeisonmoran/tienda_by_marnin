<?php
include('../../includes/header.php');
include('../../config/conexion.php');

$id = (int)($_GET['id'] ?? 0);
if ($id === 0) { header('Location: listar.php'); exit; }

$stmt = $conexion->prepare("SELECT * FROM clientes WHERE id_cliente = ? LIMIT 1");
$stmt->bind_param("i", $id);
$stmt->execute();
$cliente = $stmt->get_result()->fetch_assoc();
if (!$cliente) { header('Location: listar.php'); exit; }

$mensaje = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre            = trim($_POST['nombre']);
    $correo            = trim($_POST['correo']);
    $telefono          = trim($_POST['telefono']);
    $numero_documento  = trim($_POST['numero_documento']);
    $ciudad            = trim($_POST['ciudad']);
    $id_tipo_documento = (int)$_POST['id_tipo_documento'];

    $upd = $conexion->prepare("UPDATE clientes SET nombre=?, correo=?, telefono=?, numero_documento=?, ciudad=?, id_tipo_documento=? WHERE id_cliente=?");
    $upd->bind_param("sssssii", $nombre, $correo, $telefono, $numero_documento, $ciudad, $id_tipo_documento, $id);

    if ($upd->execute()) {
        header('Location: listar.php?ok=edit');
        exit;
    } else {
        $mensaje = "<div class='alert alert-danger'>Error: " . htmlspecialchars($conexion->error) . "</div>";
    }
}

$tipos = $conexion->query("SELECT * FROM tipos_documento ORDER BY nombre");
?>

<div class="content-header">
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-6"><h1 class="m-0"><i class="fas fa-user-edit mr-2 text-warning"></i>Editar Cliente</h1></div>
      <div class="col-sm-6">
        <ol class="breadcrumb float-sm-right">
          <li class="breadcrumb-item"><a href="/tienda_by_marnin/index.php">Inicio</a></li>
          <li class="breadcrumb-item"><a href="listar.php">Clientes</a></li>
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
        <h3 class="card-title"><i class="fas fa-edit mr-2"></i>Editar: <?= htmlspecialchars($cliente['nombre']) ?></h3>
      </div>
      <div class="card-body">
        <?= $mensaje ?>
        <form method="POST">
          <div class="row">
            <div class="col-md-6 form-group">
              <label><b>Nombre completo</b></label>
              <input type="text" name="nombre" class="form-control" value="<?= htmlspecialchars($cliente['nombre']) ?>" required>
            </div>
            <div class="col-md-6 form-group">
              <label><b>Correo electrónico</b></label>
              <input type="email" name="correo" class="form-control" value="<?= htmlspecialchars($cliente['correo']) ?>" required>
            </div>
            <div class="col-md-4 form-group">
              <label><b>Teléfono</b></label>
              <input type="text" name="telefono" class="form-control" value="<?= htmlspecialchars($cliente['telefono'] ?? '') ?>">
            </div>
            <div class="col-md-4 form-group">
              <label><b>Ciudad</b></label>
              <input type="text" name="ciudad" class="form-control" value="<?= htmlspecialchars($cliente['ciudad'] ?? '') ?>">
            </div>
            <div class="col-md-4 form-group">
              <label><b>Tipo de documento</b></label>
              <select name="id_tipo_documento" class="form-control" required>
                <?php
                $tipos->data_seek(0);
                while ($t = $tipos->fetch_assoc()):
                  $sel = $t['id_tipo_documento'] == $cliente['id_tipo_documento'] ? 'selected' : '';
                ?>
                  <option value="<?= $t['id_tipo_documento'] ?>" <?= $sel ?>>(<?= $t['abreviatura'] ?>) <?= htmlspecialchars($t['nombre']) ?></option>
                <?php endwhile; ?>
              </select>
            </div>
            <div class="col-md-4 form-group">
              <label><b>Número de documento</b></label>
              <input type="text" name="numero_documento" class="form-control" value="<?= htmlspecialchars($cliente['numero_documento']) ?>" required>
            </div>
          </div>
          <button type="submit" class="btn btn-warning"><i class="fas fa-save mr-2"></i>Actualizar Cliente</button>
          <a href="listar.php" class="btn btn-secondary ml-2"><i class="fas fa-times mr-1"></i>Cancelar</a>
        </form>
      </div>
    </div>
  </div>
</section>

<?php include('../../includes/footer.php'); ?>

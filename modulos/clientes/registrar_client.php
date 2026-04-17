<?php
include('../../includes/header.php');
include('../../config/conexion.php');

$mensaje = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre            = trim($_POST['nombre']);
    $correo            = trim($_POST['correo']);
    $telefono          = trim($_POST['telefono']);
    $numero_documento  = trim($_POST['numero_documento']);
    $ciudad            = trim($_POST['ciudad']);
    $id_tipo_documento = (int)$_POST['id_tipo_documento'];

    $stmt = $conexion->prepare("INSERT INTO clientes (nombre, correo, telefono, numero_documento, ciudad, id_tipo_documento) VALUES (?,?,?,?,?,?)");
    $stmt->bind_param("sssssi", $nombre, $correo, $telefono, $numero_documento, $ciudad, $id_tipo_documento);

    if ($stmt->execute()) {
        $mensaje = "<div class='alert alert-success'><i class='fas fa-check-circle mr-2'></i>Cliente <b>$nombre</b> registrado correctamente.</div>";
    } else {
        $mensaje = "<div class='alert alert-danger'><i class='fas fa-times-circle mr-2'></i>Error: " . htmlspecialchars($conexion->error) . "</div>";
    }
}

$tipos = $conexion->query("SELECT * FROM tipos_documento ORDER BY nombre");
?>

<div class="content-header">
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-6"><h1 class="m-0"><i class="fas fa-user-plus mr-2 text-primary"></i>Registrar Cliente</h1></div>
      <div class="col-sm-6">
        <ol class="breadcrumb float-sm-right">
          <li class="breadcrumb-item"><a href="/tienda_by_marnin/index.php">Inicio</a></li>
          <li class="breadcrumb-item"><a href="listar.php">Clientes</a></li>
          <li class="breadcrumb-item active">Registrar</li>
        </ol>
      </div>
    </div>
  </div>
</div>

<section class="content">
  <div class="container-fluid">
    <div class="card card-primary">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-user-plus mr-2"></i>Nuevo Cliente</h3>
        <div class="card-tools">
          <a href="listar.php" class="btn btn-sm btn-secondary"><i class="fas fa-list mr-1"></i>Ver todos</a>
        </div>
      </div>
      <div class="card-body">
        <?= $mensaje ?>
        <form method="POST">
          <div class="row">
            <div class="col-md-6 form-group">
              <label><b>Nombre completo</b></label>
              <input type="text" name="nombre" class="form-control" placeholder="Ej: Juan Pérez" required>
            </div>
            <div class="col-md-6 form-group">
              <label><b>Correo electrónico</b></label>
              <input type="email" name="correo" class="form-control" placeholder="juan@mail.com" required>
            </div>
            <div class="col-md-4 form-group">
              <label><b>Teléfono</b></label>
              <input type="text" name="telefono" class="form-control" placeholder="3001234567">
            </div>
            <div class="col-md-4 form-group">
              <label><b>Ciudad</b></label>
              <input type="text" name="ciudad" class="form-control" placeholder="Bogotá" required>
            </div>
            <div class="col-md-4 form-group">
              <label><b>Tipo de documento</b></label>
              <select name="id_tipo_documento" class="form-control" required>
                <option value="">Seleccione...</option>
                <?php while ($t = $tipos->fetch_assoc()): ?>
                  <option value="<?= $t['id_tipo_documento'] ?>">(<?= $t['abreviatura'] ?>) <?= htmlspecialchars($t['nombre']) ?></option>
                <?php endwhile; ?>
              </select>
            </div>
            <div class="col-md-4 form-group">
              <label><b>Número de documento</b></label>
              <input type="text" name="numero_documento" class="form-control" placeholder="10223344" required>
            </div>
          </div>
          <button type="submit" class="btn btn-primary"><i class="fas fa-save mr-2"></i>Guardar Cliente</button>
          <a href="listar.php" class="btn btn-secondary ml-2"><i class="fas fa-times mr-1"></i>Cancelar</a>
        </form>
      </div>
    </div>
  </div>
</section>

<?php include('../../includes/footer.php'); ?>
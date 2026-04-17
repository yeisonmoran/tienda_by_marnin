<?php
include('../../includes/header.php');
include('../../config/conexion.php');

$mensaje = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre      = trim($_POST['nombre']);
    $descripcion = trim($_POST['descripcion']);

    $stmt = $conexion->prepare("INSERT INTO categorias (nombre, descripcion) VALUES (?,?)");
    $stmt->bind_param("ss", $nombre, $descripcion);

    if ($stmt->execute()) {
        header('Location: listar.php?ok=add');
        exit;
    } else {
        $mensaje = "<div class='alert alert-danger'>Error: " . htmlspecialchars($conexion->error) . "</div>";
    }
}
?>

<div class="content-header">
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-6"><h1 class="m-0"><i class="fas fa-folder-plus mr-2 text-primary"></i>Nueva Categoría</h1></div>
      <div class="col-sm-6">
        <ol class="breadcrumb float-sm-right">
          <li class="breadcrumb-item"><a href="/tienda_by_marnin/index.php">Inicio</a></li>
          <li class="breadcrumb-item"><a href="listar.php">Categorías</a></li>
          <li class="breadcrumb-item active">Crear</li>
        </ol>
      </div>
    </div>
  </div>
</div>

<section class="content">
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card card-primary">
          <div class="card-header">
            <h3 class="card-title"><i class="fas fa-tag mr-2"></i>Datos de la Categoría</h3>
          </div>
          <div class="card-body">
            <?= $mensaje ?>
            <form method="POST">
              <div class="form-group">
                <label><b>Nombre de la categoría</b></label>
                <input type="text" name="nombre" class="form-control" placeholder="Ej: Electrónica" required>
              </div>
              <div class="form-group">
                <label><b>Descripción</b> <small class="text-muted">(opcional)</small></label>
                <textarea name="descripcion" class="form-control" rows="3" placeholder="Breve descripción de la categoría..."></textarea>
              </div>
              <button type="submit" class="btn btn-primary"><i class="fas fa-save mr-2"></i>Guardar</button>
              <a href="listar.php" class="btn btn-secondary ml-2"><i class="fas fa-times mr-1"></i>Cancelar</a>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<?php include('../../includes/footer.php'); ?>

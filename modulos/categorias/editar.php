<?php
include('../../includes/header.php');
include('../../config/conexion.php');

$id = (int)($_GET['id'] ?? 0);
if ($id === 0) { header('Location: listar.php'); exit; }

$stmt = $conexion->prepare("SELECT * FROM categorias WHERE id_categoria = ? LIMIT 1");
$stmt->bind_param("i", $id);
$stmt->execute();
$cat = $stmt->get_result()->fetch_assoc();
if (!$cat) { header('Location: listar.php'); exit; }

$mensaje = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre      = trim($_POST['nombre']);
    $descripcion = trim($_POST['descripcion']);

    $upd = $conexion->prepare("UPDATE categorias SET nombre=?, descripcion=? WHERE id_categoria=?");
    $upd->bind_param("ssi", $nombre, $descripcion, $id);

    if ($upd->execute()) {
        header('Location: listar.php?ok=edit');
        exit;
    } else {
        $mensaje = "<div class='alert alert-danger'>Error: " . htmlspecialchars($conexion->error) . "</div>";
    }
}
?>

<div class="content-header">
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-6"><h1 class="m-0"><i class="fas fa-folder-open mr-2 text-warning"></i>Editar Categoría</h1></div>
      <div class="col-sm-6">
        <ol class="breadcrumb float-sm-right">
          <li class="breadcrumb-item"><a href="/tienda_by_marnin/index.php">Inicio</a></li>
          <li class="breadcrumb-item"><a href="listar.php">Categorías</a></li>
          <li class="breadcrumb-item active">Editar</li>
        </ol>
      </div>
    </div>
  </div>
</div>

<section class="content">
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card card-warning">
          <div class="card-header">
            <h3 class="card-title"><i class="fas fa-edit mr-2"></i>Editando: <?= htmlspecialchars($cat['nombre']) ?></h3>
          </div>
          <div class="card-body">
            <?= $mensaje ?>
            <form method="POST">
              <div class="form-group">
                <label><b>Nombre de la categoría</b></label>
                <input type="text" name="nombre" class="form-control" value="<?= htmlspecialchars($cat['nombre']) ?>" required>
              </div>
              <div class="form-group">
                <label><b>Descripción</b></label>
                <textarea name="descripcion" class="form-control" rows="3"><?= htmlspecialchars($cat['descripcion'] ?? '') ?></textarea>
              </div>
              <button type="submit" class="btn btn-warning"><i class="fas fa-save mr-2"></i>Actualizar</button>
              <a href="listar.php" class="btn btn-secondary ml-2"><i class="fas fa-times mr-1"></i>Cancelar</a>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<?php include('../../includes/footer.php'); ?>

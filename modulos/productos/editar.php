<?php
include('../../includes/header.php');
include('../../config/conexion.php');

$id = (int)($_GET['id'] ?? 0);
if ($id === 0) { header('Location: listar.php'); exit; }

$stmt = $conexion->prepare("SELECT * FROM productos WHERE id_producto = ? LIMIT 1");
$stmt->bind_param("i", $id);
$stmt->execute();
$prod = $stmt->get_result()->fetch_assoc();
if (!$prod) { header('Location: listar.php'); exit; }

$mensaje = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $codigo       = trim($_POST['codigo']);
    $nombre       = trim($_POST['nombre']);
    $precio       = (float)$_POST['precio'];
    $stock        = (int)$_POST['stock'];
    $stock_minimo = (int)$_POST['stock_minimo'];
    $id_categoria = (int)$_POST['id_categoria'];
    $descripcion  = trim($_POST['descripcion']);

    $upd = $conexion->prepare("UPDATE productos SET codigo=?, nombre=?, precio=?, stock=?, stock_minimo=?, id_categoria=?, descripcion=? WHERE id_producto=?");
    $upd->bind_param("ssdiiisi", $codigo, $nombre, $precio, $stock, $stock_minimo, $id_categoria, $descripcion, $id);

    if ($upd->execute()) {
        header('Location: listar.php?ok=edit');
        exit;
    } else {
        $mensaje = "<div class='alert alert-danger'>Error: " . htmlspecialchars($conexion->error) . "</div>";
    }
}

$categorias = $conexion->query("SELECT * FROM categorias ORDER BY nombre");
?>

<div class="content-header">
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-6"><h1 class="m-0"><i class="fas fa-pencil-alt mr-2 text-warning"></i>Editar Producto</h1></div>
      <div class="col-sm-6">
        <ol class="breadcrumb float-sm-right">
          <li class="breadcrumb-item"><a href="/tienda_by_marnin/index.php">Inicio</a></li>
          <li class="breadcrumb-item"><a href="listar.php">Productos</a></li>
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
        <h3 class="card-title"><i class="fas fa-edit mr-2"></i>Editando: <?= htmlspecialchars($prod['nombre']) ?></h3>
      </div>
      <div class="card-body">
        <?= $mensaje ?>
        <form method="POST">
          <div class="row">
            <div class="col-md-4 form-group">
              <label><b>Código</b></label>
              <input type="text" name="codigo" class="form-control" value="<?= htmlspecialchars($prod['codigo']) ?>" required>
            </div>
            <div class="col-md-8 form-group">
              <label><b>Nombre</b></label>
              <input type="text" name="nombre" class="form-control" value="<?= htmlspecialchars($prod['nombre']) ?>" required>
            </div>
            <div class="col-md-4 form-group">
              <label><b>Precio ($)</b></label>
              <div class="input-group">
                <div class="input-group-prepend"><span class="input-group-text">$</span></div>
                <input type="number" name="precio" class="form-control" step="0.01" min="0" value="<?= $prod['precio'] ?>" required>
              </div>
            </div>
            <div class="col-md-4 form-group">
              <label><b>Stock actual</b></label>
              <input type="number" name="stock" class="form-control" min="0" value="<?= $prod['stock'] ?>" required>
            </div>
            <div class="col-md-4 form-group">
              <label><b>Stock mínimo</b></label>
              <input type="number" name="stock_minimo" class="form-control" min="0" value="<?= $prod['stock_minimo'] ?>" required>
            </div>
            <div class="col-md-6 form-group">
              <label><b>Categoría</b></label>
              <select name="id_categoria" class="form-control" required>
                <?php while ($cat = $categorias->fetch_assoc()): ?>
                  <option value="<?= $cat['id_categoria'] ?>" <?= $cat['id_categoria'] == $prod['id_categoria'] ? 'selected' : '' ?>>
                    <?= htmlspecialchars($cat['nombre']) ?>
                  </option>
                <?php endwhile; ?>
              </select>
            </div>
            <div class="col-md-6 form-group">
              <label><b>Descripción</b></label>
              <input type="text" name="descripcion" class="form-control" value="<?= htmlspecialchars($prod['descripcion'] ?? '') ?>">
            </div>
          </div>
          <button type="submit" class="btn btn-warning"><i class="fas fa-save mr-2"></i>Actualizar Producto</button>
          <a href="listar.php" class="btn btn-secondary ml-2"><i class="fas fa-times mr-1"></i>Cancelar</a>
        </form>
      </div>
    </div>
  </div>
</section>

<?php include('../../includes/footer.php'); ?>

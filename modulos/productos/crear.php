<?php
include('../../includes/header.php');
include('../../config/conexion.php');

$mensaje = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $codigo        = trim($_POST['codigo']);
    $nombre        = trim($_POST['nombre']);
    $precio        = (float)$_POST['precio'];
    $stock         = (int)$_POST['stock'];
    $stock_minimo  = (int)$_POST['stock_minimo'];
    $id_categoria  = (int)$_POST['id_categoria'];
    $descripcion   = trim($_POST['descripcion']);

    $stmt = $conexion->prepare("INSERT INTO productos (codigo, nombre, precio, stock, stock_minimo, id_categoria, descripcion) VALUES (?,?,?,?,?,?,?)");
    $stmt->bind_param("ssdiiis", $codigo, $nombre, $precio, $stock, $stock_minimo, $id_categoria, $descripcion);

    if ($stmt->execute()) {
        header('Location: listar.php?ok=add');
        exit;
    } else {
        $mensaje = "<div class='alert alert-danger'><i class='fas fa-times-circle mr-2'></i>Error: " . htmlspecialchars($conexion->error) . "</div>";
    }
}

$categorias = $conexion->query("SELECT * FROM categorias ORDER BY nombre");
?>

<div class="content-header">
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-6"><h1 class="m-0"><i class="fas fa-plus-square mr-2 text-success"></i>Nuevo Producto</h1></div>
      <div class="col-sm-6">
        <ol class="breadcrumb float-sm-right">
          <li class="breadcrumb-item"><a href="/tienda_by_marnin/index.php">Inicio</a></li>
          <li class="breadcrumb-item"><a href="listar.php">Productos</a></li>
          <li class="breadcrumb-item active">Crear</li>
        </ol>
      </div>
    </div>
  </div>
</div>

<section class="content">
  <div class="container-fluid">
    <div class="card card-success">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-box mr-2"></i>Datos del Producto</h3>
        <div class="card-tools">
          <a href="listar.php" class="btn btn-sm btn-secondary"><i class="fas fa-list mr-1"></i>Ver todos</a>
        </div>
      </div>
      <div class="card-body">
        <?= $mensaje ?>
        <form method="POST">
          <div class="row">
            <div class="col-md-4 form-group">
              <label><b>Código del producto</b></label>
              <input type="text" name="codigo" class="form-control" placeholder="Ej: ELEC-001" required>
            </div>
            <div class="col-md-8 form-group">
              <label><b>Nombre del producto</b></label>
              <input type="text" name="nombre" class="form-control" placeholder="Ej: Televisor 50 pulgadas" required>
            </div>
            <div class="col-md-4 form-group">
              <label><b>Precio de venta ($)</b></label>
              <div class="input-group">
                <div class="input-group-prepend"><span class="input-group-text">$</span></div>
                <input type="number" name="precio" class="form-control" step="0.01" min="0" placeholder="0.00" required>
              </div>
            </div>
            <div class="col-md-4 form-group">
              <label><b>Stock inicial</b></label>
              <input type="number" name="stock" class="form-control" min="0" value="0" required>
            </div>
            <div class="col-md-4 form-group">
              <label><b>Stock mínimo (alerta)</b></label>
              <input type="number" name="stock_minimo" class="form-control" min="0" value="5" required>
              <small class="text-muted">Se mostrará alerta si el stock cae por debajo de este valor.</small>
            </div>
            <div class="col-md-6 form-group">
              <label><b>Categoría</b></label>
              <select name="id_categoria" class="form-control" required>
                <option value="">Seleccione una categoría...</option>
                <?php while ($cat = $categorias->fetch_assoc()): ?>
                  <option value="<?= $cat['id_categoria'] ?>"><?= htmlspecialchars($cat['nombre']) ?></option>
                <?php endwhile; ?>
              </select>
            </div>
            <div class="col-md-6 form-group">
              <label><b>Descripción</b> <small class="text-muted">(opcional)</small></label>
              <input type="text" name="descripcion" class="form-control" placeholder="Breve descripción del producto...">
            </div>
          </div>
          <button type="submit" class="btn btn-success"><i class="fas fa-save mr-2"></i>Guardar Producto</button>
          <a href="listar.php" class="btn btn-secondary ml-2"><i class="fas fa-times mr-1"></i>Cancelar</a>
        </form>
      </div>
    </div>
  </div>
</section>

<?php include('../../includes/footer.php'); ?>
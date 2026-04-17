<?php
include('../../includes/header.php');
include('../../config/conexion.php');

$mensaje = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id_cliente  = (int)$_POST['id_cliente'];
    $id_usuario  = (int)$_SESSION['id_usuario'];
    $fecha       = $_POST['fecha'];
    $estado      = $_POST['estado'];
    $metodo_pago = $_POST['metodo_pago'];
    $productos_ids = $_POST['producto_id']    ?? [];
    $cantidades    = $_POST['cantidad']        ?? [];
    $precios       = $_POST['precio_unitario'] ?? [];

    if (empty($productos_ids)) {
        $mensaje = "<div class='alert alert-warning'><i class='fas fa-exclamation-triangle mr-2'></i>Debe agregar al menos un producto.</div>";
    } else {
        // Calcular total
        $total = 0;
        for ($i = 0; $i < count($productos_ids); $i++) {
            $total += (float)$precios[$i] * (int)$cantidades[$i];
        }

        // Iniciar transacción
        $conexion->begin_transaction();
        try {
            // 1. Insertar venta
            $stmtV = $conexion->prepare("INSERT INTO ventas (id_cliente, id_usuario, fecha, total, estado, metodo_pago) VALUES (?,?,?,?,?,?)");
            $stmtV->bind_param("iisdss", $id_cliente, $id_usuario, $fecha, $total, $estado, $metodo_pago);
            $stmtV->execute();
            $id_venta = $conexion->insert_id;

            // 2. Insertar detalles y descontar stock
            for ($i = 0; $i < count($productos_ids); $i++) {
                $id_prod = (int)$productos_ids[$i];
                $cant    = (int)$cantidades[$i];
                $precio  = (float)$precios[$i];
                $subtotal = $precio * $cant;

                // Verificar stock
                $stmtSt = $conexion->prepare("SELECT stock FROM productos WHERE id_producto = ? FOR UPDATE");
                $stmtSt->bind_param("i", $id_prod);
                $stmtSt->execute();
                $stockActual = $stmtSt->get_result()->fetch_assoc()['stock'];

                if ($stockActual < $cant) {
                    throw new Exception("Stock insuficiente para el producto ID $id_prod (disponible: $stockActual).");
                }

                // Insertar detalle
                $stmtD = $conexion->prepare("INSERT INTO detalle_ventas (id_venta, id_producto, cantidad, precio_unitario, subtotal) VALUES (?,?,?,?,?)");
                $stmtD->bind_param("iiidd", $id_venta, $id_prod, $cant, $precio, $subtotal);
                $stmtD->execute();

                // Descontar stock
                $conexion->query("UPDATE productos SET stock = stock - $cant WHERE id_producto = $id_prod");
            }

            $conexion->commit();
            $mensaje = "<div class='alert alert-success'><i class='fas fa-check-circle mr-2'></i>Venta #$id_venta registrada correctamente. Total: $ " . number_format($total, 0, ',', '.') . "</div>";
        } catch (Exception $e) {
            $conexion->rollback();
            $mensaje = "<div class='alert alert-danger'><i class='fas fa-times-circle mr-2'></i>Error: " . htmlspecialchars($e->getMessage()) . "</div>";
        }
    }
}

$clientes  = $conexion->query("SELECT id_cliente, nombre, numero_documento FROM clientes ORDER BY nombre");
$productos = $conexion->query("SELECT id_producto, codigo, nombre, precio, stock FROM productos WHERE stock > 0 ORDER BY nombre");
?>

<div class="content-header">
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-6"><h1 class="m-0"><i class="fas fa-shopping-cart mr-2 text-success"></i>Registrar Venta</h1></div>
      <div class="col-sm-6">
        <ol class="breadcrumb float-sm-right">
          <li class="breadcrumb-item"><a href="/tienda_by_marnin/index.php">Inicio</a></li>
          <li class="breadcrumb-item"><a href="listar.php">Ventas</a></li>
          <li class="breadcrumb-item active">Nueva Venta</li>
        </ol>
      </div>
    </div>
  </div>
</div>

<section class="content">
  <div class="container-fluid">
    <?= $mensaje ?>
    <div class="card card-success">
      <div class="card-header">
        <h3 class="card-title"><i class="fas fa-receipt mr-2"></i>Nueva Venta</h3>
        <div class="card-tools">
          <a href="listar.php" class="btn btn-sm btn-secondary"><i class="fas fa-list mr-1"></i>Ver ventas</a>
        </div>
      </div>
      <div class="card-body">
        <form method="POST" id="formVenta">
          <!-- Datos generales -->
          <div class="row">
            <div class="col-md-4 form-group">
              <label><b>Cliente</b></label>
              <select name="id_cliente" class="form-control" required>
                <option value="">Seleccione el cliente...</option>
                <?php while ($c = $clientes->fetch_assoc()): ?>
                  <option value="<?= $c['id_cliente'] ?>"><?= htmlspecialchars($c['nombre']) ?> — <?= $c['numero_documento'] ?></option>
                <?php endwhile; ?>
              </select>
            </div>
            <div class="col-md-3 form-group">
              <label><b>Fecha de venta</b></label>
              <input type="date" name="fecha" class="form-control" value="<?= date('Y-m-d') ?>" required>
            </div>
            <div class="col-md-3 form-group">
              <label><b>Estado</b></label>
              <select name="estado" class="form-control" required>
                <option value="Completada">Completada</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Anulada">Anulada</option>
              </select>
            </div>
            <div class="col-md-2 form-group">
              <label><b>Método de pago</b></label>
              <select name="metodo_pago" class="form-control" required>
                <option value="Efectivo">Efectivo</option>
                <option value="Tarjeta">Tarjeta</option>
                <option value="Transferencia">Transferencia</option>
                <option value="Nequi">Nequi</option>
                <option value="Daviplata">Daviplata</option>
              </select>
            </div>
          </div>

          <hr>
          <h5><i class="fas fa-boxes mr-2"></i>Productos de la Venta</h5>

          <!-- Agregar producto -->
          <div class="row align-items-end mb-3">
            <div class="col-md-5 form-group mb-0">
              <label>Producto</label>
              <select id="selectProducto" class="form-control">
                <option value="">Seleccione un producto...</option>
                <?php
                $productos->data_seek(0);
                while ($p = $productos->fetch_assoc()):
                ?>
                  <option value="<?= $p['id_producto'] ?>"
                          data-precio="<?= $p['precio'] ?>"
                          data-stock="<?= $p['stock'] ?>"
                          data-nombre="<?= htmlspecialchars($p['nombre']) ?>"
                          data-codigo="<?= htmlspecialchars($p['codigo']) ?>">
                    <?= htmlspecialchars($p['nombre']) ?> | $ <?= number_format($p['precio'], 0, ',', '.') ?> | Stock: <?= $p['stock'] ?>
                  </option>
                <?php endwhile; ?>
              </select>
            </div>
            <div class="col-md-2 form-group mb-0">
              <label>Cantidad</label>
              <input type="number" id="inputCantidad" class="form-control" min="1" value="1">
            </div>
            <div class="col-md-2 form-group mb-0">
              <label>Precio unit.</label>
              <input type="number" id="inputPrecio" class="form-control" step="0.01" min="0" value="0">
            </div>
            <div class="col-md-3">
              <button type="button" class="btn btn-info btn-block" onclick="agregarProducto()">
                <i class="fas fa-plus mr-1"></i> Agregar al carrito
              </button>
            </div>
          </div>

          <!-- Tabla de productos agregados -->
          <div class="table-responsive">
            <table class="table table-bordered table-sm" id="tablaProductos">
              <thead class="thead-dark">
                <tr>
                  <th>Producto</th>
                  <th>Precio Unit.</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th>Quitar</th>
                </tr>
              </thead>
              <tbody id="tbodyProductos">
                <tr id="trVacio"><td colspan="5" class="text-center text-muted">No se han añadido productos aún.</td></tr>
              </tbody>
              <tfoot>
                <tr class="table-success">
                  <td colspan="3" class="text-right font-weight-bold">TOTAL:</td>
                  <td colspan="2" class="font-weight-bold" id="totalVenta">$ 0</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div id="contenedorOculto"></div><!-- inputs hidden se meten aquí -->

          <div class="mt-3">
            <button type="submit" class="btn btn-success btn-lg">
              <i class="fas fa-check-circle mr-2"></i>Confirmar Venta
            </button>
            <a href="listar.php" class="btn btn-secondary btn-lg ml-2">
              <i class="fas fa-times mr-1"></i>Cancelar
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>

<?php include('../../includes/footer.php'); ?>

<script>
let productosCarrito = [];

function agregarProducto() {
  const sel    = document.getElementById('selectProducto');
  const cant   = parseInt(document.getElementById('inputCantidad').value);
  const precio = parseFloat(document.getElementById('inputPrecio').value);

  if (!sel.value) { alert('Seleccione un producto.'); return; }
  if (cant < 1)   { alert('La cantidad debe ser al menos 1.'); return; }

  const opt    = sel.options[sel.selectedIndex];
  const stock  = parseInt(opt.dataset.stock);
  const id     = parseInt(sel.value);
  const nombre = opt.dataset.nombre;
  const codigo = opt.dataset.codigo;

  // Validar que no supere el stock considerando lo ya agregado
  const yaAgregado = productosCarrito.filter(p => p.id === id).reduce((s, p) => s + p.cantidad, 0);
  if (yaAgregado + cant > stock) {
    alert(`Stock insuficiente. Disponible: ${stock - yaAgregado} unidad(es).`);
    return;
  }

  productosCarrito.push({ id, nombre, codigo, precio, cantidad: cant });
  renderTabla();

  // Reset selects
  sel.value = '';
  document.getElementById('inputCantidad').value = 1;
  document.getElementById('inputPrecio').value   = 0;
}

function quitarProducto(idx) {
  productosCarrito.splice(idx, 1);
  renderTabla();
}

function renderTabla() {
  const tbody   = document.getElementById('tbodyProductos');
  const oculto  = document.getElementById('contenedorOculto');
  const trVacio = document.getElementById('trVacio');

  tbody.innerHTML  = '';
  oculto.innerHTML = '';

  let total = 0;

  if (productosCarrito.length === 0) {
    tbody.innerHTML = '<tr id="trVacio"><td colspan="5" class="text-center text-muted">No se han añadido productos aún.</td></tr>';
  } else {
    productosCarrito.forEach((p, i) => {
      const sub = p.precio * p.cantidad;
      total += sub;

      tbody.innerHTML += `
        <tr>
          <td><b>${p.nombre}</b> <small class="text-muted">(${p.codigo})</small></td>
          <td>$ ${formatNum(p.precio)}</td>
          <td>${p.cantidad}</td>
          <td>$ ${formatNum(sub)}</td>
          <td><button type="button" class="btn btn-danger btn-sm" onclick="quitarProducto(${i})"><i class="fas fa-times"></i></button></td>
        </tr>`;

      oculto.innerHTML += `
        <input type="hidden" name="producto_id[]"    value="${p.id}">
        <input type="hidden" name="cantidad[]"        value="${p.cantidad}">
        <input type="hidden" name="precio_unitario[]" value="${p.precio}">`;
    });
  }

  document.getElementById('totalVenta').innerText = '$ ' + formatNum(total);
}

function formatNum(n) {
  return n.toLocaleString('es-CO', { minimumFractionDigits: 0 });
}

// Auto-completar precio al seleccionar producto
document.getElementById('selectProducto').addEventListener('change', function() {
  const opt = this.options[this.selectedIndex];
  document.getElementById('inputPrecio').value = opt.dataset.precio || 0;
});
</script>
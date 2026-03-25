<?php
// 1. OBTENER CONEXIÓN Y HEADER (La plantilla que armamos antes)
include('../../includes/header.php');
include('../../config/conexion.php');

// ==============================================================================
// PASO 1 (MÉTODO GET): Obtener el producto cuando recién abres la página
// ==============================================================================
// Cuando haces clic en "Editar" desde listar.php, se manda "?id=algo" por la URL.
if (isset($_GET['id'])) {
    $id = $_GET['id'];
    
    // Consultamos la Base de Datos para extraer TODO sobre ese producto en particular
    $sql_consultar = "SELECT * FROM productos WHERE id_producto = $id";
    $resultado = $conexion->query($sql_consultar);
    
    // Guardamos los datos del producto en un Arreglo (Array) llamado $producto
    $producto = $resultado->fetch_assoc();
}

// ==============================================================================
// PASO 2 (MÉTODO POST): Guardar los cambios en la Base de Datos al dar clic
// ==============================================================================
// Si la página se recargó porque alguien le dio al botón "Guardar Cambios" (Submit)
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    
    // Atrapamos lo que el usuario escribió en las cajas de texto
    $id_oculto = $_POST['id_producto']; // El ID que guardamos oculto en el formulario
    $codigo    = $_POST['codigo'];
    $nombre    = $_POST['nombre'];
    $precio    = $_POST['precio'];
    $stock     = $_POST['stock'];

    // Enviamos la instrucción de ACTUALIZAR (UPDATE)
    $sql_actualizar = "UPDATE productos SET 
                        codigo = '$codigo', 
                        nombre = '$nombre', 
                        precio = $precio, 
                        stock = $stock 
                       WHERE id_producto = $id_oculto";
                   
    // Si la actualización sale bien, regresamos al usuario a la tabla
    if ($conexion->query($sql_actualizar)) {
        header("Location: listar.php");
        exit();
    } else {
        echo "Error al actualizar: " . $conexion->error;
    }
}
?>

<!-- ============================================================================== -->
<!-- PASO 3 (HTML): Pintar el Formulario en pantalla                                -->
<!-- ============================================================================== -->
<section class="content mt-3">
    <div class="container-fluid">
        <!-- Usamos una tarjeta (card) de AdminLTE para que se vea bonito -->
        <div class="card card-warning">
            <div class="card-header">
                <h3 class="card-title">Editar Producto</h3>
            </div>
            
            <div class="card-body">
                <!-- FORMULARIO: Usamos method="POST" para enviar la info sin que se vea en la URL -->
                <form method="POST">
                    
                    <!-- ¡TRUCO IMPORTANTE! -->
                    <!-- Necesitamos decirle a PHP qué producto estamos editando. 
                         Como no queremos que el usuario modifique su "ID", usamos type="hidden" (Oculto) -->
                    <input type="hidden" name="id_producto" value="<?php echo $producto['id_producto']; ?>">

                    <div class="form-group">
                        <label>Código</label>
                        <!-- Usamos "value" para imprimir con PHP los datos previos en la cajita -->
                        <input type="text" name="codigo" class="form-control" value="<?php echo $producto['codigo']; ?>" required>
                    </div>

                    <div class="form-group">
                        <label>Nombre del Producto</label>
                        <input type="text" name="nombre" class="form-control" value="<?php echo $producto['nombre']; ?>" required>
                    </div>

                    <div class="form-group">
                        <label>Precio</label>
                        <input type="number" step="0.01" name="precio" class="form-control" value="<?php echo $producto['precio']; ?>" required>
                    </div>

                    <div class="form-group">
                        <label>Stock</label>
                        <input type="number" name="stock" class="form-control" value="<?php echo $producto['stock']; ?>" required>
                    </div>

                    <br>
                    <!-- Al dar clic aquí, PHP se da cuenta que el REQUEST_METHOD es 'POST' e inicia el Paso 2 -->
                    <button type="submit" class="btn btn-warning">Guardar Cambios</button>
                    <!-- Un botón simple que solo nos regresa a la tabla si nos arrepentimos -->
                    <a href="listar.php" class="btn btn-secondary">Cancelar</a>
                </form>
            </div>
        </div>
    </div>
</section>

<?php 
// 4. CERRAR EL DISEÑO
include('../../includes/footer.php'); 
?>

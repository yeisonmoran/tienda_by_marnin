<?php
include("../../includes/header.php");
include('../../config/conexion.php'); // Movimos la conexión arriba

$mensaje = ""; // Variable para guardar alertas bonitas

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nombre = $_POST['nombre'];
    $correo = $_POST['correo'];
    $telefono = $_POST['telefono'];
    $numero_documento = $_POST['numero_documento'];
    $ciudad = $_POST['ciudad'];
    $id_tipo_documento = $_POST['id_tipo_documento'];

    $sql = "INSERT INTO clientes(nombre, correo, telefono, numero_documento, ciudad, id_tipo_documento)
    VALUES('$nombre', '$correo', '$telefono', '$numero_documento', '$ciudad', '$id_tipo_documento')";

    if ($conexion->query($sql)) {
        // En vez de hacer un simple "echo", preparamos una alerta verde (success) de Bootstrap
        $mensaje = "<div class='alert alert-success'>Cliente registrado correctamente.</div>";
    } else {
        // Alerta roja (danger) para errores
        $mensaje = "<div class='alert alert-danger'>Error: " . $conexion->error . "</div>";
    }
}
?>

<section class="content mt-3">
    <div class="container-fluid">
        
        <!-- Iniciamos la tarjeta principal de diseño -->
        <div class="card card-primary">
            <div class="card-header">
                <h3 class="card-title">Registrar Nuevo Cliente</h3>
            </div>
            
            <div class="card-body">
                <!-- Imprimimos nuestra alerta (si la hay) -->
                <?= $mensaje ?>

                <form method="POST">
                    <!-- Usamos un div "row" para dividir el formulario en 2 columnas -->
                    <div class="row">

                        <!-- col-md-6 significa "Ocupa la mitad de la pantalla" -->
                        <div class="col-md-6 form-group">
                            <label for="nombre">Nombre Completo</label>
                            <!-- La clase "form-control" es la que le da la apariencia bonita a la caja -->
                            <input type="text" name="nombre" class="form-control" placeholder="Ej: Juan Pérez" required>
                        </div>

                        <div class="col-md-6 form-group">
                            <label for="correo">Correo Electrónico</label>
                            <!-- Cambié type="text" a type="email" para mayor seguridad -->
                            <input type="email" name="correo" class="form-control" placeholder="Ej: juan@mail.com" required>
                        </div>

                        <div class="col-md-6 form-group">
                            <label for="telefono">Teléfono</label>
                            <input type="number" name="telefono" class="form-control" required>
                        </div>

                        <div class="col-md-6 form-group">
                            <label for="ciudad">Ciudad</label>
                            <input type="text" name="ciudad" class="form-control" required>
                        </div>

                        <div class="col-md-6 form-group">
                            <label for="id_tipo_documento">Tipo de Documento</label>
                            <select name="id_tipo_documento" class="form-control" required>
                                <option value="">Seleccione un tipo...</option>
                                <option value="1">(CC) Cédula de Ciudadanía</option>
                                <option value="2">(TI) Tarjeta de Identidad</option>
                                <option value="3">(CE) Cédula Extranjera</option>
                                <option value="4">(PAS) Pasaporte</option>
                            </select>
                        </div>

                        <div class="col-md-6 form-group">
                            <label for="numero_documento">Número de Documento</label>
                            <input type="number" name="numero_documento" class="form-control" required>
                        </div>

                    </div>

                    <br>
                    <!-- El botón con clases "btn btn-primary" para que sea azul y redondeado -->
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-save"></i> Guardar Cliente
                    </button>

                </form>
            </div>
        </div>

    </div>
</section>

<?php include("../../includes/footer.php"); ?>
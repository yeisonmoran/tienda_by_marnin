<?php
session_start();
if (isset($_SESSION['id_usuario'])) {
    header('Location: /tienda_by_marnin/index.php');
    exit;
}

$mensaje = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    require_once('../config/conexion.php');

    $nombre            = trim($_POST['nombre']);
    $correo            = trim($_POST['correo']);
    $contrasena        = $_POST['contrasena'];
    $confirmar         = $_POST['confirmar'];
    $id_rol            = (int)$_POST['id_rol'];
    $id_tipo_documento = (int)$_POST['id_tipo_documento'];
    $numero_documento  = trim($_POST['numero_documento']);

    if ($contrasena !== $confirmar) {
        $mensaje = "<div class='alert alert-danger'><i class='fas fa-exclamation-triangle mr-2'></i>Las contraseñas no coinciden.</div>";
    } else {
        // Verificar correo duplicado
        $chk = $conexion->prepare("SELECT id_usuario FROM usuarios WHERE correo = ? LIMIT 1");
        $chk->bind_param("s", $correo);
        $chk->execute();
        if ($chk->get_result()->num_rows > 0) {
            $mensaje = "<div class='alert alert-warning'><i class='fas fa-exclamation-circle mr-2'></i>Ese correo ya está registrado.</div>";
        } else {
            $hash = password_hash($contrasena, PASSWORD_BCRYPT);
            $stmt = $conexion->prepare("INSERT INTO usuarios (nombre, correo, contrasena, id_rol, id_tipo_documento, numero_documento) VALUES (?,?,?,?,?,?)");
            $stmt->bind_param("sssiis", $nombre, $correo, $hash, $id_rol, $id_tipo_documento, $numero_documento);
            if ($stmt->execute()) {
                $mensaje = "<div class='alert alert-success'><i class='fas fa-check-circle mr-2'></i>Usuario registrado. <a href='login.php' class='font-weight-bold'>Iniciar sesión</a>.</div>";
            } else {
                $mensaje = "<div class='alert alert-danger'>Error: " . htmlspecialchars($conexion->error) . "</div>";
            }
        }
    }
}

require_once('../config/conexion.php');
$tipos = $conexion->query("SELECT * FROM tipos_documento ORDER BY nombre");
$roles = $conexion->query("SELECT * FROM roles ORDER BY id_rol");
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Registrar Usuario | ByMarnin</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
  <link rel="stylesheet" href="/tienda_by_marnin/assets/css/adminlte.min.css">
  <style>
    body { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%); min-height: 100vh; }
    .reg-card { border-radius: 16px; overflow: hidden; box-shadow: 0 25px 60px rgba(0,0,0,0.5); }
    .reg-card-header { background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); padding: 2rem; text-align:center; }
    .reg-card-header h1 { color:#fff; font-size:1.6rem; font-weight:700; margin:0; }
    .reg-card-header p  { color:rgba(255,255,255,.85); margin:.3rem 0 0; }
    .reg-card-body { background:#fff; padding:2rem; }
    .btn-reg { background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); border:none; border-radius:8px; padding:.65rem; font-weight:600; color:#fff; }
    .btn-reg:hover { transform:translateY(-2px); box-shadow:0 8px 20px rgba(17,153,142,.4); color:#fff; }
    .form-control, .form-control:focus { border-radius:8px; border:2px solid #e8e8e8; }
    .form-control:focus { border-color:#11998e; box-shadow:0 0 0 3px rgba(17,153,142,.15); }
  </style>
</head>
<body>
<div class="container" style="max-width:600px; padding:6vh 1rem 2rem">
  <div class="reg-card">
    <div class="reg-card-header">
      <i class="fas fa-user-plus" style="font-size:2.5rem;color:#fff;margin-bottom:.5rem;"></i>
      <h1>Registrar Usuario</h1>
      <p>Crea una cuenta nueva en el sistema</p>
    </div>
    <div class="reg-card-body">
      <?= $mensaje ?>
      <form method="POST">
        <div class="row">
          <div class="col-md-6 form-group">
            <label><b>Nombre completo</b></label>
            <input type="text" name="nombre" class="form-control" placeholder="Juan Pérez" required>
          </div>
          <div class="col-md-6 form-group">
            <label><b>Correo electrónico</b></label>
            <input type="email" name="correo" class="form-control" placeholder="correo@mail.com" required>
          </div>
          <div class="col-md-6 form-group">
            <label><b>Contraseña</b></label>
            <input type="password" name="contrasena" class="form-control" placeholder="Mínimo 6 caracteres" required minlength="6">
          </div>
          <div class="col-md-6 form-group">
            <label><b>Confirmar contraseña</b></label>
            <input type="password" name="confirmar" class="form-control" placeholder="Repita la contraseña" required minlength="6">
          </div>
          <div class="col-md-6 form-group">
            <label><b>Rol</b></label>
            <select name="id_rol" class="form-control" required>
              <option value="">Seleccione...</option>
              <?php while ($r = $roles->fetch_assoc()): ?>
                <option value="<?= $r['id_rol'] ?>"><?= htmlspecialchars($r['nombre_rol']) ?></option>
              <?php endwhile; ?>
            </select>
          </div>
          <div class="col-md-6 form-group">
            <label><b>Tipo de documento</b></label>
            <select name="id_tipo_documento" class="form-control" required>
              <option value="">Seleccione...</option>
              <?php while ($t = $tipos->fetch_assoc()): ?>
                <option value="<?= $t['id_tipo_documento'] ?>">(<?= $t['abreviatura'] ?>) <?= htmlspecialchars($t['nombre']) ?></option>
              <?php endwhile; ?>
            </select>
          </div>
          <div class="col-md-6 form-group">
            <label><b>Número de documento</b></label>
            <input type="text" name="numero_documento" class="form-control" placeholder="Ej: 10223344" required>
          </div>
        </div>
        <div class="mt-2">
          <button type="submit" class="btn btn-reg btn-block">
            <i class="fas fa-save mr-2"></i> Crear Usuario
          </button>
        </div>
        <div class="mt-3 text-center text-muted" style="font-size:.9rem">
          ¿Ya tienes cuenta? <a href="login.php" style="color:#11998e;font-weight:600">Iniciar sesión</a>
        </div>
      </form>
    </div>
  </div>
</div>
</body>
</html>
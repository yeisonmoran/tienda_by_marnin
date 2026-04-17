<?php
session_start();
// Si ya está logueado, redirigir al dashboard
if (isset($_SESSION['id_usuario'])) {
    header('Location: /tienda_by_marnin/index.php');
    exit;
}

$mensaje = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    require_once('../config/conexion.php');

    $correo    = trim($_POST['correo']);
    $contrasena = $_POST['contrasena'];

    $stmt = $conexion->prepare("SELECT u.*, r.nombre_rol FROM usuarios u JOIN roles r ON u.id_rol = r.id_rol WHERE u.correo = ? LIMIT 1");
    $stmt->bind_param("s", $correo);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows === 1) {
        $usuario = $resultado->fetch_assoc();
        // Comparar con password_verify; también soporta contraseñas planas para migración
        if (password_verify($contrasena, $usuario['contrasena']) || $contrasena === $usuario['contrasena']) {
            $_SESSION['id_usuario']  = $usuario['id_usuario'];
            $_SESSION['nombre']      = $usuario['nombre'];
            $_SESSION['correo']      = $usuario['correo'];
            $_SESSION['id_rol']      = $usuario['id_rol'];
            $_SESSION['nombre_rol']  = $usuario['nombre_rol'];
            header('Location: /tienda_by_marnin/index.php');
            exit;
        } else {
            $mensaje = "<div class='alert alert-danger'><i class='fas fa-exclamation-triangle mr-2'></i>Contraseña incorrecta.</div>";
        }
    } else {
        $mensaje = "<div class='alert alert-danger'><i class='fas fa-exclamation-triangle mr-2'></i>El correo no está registrado.</div>";
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Iniciar Sesión | ByMarnin</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
  <link rel="stylesheet" href="/tienda_by_marnin/assets/css/adminlte.min.css">
  <style>
    body { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%); min-height: 100vh; }
    .login-card { border-radius: 16px; overflow: hidden; box-shadow: 0 25px 60px rgba(0,0,0,0.5); }
    .login-card-header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 2.5rem 2rem; text-align: center; }
    .login-card-header .brand-icon { font-size: 3rem; color: #fff; margin-bottom: .5rem; }
    .login-card-header h1 { color: #fff; font-size: 1.8rem; font-weight: 700; margin: 0; }
    .login-card-header p { color: rgba(255,255,255,.8); margin: .3rem 0 0; font-size: .95rem; }
    .login-card-body { background: #fff; padding: 2.5rem 2rem; }
    .btn-login { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: none; border-radius: 8px; padding: .75rem; font-size: 1rem; font-weight: 600; letter-spacing: .5px; transition: all .3s; }
    .btn-login:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(102,126,234,.5); }
    .form-control { border-radius: 8px; border: 2px solid #e8e8e8; padding: .65rem 1rem; transition: border-color .2s; }
    .form-control:focus { border-color: #667eea; box-shadow: 0 0 0 3px rgba(102,126,234,.15); }
    .input-group-text { background: #f8f9fa; border: 2px solid #e8e8e8; border-right: none; border-radius: 8px 0 0 8px; color: #667eea; }
    .login-link { color: #667eea; text-decoration: none; font-weight: 600; }
    .login-link:hover { text-decoration: underline; }
  </style>
</head>
<body>
<div class="container" style="max-width:440px; padding-top:8vh">
  <div class="login-card">
    <div class="login-card-header">
      <div class="brand-icon"><i class="fas fa-store"></i></div>
      <h1><b>By</b>Marnin</h1>
      <p>Sistema de Gestión de Tienda</p>
    </div>
    <div class="login-card-body">
      <?= $mensaje ?>
      <form method="POST" autocomplete="off">
        <div class="form-group">
          <label><b>Correo electrónico</b></label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text"><i class="fas fa-envelope"></i></span>
            </div>
            <input type="email" name="correo" id="correo" class="form-control"
                   placeholder="admin@bymarnin.com"
                   value="<?= isset($_POST['correo']) ? htmlspecialchars($_POST['correo']) : '' ?>"
                   required autofocus>
          </div>
        </div>
        <div class="form-group">
          <label><b>Contraseña</b></label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text"><i class="fas fa-lock"></i></span>
            </div>
            <input type="password" name="contrasena" id="contrasena" class="form-control"
                   placeholder="••••••••" required>
            <div class="input-group-append">
              <span class="input-group-text" style="cursor:pointer; border:2px solid #e8e8e8; border-left:none; border-radius:0 8px 8px 0;"
                    onclick="togglePass()">
                <i class="fas fa-eye" id="eyeIcon"></i>
              </span>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <button type="submit" class="btn btn-primary btn-login btn-block text-white">
            <i class="fas fa-sign-in-alt mr-2"></i> Ingresar al Sistema
          </button>
        </div>
        <div class="mt-3 text-center text-muted" style="font-size:.9rem">
          ¿No tienes cuenta? <a href="registro.php" class="login-link">Regístrate aquí</a>
        </div>
        <div class="mt-2 text-center text-muted" style="font-size:.8rem">
          Demo: admin@bymarnin.com / password
        </div>
      </form>
    </div>
  </div>
</div>
<script>
function togglePass() {
  var c = document.getElementById('contrasena');
  var i = document.getElementById('eyeIcon');
  if (c.type === 'password') { c.type = 'text'; i.classList.replace('fa-eye','fa-eye-slash'); }
  else { c.type = 'password'; i.classList.replace('fa-eye-slash','fa-eye'); }
}
</script>
</body>
</html>
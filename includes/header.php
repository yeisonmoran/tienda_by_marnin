<?php

session_start();
if (!isset($_SESSION['id_usuario'])) {
  header('Location: /tienda_by_marnin/auth/login.php');
  exit;
}
?>
<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>ByMarnin | Sistema de Tienda</title>
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
  <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
  <link rel="stylesheet" href="/tienda_by_marnin/assets/css/adminlte.min.css">
  <link rel="stylesheet" href="/tienda_by_marnin/assets/css/dashboardMenu.css">
</head>

<body class="hold-transition sidebar-mini layout-fixed">
  <div class="wrapper">

    <!-- Navbar Superior -->
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
        </li>
        <li class="nav-item d-none d-sm-inline-block">
          <a href="/tienda_by_marnin/index.php" class="nav-link">Inicio</a>
        </li>
      </ul>

      <ul class="navbar-nav ml-auto">
        <li class="nav-item dropdown">
          <a class="nav-link" data-toggle="dropdown" href="#">
            <i class="fas fa-user-circle mr-1"></i>
            <?= htmlspecialchars($_SESSION['nombre']) ?>
            <span class="badge badge-primary ml-1"
              style="font-size:.65rem;"><?= htmlspecialchars($_SESSION['nombre_rol']) ?></span>
          </a>
          <div class="dropdown-menu dropdown-menu-right">
            <a href="/tienda_by_marnin/auth/logout.php" class="dropdown-item text-danger">
              <i class="fas fa-sign-out-alt mr-2"></i> Cerrar Sesión
            </a>
          </div>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-widget="fullscreen" href="#" role="button">
            <i class="fas fa-expand-arrows-alt"></i>
          </a>
        </li>
      </ul>
    </nav>
    <!-- /.navbar -->

    <!-- Sidebar Lateral -->
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
      <a href="/tienda_by_marnin/index.php" class="brand-link text-center">
        <span class="brand-text font-weight"><b>By</b>Marnin</span>
        <div class="logo-sidebar">
          <img src="/tienda_by_marnin/assets/img/logo.png" alt="By Marnin Makeup">
        </div>
      </a>

      <div class="sidebar">
        <div class="user-panel mt-3 pb-3 mb-3 d-flex align-items-center">
          <div class="image">
            <div
              style="width:35px;height:35px;border-radius:50%;background:linear-gradient(135deg,#667eea,#764ba2);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:1rem;">
              <?= strtoupper(substr($_SESSION['nombre'], 0, 1)) ?>
            </div>
          </div>
          <div class="info ml-2">
            <a href="#" class="d-block text-white"
              style="font-size:.9rem;"><?= htmlspecialchars($_SESSION['nombre']) ?></a>
            <small class="text-muted"><?= htmlspecialchars($_SESSION['nombre_rol']) ?></small>
          </div>
        </div>

        <nav class="mt-2">
          <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

            <li class="nav-item">
              <a href="/tienda_by_marnin/index.php" class="nav-link">
                <i class="nav-icon fas fa-tachometer-alt"></i>
                <p>Dashboard</p>
              </a>
            </li>

            <li class="nav-header">CATÁLOGO</li>

            <li class="nav-item has-treeview">
              <a href="#" class="nav-link">
                <i class="nav-icon fas fa-box"></i>
                <p>Productos <i class="right fas fa-angle-left"></i></p>
              </a>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <a href="/tienda_by_marnin/modulos/productos/listar.php" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Ver Productos</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="/tienda_by_marnin/modulos/productos/crear.php" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Nuevo Producto</p>
                  </a>
                </li>
              </ul>
            </li>

            <li class="nav-item has-treeview">
              <a href="#" class="nav-link">
                <i class="nav-icon fas fa-tags"></i>
                <p>Categorías <i class="right fas fa-angle-left"></i></p>
              </a>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <a href="/tienda_by_marnin/modulos/categorias/listar.php" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Ver Categorías</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="/tienda_by_marnin/modulos/categorias/crear.php" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Nueva Categoría</p>
                  </a>
                </li>
              </ul>
            </li>

            <li class="nav-header">OPERACIONES</li>

            <li class="nav-item has-treeview">
              <a href="#" class="nav-link">
                <i class="nav-icon fas fa-shopping-cart"></i>
                <p>Ventas <i class="right fas fa-angle-left"></i></p>
              </a>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <a href="/tienda_by_marnin/modulos/ventas/listar.php" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Historial de Ventas</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="/tienda_by_marnin/modulos/ventas/registrar_vt.php" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Nueva Venta</p>
                  </a>
                </li>
              </ul>
            </li>

            <li class="nav-item has-treeview">
              <a href="#" class="nav-link">
                <i class="nav-icon fas fa-users"></i>
                <p>Clientes <i class="right fas fa-angle-left"></i></p>
              </a>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <a href="/tienda_by_marnin/modulos/clientes/listar.php" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Ver Clientes</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="/tienda_by_marnin/modulos/clientes/registrar_client.php" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>Nuevo Cliente</p>
                  </a>
                </li>
              </ul>
            </li>

            <li class="nav-item">
              <a href="/tienda_by_marnin/modulos/inventario/listar.php" class="nav-link">
                <i class="nav-icon fas fa-warehouse"></i>
                <p>Inventario</p>
              </a>
            </li>

            <?php if ($_SESSION['id_rol'] == 1): ?>
              <li class="nav-header">ADMINISTRACIÓN</li>
              <li class="nav-item">
                <a href="/tienda_by_marnin/modulos/usuarios/listar.php" class="nav-link">
                  <i class="nav-icon fas fa-user-cog"></i>
                  <p>Usuarios</p>
                </a>
              </li>
            <?php endif; ?>

            <li class="nav-header">MI CUENTA</li>
            <li class="nav-item">
              <a href="/tienda_by_marnin/auth/logout.php" class="nav-link text-danger">
                <i class="nav-icon fas fa-sign-out-alt"></i>
                <p>Cerrar Sesión</p>
              </a>
            </li>

          </ul>
        </nav>
      </div>
    </aside>

    <!-- Contenedor principal -->
    <div class="content-wrapper">
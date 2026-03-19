<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Mi Tienda | Dashboard</title>

  <!-- Google Font: Source Sans Pro -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
  
  <!-- Theme style -->
  <!-- Usamos ruta absoluta marcando desde la raíz local (/tienda_by_marnin/...) -->
  <link rel="stylesheet" href="/tienda_by_marnin/assets/css/adminlte.min.css">
</head>
<body class="hold-transition sidebar-mini layout-fixed">
<div class="wrapper">

  <!-- Navbar Superior -->
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <!-- Links Izquierda -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <a href="/tienda_by_marnin/index.php" class="nav-link">Inicio</a>
      </li>
    </ul>

    <!-- Links Derecha -->
    <ul class="navbar-nav ml-auto">
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
    <!-- Logo de la marca -->
    <a href="/tienda_by_marnin/index.php" class="brand-link">
      <!-- Puedes cambiar este icono por una imagen logo -->
      <span class="brand-text font-weight-light text-center d-block"><b>By</b>Marnin</span>
    </a>

    <!-- Sidebar interior -->
    <div class="sidebar">
      <!-- Panel de usuario -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex justify-content-center">
        <div class="info">
          <a href="#" class="d-block text-white" style="font-size: 1.1rem;">Usuario del Sistema</a>
        </div>
      </div>

      <!-- Menú de navegación -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          
          <li class="nav-item">
            <a href="/tienda_by_marnin/index.php" class="nav-link">
              <i class="nav-icon fas fa-tachometer-alt"></i>
              <p>Dashboard Mando</p>
            </a>
          </li>
          
          <li class="nav-item">
            <a href="/tienda_by_marnin/modulos/productos/listar.php" class="nav-link">
              <i class="nav-icon fas fa-box"></i>
              <p>Productos</p>
            </a>
          </li>
          
          <li class="nav-item">
            <a href="/tienda_by_marnin/modulos/ventas/registrar_vt.php" class="nav-link">
              <i class="nav-icon fas fa-shopping-cart"></i>
              <p>Ventas</p>
            </a>
          </li>

          <li class="nav-item">
            <a href="/tienda_by_marnin/modulos/inventario/listar.php" class="nav-link">
              <i class="nav-icon fas fa-warehouse"></i>
              <p>Inventario</p>
            </a>
          </li>

          <li class="nav-header">MI CUENTA</li>
          <li class="nav-item">
            <a href="/tienda_by_marnin/auth/login.php" class="nav-link text-danger">
              <i class="nav-icon fas fa-sign-out-alt"></i>
              <p>Cerrar Sesión</p>
            </a>
          </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>

  <!-- El contenedor de contenido principal que envolverá las otras páginas -->
  <div class="content-wrapper">

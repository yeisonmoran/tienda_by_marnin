<?php 
// 1. Incluimos toda la parte de arriba de la plantilla (CSS, Menú lateral, Barra superior)
include('includes/header.php'); 
?>

<!-- ======================================================= -->
<!-- AQUI EMPIEZA TU CONTENIDO ÚNICO DE ESTA PÁGINA (DASHBOARD) -->
<!-- ======================================================= -->

<!-- Content Header (Título de página) -->
<div class="content-header">
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-6">
        <h1 class="m-0">Panel de Control</h1>
      </div>
    </div>
  </div>
</div>
<!-- /.content-header -->

<!-- Main content -->
<section class="content">
  <div class="container-fluid">
    
    <!-- Cajas pequeñas de estadísticas -->
    <div class="row">
      <div class="col-lg-3 col-6">
        <div class="small-box bg-info">
          <div class="inner">
            <h3>150</h3>
            <p>Productos Disponibles</p>
          </div>
          <div class="icon">
            <i class="ion ion-bag"></i>
          </div>
          <a href="/tienda_by_marnin/modulos/productos/listar.php" class="small-box-footer">Ver productos <i class="fas fa-arrow-circle-right"></i></a>
        </div>
      </div>

      <div class="col-lg-3 col-6">
        <div class="small-box bg-success">
          <div class="inner">
            <h3>53</h3>
            <p>Ventas Realizadas</p>
          </div>
          <div class="icon">
            <i class="ion ion-stats-bars"></i>
          </div>
          <a href="/tienda_by_marnin/modulos/ventas/registrar_vt.php" class="small-box-footer">Registrar Venta <i class="fas fa-arrow-circle-right"></i></a>
        </div>
      </div>

      <div class="col-lg-3 col-6">
        <div class="small-box bg-warning">
          <div class="inner">
            <h3>44</h3>
            <p>Usuarios Registrados</p>
          </div>
          <div class="icon">
            <i class="ion ion-person-add"></i>
          </div>
          <a href="/tienda_by_marnin/auth/registro.php" class="small-box-footer">Registrar usuario <i class="fas fa-arrow-circle-right"></i></a>
        </div>
      </div>

      <div class="col-lg-3 col-6">
        <div class="small-box bg-danger">
          <div class="inner">
            <h3>10</h3>
            <p>Alertas de Inventario</p>
          </div>
          <div class="icon">
            <i class="ion ion-pie-graph"></i>
          </div>
          <a href="/tienda_by_marnin/modulos/inventario/listar.php" class="small-box-footer">Revisar inventario <i class="fas fa-arrow-circle-right"></i></a>
        </div>
      </div>
    </div>
    <!-- /.row -->

    <!-- Fila principal -->
    <div class="row">
      <section class="col-lg-12 connectedSortable">
        
        <!-- Tarjeta de Bienvenida -->
        <div class="card card-primary card-outline">
          <div class="card-header">
            <h3 class="card-title">
              <i class="fas fa-rocket mr-1"></i>
              ¡Bienvenido al sistema!
            </h3>
          </div>
          <div class="card-body">
            <h4>Integración Exitosa</h4>
            <p>Has instalado con éxito la plantilla AdminLTE 3 en tu proyecto.</p>
            <p>Para crear nuevas páginas, simplemente haz lo mismo que en este código:</p>
            <ol>
              <li>Pon un <code>&lt;?php include('includes/header.php'); ?&gt;</code> al principio del archivo.</li>
              <li>Escribe todo tu código HTML de tablas o formularios dentro de un <code>&lt;section class="content"&gt;</code>.</li>
              <li>Termina copiando <code>&lt;?php include('includes/footer.php'); ?&gt;</code> abajo.</li>
            </ol>
            <p class="text-muted">Nota: Usamos enlaces estáticos de CDN para los estilos de la demo (iconos) porque no estaban en tu carpeta assets.</p>
          </div>
        </div>

      </section>
    </div>

  </div><!-- /.container-fluid -->
</section>
<!-- /.content -->

<!-- ======================================================= -->
<!-- FIN DE TU CONTENIDO ÚNICO -->
<!-- ======================================================= -->

<?php 
// 2. Incluimos toda la parte de abajo de la plantilla (cierre de etiquetas y Archivos JavaScript)
include('includes/footer.php'); 
?>
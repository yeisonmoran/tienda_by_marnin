<?php
session_start();
if (!isset($_SESSION['id_usuario'])) { header('Location: /tienda_by_marnin/auth/login.php'); exit; }
require_once('../../config/conexion.php');

$id = (int)($_GET['id'] ?? 0);

if ($id > 0) {
    // Verificar si el cliente tiene ventas registradas
    $chk = $conexion->prepare("SELECT COUNT(*) as total FROM ventas WHERE id_cliente = ?");
    $chk->bind_param("i", $id);
    $chk->execute();
    $total = $chk->get_result()->fetch_assoc()['total'];

    if ($total > 0) {
        header("Location: listar.php?error=fk&nombre=este+cliente&detalle=Tiene+$total+venta(s)+en+el+historial.+Elimina+primero+sus+ventas+o+conserva+el+cliente.");
        exit;
    }

    $stmt = $conexion->prepare("DELETE FROM clientes WHERE id_cliente = ?");
    $stmt->bind_param("i", $id);
    if ($stmt->execute()) {
        header('Location: listar.php?ok=del');
    } else {
        header('Location: listar.php?error=db');
    }
    exit;
}

header('Location: listar.php');
exit;

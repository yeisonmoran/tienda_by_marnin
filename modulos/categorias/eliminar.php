<?php
session_start();
if (!isset($_SESSION['id_usuario'])) { header('Location: /tienda_by_marnin/auth/login.php'); exit; }
require_once('../../config/conexion.php');

$id = (int)($_GET['id'] ?? 0);

if ($id > 0) {
    // Verificar si la categoría tiene productos asociados
    $chk = $conexion->prepare("SELECT COUNT(*) as total FROM productos WHERE id_categoria = ?");
    $chk->bind_param("i", $id);
    $chk->execute();
    $total = $chk->get_result()->fetch_assoc()['total'];

    if ($total > 0) {
        // No se puede eliminar: tiene productos vinculados
        header("Location: listar.php?error=fk&nombre=esta+categoría&detalle=Tiene+$total+producto(s)+asociado(s).+Reasígnalos+o+elimínalos+primero.");
        exit;
    }

    // Sin dependencias: eliminar con seguridad
    $stmt = $conexion->prepare("DELETE FROM categorias WHERE id_categoria = ?");
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

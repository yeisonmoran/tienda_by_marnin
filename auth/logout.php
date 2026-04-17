<?php
session_start();
session_unset();
session_destroy();
header('Location: /tienda_by_marnin/auth/login.php');
exit;

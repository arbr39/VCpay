<?php
session_start();
session_destroy();
header("Location: admin_login.php"); // Возвращаем на страницу входа
exit;
?>
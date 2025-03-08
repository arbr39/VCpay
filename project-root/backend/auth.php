<?php
session_start();

$admin_username = "admin";
$admin_password = "Tvtv1002/"; // Задай свой пароль

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    if ($username === $admin_username && $password === $admin_password) {
        $_SESSION['admin_logged_in'] = true;
        header("Location: admin_dashboard.php"); // Перенаправляем в админку
        exit;
    } else {
        header("Location: admin_login.php?error=1"); // Ошибка входа
        exit;
    }
}
?>
<?php
session_start();

$admin_username = "admin";
// Используем хеширование пароля
$admin_password_hash = '$2y$10$GxEDGFnCb8rw0jEK6VO7Yu.KTkJ97QVY9BbFcuDglwgMYBYIcZ6kq'; // хеш для "Tvtv1002/"

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    if ($username === $admin_username && password_verify($password, $admin_password_hash)) {
        $_SESSION['admin_logged_in'] = true;
        header("Location: admin_dashboard.php");
        exit;
    } else {
        header("Location: admin_login.php?error=1");
        exit;
    }
}
?>
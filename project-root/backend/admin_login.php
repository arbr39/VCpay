<?php
session_start();

// Если админ уже залогинен, перенаправляем на dashboard
if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
    header("Location: admin_dashboard.php");
    exit;
}

// Проверяем, есть ли сообщение об ошибке
$error = isset($_GET['error']) ? "Неверный логин или пароль" : "";
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Вход в админ-панель</title>
</head>
<body>
    <h2>Вход в админ-панель</h2>
    <form action="auth.php" method="POST">
        <label>Логин:</label>
        <input type="text" name="username" required><br>
        
        <label>Пароль:</label>
        <input type="password" name="password" required><br>

        <button type="submit">Войти</button>
    </form>

    <p style="color: red;"><?php echo $error; ?></p>
</body>
</html>
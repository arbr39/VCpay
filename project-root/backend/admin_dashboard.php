<?php
session_start();

// Проверяем, вошёл ли пользователь
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header("Location: ../../public/admin_login.html");
    exit;
}
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Админ-панель</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 50px;
        }
        button {
            padding: 10px 20px;
            font-size: 16px;
            margin-top: 20px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <h2>Добро пожаловать в админ-панель!</h2>
    <p>Вы вошли как <strong>admin</strong></p>

    <button onclick="window.location.href='update_rate.php'">Обновить курс USD → RUB</button>
    <br><br>
    <button onclick="logout()">Выйти</button>

    <script>
        function logout() {
            fetch("logout.php").then(() => {
                window.location.href = "../../public/admin_login.html";
            });
        }
    </script>
</body>
</html>
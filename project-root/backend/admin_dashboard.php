<?php
session_start();

// Если нет авторизации → перенаправляем обратно на вход
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header("Location: admin_login.php");
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
    }
  </style>
</head>
<body>
  <h2>Добро пожаловать в админ-панель!</h2>
  <p>Вы вошли как <strong>admin</strong></p>

  <button onclick="logout()">Выйти</button>

  <script>
    function logout() {
      fetch("logout.php").then(() => {
        window.location.href = "admin_login.php";
      });
    }
  </script>
</body>
</html>
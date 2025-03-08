<?php
session_start();

// Проверяем, вошёл ли пользователь
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header("Location: ../../public/admin_login.html");
    exit;
}

// Отображаем сообщение после успешного обновления курса
$success_message = isset($_GET['success']) ? "Курс успешно обновлён!" : "";

?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Обновление курса</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 50px;
        }
        input, button {
            padding: 10px;
            margin: 10px;
            font-size: 16px;
        }
        .message {
            color: green;
            font-weight: bold;
        }
    </style>
</head>
<body>

    <h2>Обновление курса USD → RUB</h2>

    <form action="save_rate.php" method="post">
        <input type="number" step="0.01" name="exchange_rate" placeholder="Введите курс" required>
        <button type="submit">Сохранить курс</button>
    </form>

    <?php if ($success_message): ?>
        <p class="message"><?= $success_message ?></p>
    <?php endif; ?>

    <br>
    <button onclick="window.location.href='admin_dashboard.php'">Назад в админку</button>

</body>
</html>
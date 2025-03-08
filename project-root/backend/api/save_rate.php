<?php
session_start();

// Проверяем, вошёл ли пользователь
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header("Location: ../../public/admin_login.html");
    exit;
}

// Проверяем, пришли ли данные
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["exchange_rate"])) {
    $exchange_rate = floatval($_POST["exchange_rate"]);
    
    if ($exchange_rate > 0) {
        // Формируем JSON с курсом
        $data = [
            "exchangeRate" => number_format($exchange_rate, 2, '.', ''),
            "updatedAt" => date("Y-m-d H:i:s")
        ];

        // Сохраняем данные в `backend/api/exchangeRate.json`
        file_put_contents(__DIR__ . "/exchangeRate.json", json_encode($data));

        // Перенаправляем обратно с сообщением об успехе
        header("Location: update_rate.php?success=1");
        exit;
    }
}

// Если запрос некорректный, отправляем обратно
header("Location: update_rate.php?error=1");
exit;
?>
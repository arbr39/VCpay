<?php
header('Content-Type: application/json');

// Получаем JSON-данные из запроса
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['rate'])) {
    $rate = floatval($data['rate']);
    if ($rate > 0) {
        // Форматируем дату обновления
        $now = new DateTime();
        $formattedTime = $now->format('Y-m-d H:i:s');

        // Формируем данные для сохранения
        $response = [
            'exchangeRate' => number_format($rate, 2, '.', ''),
            'rateUpdateTime' => $formattedTime
        ];

        // Сохраняем данные в файл
        file_put_contents('exchangeRate.json', json_encode($response));

        echo json_encode(['success' => true, 'data' => $response]);
        exit;
    }
}

echo json_encode(['success' => false, 'error' => 'Invalid rate']);
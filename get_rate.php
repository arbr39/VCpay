<?php
header('Content-Type: application/json');
if (file_exists('exchangeRate.json')) {
    echo file_get_contents('exchangeRate.json');
} else {
    // Если данные ещё не установлены, возвращаем значения по умолчанию
    echo json_encode(['exchangeRate' => 'N/A', 'rateUpdateTime' => 'Никогда']);
}
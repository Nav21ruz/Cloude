<?php
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: same-origin');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST')    { http_response_code(405); exit; }

// ═══════════════════════════════════════════════════════════════
//  НАСТРОЙКИ — заполните перед загрузкой на сервер
// ═══════════════════════════════════════════════════════════════
define('BOT_TOKEN', 'ВСТАВЬТЕ_ТОКЕН_БОТА');   // получить у @BotFather
define('CHAT_ID',   'ВСТАВЬТЕ_CHAT_ID');       // ваш Telegram ID (число)
// ═══════════════════════════════════════════════════════════════

$input = file_get_contents('php://input');
$b = json_decode($input, true) ?: [];

$name    = trim($b['name']        ?? '');
$phone   = trim($b['phone']       ?? '');
$email   = trim($b['email']       ?? '');
$company = trim($b['company']     ?? '');
$objType = trim($b['object-type'] ?? '');
$area    = trim($b['area']        ?? '');
$budget  = trim($b['budget']      ?? '');
$message = trim($b['message']     ?? '');
$source  = trim($b['how-found']   ?? '');

if (!$name || !$phone) {
    http_response_code(400);
    echo json_encode(['error' => 'Имя и телефон обязательны']);
    exit;
}

$OBJ = ['office'=>'Офис', 'retail'=>'Торговый зал', 'restaurant'=>'Ресторан/кафе',
        'medical'=>'Медицина', 'warehouse'=>'Склад/производство', 'other'=>'Другое'];
$BUD = ['to3m'=>'до 3 млн ₽', '3to10m'=>'3–10 млн ₽', '10to30m'=>'10–30 млн ₽', '30plus'=>'более 30 млн ₽'];
$SRC = ['search'=>'Поисковик', 'recommend'=>'Рекомендация', 'social'=>'Соцсети', 'other'=>'Другое'];

function e($s) { return htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8'); }

$tz   = new DateTimeZone('Asia/Yekaterinburg');
$now  = (new DateTime('now', $tz))->format('d.m.Y H:i');

$lines = [];
$lines[] = '🔔 <b>НОВАЯ ЗАЯВКА — DUMAEV</b>';
$lines[] = "🕐 <i>{$now} (Екб)</i>";
$lines[] = '';
$lines[] = '👤 <b>Имя:</b> ' . e($name);
$lines[] = '📞 <b>Телефон:</b> ' . e($phone);
if ($email)   $lines[] = '📧 <b>Email:</b> '    . e($email);
if ($company) $lines[] = '🏢 <b>Компания:</b> ' . e($company);
if ($objType) $lines[] = '🏗 <b>Объект:</b> '   . e($OBJ[$objType] ?? $objType);
if ($area)    $lines[] = '📐 <b>Площадь:</b> '  . e($area) . ' м²';
if ($budget)  $lines[] = '💰 <b>Бюджет:</b> '   . e($BUD[$budget]  ?? $budget);
if ($message) { $lines[] = ''; $lines[] = '💬 <b>Задача:</b>'; $lines[] = e($message); }
if ($source)  { $lines[] = ''; $lines[] = '🔍 <b>Источник:</b> ' . e($SRC[$source] ?? $source); }

$text = implode("\n", $lines);

$payload = json_encode([
    'chat_id'    => CHAT_ID,
    'text'       => $text,
    'parse_mode' => 'HTML',
]);

$ch = curl_init('https://api.telegram.org/bot' . BOT_TOKEN . '/sendMessage');
curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $payload,
    CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 10,
    CURLOPT_SSL_VERIFYPEER => true,
]);
$result   = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlErr  = curl_error($ch);
curl_close($ch);

if ($curlErr) {
    http_response_code(500);
    echo json_encode(['error' => 'cURL error: ' . $curlErr]);
    exit;
}

$resp = json_decode($result, true);
if ($httpCode === 200 && ($resp['ok'] ?? false)) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Telegram API error', 'details' => $resp]);
}

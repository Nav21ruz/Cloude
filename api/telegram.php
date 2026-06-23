<?php
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: same-origin');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST')    { http_response_code(405); exit; }

// ═══════════════════════════════════════════════════════════════
//  НАСТРОЙКИ
// ═══════════════════════════════════════════════════════════════
define('BOT_TOKEN',    'ВСТАВЬТЕ_ТОКЕН_БОТА');   // получить у @BotFather
define('CHAT_ID',      'ВСТАВЬТЕ_CHAT_ID');       // ваш Telegram ID (число)
define('EMAIL_TO',     'info@tektonpro.ru');       // куда слать письма
define('EMAIL_FROM',   'info@tektonpro.ru');       // от кого
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

$tz  = new DateTimeZone('Asia/Yekaterinburg');
$now = (new DateTime('now', $tz))->format('d.m.Y H:i');

// ── EMAIL ────────────────────────────────────────────────────
$objLabel = $OBJ[$objType] ?? $objType;
$budLabel = $BUD[$budget]  ?? $budget;
$srcLabel = $SRC[$source]  ?? $source;

$emailBody  = "НОВАЯ ЗАЯВКА С САЙТА ТЕКTON — {$now} (Екб)\r\n";
$emailBody .= str_repeat('=', 50) . "\r\n\r\n";
$emailBody .= "Имя:      {$name}\r\n";
$emailBody .= "Телефон:  {$phone}\r\n";
if ($email)      $emailBody .= "Email:    {$email}\r\n";
if ($company)    $emailBody .= "Компания: {$company}\r\n";
if ($objLabel)   $emailBody .= "Объект:   {$objLabel}\r\n";
if ($area)       $emailBody .= "Площадь:  {$area} м²\r\n";
if ($budLabel)   $emailBody .= "Бюджет:   {$budLabel}\r\n";
if ($message)    $emailBody .= "\r\nЗадача:\r\n{$message}\r\n";
if ($srcLabel)   $emailBody .= "\r\nИсточник: {$srcLabel}\r\n";

$emailHeaders  = "From: ТЕКТОН Сайт <" . EMAIL_FROM . ">\r\n";
$emailHeaders .= "Reply-To: {$name} <" . ($email ?: EMAIL_FROM) . ">\r\n";
$emailHeaders .= "MIME-Version: 1.0\r\n";
$emailHeaders .= "Content-Type: text/plain; charset=UTF-8\r\n";
$emailHeaders .= "Content-Transfer-Encoding: 8bit\r\n";
$emailHeaders .= "X-Mailer: TEKTON-Site/1.0\r\n";

$emailSubject = "=?UTF-8?B?" . base64_encode("Новая заявка: {$name}, {$phone}") . "?=";

mail(EMAIL_TO, $emailSubject, $emailBody, $emailHeaders);

// ── TELEGRAM ─────────────────────────────────────────────────
$lines   = [];
$lines[] = '🔔 <b>НОВАЯ ЗАЯВКА — ТЕКТОН</b>';
$lines[] = "🕐 <i>{$now} (Екб)</i>";
$lines[] = '';
$lines[] = '👤 <b>Имя:</b> '      . e($name);
$lines[] = '📞 <b>Телефон:</b> '  . e($phone);
if ($email)    $lines[] = '📧 <b>Email:</b> '    . e($email);
if ($company)  $lines[] = '🏢 <b>Компания:</b> ' . e($company);
if ($objLabel) $lines[] = '🏗 <b>Объект:</b> '   . e($objLabel);
if ($area)     $lines[] = '📐 <b>Площадь:</b> '  . e($area) . ' м²';
if ($budLabel) $lines[] = '💰 <b>Бюджет:</b> '   . e($budLabel);
if ($message)  { $lines[] = ''; $lines[] = '💬 <b>Задача:</b>'; $lines[] = e($message); }
if ($srcLabel) { $lines[] = ''; $lines[] = '🔍 <b>Источник:</b> ' . e($srcLabel); }

$tgEnabled = BOT_TOKEN !== 'ВСТАВЬТЕ_ТОКЕН_БОТА' && CHAT_ID !== 'ВСТАВЬТЕ_CHAT_ID';

if ($tgEnabled) {
    $payload = json_encode(['chat_id' => CHAT_ID, 'text' => implode("\n", $lines), 'parse_mode' => 'HTML']);
    $ch = curl_init('https://api.telegram.org/bot' . BOT_TOKEN . '/sendMessage');
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => $payload,
        CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 10,
        CURLOPT_SSL_VERIFYPEER => true,
    ]);
    curl_exec($ch);
    curl_close($ch);
}

echo json_encode(['success' => true]);

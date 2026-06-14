<?php
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: same-origin');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST')    { http_response_code(405); exit; }

// ═══════════════════════════════════════════════════════════════
//  НАСТРОЙКИ — задайте пароль администратора
// ═══════════════════════════════════════════════════════════════
define('ADMIN_PASSWORD', 'Imov2121');
// ═══════════════════════════════════════════════════════════════

$input = file_get_contents('php://input');
if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Empty body']);
    exit;
}

$decoded = json_decode($input, true);
if ($decoded === null) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

// Пароль передаётся в теле запроса (надёжнее чем Authorization на Apache)
$pass = $decoded['_pass'] ?? '';
if ($pass !== ADMIN_PASSWORD) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

// Режим проверки пароля без сохранения (?ping=1)
if (isset($_GET['ping'])) {
    echo json_encode(['ok' => true]);
    exit;
}

// Убираем служебное поле пароля перед сохранением
unset($decoded['_pass']);

$contentFile = __DIR__ . '/../data/content.json';

$written = file_put_contents(
    $contentFile,
    json_encode($decoded, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)
);

if ($written === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to write file. Check folder permissions (chmod 777 data/).']);
    exit;
}

echo json_encode(['ok' => true, 'bytes' => $written]);

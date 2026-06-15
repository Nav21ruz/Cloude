<?php
header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');
header('Cache-Control: no-store, no-cache, must-revalidate');
header('Access-Control-Allow-Origin: same-origin');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST')    { http_response_code(405); exit; }

// ═══════════════════════════════════════════════════════════════
//  НАСТРОЙКИ
// ═══════════════════════════════════════════════════════════════
define('ADMIN_PASSWORD', 'Imov2121');
define('MAX_ATTEMPTS',   5);       // блокировка после N неудачных попыток
define('LOCKOUT_SECONDS', 900);    // 15 минут блокировки
define('LOCK_FILE', __DIR__ . '/.brute_lock');
// ═══════════════════════════════════════════════════════════════

// ── Брутфорс-защита ─────────────────────────────────────────────
function get_lock_data() {
    $f = LOCK_FILE;
    if (!file_exists($f)) return ['attempts' => 0, 'until' => 0, 'ips' => []];
    $d = @json_decode(file_get_contents($f), true);
    return is_array($d) ? $d : ['attempts' => 0, 'until' => 0, 'ips' => []];
}

function save_lock_data(array $d) {
    file_put_contents(LOCK_FILE, json_encode($d));
    @chmod(LOCK_FILE, 0600);
}

function client_ip() {
    foreach (['HTTP_CF_CONNECTING_IP','HTTP_X_FORWARDED_FOR','REMOTE_ADDR'] as $h) {
        if (!empty($_SERVER[$h])) {
            return trim(explode(',', $_SERVER[$h])[0]);
        }
    }
    return 'unknown';
}

$ip   = client_ip();
$lock = get_lock_data();
$now  = time();

// Снимаем устаревшую блокировку
if ($lock['until'] > 0 && $now > $lock['until']) {
    $lock = ['attempts' => 0, 'until' => 0, 'ips' => []];
    save_lock_data($lock);
}

// Проверяем блокировку
if ($lock['until'] > 0 && $now <= $lock['until']) {
    $wait = ceil(($lock['until'] - $now) / 60);
    http_response_code(429);
    echo json_encode(['error' => "Too many attempts. Try again in {$wait} min."]);
    exit;
}
// ────────────────────────────────────────────────────────────────

$input = file_get_contents('php://input');
if (!$input) { http_response_code(400); echo json_encode(['error' => 'Empty body']); exit; }

$decoded = json_decode($input, true);
if ($decoded === null) { http_response_code(400); echo json_encode(['error' => 'Invalid JSON']); exit; }

// ── Проверка пароля ──────────────────────────────────────────────
$pass = $decoded['_pass'] ?? '';

if ($pass !== ADMIN_PASSWORD) {
    // Регистрируем неудачную попытку
    $lock['attempts']++;
    $lock['ips'][$ip] = ($lock['ips'][$ip] ?? 0) + 1;

    if ($lock['attempts'] >= MAX_ATTEMPTS) {
        $lock['until'] = $now + LOCKOUT_SECONDS;
        save_lock_data($lock);
        http_response_code(429);
        echo json_encode(['error' => 'Too many failed attempts. Locked for 15 minutes.']);
    } else {
        save_lock_data($lock);
        $left = MAX_ATTEMPTS - $lock['attempts'];
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized', 'attempts_left' => $left]);
    }
    exit;
}

// Успешный вход — сбрасываем счётчик
$lock = ['attempts' => 0, 'until' => 0, 'ips' => []];
save_lock_data($lock);
// ────────────────────────────────────────────────────────────────

// Режим проверки пароля без сохранения (?ping=1)
if (isset($_GET['ping'])) {
    echo json_encode(['ok' => true]);
    exit;
}

// Убираем служебное поле пароля перед сохранением
unset($decoded['_pass']);

// Защита: разрешаем только ожидаемые top-level ключи
$allowed_keys = [
    'contacts','stats','hero','about','projects','categories','pages','homePage',
    'aboutPage','services','contactPage','reviews','pageOverrides'
];
foreach (array_keys($decoded) as $k) {
    if (!in_array($k, $allowed_keys, true)) unset($decoded[$k]);
}

// Защита от path traversal — пишем только в фиксированный файл
$contentFile = realpath(__DIR__ . '/../data') . '/content.json';

if (!$contentFile || !is_writable($contentFile)) {
    http_response_code(500);
    echo json_encode(['error' => 'Cannot write file. Check permissions (chmod 666 data/content.json).']);
    exit;
}

$written = file_put_contents(
    $contentFile,
    json_encode($decoded, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
    LOCK_EX
);

if ($written === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Write failed.']);
    exit;
}

echo json_encode(['ok' => true, 'bytes' => $written]);

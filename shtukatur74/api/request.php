<?php
declare(strict_types=1);

/**
 * Приём заявок: письмо на почту + опционально Telegram.
 * Согласие на обработку ПД проверяется здесь независимо от фронтенда.
 */

header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');

/**
 * Приём заявок отключён до подачи уведомления в Роскомнадзор об обработке ПД.
 * При false обработчик не принимает и не сохраняет ничего, даже если запрос
 * отправлен в обход сайта. Включать одновременно с SITE.formsEnabled в
 * js/site.js. Отправка через SMTP, журнал заявок и ограничение частоты ниже
 * уже написаны и заработают сразу при включении.
 */
const FORMS_ENABLED = false;

if (!FORMS_ENABLED) {
    http_response_code(503);
    header('Retry-After: 86400');
    echo json_encode([
        'error' => 'Приём заявок через сайт временно отключён. Позвоните нам или напишите в WhatsApp.',
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    echo json_encode(['error' => 'Метод не поддерживается'], JSON_UNESCAPED_UNICODE);
    exit;
}

require __DIR__ . '/mail.php';

$raw = file_get_contents('php://input');
if ($raw === false || strlen($raw) > 20000) {
    http_response_code(400);
    echo json_encode(['error' => 'Некорректный запрос'], JSON_UNESCAPED_UNICODE);
    exit;
}

$in = json_decode($raw, true);
if (!is_array($in)) {
    http_response_code(400);
    echo json_encode(['error' => 'Некорректный формат данных'], JSON_UNESCAPED_UNICODE);
    exit;
}

/** Обрезает до length символов и убирает управляющие символы и переводы строк. */
function field(array $src, string $key, int $length, bool $multiline = false): string
{
    $v = trim((string)($src[$key] ?? ''));
    $v = $multiline
        ? preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F]/u', '', $v)
        : preg_replace('/[\x00-\x1F\x7F]/u', ' ', $v);
    return mb_substr(trim((string)$v), 0, $length, 'UTF-8');
}

// Honeypot: скрытое поле, которое заполняют только боты.
if (field($in, 'website', 100) !== '') {
    echo json_encode(['success' => true], JSON_UNESCAPED_UNICODE);
    exit;
}

// ─── Ограничение частоты ──────────────────────────────────────────────────
$rateIp  = (string)($_SERVER['REMOTE_ADDR'] ?? '');
$rateDir = dirname(RATE_FILE);
if (!is_dir($rateDir)) {
    @mkdir($rateDir, 0750, true);
}
$fh = @fopen(RATE_FILE, 'c+');
if ($fh !== false) {
    flock($fh, LOCK_EX);
    $raw  = stream_get_contents($fh);
    $hits = json_decode($raw ?: '[]', true);
    if (!is_array($hits)) {
        $hits = [];
    }
    $now  = time();
    // Чистим всё старше окна, иначе файл растёт без предела.
    $hits = array_values(array_filter($hits, static fn($h) => ($h['ts'] ?? 0) > $now - RATE_WINDOW));
    $mine = count(array_filter($hits, static fn($h) => ($h['ip'] ?? '') === $rateIp));
    if ($mine >= RATE_MAX) {
        flock($fh, LOCK_UN);
        fclose($fh);
        http_response_code(429);
        header('Retry-After: ' . RATE_WINDOW);
        echo json_encode(
            ['error' => 'Слишком много заявок с одного адреса. Позвоните нам: заявку примем сразу.'],
            JSON_UNESCAPED_UNICODE
        );
        exit;
    }
    $hits[] = ['ip' => $rateIp, 'ts' => $now];
    ftruncate($fh, 0);
    rewind($fh);
    fwrite($fh, json_encode($hits));
    fflush($fh);
    flock($fh, LOCK_UN);
    fclose($fh);
}

// ─── Согласие на обработку ПД: без него заявка не принимается ─────────────
$consent = (string)($in['consent'] ?? '');
if ($consent !== '1' && $consent !== 'on' && $consent !== 'true') {
    http_response_code(422);
    echo json_encode(
        ['error' => 'Заявка не принята: нет согласия на обработку персональных данных'],
        JSON_UNESCAPED_UNICODE
    );
    exit;
}

$name    = field($in, 'name', 100);
$phone   = field($in, 'phone', 30);
$city    = field($in, 'city', 80);
$area    = field($in, 'area', 20);
$work    = field($in, 'worktype', 60);
$comment = field($in, 'comment', 2000, true);

if ($name === '' || strlen(preg_replace('/\D/', '', $phone)) < 10) {
    http_response_code(422);
    echo json_encode(['error' => 'Укажите имя и корректный телефон'], JSON_UNESCAPED_UNICODE);
    exit;
}

$WORK = [
    'gypsum'  => 'Гипсовая штукатурка',
    'cement'  => 'Цементно-песчаная штукатурка',
    'ceiling' => 'Штукатурка потолков',
    'subcontract' => 'Субподряд / сотрудничество',
    'other'   => 'Другое',
];

$ip   = (string)($_SERVER['REMOTE_ADDR'] ?? '');
$when = (new DateTimeImmutable('now', new DateTimeZone('Asia/Yekaterinburg')))->format('d.m.Y H:i');

// ─── Журнал согласий: фиксируем факт, дату и версию политики ──────────────
$logDir = dirname(CONSENT_LOG);
if (!is_dir($logDir)) {
    @mkdir($logDir, 0750, true);
}
@file_put_contents(
    CONSENT_LOG,
    json_encode([
        'ts'      => date('c'),
        'ip'      => $ip,
        'phone'   => $phone,
        'form'    => field($in, 'form_id', 40) ?: 'contact',
        'policy'  => 'privacy.html v1.0',
    ], JSON_UNESCAPED_UNICODE) . PHP_EOL,
    FILE_APPEND | LOCK_EX
);

// ─── Письмо ───────────────────────────────────────────────────────────────
$lines = [
    'Новая заявка с сайта ' . SITE_HOST,
    'Время: ' . $when . ' (Екатеринбург)',
    '',
    'Имя: ' . $name,
    'Телефон: ' . $phone,
];
if ($city !== '')    $lines[] = 'Город / район: ' . $city;
if ($work !== '')    $lines[] = 'Вид работ: ' . ($WORK[$work] ?? $work);
if ($area !== '')    $lines[] = 'Площадь: ' . $area . ' м²';
if ($comment !== '') { $lines[] = ''; $lines[] = 'Комментарий:'; $lines[] = $comment; }
$lines[] = '';
$lines[] = 'Согласие на обработку ПД: получено ' . $when . ', IP ' . $ip;

$body = implode("\r\n", $lines);

$headers = implode("\r\n", [
    'From: Сайт ' . SITE_HOST . ' <' . MAIL_FROM . '>',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'MIME-Version: 1.0',
]);

$subject = '=?UTF-8?B?' . base64_encode('Заявка с сайта: ' . $name . ', ' . $phone) . '?=';
@file_put_contents(
    LEADS_LOG,
    '===== ' . $when . ' =====' . PHP_EOL . $body . PHP_EOL . PHP_EOL,
    FILE_APPEND | LOCK_EX
);

$mailErr  = null;
if (SMTP_HOST !== '') {
    $mailSent = smtpSend(MAIL_TO, $subject, $body, $headers, $mailErr);
} else {
    $mailSent = @mail(MAIL_TO, $subject, $body, $headers);
    if (!$mailSent) {
        $mailErr = 'mail() вернула false: функция отключена хостингом или отвергла адрес';
    }
}
if (!$mailSent) {
    // Без записи причины отладка сводится к гаданию.
    @file_put_contents(
        MAIL_ERR_LOG,
        date('c') . '  ' . ($mailErr ?? 'причина неизвестна') . PHP_EOL,
        FILE_APPEND | LOCK_EX
    );
}

// ─── Telegram (опционально) ───────────────────────────────────────────────
$tgSent = false;
if (TG_BOT_TOKEN !== '' && TG_CHAT_ID !== '' && function_exists('curl_init')) {
    $ch = curl_init('https://api.telegram.org/bot' . TG_BOT_TOKEN . '/sendMessage');
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => json_encode([
            'chat_id' => TG_CHAT_ID,
            'text'    => $body,
        ], JSON_UNESCAPED_UNICODE),
        CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 8,
        CURLOPT_SSL_VERIFYPEER => true,
    ]);
    $res = curl_exec($ch);
    $tgSent = curl_getinfo($ch, CURLINFO_HTTP_CODE) === 200;
    curl_close($ch);
}

if (!$mailSent && !$tgSent) {
    // Заявка уже записана в logs/leads.log, поэтому не потеряна. Сообщаем
    // посетителю телефон, чтобы он не ушёл, решив, что его не услышали.
    http_response_code(502);
    echo json_encode(['error' => 'Не удалось отправить заявку'], JSON_UNESCAPED_UNICODE);
    exit;
}

echo json_encode(['success' => true], JSON_UNESCAPED_UNICODE);

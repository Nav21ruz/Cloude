<?php
declare(strict_types=1);

/**
 * Общие настройки почты и отправка через SMTP.
 * Подключается из request.php (заявки) и mail-test.php (самопроверка),
 * чтобы пароль ящика лежал в одном файле, а не в двух.
 */

// ─── Настройки ────────────────────────────────────────────────────────────
const MAIL_TO      = 'info@tektonpro.ru';        // куда приходят заявки
const MAIL_FROM    = 'robot@shtukatur74.ru';     // ящик на своём домене; при SMTP должен совпадать с SMTP_USER

/**
 * Отправка через SMTP с авторизацией. На общих хостингах функция mail()
 * либо отключена, либо её письма отбраковываются на приёмной стороне:
 * у отправителя нет ни авторизации, ни подписи. SMTP от реального ящика
 * этих проблем не имеет.
 *
 * Заполните SMTP_HOST — и обработчик переключится на SMTP сам.
 * Пустой SMTP_HOST оставляет старое поведение через mail().
 *
 * Для REG.RU: хост mail.hosting.reg.ru, порт 465, шифрование ssl.
 * SMTP_USER — полный адрес ящика, SMTP_PASS — его пароль.
 */
const SMTP_HOST    = '';                          // TODO: mail.hosting.reg.ru
const SMTP_PORT    = 465;
const SMTP_SECURE  = 'ssl';                       // ssl (465) | tls (587) | '' (25)
const SMTP_USER    = '';                          // TODO: robot@shtukatur74.ru
const SMTP_PASS    = '';                          // TODO: пароль ящика
const MAIL_ERR_LOG = __DIR__ . '/../logs/mail-error.log';

/**
 * Ключ для страницы самопроверки /api/mail-test.php.
 * Пока пусто — страница отвечает 404 и ничего не отправляет.
 * Задайте любую случайную строку, проверьте почту, потом удалите файл.
 */
const MAIL_TEST_KEY = '';
const SITE_HOST    = 'shtukatur74.ru';
const TG_BOT_TOKEN = '';                          // TODO: токен бота от @BotFather (пусто = Telegram не используется)
const TG_CHAT_ID   = '';                          // TODO: chat_id получателя
const CONSENT_LOG  = __DIR__ . '/../logs/consent.log'; // журнал согласий (ст. 9 152-ФЗ)
const LEADS_LOG    = __DIR__ . '/../logs/leads.log';   // копия заявок на случай сбоя почты
const RATE_FILE    = __DIR__ . '/../logs/rate.json';
const RATE_MAX     = 5;      // заявок с одного адреса
const RATE_WINDOW  = 3600;   // за час
// ──────────────────────────────────────────────────────────────────────────

/** Читает ответ сервера, склеивая многострочные (250-…) в один. */
function smtpRead($sock): string
{
    $out = '';
    while (($line = fgets($sock, 1024)) !== false) {
        $out .= $line;
        if (strlen($line) < 4 || $line[3] !== '-') {
            break;
        }
    }
    return $out;
}

/** Шлёт команду и проверяет код ответа. */
function smtpCmd($sock, string $cmd, string $expect, ?string &$err): bool
{
    if ($cmd !== '') {
        fwrite($sock, $cmd . "\r\n");
    }
    $res = smtpRead($sock);
    if (strncmp($res, $expect, strlen($expect)) !== 0) {
        // Пароль в журнал не попадает: логируем саму команду только для безопасных.
        $safe = preg_match('/^(AUTH|[A-Za-z0-9+\/=]{8,}$)/', $cmd) ? '<скрыто>' : $cmd;
        $err = trim($safe . ' → ' . trim($res));
        return false;
    }
    return true;
}

/** Отправка письма через SMTP с авторизацией. */
function smtpSend(string $to, string $subject, string $body, string $headers, ?string &$err): bool
{
    $transport = SMTP_SECURE === 'ssl' ? 'ssl://' : 'tcp://';
    $sock = @stream_socket_client(
        $transport . SMTP_HOST . ':' . SMTP_PORT,
        $errno, $errstr, 12,
        STREAM_CLIENT_CONNECT,
        stream_context_create(['ssl' => ['verify_peer' => true, 'verify_peer_name' => true]])
    );
    if (!$sock) {
        $err = 'соединение: ' . $errstr . ' (' . $errno . ')';
        return false;
    }
    stream_set_timeout($sock, 12);

    $host = SITE_HOST;
    $ok = smtpCmd($sock, '', '220', $err)
       && smtpCmd($sock, 'EHLO ' . $host, '250', $err);

    if ($ok && SMTP_SECURE === 'tls') {
        $ok = smtpCmd($sock, 'STARTTLS', '220', $err)
           && @stream_socket_enable_crypto($sock, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)
           && smtpCmd($sock, 'EHLO ' . $host, '250', $err);
        if (!$ok && $err === null) {
            $err = 'не удалось поднять TLS';
        }
    }

    $ok = $ok
       && smtpCmd($sock, 'AUTH LOGIN', '334', $err)
       && smtpCmd($sock, base64_encode(SMTP_USER), '334', $err)
       && smtpCmd($sock, base64_encode(SMTP_PASS), '235', $err)
       && smtpCmd($sock, 'MAIL FROM:<' . MAIL_FROM . '>', '250', $err)
       && smtpCmd($sock, 'RCPT TO:<' . $to . '>', '250', $err)
       && smtpCmd($sock, 'DATA', '354', $err);

    if ($ok) {
        // Точка в начале строки экранируется, иначе письмо оборвётся на ней.
        $data = $headers . "\r\n"
              . 'To: ' . $to . "\r\n"
              . 'Subject: ' . $subject . "\r\n"
              . 'Date: ' . date('r') . "\r\n\r\n"
              . preg_replace('/^\./m', '..', str_replace("\n", "\r\n", str_replace("\r\n", "\n", $body)));
        fwrite($sock, $data . "\r\n.\r\n");
        $ok = smtpCmd($sock, '', '250', $err);
    }

    @fwrite($sock, "QUIT\r\n");
    @fclose($sock);
    return $ok;
}

<?php
declare(strict_types=1);

/**
 * Самопроверка отправки почты.
 *
 * Открывается в браузере: /api/mail-test.php?key=<ваш ключ>
 * Отправляет тестовое письмо на MAIL_TO и показывает, что именно ответил
 * сервер. Нужна, чтобы наладить почту до включения формы заявок.
 *
 * Без ключа страница молчит: она отправляет письма, и оставлять её
 * открытой всему интернету нельзя. После настройки файл лучше удалить.
 */

header('Content-Type: text/plain; charset=UTF-8');
header('X-Robots-Tag: noindex, nofollow');

require __DIR__ . '/mail.php';

$key = (string)($_GET['key'] ?? '');
if (MAIL_TEST_KEY === '' || !hash_equals(MAIL_TEST_KEY, $key)) {
    http_response_code(404);
    echo "Not Found\n";
    exit;
}

echo "Проверка отправки почты\n";
echo str_repeat('=', 46) . "\n\n";

echo 'Способ отправки: ' . (SMTP_HOST !== '' ? 'SMTP' : 'функция mail()') . "\n";
if (SMTP_HOST !== '') {
    echo 'Сервер:          ' . SMTP_HOST . ':' . SMTP_PORT
       . ' (' . (SMTP_SECURE !== '' ? SMTP_SECURE : 'без шифрования') . ")\n";
    echo 'Логин:           ' . SMTP_USER . "\n";
    echo 'Пароль:          ' . (SMTP_PASS !== '' ? 'задан' : 'ПУСТОЙ — это ошибка') . "\n";
}
echo 'Отправитель:     ' . MAIL_FROM . "\n";
echo 'Получатель:      ' . MAIL_TO . "\n\n";

if (SMTP_HOST !== '' && SMTP_USER !== MAIL_FROM) {
    echo "! Логин SMTP и адрес отправителя различаются. Большинство серверов\n";
    echo "  не дают отправлять от чужого адреса — вероятен отказ.\n\n";
}

$when    = (new DateTimeImmutable('now', new DateTimeZone('Asia/Yekaterinburg')))->format('d.m.Y H:i');
$body    = "Это тестовое письмо со страницы самопроверки сайта " . SITE_HOST . ".\n"
         . "Время отправки: {$when} (Екатеринбург).\n\n"
         . "Если письмо дошло — настройки верны, форму заявок можно включать.";
$subject = '=?UTF-8?B?' . base64_encode('Проверка почты: ' . SITE_HOST) . '?=';
$headers = implode("\r\n", [
    'From: Сайт ' . SITE_HOST . ' <' . MAIL_FROM . '>',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'MIME-Version: 1.0',
]);

$err  = null;
$sent = SMTP_HOST !== ''
    ? smtpSend(MAIL_TO, $subject, $body, $headers, $err)
    : @mail(MAIL_TO, $subject, $body, $headers);

if ($sent) {
    echo "РЕЗУЛЬТАТ: письмо отправлено.\n\n";
    echo "Проверьте ящик " . MAIL_TO . ", в том числе папку «Спам».\n";
    echo "Если письмо в спаме — настройте записи SPF и DKIM для домена\n";
    echo SITE_HOST . " в панели почтового хостинга.\n\n";
    echo "После проверки удалите этот файл с сервера.\n";
    exit;
}

echo "РЕЗУЛЬТАТ: отправить не удалось.\n\n";
echo 'Причина: ' . ($err ?? 'функция mail() вернула false — вероятно, отключена хостингом') . "\n\n";
echo "Что смотреть:\n";
echo "  535 / 5.7.8   — неверный логин или пароль ящика\n";
echo "  550 / 553     — сервер не разрешает отправку от адреса " . MAIL_FROM . "\n";
echo "  соединение    — неверный хост или порт, либо порт закрыт хостингом\n";
echo "  пустой ответ  — попробуйте другой режим: ssl на 465 или tls на 587\n";

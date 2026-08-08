<?php
declare(strict_types=1);

/**
 * Диагностика формы заявок.
 *
 * Открывается без ключа: /api/diag.php — и по-русски объясняет, что мешает
 * форме отправлять письма. Пароль и другие секреты не показываются, только
 * «задан» или «пустой». Письма не отправляет.
 *
 * ПОСЛЕ ТОГО КАК ФОРМА ЗАРАБОТАЕТ — УДАЛИТЕ ЭТОТ ФАЙЛ С СЕРВЕРА.
 */

header('Content-Type: text/plain; charset=UTF-8');
header('X-Robots-Tag: noindex, nofollow');

$api  = __DIR__;
$root = dirname(__DIR__);
$bad  = [];

function line(string $label, string $value, bool $ok = true): void
{
    // str_pad считает байты, а в кириллице их по два на букву — колонки
    // разъезжаются. Дополняем по количеству символов.
    $pad = max(1, 34 - mb_strlen($label, 'UTF-8'));
    echo ($ok ? '  [ок]  ' : '  [!!]  ') . $label . str_repeat(' ', $pad) . $value . "\n";
}

echo "ДИАГНОСТИКА ФОРМЫ ЗАЯВОК\n";
echo str_repeat('=', 60) . "\n\n";

// ─── 1. Файл с паролем ────────────────────────────────────────────────────
echo "1. Файл с паролем\n";
$local = $api . '/config.local.php';
if (is_file($local)) {
    line('api/config.local.php', 'найден');
} else {
    $bad[] = 'Нет файла api/config.local.php. Он создаётся копированием '
           . 'api/config.local.example.php и переименованием копии. '
           . 'Имя должно быть ровно config.local.php — без «example», '
           . 'без «.txt» на конце.';
    line('api/config.local.php', 'НЕ НАЙДЕН', false);

    echo "\n   Что сейчас лежит в папке api:\n";
    foreach (scandir($api) ?: [] as $f) {
        if ($f !== '.' && $f !== '..') {
            echo '     · ' . $f . "\n";
        }
    }
}

// ─── 2. Настройки почты ───────────────────────────────────────────────────
require $api . '/mail.php';

echo "\n2. Настройки почты\n";
line('получатель заявок', MAIL_TO);
line('отправитель', MAIL_FROM);
line('сервер', SMTP_HOST !== '' ? SMTP_HOST . ':' . SMTP_PORT . ' (' . SMTP_SECURE . ')' : 'не задан — используется mail()');
line('логин', SMTP_USER !== '' ? SMTP_USER : 'пустой', SMTP_USER !== '');

if (SMTP_PASS === '') {
    $bad[] = 'Пароль почтового ящика пустой. Впишите его в api/config.local.php '
           . 'в строку define(\'SMTP_PASS\', \'...\'); — внутрь кавычек, вместо заглушки.';
    line('пароль', 'ПУСТОЙ', false);
} else {
    line('пароль', 'задан, длина ' . strlen(SMTP_PASS) . ' символов');
    if (trim(SMTP_PASS) !== SMTP_PASS) {
        $bad[] = 'В пароле есть пробел в начале или в конце — при копировании '
               . 'из панели такое бывает. Уберите лишние пробелы внутри кавычек.';
    }
    if (SMTP_PASS === 'сюда-пароль-ящика') {
        $bad[] = 'В файле осталась заглушка вместо настоящего пароля.';
    }
}

if (SMTP_HOST !== '' && SMTP_USER !== MAIL_FROM) {
    $bad[] = 'Логин SMTP (' . SMTP_USER . ') и адрес отправителя (' . MAIL_FROM
           . ') различаются. Большинство серверов не дают отправлять от чужого адреса.';
}

// ─── 3. Форма включена ────────────────────────────────────────────────────
echo "\n3. Приём заявок\n";
$req = @file_get_contents($api . '/request.php') ?: '';
$phpOn = str_contains($req, 'const FORMS_ENABLED = true;');
line('обработчик (request.php)', $phpOn ? 'включён' : 'ВЫКЛЮЧЕН', $phpOn);
if (!$phpOn) {
    $bad[] = 'В api/request.php стоит FORMS_ENABLED = false — обработчик отклоняет все заявки.';
}
$js = @file_get_contents($root . '/js/site.js') ?: '';
$jsOn = str_contains($js, 'formsEnabled: true');
line('форма на страницах (site.js)', $jsOn ? 'включена' : 'ВЫКЛЮЧЕНА', $jsOn);
if (!$jsOn) {
    $bad[] = 'В js/site.js стоит formsEnabled: false — форма не выводится на страницах.';
}

// ─── 4. Каталог журналов ──────────────────────────────────────────────────
echo "\n4. Журналы\n";
$logs = $root . '/logs';
if (!is_dir($logs)) {
    @mkdir($logs, 0750, true);
}
if (is_dir($logs) && is_writable($logs)) {
    line('каталог logs', 'есть, запись разрешена');
} else {
    $bad[] = 'Каталог logs недоступен для записи. Заявки не сохраняются как резервная копия.';
    line('каталог logs', 'НЕДОСТУПЕН ДЛЯ ЗАПИСИ', false);
}
$leads = $logs . '/leads.log';
line('заявок сохранено', is_file($leads) ? (string)substr_count((string)file_get_contents($leads), '=====') : '0');

// ─── 5. Связь с почтовым сервером ─────────────────────────────────────────
echo "\n5. Связь с почтовым сервером\n";
if (SMTP_HOST === '') {
    line('проверка соединения', 'пропущена: сервер не задан', false);
} else {
    $t = SMTP_SECURE === 'ssl' ? 'ssl://' : 'tcp://';
    $sock = @stream_socket_client($t . SMTP_HOST . ':' . SMTP_PORT, $eno, $estr, 10);
    if ($sock) {
        $hello = trim((string)fgets($sock, 512));
        fclose($sock);
        line('соединение', 'установлено');
        line('ответ сервера', $hello !== '' ? $hello : '(пусто)', str_starts_with($hello, '220'));
        if (!str_starts_with($hello, '220')) {
            $bad[] = 'Сервер ответил не так, как ожидается. Возможно, не тот порт '
                   . 'или режим шифрования: попробуйте порт 587 и tls вместо 465 и ssl.';
        }
    } else {
        $bad[] = 'Не удалось соединиться с ' . SMTP_HOST . ':' . SMTP_PORT
               . ' (' . $estr . '). Проверьте адрес сервера и порт в панели хостинга. '
               . 'Иногда помогает порт 587 с tls вместо 465 с ssl.';
        line('соединение', 'НЕТ СВЯЗИ: ' . $estr, false);
    }
}

// ─── 6. Последние ошибки отправки ─────────────────────────────────────────
echo "\n6. Последние ошибки отправки\n";
$err = $logs . '/mail-error.log';
if (is_file($err)) {
    $lines = array_slice(array_filter(explode("\n", (string)file_get_contents($err))), -5);
    foreach ($lines as $l) {
        echo '  ' . $l . "\n";
    }
} else {
    echo "  журнал пуст — заявок с ошибкой отправки не было\n";
}

// ─── Итог ─────────────────────────────────────────────────────────────────
echo "\n" . str_repeat('=', 60) . "\n";
if ($bad === []) {
    echo "ВСЁ В ПОРЯДКЕ.\n\n";
    echo "Настройки верные и связь с почтовым сервером есть. Отправьте заявку\n";
    echo "с сайта и проверьте ящик " . MAIL_TO . ", включая папку «Спам».\n\n";
    echo "После проверки удалите этот файл (api/diag.php) с сервера.\n";
} else {
    echo 'НАЙДЕНО ПРОБЛЕМ: ' . count($bad) . "\n\n";
    foreach ($bad as $i => $b) {
        echo ($i + 1) . ". " . wordwrap($b, 70, "\n   ") . "\n\n";
    }
}

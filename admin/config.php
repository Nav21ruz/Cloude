<?php
// Admin password hash. To change: php -r "echo password_hash('NewPassword', PASSWORD_DEFAULT);"
define('ADMIN_PASSWORD_HASH', '$2y$12$AP2UzJx50sm2L3VBU67mj.Amd5ukhUGF.MGdbBQW2A3b2EZSjVQFG');
define('MAX_ATTEMPTS',    5);
define('LOCKOUT_SECONDS', 900);
define('LOCK_FILE', __DIR__ . '/.brute_lock');

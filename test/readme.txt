запуск тестов
cd /var/www/justivru/test
php codecept.phar run

запуск одного теста
php codecept.phar run test/acceptance/RoutingCest.php

создать файл Cept теста /acceptance/RoutingCept.php, shop/registrationCept.php
php codecept.phar generate:cest acceptance Routing
php codecept.phar g:cept acceptance shop/registrationCept.php

Запсук тестов в папке
php codecept.phar run tests/acceptance/shop
php codecept.phar run -g admin -g editor


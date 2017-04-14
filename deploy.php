<?
require 'recipe/composer.php';

server('main', 'justiv111111', 22)
    ->path('/home/j/justivru/justivru/test_public_html/public_html') // Define base path to deploy you project.
    ->user('justivru', '1111111111');

set('repository', 'https://barma@b11111111111');

after('deploy', function () {
//    run('service php5-fpm reload');
});


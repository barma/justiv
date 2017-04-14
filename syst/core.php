<?php
// подключается главный конфигурационный файл
include_once 'config.php';

global $site;
/**
 * TODO: refactoring
 * заглушка, придумать че поумнее, т.к. в loader используется метод add
 * и при загрузке файла library/PHP_Debuger.php вставляются в документ так же
 * скрипты и стили панели отладки
 */
//вырезаем вставку панели если пользователь не админ или это ajax запрос
if(load_debug_panel()) {
//    ob_start();
    include_once "library/PHP_Debuger.php";
//    $Debug_panel = ob_get_contents();
//    ob_end_clean();
    global $Dbg;
}

// формирование ссылки на страницу
//$link = preg_Replace("/\\?.*/", "", strtr(getenv("REQUEST_URI"), "\\", "/"));
$link = preg_Replace("/\\?.*/", "", strtr($_SERVER["REQUEST_URI"], "\\", "/"));

// определение админки
if($link == '/admin/' OR strpos($link, 'syst')) {
    define ("ADMINPANEL", true);
    define('TP', FC . "templates/admin/" . $ADMTEMPLATE . "/"); //TEMPLATE_PATH
    //в конфиге началась сессия, теперь надо продлить её
    // для администраторов она 90 минут
    ini_set('session.save_path', FC . 'tmp/admin_sessions/');
    ini_set('session.gc_maxlifetime', 5400);

    $site['showError'] = true;
    // Проверка на администратора
    Loader::module('user/checkadmin');
}

//Loader::module('counter/counter');
try {

    if (!preg_match("[.menu.php]", $link) AND !preg_match("[.config.php]", $link)
    ) {

        $last_symbol = $link{strlen($link) - 1};

        // подключаем маршрутизатор для ЧПУ
        $Router = Loader::library('Router');
        $Router->_set_routing($route);
        if (!$params = $Router->match_route()) {
            if ($last_symbol == '/') {

                // если склеивается url - вырезаем первый слеш /blog/post/12/
                if (is_file($link_without_slash = DR . substr($link, 0, -1) . ".php")) {
                    $link = $link_without_slash;
                } else {
                    if (is_file(DR . $link . "index.php")) {
                        $link = DR . $link . "index.php";
                    }
                }

            } else {
                $link = ".." . $link;
            }

            // Сработало совпадение с маршрутами
        } else {

            // редиректим на правильный адрес со слешем в конце, если это не ajax
            if ($last_symbol !== '/' AND $site['strong_url'] === true AND !isAjax()) {

                Core::Redirect($link . '/');
            }
            $link = MP . $params['module'] . '/Controller.php';
            $class = $params['module'];
            $action = $params['action'];
            // заполняем массив данными
            $_GET = array_merge($_GET, $params);

        }
        if (!is_file($link)) {
            throw new Exception('Не найдена страница по запросу! ' . $link . __LINE__);
        }
    } else {
        throw new Exception('Запрошена системная страница! ' . __LINE__);
    }

    // подключение старницы
    Loader::library("Supervisor");
    $errorController = new ErrorSupervisor(E_ALL);
    //Loader::library("Exceptionizer");
    //$exctpion = new PHP_Exceptionizer(E_ALL);
    ob_start();

    require_once $link;

    // если пришли параметры - значит сработало правило ЧПУ - вызываем метод контроллера
    if (!empty($params)) {
        $className = $params['module'] . 'Controller';
        $obj = new $className($params['module']); //$obj = new blogController('blog');
        $obj->{$params['action']}(); //$obj->showPost();
    }

    $Core->setContent(ob_get_contents());
    ob_end_clean();

} catch (Exception $e) {

    Loader::library('Guard');
    $guard = new Guard();
    if (isset($site['logError'])) {
        $guard->logError($e);
    }
//ed($site,1);
    if($site['showError'] === true) {
        $guard->showError($e, $site['showError']);
    }

    // получение страницы
    $Core->setContent('<h1 style="padding: 150px; text-align: center;">404 Error</h1>');
}

// выключен шаблон?
if ($Core->templateIsOff()) {

    // делаем вывод содержимого
    print($Core->getContent());
    die();

}

// вывод шаблона
$theme = $Core->getTheme();
if(!defined("ADMINPANEL")) {
    define('TP', '/syst/templates/' . $theme . '/');
}

if(!is_dir(DR.TP)){
        throw new Exception("Не найдена заданная тема: ".TP, 1);
}
$template = DR . TP . $Core->getTemplate();

if($_GET['id'] == '2') {
    $template = $template = DR . TP . 'index2.php';
}

if (is_file($template)) {
    require_once $template;
} else {
    throw new Exception("Не найден заданный шаблон: $template", 1);
}

if(load_debug_panel()) {
    if(!$Core->templateIsOff()) {
        $Dbg->display();
    }
}
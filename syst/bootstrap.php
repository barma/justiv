<?
/*
* Файл подгружает обязательные для системы фукнции. Создан для разгрузки ядра и
 * облегчения его чтения
*/
if ($_SERVER['HTTP_HOST'] != 'www.zhuykov.ru' || $_SERVER['HTTP_HOST'] != 'zhuykov.ru' OR ($_GET['debug'] == 'ed')) {
    error_reporting(E_ALL ^ E_NOTICE);
    ini_set("display_errors", 1);
}

function ed($e, $die = 0)
{
//    if(is_array($e)) {
//        foreach($e as $element) {
//            ed($element);
//        }
//    }
    $t = debug_backtrace();
    echo "<br>".$t[0]['file']. ' line: ' .$t[0]['line'];
    echo "<pre>";
    print_r($e);
    echo "</pre>";
    if($die!= 0) {
        die();
    }
}

function isAjax () {
    if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) &&
            (strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'))) {
        return true;
    } else {
        return false;
    }
}

//TODO: нужен рефакторинг этого кода
function load_debug_panel() {
    return false;
    if(Loader::module('user/isAdmin') AND !isAjax() ) {
        return true;
    } else {
        return false;
    }
}

class c {
    public function add($c = null) {}
    public function query($query) {}
    public function stopTimer() {}
}
$Dbg = new c;
global $Dbg;


function DBLogger($db, $sql)
{
    global $Dbg, $site;
//    ed($site);
//    die('asd');
    if(isset($site['showQueries']) and $site['showQueries'] == true) {
        ed($sql);
    }
    $Dbg->query($sql);
    $Dbg->stopTimer();
    /*
    $caller = $db->findLibraryCaller();
    $tip = "at ".@$caller['file'].' line '.@$caller['line'];
    // Print the query (of course it's better to use Debug_HackerConsole).
    echo "<xmp title=\"$tip\">"; print_r($sql); echo "</xmp>";
    */
}


function DBErrorHandler($message, $info)
{
    global $site;

    if(isset($site['logError']) and $site['logError'] == true) {
//        ed($info);
//        ed($message);
//        die('asd');
        throw new Exception((string)$info);
    }
    if (isset($site['showError']) and $site['showError'] == false) {
        die('DBErrorHandler');
        return;
    } else {
        if(isAjax()) {
            die(ed($info));
        }
//        ed($info);
        if(array($info)) {
            $info = serialize($info);
        }
        throw new Exception($info);
    }
}

// старт сессий
session_start();

// функция автозагрузки файлов
function __autoload($name)
{

    //echo "АВТОВЫВОД $name"; //TODO: ДЛЯ ПРОСМОТРА, КАКИЕ ФАЙЛЫ ПОДКЛЮЧАЮТСЯ
    $name = strtolower($name);
    $name = ucfirst($name);
    $name = LP . $name . '.php';
    if (is_file($name)) {
        require_once $name;
    }

}

//Подключение обязательных файлов
require_once 'library/Template.php';
require_once 'library/Core.php';
require_once 'library/Loader.php';

$Core = new Core($site['charset'], $site['title'], $site['keywords'], $site['description'], $site['separator']);

/*
 * Автоматическая загрузка системных файлов и меню
 * .menu.php && .config.php
 */
function autoLoadSysFile($url = '')
{
    global $Core;
    if (empty($url)) {
        $url = getenv('REQUEST_URI');
    }
    $url = str_ireplace(DR, '', $url);
    $url = explode("/", $url);
    $path = DR;
//    ed($url);
    foreach ($url as $dir) {

        if (is_file($path)) {
            continue;
        }

        $path .= "$dir/";
        // если найдет меню или конфиг, подключает их
        // по порядку от корня
        if (is_file("$path.menu.php")) {
            $doubleMenu = "$path.menu.php";
        }
        if (is_file("$path.config.php")) {
            require_once "$path.config.php";
        }
    }

    if (!empty($doubleMenu)) {

        // TODO: удаление работает некорректно, для отладки раскомментить вывод
        $doubleMenu = str_replace("///", "/", $doubleMenu);
        if (($doubleMenu === DR . "/.menu.php") or ($doubleMenu === DR . "//.menu.php")) {
            $doubleMenu = null;
        }
        if (!empty($doubleMenu)) {
            $Core->setMenu($doubleMenu);
        }

    }

}

require_once DR.'vendor/autoload.php';

// PHP-DI http://php-di.org/
//$builder = new ContainerBuilder();
//$container = $builder->build();

// установка временной зоны
date_default_timezone_set(TZ);

autoLoadSysFile();
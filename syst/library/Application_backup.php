<?php

class Core
{

    public $menu = array();
    public $content = '';
    public $title = '';
    public $keywords = '';
    public $description = '';
    public $charset = 'utf-8';

    public function  __construct()
    {
        global $config;
        $this->charset = $config['charset'];
    }

    public function __set($name, $value)
    {
        $this->$name = $value;
    }

    public function __get($name)
    {
        return $this->$name;
    }

    public function getContent()
    {
        print $this->content;
    }

    /*
     * Функция загрузки модулей
     */
    public static function load($path = '')
    {
        $path .= '.php';
        $file = SP . "modules/$path";
        autoLoadSysFile($file);
        include $file;
    }

    /*
    * Тестовая функция
    */
    public static function getLibrary($path = '')
    {
        $path = ucfirst($path);
        $path .= '.php';
        $path = SP . "library/$path";
        if (!file_exists($path)) {
            throw new Exception ("Core - Файл библиотеки не обнаружен $path");
        }
        return require_once $path;
    }

    public static function getModel($modul, $model)
    {
        if (empty($modul) OR empty ($model)) {
            throw new Exception('Заданы не все параметры!');
        }
        $model_name = ucfirst($model);
        $file = SP . 'modules/' . $modul . '/models/' . $model_name . '.php';
        if (!file_exists($file)) {
            throw new Exception ("Файл модели не обнаружен $file");
        }
        require_once $file;
        $temp = new $model_name;
        return $temp;
    }

    /*
     * Функция перенаправления
     */
    public static function redirect($path)
    {
        $path = HN . $path;
        header("HTTP/1.1 301 Moved Permanently");
        header("Location: $path");
        die;
    }

    /*
     * Обработчик ошибок
     * TODO: Написать полноценный обработчик ошибок
     */
    public static function errorHandler($errno = null, $errstr = null, $errline = null, $errfile = null)
    {

//        function BeHandler ($errno=null, $errstr=null, $errline=null, $errfile=null ) {
//	global $BesDocRoot;
        // Определяется: ошибка сгенерирована кодером или баг в програме
        // в зависимости от типа ошибки определенным образом заполняются переменные
        if (!$errfile) {
            $errfile = getenv('REQUEST_URI');
            if (!$errline) {
                $errline = "пользовательское исключение в строке $errno";
            }
        } else {
            $tmp = $errfile;
            $errfile = $errline;
            $errline = $tmp;
        }
        //подгружается файл, с процедурами, которые будут выполнены над перехваченными ошибками
        include "DR/syst/class/error/error_actions.php";
//}
    }
}

?>

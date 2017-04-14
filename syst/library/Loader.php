<?php
class Loader
{

    protected static $collection;
    protected static $filePath;
    protected static $moduleName;

    public static function getCollection($name)
    {
        if(isset(self::$collection[$name])) {
            return self::$collection[$name];
        }
    }

    public static function setCollection($name, $value)
    {
        self::$collection[$name] = $value;
    }

    // задамет имя модуля для загрзки моделей и вида
    public static function setModuleName($name)
    {
        self::$moduleName = $name;
    }

    public static function getModuleName()
    {
        return self::$moduleName;
    }

    // загрузка функционала модуля
    public static function module($path = '')
    {
        global $Dbg;
        $explode = explode('/', $path);
        $path2 = $path . '.php';
        $file = SP . "modules/$path2";

        if (is_file($file)) {

            //если есть такой файл, подключаем все системные настройки
            autoLoadSysFile($file);
            $Dbg->add('Module:'.$file);
            require_once $file;

        } else {

            $path3 = SP . "modules/" . $explode[0] . "/Controller.php";
            if (is_file($path3)) {

                autoLoadSysFile($path3);
                require_once "$path3";

                $name = $explode[0] . "Controller";
                if (class_exists($name)) {
                    $obj = new $name;
                    if(empty($explode[1])) {
                        // если не передан метод который нужно вызвать, то будет вызван метод index;
                        $Dbg->add('Module:'.$name.' -> index()');
                        $res =  $obj->index();
                        unset($obj);
                        return $res;

                    } else {

                        if (in_array($explode[1], get_class_methods($obj))) {
                            $Dbg->add('Module:'.$name.' -> '.$explode[1]);
                            return $obj->{$explode[1]}();
                        } else {
                            throw new Exception("Метод $explode[1] в классе $name не обнаружен, файл $path3");
                        }
                    }

                } else {
                    throw new Exception("Класс $name не найден в файле $path3");
                }
            } throw new Exception("Не найден ни файл $file, ни модель ".SP . "modules/" . $explode[0] . "/Controller.php");
        }
    }

    // загрузка модели модуля!
    public static function model($model, $module = null)
    {

        if (!$module) {
            $module = self::getModuleName();
        }
        if (empty($module)) {
            throw new Exception("Не задано имя модуля");
        }

        $class_name = ucfirst($model);
        $file = SP . 'modules/' . $module . '/model/' . $class_name . '.php';
        if (!file_exists($file)) {
            throw new Exception ("Файл модели не обнаружен $file");
        }
        require_once $file;
        $modelNameInController = lcfirst($model);
        self::$collection[$modelNameInController] = new $class_name();
        return self::$collection[$model];
    }

    public static function view($name, $data = null)
    {
        ob_start();
        $file = SP . 'modules/' . self::getModuleName() . '/view/' . $name . '.php';
        if (!file_exists($file)) {
            throw new Exception("Файл вида не обнаружен! путь = $file");
        }
        require($file);
        $buffer = ob_get_contents();
        @ob_end_clean();
        print($buffer);
    }

    public static function returnView($name, $data = null) {
        ob_start();
        $file = SP . 'modules/' . self::getModuleName() . '/view/' . $name . '.php';
        if (!file_exists($file)) {
            throw new Exception("Файл вида не обнаружен! путь = $file");
        }
        require($file);
        $buffer = ob_get_contents();
        @ob_end_clean();
        return($buffer);
    }

    public static function library($name)
    {
        if (empty($name)) {
            throw new Exception ('Не задано имя модели');
        }

        // если этот объект уже есть, возвращаем ссылку на него
        $obj = self::getCollection($name);
        if (isset($obj)) {
            return $obj;
        }
        $class_name = ucfirst($name);
        $file = SP . 'library/' . $class_name . '.php';
        if (!file_exists($file)) {
            throw new Exception ("Файл библиотеки $file не обнаружен");
        }

        $statement = require_once $file;

        if (class_exists($class_name)) {
            self::$collection[$name] = new $class_name();
            return self::getCollection($name);
        }
        return $statement;
    }
}
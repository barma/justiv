<?php

class ErrorSupervisor
{
    /*
    public function __construct($mask = E_ALL, $ignoreOther = false)
    {
        $catcher = new PHP_Exceptionizer_Catcher();
        $catcher->mask = $mask;
        $catcher->ignoreOther = $ignoreOther;
        $catcher->prevHdl = set_error_handler(array($catcher, "handler"));
        // регистрация ошибок
        //set_error_handler(array($this, 'handler'));

        // перехват критических ошибок
        //register_shutdown_function(array($this, 'FatalErrorCatcher'));

        // создание буфера вывода
        ob_start();
    }*/

    public function __construct($mask = E_ALL, $ignoreOther = false)
    {
        $catcher = new PHP_Exceptionizer_Catcher();
        $catcher->mask = $mask;
        $catcher->ignoreOther = $ignoreOther;
        $catcher->prevHdl = set_error_handler(array($catcher, "handler"));

        register_shutdown_function(array($this, "FatalErrorCatcher"));

        ob_start();
    }

    public function OtherErrorCatcher($errno, $errstr)
    {
        // контроль ошибок:
        // - записать в лог
        return false;
    }

    public function FatalErrorCatcher()
    {
        $error = error_get_last();
        if (isset($error)) {
            if ($error['type'] == E_ERROR
                || $error['type'] == E_PARSE
                || $error['type'] == E_COMPILE_ERROR
                || $error['type'] == E_CORE_ERROR
            ) {
                ob_end_clean(); // сбросить буфер, завершить работу буфера
                $catcher = new PHP_Exceptionizer_Catcher();
                $catcher->mask = $mask;
                $catcher->ignoreOther = $ignoreOther;
                print_r($error);
                try {
//                  $catcher->handler($error['type'], $error['message'], $error['file'], $error['line']);
                    throw new E_ERROR($error['type'], $error['message'], $error['file'], $error['line']);
                    //print_r($error);
                } catch (Exception $e) {
                    Loader::library('Guard');
                    $guard = new Guard();
                    global $site;
                    echo "catch exception";
                    var_dump($site);
                    if (isset($site['logError']) and !empty($site['logError'])) {
                        $guard->logError($e);
                    }
                    $guard->showError($e, $site['showError']);
                }
                // контроль критических ошибок:
                // - записать в лог
                // - вернуть заголовок 500
                // - вернуть после заголовка данные для пользователя
            } else {
                ob_end_flush(); // вывод буфера, завершить работу буфера
            }
        } else {
            ob_end_flush(); // вывод буфера, завершить работу буфера
        }
    }

    public function __destruct()
    {
        restore_error_handler();
    }


}

class PHP_Exceptionizer_Catcher
{
    public $mask = E_ALL;
    public $ignoreOther = false;
    public $prevHdl = null;

    public function handler($errno, $errstr, $errfile, $errline)
    {
        if (!($errno & error_reporting())) {
            return false;
        }
        if (!($errno & $this->mask)) {
            if (!$this->ignoreOther) {
                if ($this->prevHdl) {
                    $args = func_get_args();
                    call_user_func_array($this->prevHdl, $args);
                } else {
                    echo "false";
                    return false;
                }
            }
            echo "true";
            return true;
        }
        $types = array(
            "E_ERROR",
            "E_WARNING",
            "E_PARSE",
            "E_NOTICE",
            "E_CORE_ERROR",
            "E_CORE_WARNING",
            "E_COMPILE_ERROR",
            "E_COMPILE_WARNING",
            "E_USER_ERROR",
            "E_USER_WARNING",
            "E_USER_NOTICE",
            "E_STRICT",
            "E_RECOVERABLE_ERROR",
            "E_DEPRECATED",
            "E_USER_DEPRECATED",
        );
        $className = "E_EXCEPTION";
        foreach ($types as $t) {
            $e = @constant($t);
            if ($errno & $e) {
                $className = $t;
                break;
            }
        }
        throw new $className($errno, $errstr, $errfile, $errline);
    }
}


abstract class PHP_Exceptionizer_Exception extends Exception
{
    public function __construct($no = 0, $str = null, $file = null, $line = 0)
    {
        parent::__construct($str, $no);
        $this->file = $file;
        $this->line = $line;
    }
}

/**
 * The logic is: if we catch E_NOTICE, we also need to catch WORSE
 * errors (like E_WARNING).
 */
class E_EXCEPTION extends PHP_Exceptionizer_Exception
{
}

class E_CORE_ERROR extends E_EXCEPTION
{
}

class E_CORE_WARNING extends E_CORE_ERROR
{
}

class E_COMPILE_ERROR extends E_CORE_ERROR
{
}

class E_COMPILE_WARNING extends E_COMPILE_ERROR
{
}

class E_ERROR extends E_CORE_ERROR
{
}

class E_RECOVERABLE_ERROR extends E_ERROR
{
}

class E_PARSE extends E_RECOVERABLE_ERROR
{
}

class E_WARNING extends E_PARSE
{
}

class E_NOTICE extends E_WARNING
{
}

class E_STRICT extends E_NOTICE
{
}

class E_DEPRECATED extends E_STRICT
{
}

class E_USER_ERROR extends E_ERROR
{
}

class E_USER_WARNING extends E_USER_ERROR
{
}

class E_USER_NOTICE extends E_USER_WARNING
{
}

class E_USER_DEPRECATED extends E_USER_NOTICE
{
}

?>
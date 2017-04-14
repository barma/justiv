<?php
/* 
 * Класс для обработки, созранения и отображения ошибок
 */
class Guard
{

    protected static $_logFile = '';

    public function  __construct()
    {
        self::$_logFile = SP . 'tmp/log/error.php';
    }

    protected static function readErrors()
    {
        $file = fopen(self::$_logFile, "a+") or die ();
        $errorArray = array();

        // считываем данные файла в массив объектов
        while (!feof($file)) {
            $string = fgets($file);
            if (!empty($string)) {
                $errorArray[] = unserialize($string);
            }
        }
        fclose($file);
        return $errorArray;
    }

    public static function writeError($errorArray)
    {

        $file = fopen(self::$_logFile, "w") or die ();
        $size = sizeof($errorArray);

        foreach ($errorArray as $id => $string) {

            //защита от записи пустых строк
            if (empty($string)) {
                continue;
            }

            //хэш ошибки - заместо id
            $toHash = $string['file'] . $string['line'] . $string['trace'];
            $hash = md5($toHash);
            $string['hash'] = $hash;
            $string = serialize($string);

            // последнюю строчку записываем без переноса строки
            if ($id === $size) {
                fwrite($file, $string);
            } else {
                fwrite($file, $string . PHP_EOL);
            }
        }

        fclose($file);
    }

    public static function logError($exception)
    {
//        ed($exception);
        if (empty($exception)) {
            print_r($exception);
            die('this is not exception');
        }
        $toHash = $exception->getFile() . $exception->getLine() . $exception->getTrace();
        $hash = md5($toHash);

        // читаем массив ошибок из файла
        $errorArray = self::readErrors();
        if ($errorArray) {
            foreach ($errorArray as $key => $oneError) {

                //если эта ошибка уже происходила увеличиваем счетчик
                if ($oneError['hash'] == $hash) {
                    $errorArray[$key]['count']++;
                    $oldError = true;
                    break;
                }
            }
        }

        // если же похожей ошибки не было, добавляем в список
        if (!$oldError) {
            $sizemas = sizeof($errorArray);
            $sizemas++;
            $errorArray[$sizemas]['link'] = getenv("REQUEST_URI");
            $errorArray[$sizemas]['file'] = $exception->getFile();
            $errorArray[$sizemas]['line'] = $exception->getLine();
            $errorArray[$sizemas]['count'] = 1;
            $errorArray[$sizemas]['trace'] = $exception->getTrace();
            $errorArray[$sizemas]['message'] = $exception->getMessage();
        }

        // записываем массив ошибок в файл
        self::writeError($errorArray);
    }

    public static function showError($error, $show_error)
    {
        if (true === $show_error or true) {
            if (is_object($error)) {
                $file = $error->getFile();
                $line = $error->getLine();
                $link = getenv("REQUEST_URI");
                $trace = $error->getTrace();
                $message = $error->getMessage();
            } else {
                if (is_string($error)) {

                    $errorArray = self::readErrors();
                    foreach ($errorArray as $id => $error) {
                        if ($error['hash'] === $hash) {
                            break;
                        }
                    }
                    $file = $error['file'];
                    $line = $error['line'];
                    $link = $error['link'];
                    $trace = $error['trace'];
                    $message = $error['message'];
                } else {
                    die('wrong parameters');
                }
            }
            global $ADMTEMPLATE;

            $path = DR . '/' . FC . '/templates/admin/' . $ADMTEMPLATE . '/show_error.php';
            include $path;
            die('404');

            // выводим ошибку 404
        } else {

            $theme = Core::getTheme();
            define('TP', FC . '/templates/' . $theme . '/');
            $path = DR . TP . '404.php';
            include $path;
            die('else 404');

        }
    }

    public static function showSortErrors()
    {

        // сортировка по возрастанию количества ошибок
        function sort_errors($x, $y)
        {
            if ($x['count'] == $y['count']) {
                return 0;
            } elseif ($x['count'] < $y['count']) {
                return 1;
            } else {
                return -1;
            }
        }

        $errorArray = self::readErrors();
        usort($errorArray, 'sort_errors');
        return $errorArray;
    }

    public static function deleteError($hash)
    {
        $errorArray = self::readErrors();
        foreach ($errorArray as $id => $error) {
            if ($error['hash'] === $hash) {
                unset($errorArray[$id]);
                self::writeError($errorArray);
                return true;
            }
        }
        return false;
    }
}

?>
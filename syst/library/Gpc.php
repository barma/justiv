<?php
/**
 * Методы для приема переменных и фильтрации
 *
 * примеры использования:
 * Gpc::getParam('var','G','INT',3);
 *
 * Для получения одновременно нескольких однотипных переменных вызов функции немного отличается:
 * extract(gpc_var(array('var1','var2','var3'),'G','INT',3));
 * echo $var1;
 * echo $var2;
 * echo $var3;
 * Функция не принимает массивы, т.к. их обработка слишком сложна
 */

class Gpc
{

    public static function getParam($name, $source, $type, $maxlen = 0)
    {
        $retarr = array();
        if (is_array($name)) { // если нужно обработать массив с именами
            foreach ($name as $v) {
                $retarr[$v] = Gpc::getParam($v, $source, $type, $maxlen);
                // рекурсивно запускаем себя же
            }
            if (sizeof($retarr) > 0) {
                return $retarr;
            } // возвращаем массив
        }

        // если нужно обработать одну переменную
        switch ($source) {
            case 'G':
                if (isset($_GET[$name])) {
                    $var = $_GET[$name]; // из GET
                }
                break;
            case 'P':
                if (isset($_POST[$name])) {
                    $var = $_POST[$name]; // из POST
                }
                break;
            case 'C':
                if (isset($_COOKIE[$name])) {
                    $var = $_COOKIE[$name]; // из Cookie
                }
                break;
            case 'S':
                if (isset($_SESSION[$name])) {
                    $var = $_SESSION[$name]; // из SESSION
                }
                break;
            case 'N':
                $var = $name; // Не выбирать
                break;
        }

        if (empty($var)) {
            return $var;
        } // если переменная существует

        if (is_array($var)) {
            return false;
        } // и если это массив...

        // убираем лишние бэкслеши
        if (get_magic_quotes_gpc()) {
            $var = stripslashes($var);
        }

        if ($maxlen > 0) {
            $var = substr($var, 0, $maxlen);
        } //обрубаем лишнее

        switch ($type) { // теперь обрабатываем в соответствии с типом
            case 'INT' : // число integer
                //return is_integer($var) ? $var : intval($var);
                if (is_integer($var)) {
                    return $var;
                } else {
                    return intval($var);
                }
                break;
            case 'NUM' : // число integer или float
                if (is_numeric($var)) {
                    return $var;
                } else {
                    return;
                }
                break;
            case 'TEXT' : // текст, цифры, все!...
                return trim(htmlspecialchars($var));
                break;
            case 'HTML' : // разрешается сохранение в тексте html тегов
                return trim($var);
                break;
            case 'SQL' : // строка, которая попадет в SQL-запрос
                return mysql_real_escape_string(htmlspecialchars($var));
                break;
            case 'MAIL' : // email-адрес
                if (preg_match('/^[\w\.\-]+@\w+[\w\.\-]*?\.\w{2,4}$/', $var)) {
                    return $var;
                } else {
                    return false;
                }
                break;
            case 'ALPHA' : // буквенные символы
                if (preg_match("/^[а-яА-ЯёЁa-zA-Z]+$/u", $var)) {
                    return $var;
                } else {
                    return false;
                }
                break;
            case 'ALPHANUM' : // числовые и буквенные символы
                if (preg_match("/^[а-яА-ЯёЁa-zA-Z0-9]+$/u", $var)) {
                    return $var;
                } else {
                    return false;
                }
                break;
            case 'MD5' : // md5-хэш
                if (preg_match("/^[a-fA-F0-9]{32}+$/", $var)) {
                    return $var;
                } else {
                    return;
                }
                break;
            case 'SHA1' : // sha1-хэш
                if (preg_match("/^[a-fA-F0-9]{40}+$/", $var)) {
                    return $var;
                } else {
                    return;
                }
                break;
            case 'BOOL': // булева величина
                if ($var == "1" || $var == "true" || $var == "on") {
                    return true;
                } else {
                    return;
                }
                break;
        }
    }
}

?>
<?php
/*
 * Файл конфигураций
 */

// название стандартного шаблона
$DFTEMPLATE = 'minimal';
$ADMTEMPLATE = 'bes';

define ('SN', 'Барма'); // SITE_NAME
define ('DR', $_SERVER['DOCUMENT_ROOT'].'/');
  /*
  * DOC_ROOT для тестового сайта вырезается последний слеш, т.к. на рабочем сайте в конце пути нет слэша - /home/barma/xampp/barma
  */
define ('TZ', 'Europe/Moscow'); // TIME_ZONE
define ('LF', 'log/error.php'); // LOG_FILES
define ('FC', '/syst/'); // FOLDER_CORE
define ('SP', DR . FC); // SYSTEM_PATH
define ('LP', SP . 'library/'); // LIBRARY_PATH
define ('MP', SP . 'modules/'); // MODULES_PATH
define ('SALT', 'zxchka877fshkj12');

// Не обязательные для заполненния
$site['charset'] = 'utf-8';
$site['title'] = 'justiv.ru';
$site['keywords'] = 'Одежда по доступной цене';
$site['description'] = 'Качественная одежда в Кирове по доступной цене';
$site['separator'] = ' / ';
$site['logError'] = true;
$site['showError'] = true;
$site['js'] = '/js/jquery-1.5.min.js';
$site['strong_url'] = true; // Урл должен обязательно заканчиваться слешем, чтобы небыло дублей страниц

// маршрутизатор
$route['admin'] = "system/admin_panel";
$route['blog/post/(:any)'] = "blog/showPost/$1";
//$route['blog/post/(:any)/(:num)'] = "blog/showPost/$1/$2";
$route['blog/tag/(:any)'] = "blog/showTag/$1";
$route['blog/page/(:num)'] = "blog/showLastPosts/$1";
$route['default_controller'] = "welcome";
// shop
$route['login'] = "shop/Login";
$route['restoreCustomerPassword'] = "shop/restoreCustomerPassword";
$route['updateCustomerPassword'] = "shop/updateCustomerPassword";

$route['catalog'] = "shop/showCatalog";
$route['catalog/(:any)'] = "shop/showCatalog/$1";
$route['cart'] = "shop/showCart";
$route['addtocart/(:any)'] = "shop/addToBasket/$1";
$route['shop/showProduct/(:any)'] = 'product/$1';
$route['product/(:any)'] = 'shop/showProduct/$1';

$route['basket'] = "shop/showBasket";
$route['order'] = "shop/makeOrder";
$route['checkout'] = "shop/checkout";
$route['registration'] = "shop/registration";
$route['user'] = "shop/showCustomerProfile";
//$route['(:any)'] = "shop/showCatalog/$1";
//$route['(:any)/(:any)/(:any)'] = "shop/test"; // TEST!!!


// promo
//$route['promo/(:any)'] = "promo/$1";

//$route['404_override'] = '';

class Config
{

    public $driver = '';
    public $host = '';
    public $login = '';
    public $password = '';
    public $db_name = '';
    public $encoding = '';
    public $prefix = '';
    public $wysiwyg = 'imperavi';

    protected $host_test = '';
    protected $login_test = '';
    protected $password_test = '';


    public function __get($key)
    {
        return $this->$key;
    }

    public function __set($key, $value)
    {
        $this->$key = $value;
    }
}


// настройка подключени, в зависимости от расположения
if ($_SERVER['HTTP_HOST'] == 'justivru' OR $_SERVER['HTTP_HOST'] == 'justiv') {

    define ('HN', 'http://justivru/'); // HOST_NAME

    $site['logError'] = false;
    $site['showError'] = true;
    $site['showQueries'] = false;

    $Config = new Config();
    $Config->driver = 'mysqli';
    $Config->host = '127.0.0.1';
    $Config->port = '3306';
    $Config->login = 'root';
    $Config->password = '';
    $Config->db_name = 'justivru_shop';
    $Config->encoding = 'UTF8';
    $Config->prefix = 'jus_';


} elseif ($_SERVER['HTTP_HOST'] == 'www.justiv.ru' || $_SERVER['HTTP_HOST'] == 'justiv.ru') {



}

// ЗАПРОСЫ ВЫПОЛНЯЮЩИЕСЯ ПЕРЕД СОЕДИНЕНИЕМ С БАЗОЙ
$hooks[] = "SET @@lc_time_names='ru_RU';";

require_once "bootstrap.php";


$data = Loader::module('shop/getCategoriesListArray');
foreach($data as $row) {
    $route[$row['ctg_url_path']] = "shop/showCatalog";
}

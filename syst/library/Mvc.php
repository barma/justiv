<?php
/*
 * Класс контроллера MVC Приложения
 * TODO: ресширения модели, сейчас она дает только дополнительное подключение к базе данных!
 */
class Controller extends Model
{

    /*
     * Нужно передавать имя модуля, или подпуть, если находимся в админке: 'shop/admin'
     */
    public function  __construct($name)
    {
        parent::__construct();
        $this->load->setModuleName($name);
    }

}

/*
 * Класс модели
 * TODO: Нужен ли тут Экземпляр класса Loader???
 */
class Model
{

    public $db = '';
    public $load = '';
    public $gpc = '';

    public function  __construct()
    {

        global $Config;
        //Core::getLibrary('db');
        Loader::library('db');
        Loader::library('gpc');
        $this->db = DB::connect($Config);
        $this->load = new Loader();
        $this->db->setLogger('DbLogger');
        $this->db->setErrorHandler('DBErrorHandler');
        //$this->gpc = new Gpc();
    }

    /*
    * При вызове несуществующего метода или объекта, обращается к
    * классу коллекции в классе Loader
    */
    public function __get($index)
    {
        $obj = $this->load->getCollection($index);
        if (isset($obj)) {
            return $this->load->getCollection($index);
        } else {
            return null;
        }
    }

    /*
     * При попытке установить не объвленное свойство класса, будет
     * устанавливаться для свойств класса Loader
     */
    public function __set($index, $value)
    {
        $this->load->setCollection($index, $value);
    }

    public static function getParam($name, $source, $type, $maxlen = 0)
    {
        //Loader::library('gpc');
        return Gpc::getParam($name, $source, $type, $maxlen);
    }
}
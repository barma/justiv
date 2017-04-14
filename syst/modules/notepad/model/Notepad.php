<?php
/**
 * Created by PhpStorm.
 * User: barma
 * Date: 04.03.14
 * Time: 22:29
 */

class Notepad extends Model {

    private $file = '';

    public function __construct() {
        parent::__construct();
        $this->file = __DIR__.'/../data.txt';
    }

    public function readData(){
        $fp = file_get_contents($this->file, 'r');
        return $fp;
    }

    public function writeData($data) {
        if(file_put_contents($this->file, $data)){
            return true;
        } else {
            return false;
        }
    }

}
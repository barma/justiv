<?php
/**
 * Created by PhpStorm.
 * User: barma
 * Date: 26.05.14
 * Time: 23:30
 */

Loader::library('mvc');
$obj = new Controller('shop');

class Taobao implements ParseSite {

    public function getPrice() {
        echo "test";
    }

}

class ParseService {

    private $site;

    public function __construct(ParseSite $ParseSite) {
        $this->site = $ParseSite;
    }

    public function getData($store) {
        return $this->site->getPrice($store->getPrice());
    }
}
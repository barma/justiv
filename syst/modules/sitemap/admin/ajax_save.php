<?php
/**
 * Created by PhpStorm.
 * User: barma
 * Date: 06.03.14
 * Time: 20:53
 */
Core::templateOff();
Loader::library('mvc');
$obj = new Controller('sitemap');
$obj->load->model('sitemap');

if(isset($_POST['config'])) {

    if(isset($_POST['id'])) {
        $res = $obj->sitemap->changeConfig();
    } else {
        $res = $obj->sitemap->addConfig();
    }

} else {

    if(isset($_POST['id'])) {
        $res = $obj->sitemap->changeLink();
    } else {
        $res = $obj->sitemap->addLink();
    }

}

if($res) {
    die('true');
} else {
    die('false');
}
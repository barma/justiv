<?php
/**
 * Created by PhpStorm.
 * User: barma2
 * Date: 13.07.14
 * Time: 23:35
 */

Loader::library('mvc');
$obj = new Controller('shop');
$obj->load->model('category');

if(isAjax() AND !empty($_POST['action'])) {
    Core::templateOff();
//    $return = $obj->category->$_POST['action']();
    die("7");
}

$data = $obj->category->getListCategories();
$obj->load->view('admin/view_categories', $data);
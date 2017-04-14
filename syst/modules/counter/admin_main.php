<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Stas
 * Date: 18.08.13
 * Time: 20:25
 * To change this template use File | Settings | File Templates.
 */
Loader::library('mvc');
$obj = new Controller('counter');
$obj->load->model('counter');
$data = $obj->counter->getMainData();
$obj->load->view('admin/view_admin_main', $data);
?>
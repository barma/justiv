<?php
/**
 * Created by PhpStorm.
 * User: barma2
 * Date: 13.07.14
 * Time: 19:25
 */

Loader::library('mvc');
$obj = new Controller('shop');
$obj->load->model('orders');
$data = $obj->orders->getListOrders();
$obj->load->view('admin/view_orders', $data);
<?php
/**
 * Created by PhpStorm.
 * User: barma
 * Date: 21.04.14
 * Time: 0:36
 */

Loader::library('mvc');
$obj = new Controller('shop');
$obj->load->model('Currency');
$data = $obj->currency->getCurrencies();
$obj->load->view('admin/view_currencies', $data);
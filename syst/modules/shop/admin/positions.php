<?php
/**
 * Created by PhpStorm.
 * User: barma2
 * Date: 13.07.14
 * Time: 22:43
 */

Loader::library('mvc');
$obj = new Controller('shop');
$obj->load->model('positions');
$data = $obj->positions->getListPositions();
$obj->load->view('admin/view_positions', $data);
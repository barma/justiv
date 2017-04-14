<?php
/**
 * Created by PhpStorm.
 * User: barma
 * Date: 20.04.14
 * Time: 18:11
 */
Loader::library('mvc');
$obj = new Controller('shop');
$obj->load->library('Helper');
$obj->load->model('Category');
$data['categories']=$obj->category->getListCategories();
$obj->load->view('admin/view_add_product', $data);
//ed($data);
$obj->load->view('admin/view_edit_product', $data);
<?php
/**
 * Created by PhpStorm.
 * User: barma
 * Date: 27.04.14
 * Time: 19:40
 */
Loader::library('mvc');
$obj = new Controller('shop');
$obj->load->model('Product');
$data = array();
if(isset($_POST['save'])) {
    $obj->product->editProduct();
}
if(isset($_GET['id'])) {
    $id = $obj->getParam('id','G','INT',10);
    $data = $obj->product->getProduct($id);
    $obj->load->model('Category');
    $data['categories'] = $obj->category->getListCategories();
    $obj->load->model('Currency');
    $data['currencies'] = $obj->currency->getCurrenciesList();
    $obj->load->model('productImages');
    $data['images'] = $obj->productImages->getProductsImages($id);
}
$obj->load->library('Helper');
$obj->load->library('wysiwyg');
$obj->load->view('admin/view_edit_product', $data);
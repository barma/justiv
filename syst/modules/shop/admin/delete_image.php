<?php
/**
 * Created by PhpStorm.
 * User: barma2
 * Date: 23.09.14
 * Time: 0:00
 */

Loader::library('mvc');
$obj = new Controller('shop');
$obj->load->model('ProductImages');
$id = $obj->getParam('id','G','INT',10);
$pr_id = $obj->productImages->deleteImage($id);
Core::redirect('/syst/modules/shop/admin/edit_product.php?id='.$pr_id);
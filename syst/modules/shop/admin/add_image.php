<?php
/**
 * Created by PhpStorm.
 * User: barma2
 * Date: 21.07.14
 * Time: 0:00
 */

Loader::library('mvc');
$obj = new Controller('shop');
$obj->load->model('ProductImages');
$id = $obj->getParam('id','G','INT',10);
$pr_id = $obj->getParam('pr_id','G','INT',10);
if(empty($pr_id)) $pr_id = $obj->getParam('pr_id','P','INT',10);


if(!empty($id)) {
    $data = $obj->productImages->getImage($id);
}

function createOrUpdateImage($obj, $id, $pr_id = null) {
    if(!empty($_POST)) {
        if(isset($id)) {
            $obj->productImages->editImage($id);
        } else {
            $obj->productImages->addImage($pr_id);
        }
    }
}

if(isAjax()) {
    Core::templateOff();
}

createOrUpdateImage($obj, $id, $pr_id);

if(!empty($_POST)) {
    Core::redirect('/syst/modules/shop/admin/edit_product.php?id='.$pr_id);
}
$data['pr_id'] = $pr_id;
$obj->load->view('admin/view_add_image', $data);

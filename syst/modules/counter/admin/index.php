<?php
/**
 * Created by JetBrains PhpStorm.
 * User: barma
 * Date: 29.08.13
 * Time: 0:30
 * To change this template use File | Settings | File Templates.
 */

Loader::library('mvc');
$obj = new Controller('counter');
$obj->load->model('counter');
$count = $obj->getParam('param', 'G', 'TEXT', 10);
if (!empty($count)) {
    $data = $obj->counter->getDataByParam($count);
} else {
    $data = $obj->counter->getLastThousand();
}
$obj->load->view('admin/view_index', $data);
?>
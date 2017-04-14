<?php
/**
 * Created by PhpStorm.
 * User: barma
 * Date: 04.03.14
 * Time: 22:49
 */
//Core::templateOff();
Loader::library('mvc');
$obj = new Controller('notepad');
$obj->load->model('notepad');
$data = $obj->notepad->readData();

if(isset($_POST['data']) AND !empty($_POST['data'])) {
    $data = $obj->getParam('data','P','HTML',65000);
    $obj->notepad->writeData($data);
}
//$obj->load->library('wysiwyg');
Loader::library('wysiwyg');
$obj->load->view('admin/edit', $data);
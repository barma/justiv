<?php
Loader::library('mvc');
/*$obj = new Backup();
$data = getlistBackups();
$obj->load->view('admin/view_index', $data);
*/

$obj = new Controller('system/backup');
$obj->load->model('Backup');
$data = $obj->backup->getlistBackups();
$obj->load->view('admin/view_index', $data);
?>
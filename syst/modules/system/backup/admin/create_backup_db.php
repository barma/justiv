<?
$obj = new Controller('system/backup');
$obj->load->model('Backup');
$data = $obj->backup->getlistBackups();
$obj->load->view('admin/view_index', $data);
?>
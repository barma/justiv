<?
$obj = new Controller('system/backup');
$obj->load->model('Backup');
$backup = $obj->getParam('id', 'G', 'TEXT', 40);
if (is_file(DR . $backup)) {
    unlink(DR . $backup);
}
Core::redirect(FC . 'modules/system/backup/admin/index.php');
?>
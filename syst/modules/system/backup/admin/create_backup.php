<?
$obj = new Controller('system/backup');
$obj->load->model('Backup');
$id = $obj->getParam('id', 'G', 'TEXT', 20);
switch ($id) {
    case 'db':
        $obj->backup->createBackupDB();
        break;

    case 'files':
        //$obj->backup->createBackupFiles();
        echo "files";
        break;

    case 'full':
        //$obj->backup->createBackupFull();
        echo "full";
        break;
}
Core::redirect(FC . 'modules/system/backup/admin/index.php');
?>
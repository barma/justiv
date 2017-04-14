<?
$obj = new Controller('system/backup');
$obj->load->model('Backup');
$id = $obj->getParam('id', 'G', 'TEXT', 60);
$action = $obj->getParam('action', 'G', 'TEXT', 10);
switch ($action) {
    case 'db':
        echo "db";
        $obj->backup->rollbackDB($id);
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
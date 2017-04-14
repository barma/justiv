<?php
Core::templateOff();
Loader::library('Gpc');
$id = Gpc::getParam('id', 'G', 'MD5', 40);
Loader::library("Guard");
$guard = new Guard();
$status = $guard->deleteError($id);
if ($status) {
    die('{"success":"1","message":"Ошибка удалена","hash":"' . $id . '"}');
} else {
    die('{"success":"0","message":"Данной ошибки не существует"}');
}
?>

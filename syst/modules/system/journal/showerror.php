<?php
Loader::library('Gpc');
$id = Gpc::getParam('id', 'G', 'MD5', 40);
Loader::library("Guard");
$guard = new Guard();
$guard->showError($id);
?>

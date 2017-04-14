<?php
Loader::library('mvc');
$user = new Controller('user');
$user->load->model('access');
$user->access->checkAdmin();
?>
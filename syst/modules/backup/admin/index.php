<?php
Loader::library('mvc');
$obj = new Backup();
$data = getlistBackups();
$obj->load->view('admin/view_index', $data);
?>
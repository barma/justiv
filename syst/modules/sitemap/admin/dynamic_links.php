<?php
Loader::library('mvc');
$obj = new Controller('sitemap');
$obj->load->model('sitemap');
if(isset($_GET['action']) AND $_GET['action'] == 'update') {
    $obj->sitemap->updateDynamicPages();
}
$data = $obj->sitemap->getListDinamycPages();
$obj->load->view('view_index', $data);
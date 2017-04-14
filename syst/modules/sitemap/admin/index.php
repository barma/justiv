<?php
/**
 * Created by PhpStorm.
 * User: barma
 * Date: 06.03.14
 * Time: 20:25
 */
Loader::library('mvc');
$obj = new Controller('sitemap');
$obj->load->model('sitemap');
$data = $obj->sitemap->getListPermanentPages();
$obj->load->view('view_index', $data);
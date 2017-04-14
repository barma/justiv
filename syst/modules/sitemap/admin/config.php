<?php
/**
 * Created by PhpStorm.
 * User: barma
 * Date: 10.03.14
 * Time: 22:44
 */

Loader::library('mvc');
$obj = new Controller('sitemap');
$obj->load->model('sitemap');
$data = $obj->sitemap->getConfig();
$obj->load->view('admin/view_config', $data);
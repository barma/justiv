<?php
/**
 * Created by PhpStorm.
 * User: barma
 * Date: 05.03.14
 * Time: 0:27
 */

Loader::library('mvc');
$obj = new Controller('sitemap');
$obj->load->model('sitemap');
$obj->sitemap->insertDataFromBlog();
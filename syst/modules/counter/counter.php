<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Barma
 * Date: 14.08.13
 * Time: 23:02
 * To change this template use File | Settings | File Templates.
 */
Loader::library('mvc');
$obj = new Controller('counter');
$obj->load->model('counter');
$obj->counter->addRow();
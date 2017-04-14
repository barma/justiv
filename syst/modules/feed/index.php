<?
Loader::library('mvc');
Core::templateOff();
$obj = new Controller('feed');
$obj->load->model('feed');
$data = $obj->feed->getBlogFeed();
$obj->load->view('view_index', $data);
?>
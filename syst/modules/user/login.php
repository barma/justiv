<?
Core::templateOff();
Loader::library('mvc');
$user = new Controller('user');
$user->load->model('access');
if (!empty($_POST['email']) && !empty($_POST['pass'])) {
    $email = $user->getParam('email', 'P', 'TEXT', 15);
    $pass = $user->getParam('pass', 'P', 'TEXT', 15);
    $user->access->logIn($email, $pass);
}
$user->load->view('login');
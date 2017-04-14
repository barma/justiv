<?php
/**
 * Created by JetBrains PhpStorm.
 * User: barma
 * Date: 26.01.14
 * Time: 19:04
 * To change this template use File | Settings | File Templates.
 */

Loader::library('mvc');

class UserController extends Controller {

    public function __construct() {
        parent::__construct('user');
    }


    public function isAdmin() {
        $this->load->model('Access');
        return $this->access->isAdmin();
    }

    public function showLogin() {
        if(!empty($_POST['user']) or !empty($_POST['pass'])) {
            $user = $this->getParam('user','P','TEXT',50);
            $pass = $this->getParam('pass','P','TEXT',50);
            $data = $this->db->selectRow("SELECT * FROM ?_users WHERE user_email = ? AND user_pass = ?", $user, sha1($pass.SALT));
        } else {
            $data = "not login";
        }
        $this->load->view('view_user_login', $data);
    }

}
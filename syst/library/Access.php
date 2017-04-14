<?php

class Access extends Model
{

    public $db = '';

    public function  __s2construct()
    {
        $this->db = DB::connect();
    }

    public function logIn($email, $passwd)
    {

        $passwd = sha1($passwd);

        $res = $this->db->selectRow(
            'SELECT `user_name`, `user_status` FROM ?_users
                    WHERE `user_passwd` = ? AND `user_email` = ?',
            $passwd,
            $email
        );

        if ($res > 0) {

            $_SESSION['passwd'] = $passwd;
            $_SESSION['email'] = $email;

            if ($res['user_status'] == 'admin') {
                Core::redirect('admin');
            } else {
                Core::redirect('index2.php');
            }

        } else {
            Core::redirect('login.php?err=wronglogin');
        }

    }

    public function logOut()
    {

        unset($_SESSION['email']);
        unset($_SESSION['passwd']);
        Core::redirect('');

    }

    public function checkAdmin()
    {

        // если нет сессии, отправить на форму
        if (!isset($_SESSION['passwd']) && !isset($_SESSION['email'])) {
            Core::redirect('login.php?err=login');
        }

        $passwd = $_SESSION['passwd'];
        $email = $_SESSION['email'];

        $res = $this->db->selectRow(
            'SELECT `user_name`, `user_status` FROM ?_users
                    WHERE `user_passwd` = ? AND `user_email` = ?',
            $passwd,
            $email
        );

        //если не админ = отправить на форму
        if ($res['user_status'] !== 'admin') {
            Core::redirect('login.php?err=notadmin');
        }

        return true;
    }
}

?>
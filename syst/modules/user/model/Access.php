<?php
Loader::Library('mvc');

class Access extends Model
{

    public function logIn($email, $passwd)
    {

        $passwd = sha1($passwd);

        $res = $this->db->selectRow(
            'SELECT `user_name`, `user_status` FROM ?_users
                        WHERE `user_passwd` = ? AND `user_email` = ?',
            $passwd,
            $email
        );

        if (!empty($res)) {

            $_SESSION['passwd'] = $passwd;
            $_SESSION['email'] = $email;

            if ($res['user_status'] == 'admin') {
                Core::redirect('admin');
            } else {
                Core::redirect('login.php?err=notadmin');
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

        $passwd = $this->getParam('passwd', 'S', 'TEXT', 40);
        $email = $this->getParam('email', 'S', 'TEXT', 40);

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

    public function isAdmin()
    {
        if (!isset($_SESSION['passwd']) && !isset($_SESSION['email'])) {
            return false;
        }

        $passwd = $this->getParam('passwd', 'S', 'TEXT', 40);
        $email = $this->getParam('email', 'S', 'TEXT', 40);
        $status = $this->db->selectCell(
            'SELECT `user_status` FROM ?_users
                        WHERE `user_passwd` = ? AND `user_email` = ?',
            $passwd,
            $email
        );

        if ($status !== 'admin') {
            return false;
        }

        return true;
    }
}
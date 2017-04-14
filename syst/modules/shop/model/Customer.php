<?php
/**
 * Created by PhpStorm.
 * User: barma
 * Date: 11.06.14
 * Time: 23:52
 */

class Customer extends Model {

    private $_salt = '';

    private function _getData() {
        $data['cst_name'] = $this->getParam('cst_name','P','TEXT',255);
        $data['cst_email'] = $this->getParam('cst_email','P','TEXT',255);
        $data['cst_phone'] = $this->getParam('cst_phone','P','TEXT',255);
        $data['cst_login'] = $this->getParam('cst_login','P','TEXT',30);
        $data['cst_vk'] = $this->getParam('cst_vk','P','TEXT',30);
        $data['cst_passwd'] = sha1($this->getParam('cst_passwd','P','TEXT',30).$this->_salt);
        return $data;
    }

    public function registerNewCustomer() {
        $data = $this->_getData();
        $_SESSION['customer']['login'] = $data['cst_login'];
        $_SESSION['customer']['hash'] = $data['cst_passwd'];
        $this->db->query("INSERT INTO ?_shop_customers SET ?a", $data);
        return true;
    }

    public function updateCustomerPassword($pass, $hash) {
        if($this->db->query("UPDATE ?_shop_customers SET cst_passwd = ?, cst_temp_hash = ? WHERE cst_temp_hash = ?", $pass, null, $hash)) {
            return true;
        } else {
            return false;
        }
    }

    public function isCustomer() {
        $login = $_SESSION['customer']['login'];
        $hash = $_SESSION['customer']['hash'];
//        $login = $this->getParam('login','S','HTML',30);
//        $hash = $this->getParam('passwd','S','HTML',256);
        $cell = $this->db->selectCell("SELECT cst_id FROM ?_shop_customers WHERE cst_login = ? AND cst_passwd = ?", $login, $hash);
        if(!empty($cell)) {
            return true;
        } else {
            return false;
        }
    }

    public function loginCustomer($login, $passwd, $hash=false) {
        if($hash === false) {
            $passwd = sha1($passwd.$this->_salt);
        }
        $data = $this->db->selectRow("SELECT * FROM ?_shop_customers WHERE cst_login = ? AND cst_passwd = ?", $login, $passwd);
        if(!empty($data)) {
//            $_SESSION['passwd'] = $passwd;
//            $_SESSION['login'] = $data['cst_login'];
            $_SESSION['customer']['login'] = $data['cst_login'];
            $_SESSION['customer']['hash'] = $passwd;
            return $data;
        } else {
            return false;
        }
    }

    public function getCustomerId() {
//        $login = $this->getParam('login','S','HTML',30);
//        $hash = $this->getParam('passwd','S','HTML',256);
        $login = $_SESSION['customer']['login'];
        $hash = $_SESSION['customer']['hash'];
        $cell = $this->db->selectCell("SELECT cst_id FROM ?_shop_customers WHERE cst_login = ? AND cst_passwd = ?", $login, $hash);
        return $cell;
    }

    public function getCustomerData($cst_id) {
        return $this->db->selectRow("SELECT * FROM ?_shop_customers WHERE cst_id = ?", $cst_id);
    }

    public function updateCustomerData($data, $id) {
        $this->db->query("UPDATE ?_shop_customers SET ?a WHERE cst_id = ?", $data, $id);
    }

}
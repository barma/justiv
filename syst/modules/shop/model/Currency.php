<?php

class Currency extends Model {

    public function getCurrencies() {
        return $this->db->select("SELECT * FROM ?_shop_currency");
    }

    public function getCurrenciesList() {
        $data = $this->db->select("SELECT `cur_id`,`cur_name` FROM ?_shop_currency");
        return $data;
    }

    public function addCurrency() {
    	$data = $this->_getData();
    	return $this->db->query("INSERT INTO ?_shop_currency SET ?a", $data);
    }

    public function editCurrency($id) {
    	$data = $this->_getData();
    	return $this->db->query("UPDATE ?_shop_currency SET ?a WHERE `cur_id` = ?", $data, $id);
    }

}
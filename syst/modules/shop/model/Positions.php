<?php
/**
 * Created by PhpStorm.
 * User: barma
 * Date: 15.06.14
 * Time: 20:18
 */

class Positions extends Model {

    public function getCustomerPositions($cst_id) {
        return $this->db->query("SELECT * FROM ?_shop_positions INNER JOIN ?_shop_orders ON pst_ord_id = ord_id WHERE `ord_cst_id` = ?d", $cst_id);
    }

    public function getListPositions($count = 50) {
        return $this->db->select("SELECT ?_shop_positions.*, ?_shop_customers.cst_name FROM ?_shop_positions
            INNER JOIN ?_shop_orders ON `ord_id` = `pst_ord_id`
            INNER JOIN ?_shop_customers ON `pst_ord_id` = `ord_cst_id`
            LIMIT ?d", $count);
    }

}
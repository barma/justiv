<?php
/**
 * Created by PhpStorm.
 * User: barma
 * Date: 15.06.14
 * Time: 20:16
 */

class Orders extends Model {

    public function getCustomerOrders($cst_id) {
        return $this->db->query("SELECT * FROM ?_shop_orders WHERE `ord_cst_id` = ?d", $cst_id);
    }

    public function getListOrders($begin = '0', $count = '50') {
//        return $this->db->select("SELECT ?_shop_orders.*, ?_shop_customers.cst_name, (SELECT SUMM(`pst_price`) WHERE `pst_ord_id` = `ord_id`) as ord_summ FROM ?_shop_orders
//            INNER JOIN ?_shop_customers ON `ord_cst_id` = `cst_id`
//            LEFT JOIN ?_shop_positions ON `pst_ord_id` = `ord_id`
//            LIMIT ?d", $count);

        return $this->db->select("SELECT ?_shop_orders.*, ?_shop_customers.cst_name,
	        (SELECT SUM(`pst_price`) FROM ?_shop_positions WHERE `pst_ord_id` = `ord_id`) as ord_summ,
	        (SELECT COUNT(`pst_id`) FROM ?_shop_positions WHERE `pst_ord_id` = `ord_id`) as ord_pst_count
            FROM ?_shop_orders
            LEFT JOIN ?_shop_customers ON `ord_cst_id` = `cst_id`
            LEFT JOIN ?_shop_positions ON `pst_ord_id` = `ord_id`
            GROUP BY `ord_id`
            LIMIT ?d", $count);

    }

}
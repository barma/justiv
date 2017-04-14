<?php
/**
 * Created by PhpStorm.
 * User: barma
 * Date: 01.06.14
 * Time: 23:24
 */

class Basket extends Model {

    public function addProductToBasket($id, $count = 1) {
        if(isset($_SESSION['basket']['products'][$id])) {
            $_SESSION['basket']['products'][$id]['count'] += $count;
        } else {
            $_SESSION['basket']['products'][$id];
            $_SESSION['basket']['products'][$id]['count'] = $count;
        }
    }

    public function getListProducts() {
        if(!empty($_SESSION['basket'])){
            return array_keys($_SESSION['basket']['products']);
        } else {
            return array();
        }
    }

    public function getCountProducts() {
        $count = 0;
        if(is_array($_SESSION['basket']['products'])) {
            foreach($_SESSION['basket']['products'] as $product) {
                $count += $product['count'];
            }
            return $count;
        } else {
            return 0;
        }
    }

    public function getSumProduct($id) {
        return $this->db->selectCell("
            SELECT (pr_price * cur_currency) + pr_delivery_price + (
                IF (`pr_weight` IS NOT NULL AND `pr_weight` != 0, `pr_weight` *
                  IF (`dp_price_per_weight` IS NOT NULL, `dp_price_per_weight`, 0)
                , 0)
            ) as summ
            FROM jus_shop_products
            INNER JOIN ?_shop_currency ON `pr_cur_id` = `cur_id`
            LEFT JOIN ?_shop_delivery_price ON `pr_dp_id` = `dp_id`
            WHERE `pr_id` = ?", $id);
    }

    public function getSumProducts() {
        $summ = 0;
        if(is_array($_SESSION['basket']['products'])) {
            foreach($_SESSION['basket']['products'] as $id => $product) {
                $prices = $this->getProductPrices($id);
                $summ += ($prices['pr_price'] + $prices['pr_delivery_price']) * $product['count'];
            }
        }
        return $summ;
    }

    public function getProductPrices($id) {
        return $this->db->selectRow("SELECT pr_price, pr_delivery_price FROM ?_shop_products WHERE pr_id = ?", $id);
    }

    public function getBasket() {
        $data = $this->getListProducts();

        // нельзя передавать пустой массив в запрос
        if(empty($data)) {
            $data = array(0);
        }
        $products = $this->db->select("SELECT * FROM ?_shop_products AS p
            LEFT JOIN jus_shop_product_images AS i ON i.pi_pr_id = p.pr_id
            WHERE `pr_id` IN (?a) GROUP BY `pr_id`", $data);
        $data['products'] = $products;
        foreach($data['products'] as $key => $product) {
            $data['products'][$key]['count'] = $_SESSION['basket']['products'][$product['pr_id']]['count'];
        }
        $data['total']['count'] = $this->getCountProducts();
        $data['total']['price'] = $this->getSumProducts();
//        ed($data);
//        die('asd');
        return $data;
    }

    public function checkout() {
        $this->load->model('customer');
        $data['ord_cst_id'] = $this->customer->getCustomerId();
        if(empty($data['ord_cst_id'])) {
            die($data['ord_cst_id']);
            Core::redirect('/order/');
        }
        $ord_id = $this->db->query("INSERT INTO ?_shop_orders SET ?a", $data);
        $products = $this->getListProducts();
        $this->load->model('product');
        foreach($products as $key => $product){
            unset($positions);
            $positions['pst_ord_id'] = $ord_id;
            $positions['pst_pr_id'] = $product;
            $positions['pst_pr_name'] = $this->product->getProductName($positions['pst_pr_id']);
            $positions['pst_count'] = $_SESSION['basket']['products'][$product]['count'];
            $positions['pst_price'] = $this->getSumProduct($positions['pst_pr_id']);
            if(empty($positions['pst_price'])) {
                continue;
            }
            $this->db->query("INSERT INTO ?_shop_positions SET ?a", $positions);
        }
        unset($_SESSION['basket']);
    }

}

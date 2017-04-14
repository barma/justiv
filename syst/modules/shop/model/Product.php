<?php
/**
 * Created by PhpStorm.
 * User: barma
 * Date: 21.04.14
 * Time: 0:43
 */

class Product extends Model {

    public function getProductsWindow() {
        $data = $this->db->select("SELECT * FROM ?_shop_products as sp
            LEFT JOIN ?_shop_product_images spi ON spi.pi_pr_id = sp.pr_id
            GROUP BY (pr_id)
            ORDER BY sp.pr_last_modified ASC LIMIT 8");
        return $data;
    }

    public function getListProducts($catalog = '') {
        $sort = $this->getParam('sort','G','TEXT',255);
        if(!empty($sort)) {
            if('price_up' == $sort) {
                $sort = 'pr_price';
                $vay = 'ASC';
            } elseif ('price_down' == $sort) {
                $sort ='pr_price';
                $vay = 'DESC';
            }
        }
        return $this->db->SELECT("SELECT *
            FROM ?_shop_products AS p
            LEFT JOIN ?_shop_product_images ON pi_pr_id = p.pr_id
            { INNER JOIN ?_shop_category AS c ON p.pr_ctg_id = c.ctg_id
             WHERE c.ctg_url_path = ? }
            GROUP BY `pr_id`
            { ORDER BY ?# $vay }
            LIMIT 0 , 100", (empty($catalog)? DBSIMPLE_SKIP : $catalog), (empty($sort)? DBSIMPLE_SKIP: $sort));
    }

    public function getProduct($id) {
        $data = $this->db->selectRow("SELECT * FROM ?_shop_products WHERE `pr_id` = ?", $id);
        return $data;
    }

    public function getProductName($id) {
        return $this->db->selectCell("SELECT `pr_name` FROM ?_shop_products WHERE `pr_id` = ?d", $id);
    }

    private function _getData() {
        $data['pr_name'] = $this->getParam('pr_name','P','TEXT',255);
        $data['pr_ctg_id'] = $this->getParam('pr_ctg_id','P','INT',10);
        $data['pr_short_description'] = $this->getParam('pr_short_description','P','TEXT',255);
        $data['pr_description'] = $this->getParam('pr_description','P','TEXT',10240);
        $data['pr_price'] = $this->getParam('pr_price','P','NUM',255);
        $data['pr_delivery_price'] = $this->getParam('pr_delivery_price','P','NUM',255);
        $data['pr_cur_id'] = $this->getParam('pr_cur_id','P','INT',10);
        $month = $this->getParam('isnewmonth','P','INT',10);
        if(isset($month)) {
            $data['pr_actual_date'] = date(Y-m-d);
        }
        return $data;
    }

    public function editProduct() {
        $data = $this->_getData();
        $id = $this->getParam('id','G','INT',10);
        if(empty($id)) {
            return false;
        }
        $this->db->query("UPDATE ?_shop_products SET ?a WHERE `pr_id` = ? LIMIT 1", $data, $id);
        return true;
    }

    public function updateProducts() {
        $this->db->query("UPDATE ?_shop_products SET `pr_isnew` = 1 WHERE TO_DAYS(NOW()) - TO_DAYS(pr_actual_date) <= 30");
        $this->db->query("UPDATE ?_shop_products SET `pr_isnew` = 0 WHERE TO_DAYS(NOW()) - TO_DAYS(pr_actual_date) > 30;");
        return true;
    }

}
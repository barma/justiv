<?php

class Category extends Model {

    public function getCategories() {
        return $this->db->select("SELECT * FROM ?_shop_category");
    }

    public function getListCategories() {
        $data = $this->db->select("SELECT * FROM ?_shop_category");
        return $data;
    }

    private function _getData() {
        $data['ctg_name'] = $this->getParam('ctg_name','P','TEXT',255);
        $data['ctg_url_path'] = $this->getParam('ctg_url_path','P','TEXT',255);
        return $data;
    }

    public function addCategory() {
//        ECHO "asdsd";
        $data = $this->_getData();
        return $this->db->query("INSERT INTO ?_shop_category SET ?a", $data);
    }

    public function getCategoryNameByURL($category = '') {
        return $this->db->selectCell("SELECT `ctg_name` FROM ?_shop_category WHERE `ctg_url_path` = ?", $category);
    }

    public function editCategory() {
        $data = $this->_getData();
        return $this->db->query("INSERT INTO ?_shop_category SET ?a", $data);
    }

    public function deleteCategory($id) {
        if(!empty($id)) {
            return $this->db->query("DELETE FROM  ?_shop_category WHERE `ctg_id` = ?d", (int)$id);
        }
    }

    public function getMenu() {
        return $data = $this->db->query("SELECT * FROM ?_shop_category as sc
         INNER JOIN ?_shop_products as p ON sc.ctg_id = p.pr_ctg_id
         WHERE `ctg_name` != '' AND `ctg_url_path` != '' GROUP BY `ctg_id`");
    }

}
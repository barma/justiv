<?php
/**
 * Created by PhpStorm.
 * User: barma
 * Date: 27.04.14
 * Time: 22:09
 */

class ProductImages extends Model {

    protected function _getData() {
        $data = array();
        $data['pi_title'] = $this->getParam('pi_title','P','TEXT',255);
        $data['pi_description'] = $this->getParam('pi_description','P','TEXT',255);
        return $data;
    }

    public function getProductsImages($id) {
        return $this->db->SELECT("SELECT * FROM ?_shop_product_images WHERE `pi_pr_id` = ?", $id);
    }

    public function editImageData($id) {
        $data = $this->_getData();
        $this->db->query("UPDATE ?_shop_product_images SET ?a WHERE `pi_id` = ?", $data, $id);
        return true;
    }

    /**
     * @param $id _shop_product_images.pi_id
     * @return int product id
     */
    public function deleteImage($id) {
        $data = $this->getImage($id);
        $pr_id = $this->db->selectCell("SELECT `pi_pr_id` FROM ?_shop_product_images WHERE `pi_id` = ?", $id);
        if(is_file(DR.$data['pi_path'])) {
            if(unlink(DR.$data['pi_path'])){
                $this->db->query("DELETE FROM ?_shop_product_images WHERE `pi_id` = ?", $id);
                return $pr_id;
            }
        } else {
            $this->db->query("DELETE FROM ?_shop_product_images WHERE `pi_id` = ?", $id);
            return $pr_id;
        }
    }

    public function getImage($id){
        return $this->db->selectRow("SELECT * FROM ?_shop_product_images WHERE `pi_id` = ?", $id);
    }

//    public function savePhoto($id) {
//        $ext = strtolower(strrchr($_FILES['image']['name'], "."));
//        $fileName = md5($_FILES['image']['name'].$_FILES['image']['size']).$ext;

// если папка отсутствует, создаем.
//	if(!file_exists(DR.$this->_pathToImage.$id)) {
//	    if(!mkdir(DR.$this->_pathToImage.$id)) {
//		throw new Exception('Невозможно сделать запись на сервере');
//	    }
//	}C:/server/OpenServer/domains/justivru
//        $pathToSave = DR.$this->_pathToImage.'/'.$fileName;
//
//        $this->load->library('fileUploader');
//        $this->fileUploader->upload('image', $pathToSave, 'IMG', 1);
//
//        // Путь до видео от корня сайта
//        $data = array('image'=>"$this->_pathToImage/$fileName");
//        $result = $this->db->query("UPDATE ?_slider
//		SET ?a WHERE `id` = ? LIMIT 1", $data, $id);
//        if(!$result) throw new Exception ("Ошибка обновления изображения
//	    в базе данных, попробуйте поздней");
//    }

    public function addImage($pr_id) {
        $data = $this->_getData();
        $data['pi_pr_id'] = $pr_id;
        $this->load->library('fileUploader');
        $folder = $this->createFolderForProdectImages($pr_id);
        $name = $this->getNameForProductImage($pr_id);
        if(empty($name)) {
            throw new Exception('Не удалось вернуть имя для картинки');
        }
        $ext = strtolower(strrchr($_FILES['image']['name'], "."));
        $name .= $ext;
        $this->fileUploader->upload('image', $folder.$name,'image',5);
        $data['pi_name'] = $name;
        $data['pi_path'] = str_replace(DR,'/',$folder.$name);
        return $this->db->query("INSERT INTO ?_shop_product_images SET ?a", $data);
    }

    public function editImage($id) {
        $data = $this->_getData();
        return $this->db->query("INSERT INTO ?_shop_product_images SET ?a WHERE `pi_id` = ?", $data, $id);
    }

//    public function deleteProductImages($pi_id) {
//        return $this->db->query("DELETE FROM ?_shop_product_images WHERE `pi_pr_id` = ?");
//    }


    public function getNameForProductImage($pr_id) {
        $res = $this->db->selectCol("SELECT `pi_name` FROM ?_shop_product_images WHERE `pi_pr_id` = ?", $pr_id);
        if(empty($res)) {
            return $pr_id.'_1';
        } else {
            $arrWithoutExt = array();
            foreach ($res as $filename) {
                // вырезаем расширение с точкой
                $arrWithoutExt[] = substr($filename,0,strlen($filename)-4);
            }
            $i = 0;
            while (true) {
                $i++;
                if(!in_array($pr_id.'_'.$i, $arrWithoutExt)) {
                    return $pr_id.'_'.$i;
                }
            }
        }
    }

    public function createFolderForProdectImages($id) {
        for ($i=0; $i<=strlen($id); $i++) {
            $digits[]=substr($id, $i, 1);
        }
        if (!is_dir(DR.'product/'.$digits[0])) {
            mkdir(DR.'product/'.$digits[0]);
        }

        // если первая десятка, записывать будет в папку products/*/0/
        if(empty($digits[1])) {
            $digits[1] = 0;
        }

        if (!is_dir(DR.'product/'.$digits[0].'/'.$digits[1])) {
            mkdir(DR.'product/'.$digits[0].'/'.$digits[1]);
        }

        if(is_dir(DR.'product/'.$digits[0].'/'.$digits[1].'/'.$id)) {
            // папка уже есть
            return DR.'product/'.$digits[0].'/'.$digits[1].'/'.$id.'/';
        }

        $dir = DR.'product/'.$digits[0].'/'.$digits[1].'/'.$id;
        mkdir($dir);
        return $dir.'/';
    }

}
<?php
/**
 * Created by PhpStorm.
 * User: barma2
 * Date: 02.10.14
 * Time: 1:30
 */

class Cron extends Model {

    public function run() {
        $this->load->model('product');
        $this->product->updateProducts();
    }

}
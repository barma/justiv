<?php
/**
 * Created by PhpStorm.
 * User: barma
 * Date: 31.03.17
 * Time: 15:10
 */

foreach($data as $key => $val) {
    if(!is_file(DR.$val['pi_path'])) {
        $val['pi_path'] = "/images/nophoto.gif";
    }
    ?>

    <div class="product">
        <div class="productImage">
            <a href="/product/<?=$val['pr_id']?>"><img src="<?=$val['pi_path'];?>" title="<?=$val['pi_title'];?>" width="220"></a>
        </div>
        <div class="productName"><?=$val['pr_name']?></div>
        <div class="productPrice"><?=$val['pr_price']?></div>
    </div>

    <?
}
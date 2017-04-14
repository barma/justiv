<?php
/**
 * Created by PhpStorm.
 * User: barma
 * Date: 05.05.14
 * Time: 23:06
 */
$sort = 'price_up';
$arrow = '&#8593;';
if(isset($_GET['sort']) and !empty($_GET['sort'])) {
    if($_GET['sort'] == 'price_up') {
        $sort = 'price_down';
        $arrow = '&#8595;';
    }
}
?>
<h1><?=$data['category']?></h1>
<div class="sort">Сортировать по: <a href="?sort=<?=$sort?>">Цене <?=$arrow?></a></div>
<?
foreach($data['products'] as $product) {
    if(!is_file(DR.$product['pi_path'])) {
        $product['pi_path'] = "/images/nophoto.gif";
    }
    ?>
    <div class="product">
        <?if(!empty($product['pi_path'])) {?>
            <div class="productImage">
                <a href="/product/<?=$product['pr_id']?>"><img src="<?=$product['pi_path']?>" title="<?=$product['pi_title']?>" width="200"></a>
            </div>
        <?}?>
        <div><a href="/product/<?=$product['pr_id']?>"><h3><?=$product['pr_name']?></h3></a></div>
        <div class="productPrice"><?=number_format($product['pr_price'],2)?> руб.</div>
        <?if($product['pr_isnew'] == 1) {?>
            <div>Новинка</div>
        <?}?>
        <div><a href="/addtocart/<?=$product['pr_id'];?>/" class="ajaxLink">В корзину</a></div>
    </div>
    <?
}
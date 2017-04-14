<h1>Корзина</h1>
<?
if(empty($data['products'])) {
    ?><div>Ваша корзина пуста</div><?
} else {
?>
    <form method="post" action="/order/">
    <table class="table">
        <tr>
            <th></th>
            <th>№</th>
            <th>Изображение</th>
            <th>Наименование</th>
            <th>Количество</th>
            <th>Стоимость доставки</th>
            <th>Цена</th>
        </tr>
    <?
       $i = 0;
        foreach($data['products'] as $product) {
            $i++;
            if(!is_file(DR.$product['pi_path'])) {
                $product['pi_path'] = "/images/nophoto.gif";
            }
            ?>
            <tr>
                <td><a href="/shop/ajax/<?=$product['pr_id']?>/delete/" class="ajaxLink" id="delete_product_from_basket"></td>
                <td><?=$i?></td>
                <td align="center"><img src="<?=$product['pi_path']?>" title="<?=$product['pi_title']?>" width="100px"></td>
                <td><a href="/product/<?=$product['pr_id']?>/" target="_blank"><?=$product['pr_name']?></a></td>
                <td><?=$product['count']?></td>
                <td><?=number_format($product['pr_delivery_price'],2)?> руб.</td>
                <td><?=number_format($product['pr_price'],2)?> руб.</td>
            </tr>
            <?
        }
    ?>
    </table>
    <?
    if(!empty($data['total'])) {
        ?>
        <table class="basketSummary"><tr><td>Количество товаров:&nbsp;</td>
                <td>&nbsp; <?=$data['total']['count']?></td>
                <td>&nbsp; Общая сумма заказа:&nbsp; </td>
                <td>&nbsp; <?=number_format($data['total']['price'],2)?> руб.</td></tr>
        </table>
        <?
    }
    ?>
    <input type="submit" name="make_order" class="btn btn-success" value="оформить заказ">
    </form>
<?
}
?>
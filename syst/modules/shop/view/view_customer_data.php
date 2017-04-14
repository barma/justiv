<?php
/**
 * Created by PhpStorm.
 * User: barma
 * Date: 15.06.14
 * Time: 20:05
 */
?>
<h2>Ваши данные:</h2>
<form class="form-horizontal" role="form" method="post">
    <div class="form-group">
        <label for="name" class="col-sm-2 control-label">Как к Вам обращаться?</label>
        <div class="col-sm-6">
            <input type="text" name="name" class="form-control" id="name" value="<?=$data['customer']['cst_name']?>">
        </div>
    </div>

    <div class="form-group">
        <label for="email" class="col-sm-2 control-label">Email</label>
        <div class="col-sm-6">
            <input type="text" name="email" class="form-control" id="email" value="<?=$data['customer']['cst_email']?>" placeholder="Email">
        </div>
    </div>

    <div class="form-group">
        <label for="inputEmail3" class="col-sm-2 control-label">Контактный телефон:</label>
        <div class="col-sm-6">
            <input type="text" name="phone" class="form-control" id="phone" placeholder="" value="<?=$data['customer']['cst_phone']?>">
        </div>
    </div>

    <div class="form-group">
        <div class="col-sm-offset-2 col-sm-6">
            <button type="submit" class="btn btn-default">Сохранить</button>
        </div>
    </div>
</form>
<?
if(!empty($data['orders'])) {
    ?>
    <br><br>
    <h2>Ваши заказы:</h2>
    <table width="100%" class="table">
        <tr><th>№</th><th>Дата</th><th>Сумма</th></tr>
        <? foreach($data['orders'] as $order) {?>
        <tr>
            <td><?=$order['ord_id']?></td>
            <td><?=$order['ord_date']?></td>
            <td><?=$order['ord_summ']?></td>
        </tr>
        <?}?>
    </table>
    <?
} else {
?><br><br><div>У Вас еще нет заказов :( Самое время чтонибудь себе купить ;)</div><?
}
?>
<?
if(!empty($data['positions'])) {
    ?>
    <br><br>
    <h2>Ваши товары:</h2>
    <table width="100%" class="table">
        <tr>
            <th>Наименование</th><th>количество</th><th>цена</th><th>состояние</th><th>дата изменения</th>
        </tr>
        <? foreach ($data['positions'] as $key => $position) {?>
            <tr>
                <td><?=$position['pst_pr_name']?></td>
                <td><?=$position['pst_count']?></td>
                <td><?=$position['pst_price']?></td>
                <td><?=$position['pst_stt_id']?></td>
                <td><?=$position['pst_timestamp']?></td>
            </tr>
        <?}?>
    </table>
    <?
}
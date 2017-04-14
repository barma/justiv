<div class="list_wrapper">
    <table class="list">
        <tr class="header">
            <th>№</th>
            <th>Покупатель</th>
            <th>Сумма заказа</th>
            <th>Кол-во позиций</th>
            <th>Доставка</th>
            <th>Действия</th>
        </tr>
        <?foreach($data as $row) {?>
    <tr>
        <td><?=$row['ord_id']?></td>
        <td><?=$row['cst_name']?></td>
        <td><?=$row['ord_summ']?></td>
        <td><?=$row['ord_pst_count']?></td>
        <td></td>
        <td>удалить</td>
    </tr>
<?}?>
<tr class="footer">
    <th>№</th>
    <th>Покупатель</th>
    <th>Сумма заказа</th>
    <th>Кол-во позиций</th>
    <th>Доставка</th>
    <th>Действия</th>
</tr>

</table>
</div>
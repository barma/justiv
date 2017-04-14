<div class="list_wrapper">
    <table class="list">
        <tr class="header">
            <th>№</th>
            <th>Покупатель</th>
            <th>Цена</th>
            <th>Кол-во</th>
            <th>Доставка</th>
            <th>Действия</th>
        </tr>
        <?foreach($data as $row) {?>
    <tr>
        <td><?=$row['pst_id']?></td>
        <td><?=$row['cst_name']?></td>
        <td><?=$row['pst_price']?></td>
        <td><?=$row['pst_count']?></td>
        <td><?=$row['pst_delivery']?></td>
        <td>удалить</td>
    </tr>
<?}?>
<tr class="footer">
    <th>№</th>
    <th>Покупатель</th>
    <th>Цена</th>
    <th>Кол-во</th>
    <th>Доставка</th>
    <th>Действия</th>
</tr>

</table>
</div>
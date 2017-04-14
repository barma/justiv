<div class="list_wrapper">
    <table class="list">
        <tr class="header">
            <th>№</th>
            <th>Название</th>
            <th>Цена</th>
            <th>Доставка</th>
            <th>Действия</th>
        </tr>
        <?foreach($data as $row) {?>
            <tr>
                <td><?=$row['pr_id']?></td>
                <td><a href="edit_product.php?id=<?=$row['pr_id']?>"><?=$row['pr_name']?></a></td>
                <td><?=$row['pr_price']?></td>
                <td><?=$row['pr_delivery']?></td>
                <td>удалить</td>
            </tr>
        <?}?>
        <tr class="footer">
            <th>№</th>
            <th>Название</th>
            <th>Цена</th>
            <th>Доставка</th>
            <th>Действия</th>
        </tr>

    </table>
</div>
<form method="post" action="">
<table>
    <tr><td>Название</td></tr>
    <tr><td><input type="text" name="pr_name" value="<?=$data['pr_name']?>"></td></tr>
    <tr><td>Категория</td></tr>
    <tr><td><?=Helper::select('pr_ctg_id', $data['categories'], $data['pr_ctg_id'])?></td></tr>
    <tr><td>Краткое описание</td></tr>
    <tr><td><textarea name="pr_short_description" class="wysiwyg"><?=$data['pr_short_description']?></textarea></td></tr>
    <tr><td>Описание</td></tr>
    <tr><td><textarea name="pr_description" class="wysiwyg"><?=$data['pr_description']?></textarea></td></tr>
    <tr><td>Цена</td></tr>
    <tr><td><input type="text" name="pr_price" value="<?=$data['pr_price']?>"></td></tr>
    <tr><td>Цена доставки</td></tr>
    <tr><td><input type="text" name="pr_delivery_price" value="<?=$data['pr_delivery_price']?>"></td></tr>
    <tr><td>Валюта поставщика</td></tr>
    <tr><td><?=Helper::select('pr_cur_id', $data['currencies'], $data['pr_cur_id'])?></td></tr>
    <tr><td><input type="submit" name="save" value="Сохранить"></td></tr>
    <tr><td>Поставить флаг новинки на месяц <input type="checkbox" name="isnewmonth" value="1"></td></tr>
</table>
</form>
<table>
    <tr><td>Избражения</td><td><a href="add_image.php?pr_id=<?=$data['pr_id']?>" role="button" class="btn" data-toggle="modal">Добавить запись</a></td></tr>
    <?
    if(!empty($data['images'])) {
        $i = 0;
        foreach($data['images'] as $img) {
            if($i === 0) {
                echo "<tr>";
            }
            if($i === 3) {
                echo "</tr>";
                $i = 0;
            }
            $i++;
            ?>
            <td>
                <form method="post" action="edit_image.php" class="ajaxForm">
                    <table>
                        <tr><td height="250"><img src="<?=$img['pi_path']?>" width="200"></td>
                        </tr>
                        <tr><td><input type="text" name="pi_title" value="<?=$img['pi_title']?>"></td></tr>
                        <tr><td><input type="text" name="pi_title" value="<?=$img['pi_description']?>"></td></tr>
                        <tr><td><input type="submit" value="Сохранить"></td></tr>
                        <tr><td><a href="delete_image.php?id=<?=$img['pi_id']?>">удалить</a></td></tr>
                    </table>
                </form>
            </td>
            <?
        }
        echo "</tr>";
    }
    ?>
</table>
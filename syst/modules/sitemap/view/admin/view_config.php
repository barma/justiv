<?
$changefrag = array('hourly','daily','weekly','monthly','yearly','never');
?>
<div style="display: none;" id="success_added">Запись успушно добавлена</div>
<?if(!empty($data)) {?>
    <table width="100%" border="1" cellpadding="0" cellspacing="0"><tr>
            <th>№</th>
            <th>section</th>
            <th>url</th>
            <th>changefreg</th>
            <th>priority</th>
            <th colspan="2">&nbsp;</th>
        </tr>
        <?foreach ($data as $row) {?>
            <tr>
                <form action="ajax_save.php" method="post">
                    <td><?=$row['id']?><input type="hidden" name="id" value="<?=$row['id']?>"></td>
                    <td><input type="text" name="section" value="<?=$row['section']?>"></td>
                    <td><input type="text" name="url" value="<?=$row['url']?>"></td>
                    <td>
                        <select name="changefreg">
                            <? foreach($changefrag as $el) {
                                if($el == $row['changefreg']) {?>
                                    <option value="<?=$el?>" selected><?=$el?></option>
                                <?} else {?>
                                    <option value="<?=$el?>"><?=$el?></option>
                                <?}?>
                            <?}?>
                        </select>
                    </td>
                    <td><input type="text" name="priority" value="<?=$row['priority']?>"></td>
                    <td><input type="submit" value="Сохранить" name="save"></td>
                    <td><input type="submit" value="Удалить" name="delete"></td>
                </form>
            </tr>
        <?}?>
    </table>
<?}?>

<form action="ajax_save.php" method="post" id="newLink">
    <input type="hidden" name="config" value="true">
    <table width="100%">
        <tr>
            <td><input type="text" name="section" value=""></td>
            <td><input type="text" name="url" value=""></td>
            <td>
                <select name="changefreg">
                    <? foreach($changefrag as $el) {
                        if($el == $row['changefrag']) {?>
                            <option value="<?=$el?>" selected><?=$el?></option>
                        <?} else {?>
                            <option value="<?=$el?>"><?=$el?></option>
                        <?}?>
                    <?}?>
                </select>
            </td>
            <td><input type="text" name="priority" value="<?=$row['priority']?>"></td>
            <td><input type="submit" id="newLinkSubmit" value="Сохранить"></td>
        </tr>
    </table>
</form>

<script>
    $(document).ready(function () {

        $('input#newLinkSubmit').submit(function () {
            var qString = $("#newLink").serialize();
            console.dir(qString);
            $.post("ajax_save.php", qString, function () {
                $('#success_added').show();
            });
        });

    });
</script>
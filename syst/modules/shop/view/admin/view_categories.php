<script>
    function  showResponse(responseText, statusText, xhr, $form) {
        console.dir(responseText);
        console.dir(statusText);
        console.dir(xhr);
        console.dir($form);

        return true;
    }
</script>

<div class="list_wrapper">
    <table class="list">
        <tr class="header">
            <th>№</th>
            <th>имя</th>
            <th>url path</th>
            <th>Действия</th>
        </tr>
        <?foreach($data as $row) {?>
            <tr>
                <td><?=$row['ctg_id']?></td>
                <td><?=$row['ctg_name']?></td>
                <td><?=$row['ctg_url_path']?></td>
                <td>удалить</td>
            </tr>
        <?}?>
        <tr class="footer">
            <th>№</th>
            <th>имя</th>
            <th>url path</th>
            <th>Действия</th>
        </tr>

    </table>
</div>
<h2>Добавить категорию</h2>
<div class="list_wrapper">
<form action="" method="post" class="ajaxForm">
    <input type="hidden" name="action" value="addCategory">
    <table class="list">
        <tr class="header">
            <th>имя</th>
            <th>url path</th>
            <th>&nbsp;</th>
        </tr>
        <tr>
            <td>
                <input type="text" name="ctg_name" value="">
            </td>
            <td>
                <input type="text" name="ctg_url_path" value="">
            </td>
            <td>
                <input type="submit" value="сохранить">
            </td>
        </tr>
    </table>
</form>
</div>
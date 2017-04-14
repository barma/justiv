<?   $changefreg = array('hourly','daily','weekly','monthly','yearly','never');  ?>
<h2>Добавить запись</h2>
<form action="ajax_save.php" method="post" id="newLink" class="ajaxForm">
    <table width="100%" border="1" cellpadding="0" cellspacing="0">
        <tr>
            <th>url</th>
            <th>date</th>
            <th>changefreg</th>
            <th>priority</th>
            <th>&nbsp;</th>
        </tr>
        <tr>
            <td><input type="text" name="url" value=""></td>
            <td><input type="text" id="date" name="lastmod" value="" size="10"></td>
            <td>
                <select name="changefreg">
                    <? foreach($changefreg as $el) {
                        if($el == $row['changefreg']) {?>
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
<br>
<div style="display: none;" id="success_added">Запись успушно добавлена</div>
    <?if(!empty($data)) {?>
        <table width="100%" border="1" cellpadding="0" cellspacing="0"><tr>
                <th>№</th>
                <th>url</th>
                <th>lastmod</th>
                <th>changefreg</th>
                <th>priority</th>
                <th colspan="2">&nbsp;</th>
        </tr>
        <?foreach ($data as $row) {?>

                <form action="" method="post" class="ajaxForm"><tr>
                <td><?=$row['id']?><input type="hidden" name="id" value="<?=$row['id']?>"></td>
                <td><input type="text" name="url" value="<?=$row['url']?>"></td>
                <td><input type="text" class="date" name="lastmod"
                           value="<?=$row['lastmod'] ?>" size="18"></td>
                <td>
                    <select name="changefreg">
                        <? foreach($changefreg as $el) {
                            if($el == $row['changefreg']) {?>
                                <option value="<?=$el?>" selected><?=$el?></option>
                            <?} else {?>
                                <option value="<?=$el?>"><?=$el?></option>
                            <?}?>
                        <?}?>
                    </select>
                </td>
                <td><input type="text" name="priority" value="<?=$row['priority']?>"></td>
                <td><input type="submit" name="submitButton" value="Submit1"><input type="submit" name="submitButton" value="Submit2221"></td>
                    </tr></form>

        <?}?>
        </table>
    <?}?>

<script>
$(document).ready(function () {
/*
    $('input#save_tags').click(function () {
        var qString = $("#tags_form").serialize();
        console.dir(qString);
        $.post("change_post_tags.php", qString, function () {
            $('#boxes').show();
        });
    });
*/
    /*
    $('input#newLinkSubmit').click(function (event) {
        event.preventDefault();
        var qString = $("#newLink").serialize();
        $.post("ajax_save.php", qString, function (res) {
            console.log(res);
            $('#success_added').show();
        });
    });

    */

    function confirm(formData, jqForm, options) {
        //console.dir(formData);
//        var queryString = $.param(formData);
//        alert(queryString);
//        console.dir(queryString);
//        console.dir(formData);
//        console.dir(options);
//        return false;
        return true;
    }

    var options = {
        beforeSubmit:  confirm,
        url:        'ajax_save.php',
        success:    function() {
            if(data == 'true') {
                $( "#ajaxResult").html("Действие выполнено успешно").show('slow');
            } else if (data == 'false') {
                $( "#ajaxResult").html("Действие выполнено не было").show('slow');
            } else {
                $( "#ajaxResult").html( data ).show('slow');
            }
            setTimeout(function() { $("#ajaxResult").hide('slow'); }, 10000);
        }
    };
    $('.ajaxForm').ajaxForm(options, function(e) {
        console.dir(e);
    });

});
</script>
<?
$Core->setTitle("Журнал ошибок");
Loader::library("Guard");
$guard = new Guard();
$errorArray = $guard->showSortErrors();
?>
<script type="text/javascript">
    $(function () {
        $('.ajaxLink').click(function (evtObj) {

            evtObj.preventDefault();

            $.ajax({
                url: $(this).attr('href'),
                dataType: "json",
                success: function (data) {
                    successAjax(data);
                }
            });
        });

        //TODO: Недописанная функция просмотра ошибки в окне
        $('.ajaxBlock').click(function (evtObj) {

            evtObj.preventDefault();
            $('#contentBlock').load($(this).attr('href'));
        });

        function successAjax(data) {
            if (data.success == '1') {
                $("#str" + data.hash).hide();
            } else
                alert(data.message);
        }
    });
</script>
<div class="list_wrapper">
    <table class="list">
        <tr class="header">
            <th>col</th>
            <th>hash</th>
            <th>file</th>
            <th>line</th>
            <th>look</th>
            <th>actions</th>
        </tr>
        <?
        if (empty($errorArray)) {
            echo "<tr><td colspan='6'>Ошибок нет!</td></tr>";
        } else {
            foreach ($errorArray as $error) {
                ?>
                <tr id="str<?= $error['hash'] ?>">
                    <td><?= $error['count'] ?></td>
                    <td><a href="showerror.php?id=<?= $error['hash'] ?>"><?= $error['hash'] ?></a></td>
                    <td><?= $error['file'] ?></td>
                    <td><?= $error['line'] ?></td>
                    <td><a href="<?= $error['link'] ?>" target="_blank" class="ajaxBlock">Смотреть</a></td>
                    <td><a href="deleteerror.php?id=<?= $error['hash'] ?>" class="ajaxLink">Delete</a></td>
                </tr>
            <?
            }
        }
        ?>
        <tr class="footer">
            <th>col</th>
            <th>hash</th>
            <th>file</th>
            <th>line</th>
            <th>look</th>
            <th>actions</th>
        </tr>
    </table>
</div>
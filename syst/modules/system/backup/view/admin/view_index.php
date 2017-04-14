<style>
    .wrapper_list {

    }

    table.wrapper {
        width: 100%;
        border: 1px solid black;
    }
</style>
<? if (!empty($data['DB'])) { ?>

    <div class="wrapper_list">
        <table class="wrapper" border=1>
            <tr class="header">
                <th>Дата создания</th>
                <th>Размер</th>
                <th colspan="2">Действия</th>
            </tr>

            <? foreach ($data['DB'] as $backup) { ?>

                <tr>
                    <td><?= $backup['name'] ?></td>
                    <td><?= $backup['size'] ?></td>
                    <td><a href="delete.php?id=<?= $backup['path'] ?>">Удалить</a></td>
                    <td><a href="roll_back.php?id=<?= $backup['path'] ?>&action=db">Откатиться</a></td>
                </tr>

            <? } ?>

            <tr class="footer">
                <th>Дата создания</th>
                <th>Размер</th>
                <th colspan="2">Действия</th>
            </tr>
        </table>
    </div>

<?
}
if (!empty($data['FILES'])) {
    ?>

    <div class="wrapper_list">
        <table class="wrapper">
            <tr class="header">
                <th>Дата создания</th>
                <th colspan="2">Действия</th>
            </tr>

            <? foreach ($data['FILES'] as $backup) { ?>

                <tr>
                    <td><?= $backup['name'] ?></td>
                    <td><?= $backup['size'] ?></td>
                    <td><a href="delete.php?id=<?= $backup['path'] ?>">Удалить</a></td>
                    <td><a href="roll_back.php?id=<?= $backup['path'] ?>&action=files">Откатиться</a></td>
                </tr>

            <? } ?>

            <tr class="footer">
                <th>Дата создания</th>
                <th colspan="2">Действия</th>
            </tr>
        </table>
    </div>

<?
}
if (!empty($data['FULL'])) {
    ?>


    <div class="wrapper_list">
        <table class="wrapper">
            <tr class="header">
                <th>Дата создания</th>
                <th colspan="2">Действия</th>
            </tr>

            <? foreach ($data['FULL'] as $backup) { ?>

                <tr>
                    <td><?= $backup['name'] ?></td>
                    <td><?= $backup['size'] ?></td>
                    <td><a href="delete.php?id=<?= $backup['path'] ?>">Удалить</a></td>
                    <td><a href="roll_back.php?id=<?= $backup['path'] ?>&action=full">Откатиться</a></td>
                </tr>

            <? } ?>

            <tr class="footer">
                <th>Дата создания</th>
                <th colspan="2">Действия</th>
            </tr>
        </table>
    </div>


<?

} else {
    if (empty($data)) {
        echo "<p>Бэкапов еще нет, может стоит его все таки сделать??</p>";
    }
}
?>

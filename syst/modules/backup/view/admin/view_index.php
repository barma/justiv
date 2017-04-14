<?php
if (!empty($data)) {
    ?>
    <div class="wrapper_list">
        <table class="wrapper">
            <tr class="header">
                <th>Дата создания</th>
                <th colspan="2">Действия</th>
            </tr>

            <? foreach ($data as $backup) { ?>

                <tr>
                    <td><?= $backup['date'] ?></td>
                    <td><a href="delete.php?id=<?= $backup['date'] ?>">Удалить</a></td>
                    <td><a href="rollback.php?id=<?= $backup['date'] ?>">Откатиться</a></td>
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
    echo "<p>Бэкапов еще нет, может стоит его все таки сделать??</p>";
}
?>

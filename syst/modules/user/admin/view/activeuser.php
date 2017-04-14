<table>
    <tr>
        <td><a href="adduser.php">Добавить пользователя</a></td>
        <td><a href="activeusers.php">Активные пользователи</a></td>
        <td><a href="bannedusers.php">Забаненные пользователи</a></td>
        <td><a href="deadaccaunts.php">Мертвые аккаунты</a></td>
    </tr>
</table>
<table width="100%" border="1" cellspacing="0" cellpadding="2">
    <tr>
        <td>id_user</td>
        <td>email</td>
        <td>Фамилия</td>
        <td>Имя</td>
        <td align='center'><b>очки</b></td>
        <td align='center'><b>$$$</b></td>
    </tr>
    <? foreach ($BEMYSQL->items as $id => $data) { ?>
        <tr>
            <td><?= $data->user_id; ?></td>
            <td><a href="/user/showprofile.php?id=<?= $data->user_id; ?>"><?= $data->email; ?></a></td>
            <td><?= $data->family; ?>&nbsp;</td>
            <td><?= $data->name; ?>&nbsp;</td>
            <td align='center'><b><?= $data->money; ?>&nbsp;</b></td>
            <td align='center'><b><?= $data->double_money; ?>&nbsp;</b></td>
        </tr>
    <? } ?>
</table>
<table>
    <tr>
        <td>
            <?
            // выводим ссылкы на: предыдущую страницу; на все страницы - цифрами; и на следующую страницу
            echo $paging->getPageLinks();
            ?>
        </td>
    </tr>
</table>

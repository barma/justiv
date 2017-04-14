<script>
    var req;
    var idobject;
    function loadXMLDoc(url) {
        if (window.XMLHttpRequest) {
            req = new XMLHttpRequest();
            req.onreadystatechange = processReqChange;
            req.open("GET", url, true);
            req.send(null);

        }
        else if (window.ActiveXObject) {
            req = new ActiveXObject("Microsoft.XMLHTTP");
            if (req) {
                req.onreadystatechange = processReqChange;
                req.open("GET", url, true);
                req.send();
            }
        }
    }

    function processReqChange() {
        if (req.readyState == 4) {
            if (req.status == 200) {
                document.getElementById(idobject).innerHTML = req.responseText;
            }
            else {
                document.getElementById(idobject).innerHTML = '<center>Не удалось получить данные</center><br>';
            }
        }
    }

    function requestdata(idd, url) {
        document.getElementById(idd).innerHTML = '<center>не удалось получить данные</center>';
        idobject = idd;
        loadXMLDoc(url);
    }
</script>
<script>
    function banned(id) {
        requestdata('user_' + id, '/sys/modules/user/admin/banned.php?id=' + id);
    }

    function unbanned(id) {
        requestdata('user_' + id, '/sys/modules/user/admin/unbanned.php?id=' + id);
    }
</script>
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
        <td>Был на сайте</td>
        <td colspan="3">Действия:</td>
    </tr>
    <? foreach ($BEMYSQL->items as $id => $data) { ?>

        <tr>
            <td><?= $data->user_id; ?></td>
            <td><a href="/user/showprofile.php?id=<?= $data->user_id; ?>"><?= $data->email; ?></a></td>
            <td><?= $data->family; ?>&nbsp;</td>
            <td><?= $data->name; ?>&nbsp;</td>
            <td><?= $data->lastvisit; ?></td>
            <td>Права</td>
            <td align="center" width="100">
                <?
                //проверяем: забанен ли пользователь?
                if ($data->ban === '0') {
                    ?>
                    <div id="user_<?= $data->user_id; ?>"><a href="#_s" onclick="banned(<?= $data->user_id; ?>);">забанить</a>
                    </div>

                <? } else { ?>
                    <div id="user_<?= $data->user_id; ?>"><a href="#_s" onclick="unbanned(<?= $data->user_id; ?>);">снять
                            бан</a></div>

                <? } ?></td>
            <td align="center"><a href="deleteuser.php?id=<?= $data->user_id; ?>">Удалить</a></td>
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
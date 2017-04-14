<?php
$templateOff = true;

// Проверка на админа
sub_ConfirmAdmin::check();

// функция вывода сообщений на странице, которая пользуется этим скриптом
function replaceerror($text, $error)
{
    if ($error == 2) {
        print('<div id="outclasstable">' . $text . '</div>');
    } else {
        print('<div id="outclasstableerror">' . $text . '</div>');
    }
}

$user = sub_Gpc::Vars('id', 'G', 'INT', 10);
//@$user = ($_GET['id']);
if (!empty($user)) {
    $i = 0;
    $sql = mysql_query("SELECT `ban` FROM `user` WHERE `user_id` = '$user'");
    if (@mysql_num_rows($sql) > 0) {
        if (!mysql_query("update `user` set `ban` = '1' where `user_id` = '$user'")) {
            replaceerror('ошибка!', 1);
        } //else replaceerror('бан',2);
        else {
            replaceerror("<div id='user_$user'><a href='#_s' onclick='unbanned($user);'>снять бан</a></div>", 2);
        }
    } else {
        replaceerror('Пользователя с данным номером не существует', 1);
    }
} else {
    replaceerror('Не передан номер пользователя!', 1);
}


?>
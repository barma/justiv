<?
/* СКРИПТ ТУПО СКОПИРОВАН ИЗ MKIROV
 */

if ((!empty($_SESSION['passwd'])) && (!empty($_SESSION['email']))) {
    $passwd = $_SESSION['passwd'];
    $email = $_SESSION['email'];
    $result = mysql_query(
        "select `user_id`, `ban` from `user` where `passwd` = sha1('$passwd') and `email` = '$email'"
    );
    if (!$result) {
        throw new Exception("Ошибка сессии");
    } else {

        $res = mysql_fetch_array($result);
        if ($res['ban'] === '1') {
            $_SESSION['passwd'] = null;
            $_SESSION['email'] = null;
            ?>
            <meta http-equiv="refresh" content="0; url=/err404.php?i=4"><?
        }

        $date = date('Y-m-d');
        $result = mysql_query(
            "update `user` set `lastvisit` = '$date' where `passwd` = sha1('$passwd') and `email` = '$email'"
        );
        if (!$result) {
            throw new Exception("Ошибка сессии");
        }
        //пункты меню:
        ?>
        <p class='user_menu'>
            <a href="/user/showprofile.php">Моя страница</a><br>
            <a href="/user/logout.php">Выход</a>
        </p>
    <?
    }
}
?>

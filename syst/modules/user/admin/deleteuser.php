<?php
// удаление пользователя из всех таблиц из всех таблиц в которых содержится запись о пользователе
// НЕ УДАЛЯЮТСЯ ЗАПИСИ ТОЛЬКО ИЗ ГОЛОСОВАНИЙ!
try {

    if (!empty($_GET['id'])) {
        $user = sub_Gpc::Vars('id', 'G', 'INT', 10);

        Core::IncComponent('deletedirectory');
        deleteDirectory($BesDocRoot . '/sys/modules/user/db/' . $user);

        if (!mysql_query("DELETE FROM `user` WHERE`user_id` = '$user'")) {
            throw new Exception();
        } elseif (!mysql_query(
            "DELETE FROM `user_contact` WHERE`user_id` = '$user'"
        )
        ) {
            throw new Exception();
        } elseif (!mysql_query(
            "DELETE FROM `user_interests` WHERE`user_id` = '$user'"
        )
        ) {
            throw new Exception();
        } elseif (!mysql_query(
            "DELETE FROM `user_music` WHERE`user_id` = '$user'"
        )
        ) {
            throw new Exception();
        } elseif (!mysql_query(
            "DELETE FROM `user_question` WHERE`user_id` = '$user'"
        )
        ) {
            throw new Exception();
        } elseif (!mysql_query(
            "DELETE FROM `doublerating_code` WHERE`user_id` = '$user'"
        )
        ) {
            throw new Exception();
        } elseif (!mysql_query(
            "DELETE FROM `distribution` WHERE`user_id` = '$user'"
        )
        ) {
            throw new Exception();
        } elseif (!mysql_query(
            "DELETE FROM `administrators` WHERE`user_id` = '$user'"
        )
        ) {
            throw new Exception();
        }
        //если продолжается выполнение, значит небыло ошибок!
        echo "<h1 align=center>Удаление прошло успешно.</h1><meta http-equiv='refresh' content='1;
     url=" . BES_HOST . "sys/modules/user/admin/index.php'>";
    } else {
        echo '<h1 class=error>Не передан номер записи для редактирования</h1>';
    }

} catch (Exception $e) {
    BeHandler(__LINE__, "Не удалось удалить пользователя с номером $user из таблиц.");
}
?>

<?php
$errors = "";

if (isset($_POST['add'])) {

    //метод автоматически выбирает значения, фильтреут и создает переменные
    sub_Gpc::Vars('password', 'P', 'ALPHANUM', 20);
    sub_Gpc::Vars('newemail', 'P', 'MAIL', 30);

    if (empty($newemail)) {
        $errors = "<li> Вы не ввели e-mail пользователя.";
    }
    if (empty($newpassword)) {
        $errors .= "<li> Вы не ввели пароль.";
    }

    $shapasswd = sha1($newpassword);

    if (empty($errors)) {

        // основные поля заполнены верно, делаем запись в базу данных
        $result = mysql_query("insert into `user`(`email`, `passwd`) values ('$newemail', '$shapasswd')");
        if (!$result) {
            $errors .= "<li> Ошибка добавления записи в базу данных. Попробуйте поздней.";
        } else {
            $message = "Пользователь успешно добавлен<br><br> email = $newemail; password = $newpassword";
        }
    }
} else {

// если передан параметр, то будет происходить редактирование файла
    $message = "Добавление нового пользователя";
    $newemail = "";
    $newpassword = "";
}
include "view/add.php";
?>
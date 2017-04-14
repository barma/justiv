<?php
/**
 * Created by PhpStorm.
 * User: barma
 * Date: 13.06.14
 * Time: 0:13
 */
?>
<h1>Регистрация</h1>
<div class="row">
    <div class="col-md-6">
<form action="<?=$data['action']?>" method="post" role="form">
    <input type="hidden" name="new_user" value="1">

    <div class="form-group">
        <label for="cst_name">Как к Вам обращаться:</label>
        <input type="text" name="cst_name" class="form-control" id="cst_name" placeholder="">
    </div>

    <div class="form-group">
        <label for="cst_email">Email</label>
        <input type="text" name="cst_email" class="form-control" placeholder="Email">
    </div>

    <div class="form-group">
        <label for="cst_phone">Телефон</label>
        <input type="text" name="cst_phone" class="form-control" placeholder="Телефон">
    </div>

    <div class="form-group">
        <label for="cst_login">Логин</label>
        <input type="text" name="cst_login" class="form-control" placeholder="Логин">
    </div>

    <div class="form-group">
        <label for="cst_login">Пароль</label>
        <input type="text" name="cst_passwd" id="passwd" class="form-control" placeholder="Пароль">
    </div>

    <div class="form-group">
        <label for="cst_repeat_passwd">Повторите пароль</label>
        <input type="text" name="cst_repeat_passwd" id="repeat_passwd" class="form-control" placeholder="Повторите пароль">
    </div>

    <div class="form-group">
        <label for="cst_vk">Cсылка на Ваш профиль Вконтакте:</label>
        <input type="text" name="cst_vk" class="form-control" placeholder="VK">
    </div>

    <div class="form-group">
        <input type="submit" value="Зарегистрироваться" class="btn btn-success register">
    </div>

<!--        <tr><td>Как к Вам обращаться:</td><td><input type="text" name="cst_name" value=""></td></tr>-->
<!--        <tr><td>email:</td><td><input type="text" name="cst_email" value=""></td></tr>-->
<!--        <tr><td>телефон:</td><td><input type="text" name="cst_phone" value=""></td></tr>-->
<!--        <tr><td>логин:</td><td><input type="text" name="cst_login" value=""></td></tr>-->
<!--        <tr><td>пароль:</td><td><input type="text" name="cst_passwd" value=""></td></tr>-->
<!--        <tr><td>ссылка на Ваш профиль Вконтакте:</td><td><input type="text" name="cst_vk" value=""></td></tr>-->
<!--        <tr><td><input type="submit" value="Зарегистрироваться" class="register"></td></tr>-->

</form>

    </div>
</div>
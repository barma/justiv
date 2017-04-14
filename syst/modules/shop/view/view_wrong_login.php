<?php
/**
 * Created by PhpStorm.
 * User: barma
 * Date: 12.04.17
 * Time: 12:17
 */
?>
<style>
    .restorePass {
        display: none;
    }
</style>
<script>
    $(document).ready(function () {
        $('.restoreLink').click(function(){
                $('.restorePass').show();
            });
    });
</script>
Ошибка при вводе данных! Неверный логин или пароль. <a href="#" class="restoreLink">Восстановить пароль?</a>
<div class="restorePass">
    <form action="/restoreCustomerPassword/">
        <label>Введите Ваш email</label><input type="text" name="email"><input type="submit" value="Отправить">
    </form>
</div>
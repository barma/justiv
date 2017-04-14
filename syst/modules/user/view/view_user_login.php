<?php
/**
 * Created by PhpStorm.
 * User: barma
 * Date: 11.04.17
 * Time: 17:14
 */

if($data === 'not login') {
?>
    <div class="dropdown">
        <a href="#" title="" type="button" id="ddLogin" data-toggle="dropdown">
            <span>Вход</span>
        </a>
        <ul class="dropdown-menu" role="menu" aria-labelledby="ddLogin">
            <form action="/login" class="ajax-link">
                <input type="text" name="user" class="" placeholder="Логин" />
                <input type="password" name="pass" class="" placeholder="Пароль" />
                <input type="submit" value="Войти">
            </form>
        </ul>
    </div>
<?
} else {
?>
    <span><a href="/user/<?=$data['user_id']?>/"><?=$data['user_name']?></a></span>
<?
}
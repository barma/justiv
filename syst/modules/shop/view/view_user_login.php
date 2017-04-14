<?php
/**
 * Created by PhpStorm.
 * User: barma
 * Date: 11.04.17
 * Time: 17:34
 */
if(empty($data)) {
    ?>
    <style>
        .form-box input{
            width: 100%;
            padding: 10px;
            text-align: center;
            height:40px;
            border: 1px solid #ccc;;
            background: #fafafa;
            transition:0.2s ease-in-out;

        }

        .form-box input:focus{
            outline: 0;
            background: #eee;
        }

        .form-box input[type="text"]{
            border-radius: 5px 5px 0 0;
            text-transform: lowercase;
        }

        .form-box input[type="password"]{
            border-radius: 0 0 5px 5px;
            border-top: 0;
        }

        .form-box button.login{
            margin-top:15px;
            padding: 10px 20px;
        }
        .login-dropdown {
            width: 200px;
            padding: 10px;
            margin-top: -20px;
        }
    </style>

    <a style="" href="#" title="" id="ddLogin" data-toggle="dropdown">
        <span>Вход</span>
    </a>
    <div class="dropdown-menu login-dropdown" role="menu" aria-labelledby="ddLogin">
        <div class="form-box">
        <form action="/login/" id="loginForm" method="post" role="form">
            <div class="form-group">
                <input type="text" name="user" class="form-control" placeholder="Логин" />
                <input type="password" name="pass" class="form-control" placeholder="Пароль" />
            </div>
                <input type="submit" value="Войти" class="btn btn-default login">
        </form>
        </div>
    </div>
<?
} else {
    ?>
    <span><a href="/user/"><?=$data['cst_name']?></a></span>
<?
}
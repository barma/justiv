<style>
body {
    margin: 10px;
    padding: 0;
    font-size: 11px;
    font-family: 'Lucida Grande', Verdana, Arial, Sans-Serif;
    background-color: #f1f1f1;
    color: #555;
    background-repeat: repeat;
    text-align: center;
}

a {
    color: #00CC33;
    text-decoration: none;
    outline: none;
}

a:hover {
    color: #006600;
}

a.backlink {
    padding: 10px;

}

.button, .button:visited {
    background: #00CC33 url(../images/overlay.png) repeat-x;
    display: inline-block;
    padding: 5px 10px 6px;
    color: #fff;
    text-decoration: none;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
    -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
    text-shadow: 0 -1px 1px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    font-size: 11px;
    margin: 10px 3px 4px 3px;
}

.button:hover {
    background-color: #222;
    color: #fff;
}

img.ajaxload {
    margin-top: 10px;
}

.error {
    height: 15px;
}

div.errorimg {
    padding-left: 20px;
    float: left;
    background: transparent url(../images/error.png) no-repeat center left;
    height: 15px;
    width: 140px;
    color: red;
}

    /*Admin*/
.adminpanel {
    width: 800px;
    text-align: center;
}

.map {
    margin: 0 auto;
    width: 560px;

}

table.admin {
    font-size: 10px;
    width: 100%;
    border: 1px solid #ccc;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
}

table.admin thead tr th {
    text-align: left;
}

table.admin thead tr {
    background-color: #f1f1f1;
}

table.admin tbody tr.statusblocked {
    background-color: #dfdfdf;
}

table.admin tbody tr.statusadmin {
    background-color: #7fc0f0;
}

table.admin tbody tr td {
    text-align: center;
}

table.admin tbody  tr:hover {
    background-color: #EFFFF3;
}

.admin_change {
    float: left;
    height: 16px;
    width: 16px;
    background: transparent url(../images/wrench.png) no-repeat center right;
    cursor: pointer;
}

.admin_delete {
    float: left;
    height: 16px;
    width: 16px;
    background: transparent url(../images/cross.png) no-repeat center right;
    cursor: pointer;
}

.admin_no {
    float: left;
    margin-left: 20px;
}

    /*Forms*/
form.login, form.register, form.editaccount, .forgotpw, .adminpanel {
    position: relative;
    height: auto;
    margin: 0 auto;
    border: 1px solid #ccc;
    background-color: #fff;
    -moz-border-radius: 20px;
    -webkit-border-radius: 20px;
    padding: 20px;
    text-align: left;
}

form.login {
    width: 150px;
}

form.register {
    width: 600px;
    height: 440px;
}

form.editaccount {
    width: 400px;
}

.forgotpw {
    width: 200px;
}

form label {
    display: block;
    margin: 3px;
    font-weight: bold;
}

.login_row {
    float: left;
    clear: both;
    width: 100%;
}

.login_row input[type=checkbox] {
    float: left;
}

.login_row label {
    float: left;
}

input[type=text], input[type=password] {
    border: 1px solid #ccc;
    padding: 2px;
}

input:focus {
    background-color: #EFFFF3;
}

form .fieldset1, form .fieldset2 {
    border: 1px solid #ccc;
    padding: 6px;
    margin: 10px;
    float: left;
    border-left: none;
    border-right: none;
    border-bottom: none;
}

form .fieldset1 {
    width: 260px;
}

form .fieldset2 {
    width: 90%;
    margin: 0px;
}

form legend {
    text-align: right;
    color: #888;
    font-size: 14px;
    padding: 0px 4px 0px 4px;
    margin-left: 5px;
}

.error {
    color: red;
    float: left;
    padding: 2px;
    font-size: 11px;
    height: 18px;
    clear: right;
    width: 100%;
    font-weight: 100;
}

.error_captcha {
    color: red;
    float: left;
    padding: 2px;
    font-size: 11px;
    height: 20px;
    width: 75px;
    font-weight: 100;
}

.captcha_message {
    width: 70px;
    float: left;
}

.linkback {
    margin: 0 auto;
    width: 100px;
    text-align: center;
    height: 30px;
}
</style>
<html>
<head>


    <title>PHP Login System</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

</head>
<body>

<?php
$errMsg = '';
switch ($_GET['err']) {
    case 'notadmin':
        $errMsg = 'У вас недостаточно прав!';
        break;
    case 'login':
        $errMsg = 'Вы не авторизованы!';
        break;
    case 'wronglogin':
        $errMsg = 'Не верный логин или пароль!';
        break;
}
?>

<div style="color: red;"><?= $errMsg; ?></div>

<h1>Вход</h1>

<form enctype='multipart/form-data' method="post" class="login">
    <label>email</label>
    <input class="inplaceError" style="width: 140px;" id="email" name="email" maxlength="120" type="text">
    <span></span>
    <label>password</label>
    <input class="inplaceError" style="width: 140px;" id="pass" name="pass" maxlength="20" value="" type="password">
    <span></span>
    <input name="loginaction" value="1" type="hidden">
    <input type="submit" value="Войти">

    <div id="loginerror" class="error">
    </div>
</form>
</body>
</html>
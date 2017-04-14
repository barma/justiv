<?php
$I = new AcceptanceTester($scenario);
$I->amOnPage('/registration/');
$I->see('Регистрация');
$I->fillField('cst_name','test4login');
$I->fillField('cst_email','barma.net@mail.ru');
$I->fillField('cst_phone','123123123');
$I->fillField('cst_login','test4');
$I->fillField('cst_passwd','123');
$I->fillField('cst_repeat_passwd','123');
$I->fillField('cst_vk','http://vk.com/123');
$I->click('Зарегистрироваться');
//$I->amOnPage('/registration/');
$I->seeInCurrentUrl('/registration/');
$I->see('Добро пожаловать, test4login!');
$I->seeInDatabase('jus_shop_customers',['cst_name'=>'test4login', 'cst_email'=>'barma.net@mail.ru', 'cst_phone'=>'123123123',
'cst_vk'=>'http://vk.com/123']);


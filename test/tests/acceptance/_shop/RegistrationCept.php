<?
$I = new AcceptanceTester($scenario);
$I->wantTo('I want to register');
$I->amOnPage('/registration/');
$I->fillField('cst_name', 'Davert');
$I->fillField('cst_email', 'barma.net@list.ru');
$I->fillField('cst_phone', '89536868111');
$I->fillField('cst_login', 'test');
$I->fillField('cst_passwd', '123');
$I->fillField('cst_vk', 'http://vk.com/123123');
$I->click('.register');
$I->see('Добро пожаловать, Davert!');
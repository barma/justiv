<?php 
$I = new AcceptanceTester($scenario);
$I->amOnPage('/');
$I->wantTo('perform actions and see result');
$I->click('#tocart');
$I->seeInCurrentUrl('cart');
$I->see('Корзина');
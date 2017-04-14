<?php 
//$I = new AcceptanceTester($scenario);
//$I->wantTo('perform actions and see result');
$I = new AcceptanceTester($scenario);
$I->wantTo('ensure that frontpage works');
$I->amOnPage('/');
$I->seeInSource('<div class="productName">пальто</div>');
$I->wantTo('see product page');
//$I->executeJS("$('.productImage a img').click();");
$I->click('.product a img');
$I->amOnPage('/product/1/');
$I->seeInSource('<h1>Пальто</h1>');

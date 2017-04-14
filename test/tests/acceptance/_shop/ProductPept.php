<?
$I = new AcceptanceTester($scenario);
$I->amOnPage('/product/5/');
$I->see('<span class="price">159.00 руб.</span>');
$I->see('<a href="/shop/addtocart/5" class="ajaxLink">В корзину</a>');
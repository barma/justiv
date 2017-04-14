<?php 
$I = new AcceptanceTester($scenario);
$I->amOnPage('/');
$I->canSeeInSource("<span>Вход</span>");
$I->wantTo('perform actions and see result');
$I->login('test','123','test2');
$I->see('test2', '.top-menu');
$I->click('Куртки, жилетки');
$I->seeInCurrentUrl('/vests');
$I->click('пальто');
$I->amOnPage('/product/1/');
$I->see('полное описание пальто');
$I->click('В корзину');
$I->seeInCurrentUrl('/addtocart/1');
$I->canSeeInSource('<a href="/cart/" id="tocart"><i class="fa fa-shopping-basket fa-2x" aria-hidden="true"></i></a>');
$I->click('#tocart');
$I->seeInCurrentUrl('/cart');
$I->see('test2', '.top-menu');
$I->see('пальто');
$I->canSeeInSource("<td>&nbsp; Общая сумма заказа:&nbsp; </td>
                <td>&nbsp; 189.00 руб.</td>");
$I->click('оформить заказ');
$I->seeInCurrentUrl('/checkout/');
$I->see('Внимание! Над Вашим заказом начнется обработка только после полной оплаты!');
$I->canSeeInDatabase('jus_shop_orders', ['ord_id'=>'7', 'ord_cst_id'=>'1']);
$I->canSeeInDatabase('jus_shop_positions', ['pst_pr_id'=>'8', 'pst_ord_id'=>'7', 'pst_pr_id'=>'1']);

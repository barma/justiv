<?php 
$I = new AcceptanceTester($scenario);
$I->amOnPage('/catalog/dress/');
$I->see('<h3>sadasd</h3>');
$I->see('<div class="productPrice">159.00 руб.</div>');

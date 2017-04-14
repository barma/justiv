<?php


class RoutingCest
{
    public function _before(AcceptanceTester $I)
    {
    }

    public function _after(AcceptanceTester $I)
    {
    }

    // tests
    public function tryToTest(AcceptanceTester $I)
    {
        $I->amGoingTo('/vests/');
        $I->canSeeInSource('<h1>Куртки, жилетки</h1>');
        $I->click('Пальто');
        $I->amOnPage('/product/1/');
        $I->canSeeInSource('<h1>пальто</h1>');
        $I->amGoingTo('/asd/');
        $I->see('404');
    }
}

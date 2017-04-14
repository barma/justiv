<?php


/**
 * Inherited Methods
 * @method void wantToTest($text)
 * @method void wantTo($text)
 * @method void execute($callable)
 * @method void expectTo($prediction)
 * @method void expect($prediction)
 * @method void amGoingTo($argumentation)
 * @method void am($role)
 * @method void lookForwardTo($achieveValue)
 * @method void comment($description)
 * @method \Codeception\Lib\Friend haveFriend($name, $actorClass = NULL)
 *
 * @SuppressWarnings(PHPMD)
*/
class AcceptanceTester extends \Codeception\Actor
{
    use _generated\AcceptanceTesterActions;


   /**
    * Define custom actions here
    */
    public function login($user='test', $pass='123', $username = "") {
        $I = $this;
        $I->amOnPage('/login');
        $I->submitForm('#loginForm', [
            'login' => $user,
            'password' => $pass
        ]);
        if($username === "") {
            $username = $user;
        }
//        $I->see($username, '.top-menu');
    }


    public function addToCartProduct($login, $pass) {
        $I = $this;
//        $I->amOnPage('/login');
        $I->submitForm('#loginForm', [
            'login' => $login,
            'password' => $pass
        ]);
        $I->see($login, '.top-menu');
    }

}

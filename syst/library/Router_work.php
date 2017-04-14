<?php
/**
 * Created by JetBrains PhpStorm.
 * User: barma
 * Date: 01.09.13
 * Time: 22:25
 * To change this template use File | Settings | File Templates.
 */
$dir = LP . '/Router/';
require_once $dir . 'icException.class.php';
require_once $dir . 'icRouter.class.php';
require_once $dir . 'icRouteParameter.class.php';
require_once $dir . 'icRoute.class.php';
require $dir . '/icSimpleRequest.class.php'; //we need it for this example

class Router
{

    public $Request = '';
    public $Router = '';
    public $RWord = '';
    public $RBool = '';
    public $RInt = '';
    public $RSlug = '';
    public $RNotIn = '';

    public function __construct()
    {

        $this->Request = new icSimpleRequest();

        $this->Router = new icRouter();
        $this->RWord = new icRouteParameter(icRouteParameter::REG_MATCH, '\w+');
        $this->RBool = new icRouteParameter(icRouteParameter::REG_MATCH, '[01]');
        $this->RInt = new icRouteParameter(icRouteParameter::INT);
        $this->RSlug = new icRouteParameter(icRouteParameter::REG_REPLACE, 'A-Za-z\-_0-9');
        $this->RNotIn = new icRouteParameter(icRouteParameter::NOT_IN, array('photo', 'test'));

        $this->Router->addRoutes(
            array(

                new icRoute('photo',
                    //url pattern
                    '/photo/:action/:id-:name/:delete',
                    //default parameter values
                    array('module' => 'photo', 'action' => 'index', 'id' => 0, 'delete' => 0, 'name' => 'noname'),
                    //description of every parameter
                    array('action' => $oRPWord, 'id' => $oRPInt, 'name' => $pRPSlug, 'delete' => $oRPBool))

            ,
                new icRoute('blog_post',
                    //url pattern
                    '/blog/:id/',
                    //default parameter values
                    array('module' => 'blog', 'action' => 'index', 'id' => 1, 'url' => 'noname'),
                    //description of every parameter
                    array('id' => $this->RInt, 'name' => $this->RSlug))


            ,
                new icRoute('blog2',
                    //url pattern
                    '/blog/:id/:word',
                    //default parameter values
                    array('module' => 'blog', 'action' => 'index', 'id' => 1, 'url' => 'noname'),
                    //description of every parameter
                    array('id' => $this->RInt, 'name' => $this->RSlug))

            ,
                new icRoute('blog_tag',
                    //url pattern
                    '/blog/tag/:id/',
                    //default parameter values
                    array('module' => 'blog', 'action' => 'show_tag', 'id' => 1, 'url' => 'noname'),
                    //description of every parameter
                    array('id' => $this->RInt, 'name' => $this->RSlug))

            )
        );
    }

    public function matchRoute()
    {
        if ($this->Router->match($this->Request->getPath())) {
            return $this->Router->getParameters();
        }
    }

}

?>
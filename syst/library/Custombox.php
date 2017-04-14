<?php
/**
 * Created by PhpStorm.
 * User: barma
 * Date: 04.03.14
 * Time: 23:30
 */

class Custombox
{

    public function __construct()
    {
        $content = " <script src='" . HN . FC . "library/custombox/jquery.custombox.js' type='text/javascript'></script>";
        $content .= "<link rel='stylesheet' href='" . HN . FC . "library/custombox/jquery.custombox.css' type='text/css'>";
        echo $content;
    }

}
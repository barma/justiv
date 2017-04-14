<?php
/**
 * Created by PhpStorm.
 * User: barma
 * Date: 05.05.14
 * Time: 23:53
 */

class HelpText {

    public $db = '';

    public function __construct() {
        global $link;

        Loader::library("CodeHighlight");

        $styles = "

        <script>
        $(document).ready(function(){
            /* Start DocumentReady */
            $('a.show').click(function(){
                $(this).next().slideToggle('normal');
                return false;
            });
            /* End DocumentReady */
        });
        </script>

        <style>
        div#help_text div {
            display: none;
        }
        a.show {
            clear: both;
            display: block;
            cursor: pointer;
        }
        .list_imgs {
            display: none;
        }
        </style>
        <div id='help_text'>";
        echo $styles;

        $bes_help = file_get_contents(HN.'/'.FC.'help.txt');
        echo $bes_help.'<hr>';

        $params = explode('/',$link);
        $c = count($params);
        $module = '';
        for ($i=0; $i<=$c; $i++) {
            if($params[$i] === 'modules') {
                $module = $params[$i+1];
                break;
            }
        }

        if(!empty($module)) {
            $module_help = file_get_contents(HN.'/'.FC.'modules/'.$module.'/help.txt');
            echo $module_help;
        }
        echo "</div>";
    }

}
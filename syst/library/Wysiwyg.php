<?php
class Wysiwyg
{

    public function __construct2()
    {
        $content = "<!-- begin elrte -->
        <link rel='stylesheet' href='/" . FC . "modules/filemanager/elfinder/js/ui-themes/base/ui.all.css' type='text/css'
	    media='screen' title='no title' charset='utf-8'>
	<link rel='stylesheet' href='/" . FC . "modules/filemanager/elfinder/css/elfinder.css' type='text/css' media='screen'
	    title='no title' charset='utf-8'>
	<script src='/" . FC . "modules/filemanager/elfinder/js/jquery-ui-1.7.2.custom.min.js' type='text/javascript' charset='utf-8'></script>
	<script src='/" . FC . "modules/filemanager/elfinder/js/elfinder.min.js' type='text/javascript' charset='utf-8'></script>
	<link rel='stylesheet' href='/" . FC . "library/WYSIWYG/run.css'
            type='text/css' media='screen' charset='utf-8'>
	<script src='/" . FC . "library/WYSIWYG/run.js' type='text/javascript' charset='utf-8'></script>
        <link rel='stylesheet' href='/" . FC . "library/WYSIWYG/elrte/css/elrte.min.css'
            type='text/css' media='screen' charset='utf-8'>
        <script src='/" . FC . "library/WYSIWYG/elrte/js/elrte.min.js' type='text/javascript' charset='utf-8'></script>
        <script src='/" . FC . "library/WYSIWYG/elrte/js/i18n/elrte.ru.js' type='text/javascript' charset='utf-8'></script>
        <!-- begin elrte -->";
        echo $content;
    }

    public function __construct3()
    {
        $content = "<!-- begin elrte -->
        <link rel='stylesheet' href='/" . FC . "modules/filemanager/elfinder/js/ui-themes/base/ui.all.css' type='text/css'
        media='screen' title='no title' charset='utf-8'>
    <link rel='stylesheet' href='/" . FC . "modules/filemanager/elfinder/css/elfinder.css' type='text/css' media='screen'
        title='no title' charset='utf-8'>
    <script src='/" . FC . "modules/filemanager/elfinder/js/jquery-ui-1.7.2.custom.min.js' type='text/javascript' charset='utf-8'></script>
    <script src='/" . FC . "modules/filemanager/elfinder/js/elfinder.min.js' type='text/javascript' charset='utf-8'></script>
    <link rel='stylesheet' href='/" . FC . "library/WYSIWYG/run.css'
            type='text/css' media='screen' charset='utf-8'>
    <script src='/" . FC . "library/WYSIWYG/run.js' type='text/javascript' charset='utf-8'></script>
        <link rel='stylesheet' href='/" . FC . "library/WYSIWYG/elrte/css/elrte.min.css'
            type='text/css' media='screen' charset='utf-8'>
        <script src='/" . FC . "library/WYSIWYG/elrte/js/elrte.min.js' type='text/javascript' charset='utf-8'></script>
        <script src='/" . FC . "library/WYSIWYG/elrte/js/i18n/elrte.ru.js' type='text/javascript' charset='utf-8'></script>
        <!-- begin elrte -->";
        echo $content;
    }

    public function __construct()
    {

        global $Config;
//print_r($Config);
        if (!empty($Config->wysiwyg)) {
            $path = SP . 'library/WYSIWYG/' . $Config->wysiwyg . '.php';
            if (isset($path)) {
                include $path;
            }
        }

    }

}

?>
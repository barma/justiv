<?php
/**
 * Created by PhpStorm.
 * User: barma
 * Date: 07.02.14
 * Time: 0:47
 */
/*
require_once "PHP_Debug-1.0.3/PHP/Debug.php";
$options2 = array(
    'render_type'          => 'HTML',    // Renderer type
    'render_mode'          => 'Div',     // Renderer mode
    'restrict_access'      => false,     // Restrict access of debug
    'allow_url_access'     => true,      // Allow url access
    'url_key'              => 'key',     // Url key
    'url_pass'             => 'nounou',  // Url pass
    'enable_watch'         => false,     // Enable wath of vars
    'replace_errorhandler' => true,      // Replace the php error handler
    'lang'                 => 'FR',      // Lang
    //'imagesPath' => LP.'PHP_Debug-1.0.3/images',
    // Renderer specific
    'HTML_DIV_view_source_script_name' => 'PHP_Debug_ShowSource.php',
    'HTML_DIV_remove_templates_pattern' => true,
    'HTML_DIV_templates_pattern' =>
        array(
            '/home/phpdebug/www/' => '/projectroot/'
        ),
    'HTML_DIV_images_path' => LP.'PHP_Debug-1.0.3/images',
    'HTML_DIV_css_path' => LP.'PHP_Debug-1.0.3/css',
    'HTML_DIV_js_path' => LP.'PHP_Debug-1.0.3/js',
);

// Options array for Debug object
$options3 = array(
    'HTML_DIV_images_path' => '/syst/library/PHP_Debug-1.0.3/images',
    'HTML_DIV_css_path' => '/syst/library/PHP_Debug-1.0.3/css',
    'HTML_DIV_js_path' => '/syst/library/PHP_Debug-1.0.3/js',
);
//ed($options3);
//die('asd');
$options = array(
    'HTML_DIV_images_path' => 'PHP_Debug-1.0.3/images',
    'HTML_DIV_css_path' => 'PHP_Debug-1.0.3/css',
    'HTML_DIV_js_path' => 'PHP_Debug-1.0.3/js',
);

?>
    <script type="text/javascript" src="<?php echo $options3['HTML_DIV_js_path']; ?>/html_div.js"></script>
    <link rel="stylesheet" type="text/css" media="screen" href="<?php echo $options3['HTML_DIV_css_path']; ?>/html_div.css" />
<?
return new PHP_Debug($options3);
*/

$options = array(
    'HTML_DIV_images_path' => '/syst/library/PHP_Debug-1.0.3/images',
    'HTML_DIV_css_path' => '/syst/library/PHP_Debug-1.0.3/css',
    'HTML_DIV_js_path' => '/syst/library/PHP_Debug-1.0.3/js',
);

?>

<script type="text/javascript" src="<?php echo $options['HTML_DIV_js_path']; ?>/html_div.js"></script>
<link rel="stylesheet" type="text/css" media="screen" href="<?php echo $options['HTML_DIV_css_path']; ?>/html_div.css" />
<?
include_once('PHP_Debug-1.0.3/PHP/Debug.php');
$Dbg = new PHP_Debug($options);


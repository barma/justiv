<!DOCTYPE html>
<html>
<head>

    <title>404 ERROR! PAGE NOT FOUND!</title>
    <meta content='text/html; charset=UTF-8' http-equiv='Content-Type'/>
    <link rel="shortcut icon" href="<?=HN?>favicon.ico" type="image/x-icon">
    <link rel='stylesheet' type='text/css' href='<?=TP?>blog.css'/>
    <link rel='stylesheet' type='text/css' href='<?=TP?>style.css' title='wsite-theme-css'/>

    <link href='http://fonts.googleapis.com/css?family=Quattrocento:400,700'
          rel='stylesheet' type='text/css'/>
    <script type='text/javascript' src='/js/jquery-1.5.min.js'></script>

    <link title="404 ERROR! PAGE NOT FOUND / Web разработка" type="application/rss+xml" rel="alternate"
          href="<?=HN?>feed/">
</head>
<body class='tall-header-page wsite-theme-light wsite-page-index'>
<div id="header-wrap">
    <div class="container">
        <table id="header">
            <tr>
                <td id="logo"><span class='wsite-logo'><a href='/'><span id="wsite-title">Zhuykov.ru</span></a></span></td>
                <td class="header-right">
                    <table>
                        <tr>
                            <td class="social">
                                <? require_once "social_buttons.php" ?>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
    <!-- end container -->
</div><!-- end header-wrap -->

<div id="nav-wrap">
    <div class="container">
        <table id="nav-table">
            <tr>
                <td>
                    <? require_once DR . "/.menu.php"; ?>
                </td>
                <td class="header-right">
                    <table>
                        <tr>
                            <td class="phone-number"></td>
                            <td class="search"></td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
    <!-- end container -->
</div><!-- end nav-wrap -->

<div id="banner-wrap">
    <div class="container">
        <div id="banner">

            <div class="wsite-header"></div>
            <div class="corner-left"></div>
            <div class="corner-right"></div>

            <div style="clear:both;"></div>
        </div>
        <!-- end banner -->
    </div>
    <!-- end container -->
</div><!-- end banner-wrap -->

<div id="main-wrap">
    <div class="container">

        <table>
            <tr>
                <td><div style="font-size: 2em;"><h1>404 ERROR!</br> PAGE NOT FOUND</h1></br></br>
                    <span>Ой! Такой странички нет! Воспользуйся поиском (правый верхний уголок), может быть ты найдешь то, что искал...</span></div></td>
                <td><img src="<?=TP?>/img/bander404.png" alt="bander futurama 404 error! page not found"></td>
            </tr>
        </table>


    </div>
    <!-- end container -->
</div><!-- end main-wrap -->

<? include "footer.php"; ?>

</body>
</html>
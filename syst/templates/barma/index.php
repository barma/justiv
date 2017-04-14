<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="<?= $Core->getCharset() ?>"/>
    <!--[if IE]>
    <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
    <title><?= $Core->getTitle() ?></title>
    <meta name="title" content="<?= $Core->getTitle() ?>"/>
    <meta name="keywords" content="<?= $Core->getKeywords() ?>"/>
    <meta name="description" content="<?= $Core->getDescription() ?>"/>
    <link rel="stylesheet" href="<?= TP ?>style.css" type="text/css" media="screen, projection"/>
</head>

<body>

<div id="wrapper">

    <header id="header">
        <div class='inhead'></div>
        <section id="menu">
            <ul>
                <? include DR . "/.menu.php"; ?>
            </ul>
        </section>
    </header>
    <!-- #header-->

    <section id="middle">

        <div id="container">
            <div id="content">
                <?= $Core->getContent(); ?>
            </div>
            <!-- #content-->
        </div>
        <!-- #container-->

    </section>
    <!-- #middle-->

</div>
<!-- #wrapper -->

<footer id="footer">
</footer>
<!-- #footer -->

</body>
</html>
<!DOCTYPE html>
<html>
<head>

    <title><?= $Core->getTitle() ?></title>
    <meta name="keywords" content="<?= $Core->getKeywords() ?>"/>
    <meta name="description" content="<?= $Core->getDescription() ?>"/>
    <meta content='text/html; charset=UTF-8' http-equiv='Content-Type'/>
    <link rel="shortcut icon" href="<?= HN ?>favicon.ico" type="image/x-icon">
    <link rel='stylesheet' type='text/css' href='<?= TP ?>blog.css'/>
    <link rel='stylesheet' type='text/css' href='<?= TP ?>style.css' title='wsite-theme-css'/>

    <link href='http://fonts.googleapis.com/css?family=Quattrocento:400,700'
          rel='stylesheet' type='text/css'/>
    <!--
    <script type='text/javascript' src='/js/jquery-1.5.min.js'></script>-->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <link title="<?= $Core->getTitle(); ?> / Web разработка" type="application/rss+xml" rel="alternate"
          href="<?= HN ?>feed/">
</head>
<body class='tall-header-page wsite-theme-light wsite-page-index'>
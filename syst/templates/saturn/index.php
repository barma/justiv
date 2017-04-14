<html>
<head>
    <title><?= $Core->getTitle() ?></title>
    <meta http-equiv='Content-Type' content='text/html; charset=<?= $Core->getCharset() ?>'>
    <meta name='description' content='<?= $Core->getDescription() ?>'>
    <meta name='keywords' content='<?= $Core->getKeywords() ?>'>
    <meta name='author' content='Zhuikov Barma Stas'>
    <link href="<?= TP ?>/style.css" rel='stylesheet' type='text/css'>
    <script src="/js/jquery-1.5.min.js" type="text/javascript"></script>
</head>
<body>
<table cellspacing=0 cellpadding=0 align=center>
    <tr>
        <td width=10 background='<?= TP ?>img/shadow_left.gif'>&nbsp;</td>
        <td>
            <div class="cart">
                <a href="/shop/cart.php">
                    <div class="cart_wrapper" style="text-align: center;">


                    </div>
                </a>

            </div>
            <table border=0 cellspacing=0 cellpadding=0 width=1240 height=100%>
                <tr>
                    <td colspan=2>

                        <table border=0 cellspacing=0 cellpadding=0>
                            <tr>
                                <td><img alt="" src='<?= TP ?>img/head.jpg'/></td>
                            </tr>
                            <tr>
                                <td background='<?= TP ?>img/menu_bg.jpg'>
                                    <!-- BEGIN MENU -->
                                    <? include DR . "/.menu.php"; ?>
                                    <!-- END MENU -->
                                </td>
                            </tr>
                        </table>

                    </td>
                </tr>
                <tr height=100%>
                    <td width=1>

                        <table border=0 width=350 height=100% cellspacing=0 cellpadding=0 class=left_menu>
                            <tr>
                                <td rowspan=2 width=100%>

                                    <table width=100% height=100% border=0 cellspacing=0 cellpadding=0>
                                        <tr>
                                            <td background='<?= TP ?>img/left_menu_top_bg.jpg' height=138>
                                                <div id='plashka_katalog'><p>Скачать КАТАЛОГ</p></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td height=100% width=100% bgcolor='#eeeeee' valign=top>
                                                <br>
                                                <br><br>
                                                <? include DR . TP . '/infblock.php'; ?>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td background='<?= TP ?>img/left_menu_bottom_bg.jpg'>
                                                <img alt="" src='<?= TP ?>img/left_menu_bottom_bg.jpg'/></td>
                                        </tr>
                                    </table>

                                </td>
                                <td width=0 height=0 valign=top background='<?= TP ?>img/line_bg.jpg'>
                                    <img alt="" src='<?= TP ?>img/line_top.jpg'/>
                                </td>
                            </tr>
                            <tr>
                                <td height=100% background='<?= TP ?>img/line_bg.jpg' valign=bottom>
                                    <img alt="" src='<?= TP ?>img/line_bottom.jpg'/>
                                </td>
                            </tr>
                        </table>

                    </td>
                    <td>

                        <!-- CONTENT -->
                        <table border=0 width=100% height=100% cellspacing=0 cellpadding=0>
                            <tr height=1>
                                <td background='<?= TP ?>img/content_top_bg.jpg' valign="top">
                                    <img alt="" src='<?= TP ?>img/content_top_bg.jpg' align=left/>

                                    <div id=marki><img alt="" src='<?= TP ?>img/collage.png'/></div>
                                    <h1 class=title><?= $Core->getTitle() ?></h1>
                                </td>
                            </tr>
                            <tr>
                                <td width=100% height=100% bgcolor='#e8e8e8' valign=top id=content>

                                    <?= $Core->getContent(); ?>

                                </td>
                            </tr>
                            <tr>
                                <td valign=bottom>

                                    <!-- BOTTOM BACKGROUND SHADOW -->
                                    <table cellspacing=0 cellpadding=0 width=100%
                                           background='<?= TP ?>img/content_bottom_bg.jpg'>
                                        <tr>
                                            <td><img alt="" src='<?= TP ?>img/content_bottom_bg.jpg'/></td>
                                        </tr>
                                    </table>
                                    <!-- END BOTTOM BACKGROUND SHADOW -->
                                </td>
                            </tr>
                        </table>
                        <!-- END CONTENT -->

                    </td>
                </tr>
                <tr>
                    <td colspan=2>
                        <center><a href='intensedesign.ru' class='copyright'>
                                <img alt="" src='<?= TP ?>img/intense.jpg' border=0/></a></center>
                    </td>
                </tr>
            </table>

        </td>
        <td width=10 background='<?= TP ?>img/shadow_right.gif'>&nbsp;</td>
    </tr>
</table>
</body>
</html>
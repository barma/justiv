<?
require_once "header.php";
?>
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


        <table style="border: 0; width: 100%; table-layout: fixed" id="blogTable">
            <tbody>
            <tr>
                <td valign="top">
                    <div class="blog-body" style="float: left;">
                        <div id="wsite-content">
                            <?= $Core->getContent(); ?>
                        </div>
                    </div>
                </td>
                <td class="blog-sidebar" valign="top">
                    <div class="column-blog">
                        <div class="blog-sidebar-separator">
                            <ul class="columnlist-blog" style="margin:0; padding: 0;">
                                <h2 class="blog-author-title" style="text-align:left;">Об авторе</h2>

                                <p style="text-align:left;">Работаю программистом, и по настоящему люблю свою работу. Но
                                    так же как и простой смертный не обделен недостатками.</p>

                                <h2 class="blog-archives-title" style="text-align:left;">Архив</h2>

                                <p class="blog-archive-list"><a href="" class="blog-link">декабрь 2012</a><br>
                                </p>


                                <? Loader::module('blog/showTags'); ?>


                                <p class="blog-feed-link"><a href="/feed/"><img src="<?= TP ?>img/bg_feed.gif"> RSS Feed</a>
                                </p>
                            </ul>
                        </div>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>


    </div>
    <!-- end container -->
</div><!-- end main-wrap -->

<? include "footer.php"; ?>

</body>
</html>
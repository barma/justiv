<? require_once "header.php"; ?>
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

        <?= $Core->getContent(); ?>

    </div>
    <!-- end container -->
</div><!-- end main-wrap -->

<? include "footer.php"; ?>

</body>
</html>
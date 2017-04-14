<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="<?= $Core->getCharset() ?>"/>
    <title><?= $Core->getTitle() ?></title>
    <meta name="robots" content="noindex, nofollow"/>
    <meta name='author' content='Zhuikov Barma Stas'/>
    <link href="<?=TP?>style.css" rel='stylesheet' type='text/css'/>
<!--    <link href="--><?//=TP?><!--bootstrap/css/bootstrap.css" rel='stylesheet' type='text/css'/>-->
    <? if($_SERVER['REQUEST_URI'] !== '/syst/modules/filemanager/index.php' AND $_SERVER['REQUEST_URI'] !== '//syst/modules/filemanager/index.php') { ?>

        <script src="<?= $site['js'] ?>" type="text/javascript"></script>
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script src="http://code.jquery.com/ui/1.10.2/jquery-ui.js"></script>
        <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.2/themes/smoothness/jquery-ui.css"/>

    <? } else { // КОСТЫЛЬ ДЛЯ ELFINDER ?>

        <link rel="stylesheet" type="text/css" media="screen" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.14/themes/smoothness/jquery-ui.css" />
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js" ></script>
        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.14/jquery-ui.min.js"></script>

    <?}?>

    <script type="text/javascript" src="<?=TP?>script.js"></script>
    <script type="text/javascript" src="<?=TP?>bootstrap/js/bootstrap.js"></script>
    <script type="text/javascript" src="<?=TP?>jquery.form.js"></script>
    <script type="text/javascript" src="<?=TP?>datetimepicker.js"></script>
</head>

<body>
<div id="ajaxResult"></div>
<table width=100% height=100% border=0 cellpadding=0 cellspacing=0>
    <tr bgcolor="#4a4a4a">
        <td id='header' colspan=2>
            <a href='/admin'><img alt="BES.CMS" src='<?= TP ?>img/logo.png' id='logo'/></a>

            <div id='top_line'>

                <div id="quickAction">
                    <div style="float:left; padding-right: 100px;  vertical-align: bottom;">Hello Barma</div>
                    <div style="float:right;">
                        <select name="quick_action" size="1" id="selector" title="выберите действие">
                            <option value="f">first var</option>
                            <option value="s">two var</option>
                            <option value="t">three var</option>
                            <option value="f">for var</option>
                        </select>
                    </div>
                </div>
                <a href='/logout.php'><img alt="exit" src='<?= TP ?>img/exit.png' id='exit'/></a>

                <div id='top_separator'></div>
            </div>

            <div style="position:absolute; width: 75%; top: 78px; right: 50px;">
                <div class="close_this settings_tab">
                    <?Loader::library('custombox')?>
                    <a id="notepad">Блокнот</a>
                    <a href='/test/t.php' class="ajaxLink">TEST ajax Link</a>
                </div>
                <div class="close_this help_tab">
                    <?Loader::library('HelpText');?>
                </div>

                <div style="float: right; display: block; z-index: 1000; padding-right: 20px;">
                    <div class="lddm"></div>
                    <div class="settings_tab_button">GTD</div>
                    <div class="rddm">
                        <div id="settings_tab" class="white_arrow_bottom" style="margin: 7px 0 0 5px;"></div>
                    </div>
                </div>


                <div style="float: right; display: block; z-index: 1000; padding-right: 20px;">
                    <div class="lddm"></div>
                    <div class="help_tab_button">Помошь</div>
                    <div class="rddm">
                        <div id="help_tab" class="white_arrow_bottom" style="margin: 7px 0 0 5px;"></div>
                    </div>
                </div>
            </div>

        </td>
    </tr>
    <tr>
        <td width=270>
            <div id='menu'>
                <div class="box">
                    <h3><a href='/admin'>Консоль</a></h3>
                </div>
                <div class="box">
                    <h3>Система<span class="expand white_arrow_right"></span></h3>
                    <ul>
                        <li><a href='<?= FC ?>modules/system/journal/index.php'>Журнал ошибок</a></li>
                        <li><a href='#'>Настройки</a></li>
                        <li><a href='<?= FC ?>modules/filemanager/index.php'>Файловый менеджер</a></li>
                        <li><a href='<?= FC ?>modules/system/backup/admin/index.php'>Backups</a></li>
                    </ul>
                </div>
                <div class="box">
                    <h3>Модули<span class="expand white_arrow_right"></span></h3>
                    <ul>
                        <li><a href='<?= FC ?>modules/shop/admin/index.php'>Магазин</a></li>
                        <li><a href='<?= FC ?>modules/notepad/admin/edit.php'>Блокнот</a></li>
                        <li><a href='<?= FC ?>modules/sitemap/admin/index.php'>Sitemap</a></li>
                    </ul>
                </div>
            </div>
        </td>
        <td id=content>
            <div id='second_menu'>
                <ul id='second_list_menu'>
                    <li class='title'><?= $Core->getTitle() ?></li>
                    <?
                    $menu = $Core->getMenu();
                    if (!empty($menu)) {
                        include $menu;
                    }
                    ?>
                </ul>
            </div>
            <br/><br/><br/><br/>
            <?= $Core->getContent() ?>
        </td>
    </tr>
    <tr>
        <td id=footer colspan=2>
            <div id='bottom_separator'></div>
            <div id='bottom_logo'></div>
        </td>
    </tr>
</table>
</body>
<script type="text/javascript">
    $(document).ready(
        function () {
            // подсветка таблиц-списков
            $(".list tr").mouseover(function () {
                $(this).addClass("over");
            });

            $(".list tr").mouseout(function () {
                $(this).removeClass("over");
            });

            $(".list tr:even").addClass("alt");
        }
    );
</script>

</html>
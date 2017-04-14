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
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script src="/js/script.js" type="text/javascript"></script>
    </head>
</head>
<body>
<table width=100% height=100% bgcolor='#00000' align=center cellspacing=0 cellpadding=0 border=0>
<tr><td align=center>

</td></tr>
<tr><td align=center><img src='<?=TP?>img/head2.png'></td></tr>
<tr><td>
	<table height=43 width=100% background='<?=TP?>img/top_menu_bg.png'><tr>
		<td><div class='tmenu'><center>
				<a href='/index.html'>о нас</a>
				<a href='/cont.html'>контакты</a>
				<a href='/pay.html'>способы оплаты</a>
			</center>
			</div>
		</td>
	</tr></table>
</td></tr>
<tr><td align=center height=100%>


<table width=900 height=100% cellspacing=0 cellpadding=0>
	<tr>
		<td><img src='<?=TP?>img/tl.png'></td>
		<td background='<?=TP?>img/top_right_bg.png'></td>
		<td><img src='<?=TP?>img/top_right.png'></td>
	</tr>
	<tr height=100%>
		<td background='<?=TP?>img/cl.png' align=center>

			<table height='100%'><tr><td height=100% valign=top>
			<ul>
				<li><a href="/catalog/">Каталог одежды</a></li>
				<li><a href="/store/"></a>Одежда под заказ</li>
                <li><a href="/basket/">Корзина</a></li>
                <li><a href="/user/">Личный кабинет</a></li>
			</ul>
			</td></tr><td valign=bottom align=center>
			<img src='<?=TP?>img/rm_bottom_picture.png' valign=bottom>
			</td></tr></table>
		</td>
		<td width=100% bgcolor='#000' valign=top>

            <?= $Core->getContent(); ?>

		</td>
		<td background='<?=TP?>img/right_bg.png'></td>
	</tr>
	<tr>
		<td><img src='<?=TP?>img/bl.png'></td>
		<td background='<?=TP?>img/bottom_right_bg.png'></td>
		<td><img src='<?=TP?>img/bottom_right.png'></td>
	</tr>
</table>

</td></tr>
</table>

</body>
</html>
<!DOCTYPE html>
<html>
<head>
    <meta charset="<?= $Core->getCharset() ?>"/>
    <!--[if IE]><script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
    <title><?= $Core->getTitle() ?></title>
    <meta name="title" content="<?= $Core->getTitle() ?>"/>
    <meta name="keywords" content="<?= $Core->getKeywords() ?>"/>
    <meta name="description" content="<?= $Core->getDescription() ?>"/>
    <link rel="stylesheet" href="<?= TP ?>style.css" type="text/css" media="screen, projection"/>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script src="/js/script.js" type="text/javascript"></script>
</head>

<body>
<?//=$Debug_panel;?>
<div class="ltc"></div>
<div class="rtc"></div>
<div class='topmenu'>
	<ul>
		<li><a href="/" class="active">Главная</a></li>
		<li><a href="/about/">Что это</a></li>
		<li><a href="/instruction/">Инструкция</a></li>
		<li><a href="/news/">Новости</a></li>
		<li><a href="/contacs/">Контакты</a></li>
	</ul>
</div>

<div class="wrapper">

	<header class="header">
		<div class="headerWrapper">
			<div class="authWrapper">
				<a href="/registration/" class="registrationButton">Регистрация</a>
				<form method="post" action="/Login/" class="LoginForm">
					<label>логин</label>
					<input type="text" name="login" value="">
					<label>пароль</label>
					<input type="password" name="passwd" value="">
					<input type="submit" value="" class="loginButton">
				</form>
			</div>
			<div class="basketWrapper">
				<a href="/basket/">Корзина</a>
			</div>
		</div>
		<div class="headerImage">
			<div class="logoWrapper">asd
				<a href="/"><img src="<?=TP?>img/logo.png" title="justiv.ru"></a>
			</div>
			<div class="glasses"></div>
		</div>
		<!-- for menu -->
		<div class="menuSeparator"></div>
	</header><!-- .header-->
<table align="center" style="margin: 0 auto; width: 100%;">
	<tr>
		<td valign="top">		
		<aside class="left-sidebar" id="left-sidebar">
			<div class="search">
				<div class="search_wrapper">
					<form>
						<input type="submit" value="" class="search_submit">
						<input type="text" name="search" class="search_field" placeholder="Search" value="">
					</form>
				</div>
			</div>
			<div class="leftmenu">
                <? include DR . "/.menu.php"; ?>

			</div>


		</aside><!-- .left-sidebar --></td>


		<td style="vertical-align:top;">
			
	<div class="middle" id="middle">

		<div class="container">
			<div class="content">

			<?= $Core->getContent(); ?>

			</div>
		</div>



	</div><!-- .middle-->

		</td>
	</tr>
</table>


	<footer class="footer">
		<div class="menuShadow"></div>
		<div class="contentShadow"></div>
	</footer><!-- .footer -->
</div><!-- .wrapper -->

<div class="bottomCornersWrapper">
	<div class="lbc"></div>
	<div class="rbc"></div>
</div>
<script>
window.onload=function () {
	var wrapper_h = document.getElementById('middle').offsetHeight;
	s = document.getElementById('left-sidebar');
	s.style.height = wrapper_h;
}
</script>
<? require_once 'counters.php'; ?>
</body>
</html>
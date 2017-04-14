<!DOCTYPE html>
<html><head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

    <title><?= $Core->getTitle() ?></title>
    <meta name="title" content="<?= $Core->getTitle() ?>"/>
    <meta name="keywords" content="<?= $Core->getKeywords() ?>"/>
    <meta name="description" content="<?= $Core->getDescription() ?>"/>

    <link rel="stylesheet" href="<?=TP?>new_justiv_files/bootstrap.css">
    <link rel="stylesheet" href="<?=TP?>style.css">
    <link rel="stylesheet" href="<?=TP?>font-awesome-4.7.0/css/font-awesome.min.css">

    <link rel="stylesheet" href="<?=TP?>bootstrap/css/bootstrap.min.css">
    <script type="application/javascript" src="<?=TP?>jquery-3.2.0.min.js"></script>
    <script type="application/javascript" src="<?=TP?>bootstrap/js/bootstrap.min.js"></script>


<body class="body-headroom">

<!-- // LOADING -->

<!-- // END LOADING -->


<div id="wrapper">
    <header>
        <section class="border-bottom">
            <div class="container">
                <div id="logo"><a href="/">
<!--                        <img src="--><?//=TP?><!--/images/logo.png">-->
                        <a href="/"><img src="<?=TP?>images/justiv-logo3.png" title="justiv.ru"></a>
                    </a></div>

                <nav>
                    <ul class="top-menu">
                        <li>
                            <div class="dropdown">
                                <a href="#" title="" type="button" id="dropdownMenu1" data-toggle="dropdown">
                                    <span>Одежда</span>
                                </a>
                                <?=Loader::module('shop/getCategoriesList')?>
                            </div>
                        </li>
                        <li>
                            <a style="" href="#" title="">
                                <span>Обувь</span>
                            </a>
                        </li>
                        <li>
                            <a style="" href="#" title="">
                                <span>Аксессуары</span>
                            </a>
                        </li>
                        <li>
                            <a style="" href="#" title="">
                                <span>Бренды</span>
                            </a>
                        </li>
                        <li>
                            <a style="" href="#" title="">
                                <span>Страницы</span>
                            </a>
                        </li>
                        <li>
                            <div class="dropdown">
                                <?=Loader::module('shop/Login')?>
                            </div>
                        </li>
                        <li>
                            <a href="/cart/" id="tocart"><i class="fa fa-shopping-basket fa-2x" aria-hidden="true"></i></a>
                        </li>
                    </ul>
                </nav>
            </div>
        </section>

        <section class="border-bottom">
            <div class="carousel">
                <style>
                    .fuck {
                        background-image: url('<?=TP?>new_justiv_files/1_004.jpg');
                        transform: translate3d(0px, 0px, 0px);
                        transition: all 0s ease 0s;
                        /*width: 5715px;*/
                        height: 604px;
                    }
                </style>
               <div class="fuck"></div>
            </div>
        </section>

        <section class="border-bottom">
            <div class="container">
                <div class="policy-wrapper">

                    <div class="row">

                        <div class="col-md-4 col-sm-4 col-xs-8">
                            <div class="policy">
                                <div class="policy-icon">
                                    <i class="fa fa-rub"></i>
                                </div>

                                <div class="policy-text">
                                    <h4>100% Money back</h4>
                                    <p>Guarantee</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4 col-sm-4 col-xs-8">
                            <div class="policy">
                                <div class="policy-icon">
                                    <i class="fa fa-car"></i>
                                </div>

                                <div class="policy-text">
                                    <h4>Free shipping</h4>
                                    <p>On order over 500$</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4 col-sm-4 col-xs-8">
                            <div class="policy">
                                <div class="policy-icon">
                                    <i class="fa fa-phone"></i>
                                </div>

                                <div class="policy-text">
                                    <h4>24-hour</h4>
                                    <p>active support</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>



    </header>
    <div id="content" class="container">
        <section class="sectionContent">
        <?= $Core->getContent(); ?>
        </section>
    </div>
    <footer>

    <!-- тренды -->
    <!--
        <section class="padding-60">
            <div class="container">
                <div class="section-header center">
                    <h2 class="upper margin-bottom-20">What's Trending</h2>
                    <p>All trend style for man</p>
                </div>
            </div>
        </section>
-->

<!-- рекомендации -->
        <!--
        <section class="background background-color-dark background-image-section-customers-say">
            <div class="container">
                <div class="section-header center">
                    <h2 class="upper margin-bottom-20">Customer Say</h2>
                </div>

                <div class="center">
                    <h4>Natasha Roson</h4>
                    <p>“There are many
                        variations of passages of Lorem Ipsum available, but the majority have
                        suffered alteration in some form, by injected humour, or randomised
                        words which don't look even slightly believable. If
                        you are going to use a
                        passage of Lorem Ipsum“</p>
                </div>
            </div>
        </section>
-->

<!--   SUBSCRIBE     --><!--
        <style>
            .subscible-wrapper {
                color: #FFF;
                background: #2F2F2F none repeat scroll 0% 0%;
            }
            .subscible-inline {
                padding: 35px;
            }
            .subscible-inline .subscible-form .form-group {
                width: 65%;
                padding-right: 10px;
                margin-bottom: 0px;
            }
            .subscible-form .form-control {
                border: medium none;
                height: 38px;
                padding-top: 10px;
                border-radius: 0px;
            }

            .btn-primary.focus, .btn-primary:focus, .btn-primary:hover {
                background-color: #FFB533;
                border-color: #FFB533;
                color: #FFF;
            }
            .btn-lg.search-submit, .btn.btn-lg {
                font-size: 12px;
                padding: 12px 25px;
                letter-spacing: 1px;
            }
            .subscible-inline .subscible-form .form-submit {
                width: 35%;
            }
            .subscible-inline .subscible-form .form-group, .subscible-inline .subscible-form .form-submit {
                float: left;
            }
            .subscible-wrapper .form-submit {
                position: relative;
            }
            *, *::after, *::before {
                box-sizing: border-box;
            }
            .subscible-inline .subscible-form .form-submit .btn, .subscible-inline .subscible-form .form-submit .search-submit {
                width: 100%;
                padding-left: 0px;
                padding-right: 0px;
            }
            .btn-lg.search-submit, .btn.btn-lg {
                font-size: 12px;
                padding: 12px 25px;
                letter-spacing: 1px;
            }
            .btn-primary {
                color: #FFF;
                background-color: #FFA200;
                border-color: #FFA200;
            }
            .btn, .search-submit {
                font-size: 12px;
                font-weight: 700;
                line-height: 1;
                border-radius: 0px;
                padding: 10px 15px;
                border: 1px solid transparent;
            }
        </style>
        <section style="padding-bottom: 50px;">
            <div class="container">
                <div class="margin-bottom-50">
                    <div class="subscible-wrapper subscible-inline">

                        <div class="row">
                            <div class="col-md-2">
                                <h3 class="subscribe-title">Subscribe newsletter</h3>
                            </div>

                            <div class="col-md-4">
                                <div class="subscribe-comment">
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <form method="GET" action="index.html" class="subscible-form">
                                    <div class="form-group">
                                        <label class="sr-only" for="subscribe-email">Email</label>
                                        <input placeholder="Enter your email address" class="form-control" id="subscribe-email" type="email">
                                    </div>

                                    <div class="form-submit">
                                        <button class="btn btn-lg btn-primary" type="submit">Subscribe email</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

        </section>
-->



        <section class="bottom-section">
            <div class="container">
                <div class="row">
                    <div class="col-md-4">
                        <div class="row">
                            <div class="col-md-12 col-sm-6">

                                <div class="widget">
                                    <h3 class="widget-title">о justiv</h3>

                                    <div class="widget-content">
                                        <p>Мы на рынке более 2х лет и занимаем нишу доступной и качественной одежды.
                                            Подробнее о нас Вы можете узнать в спецальном разделе, либо в нашей группе в vk.</p>
                                    </div>
                                </div>

                            </div>

                            <div class="col-md-12 col-sm-6">

                                <div class="widget">
                                    <h3 class="widget-title">остались вопросы?</h3>

                                    <div class="widget-content">
                                        <p>Телефон 1: 8 (953) XXX—XX—XX</p>
                                        <p>Телефон 2: 8 (912) XXX—XX—XX</p>
                                        <p>Время работы: 09:00-22:00</p>
                                        <p>Mail: inbox@justiv.ru</p>
                                    </div>
                                </div>
                                <!-- /.widget -->

                            </div>
                        </div>
                    </div>

                    <div class="col-md-2 col-sm-6">

                        <div class="widget">
                            <h3 class="widget-title">Магазин</h3>

                            <ul>
                                <li><a href="#" title="">Корзина</a>
                                </li>
                                <li><a href="#" title="">Ваши заказы</a>
                                </li>
                                <li><a href="#" title="">Избранные товары</a>
                                </li>
                                <li><a href="#" title="">Информация о доставке</a>
                                </li>
                            </ul>
                        </div>
                        <!-- /.widget -->

                    </div>

                    <div class="col-md-2 col-sm-6">

                        <div class="widget">
                            <h3 class="widget-title">Разделы</h3>

                            <ul>
                                <li><a href="#" title="">Блог</a>
                                </li>
                                <li><a href="#" title="">Как покупать</a>
                                </li>
                                <li><a href="#" title="">Новинки</a>
                                </li>
                                <li><a href="#" title="">Обратная связь</a>
                                </li>
                            </ul>
                        </div>
                        <!-- /.widget -->

                    </div>

                    <div class="col-md-4">

                        <div class="widget">
                            <h3 class="widget-title">Мы в социальных сетях</h3>

                            <ul class="social-links">
                                <li><a href="#" title=""><i class="fa fa-twitter fa-2x"></i></a>
                                </li>
                                <li><a href="#" title=""><i class="fa fa-facebook fa-2x"></i></a>
                                </li>
                                <li><a href="#" title=""><i class="fa fa-vk fa-2x"></i></a>
                                </li>
                            </ul>
                        </div>



                        <div class="widget">
                            <h3 class="widget-title">Принимаем платежи</h3>

                            <ul class="payment-system">
                                <li>
                                    <img src="<?=TP?>/images/payment-system/visa.png">
                                </li>

                                <li>
                                    <img src="<?=TP?>/images/payment-system/mastercard.png">
                                </li>

                                <li>
                                    <img src="<?=TP?>/images/payment-system/sberbank.png">
                                </li>
                            </ul>
                        </div>
                        <!-- /.widget -->

                    </div>
                </div>
            </div>
        </section>



        <div class="footer-copyright">
            <div class="container">
                <div class="copyright">
                    <p>Copyright © 2015 justiv.ru - All Rights Reserved.</p>
                </div>

                <div class="footer-nav">
                    <nav>
                        <ul>
                            <li><a href="#" title="">Contact Us</a>
                            </li>
                            <li><a href="#" title="">Term of Use</a>
                            </li>
                            <li><a href="#" title="">Privacy Policy</a>
                            </li>
                            <li><a href="#" title="">Site Map</a>
                            </li>
                        </ul>
                    </nav>

                </div>
            </div>
        </div>

    </footer>
</div>
</body>
</html>
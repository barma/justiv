<?
/*
//Core::templateOff();
Loader::library('mvc');
$obj = new Controller('shop');
use Sunra\PhpSimple\HtmlDomParser;

require DR.'vendor/autoload.php';

//$url = $obj->getParam('url','P','HTML',1000);
$url = 'http://item.taobao.com/item.htm?spm=a230r.1.14.30.N01AjS&id=37035188148';
$response = Unirest::get($url);

$html = HtmlDomParser::str_get_html( $response->body );
//
//foreach($html->find('h2') as $element) { //выборка всех тегов img на странице
//    echo $element . '<br>'; // построчный вывод содержания всех найденных атрибутов src
//}
//
//foreach($html->find('#J_StrPrice em.tb-rmb-num') as $element) { //выборка всех тегов img на странице
//    echo 'pizdec = '.$element . '<br>'; // построчный вывод содержания всех найденных атрибутов src
//}
$test = $html->find('#J_StrPrice em.tb-rmb-num',0)->plaintext;
echo "test = $test <br>";
//$price = $html->find('.tb-rmb-num')->plaintext;
//ed($price);
*/
?>
<?Loader::module('shop/showWindow');?>
<!--<div class="product">
    <div class="productImage">
        <img src="pr.png">
    </div>
    <div class="productName">Double Breasted Wool Trench Coat (WLB-CHARCOAL)</div>
    <div class="productPrice">59.00</div>
</div>

<div class="product">
    <div class="productImage">
        <img src="pr.png">
    </div>
    <div class="productName">Double Breasted Wool Trench Coat (WLB-CHARCOAL)</div>
    <div class="productPrice">59.00</div>
</div>

<div class="product">
    <div class="productImage">
        <img src="pr.png">
    </div>
    <div class="productName">Double Breasted Wool Trench Coat (WLB-CHARCOAL)</div>
    <div class="productPrice">59.00</div>
</div>

<div class="product">
    <div class="productImage">
        <img src="pr.png">
    </div>
    <div class="productName">Double Breasted Wool Trench Coat (WLB-CHARCOAL)</div>
    <div class="productPrice">59.00</div>
</div>

<div class="product">
    <div class="productImage">
        <img src="pr.png">
    </div>
    <div class="productName">Double Breasted Wool Trench Coat (WLB-CHARCOAL)</div>
    <div class="productPrice">59.00</div>
</div>

<div class="product">
    <div class="productImage">
        <img src="pr.png">
    </div>
    <div class="productName">Double Breasted Wool Trench Coat (WLB-CHARCOAL)</div>
    <div class="productPrice">59.00</div>
</div>

<div class="product">
    <div class="productImage">
        <img src="pr.png">
    </div>
    <div class="productName">Double Breasted Wool Trench Coat (WLB-CHARCOAL)</div>
    <div class="productPrice">59.00</div>
</div>

<div class="product">
    <div class="productImage">
        <img src="pr.png">
    </div>
    <div class="productName">Double Breasted Wool Trench Coat (WLB-CHARCOAL)</div>
    <div class="productPrice">59.00</div>
</div>

<div class="product">
    <div class="productImage">
        <img src="pr.png">
    </div>
    <div class="productName">Double Breasted Wool Trench Coat (WLB-CHARCOAL)</div>
    <div class="productPrice">59.00</div>
</div>

<div class="product">
    <div class="productImage">
        <img src="pr.png">
    </div>
    <div class="productName">Double Breasted Wool Trench Coat (WLB-CHARCOAL)</div>
    <div class="productPrice">59.00</div>
</div>

<div class="product">
    <div class="productImage">
        <img src="pr.png">
    </div>
    <div class="productName">Double Breasted Wool Trench Coat (WLB-CHARCOAL)</div>
    <div class="productPrice">59.00</div>
</div>

<div class="product">
    <div class="productImage">
        <img src="pr.png">
    </div>
    <div class="productName">Double Breasted Wool Trench Coat (WLB-CHARCOAL)</div>
    <div class="productPrice">59.00</div>
</div>
-->
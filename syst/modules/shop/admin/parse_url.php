<?php
/**
 * Created by PhpStorm.
 * User: barma
 * Date: 20.04.14
 * Time: 22:58
 */
Core::templateOff();
//ini_set('memory_limit', '512M');
function createFolderForProductImages($id) {
    for ($i=0; $i<=strlen($id); $i++) {
        $digits[]=substr($id, $i, 1);
    }
    if (!is_dir(DR.'product/'.$digits[0])) {
        mkdir(DR.'product/'.$digits[0]);
    }

    // если первая десятка, записывать будет в папку products/*/0/
    if(empty($digits[1])) {
        $digits[1] = 0;
    }

    if (!is_dir(DR.'product/'.$digits[0].'/'.$digits[1])) {
        mkdir(DR.'product/'.$digits[0].'/'.$digits[1]);
    }

    if(is_dir(DR.'product/'.$digits[0].'/'.$digits[1].'/'.$id)) {
//        throw new Exception ('Папка для данного продукта уже есть!');
        return DR.'product/'.$digits[0].'/'.$digits[1].'/'.$id.'/';
    }

    $dir = DR.'product/'.$digits[0].'/'.$digits[1].'/'.$id;
    mkdir($dir);
    return $dir.'/';
}

Core::templateOff();
Loader::library('mvc');
$obj = new Controller('shop');
use Sunra\PhpSimple\HtmlDomParser;
//use Mashape\Unirest-php\Lib\Unirest;
$url = $obj->getParam('url','P','HTML',1000);
// для отладки работы парсера
//$url = 'https://item.taobao.com/item.htm?id=523078637448';
try {
    $response = Unirest\Request::get($url);
    $html = HtmlDomParser::str_get_html( $response->body );
} catch (Exception $e) {
    die('Ошибка при получении данных с удаленного ресурса.');
}
if(preg_match('/detail.tmall.com/', $url)) {
    $siteParse = 'tmall';
} elseif (preg_match('/taobao.com/', $url)) {
    $siteParse = 'taobao';
}
//http://ext.mdskip.taobao.com/extension/queryTmallCombo.do?areaId=330100&comboId=&_ksTS=1407924761471_1337&callback=jsonp1338&itemId=39162459667&comboGroup=0
//apiTmallComboInfo;

//$pattern = '/apiTmallComboInfo\":\"(.*)\"\,\"apiTmallComboItem/i';
//preg_match($pattern,$html,$matches);
////print_r(htmlspecialchars($html));
////ed($matches);
//$urlPrice = $matches[1];
//echo $urlPrice;
//echo '<script type="text/javascript" src="'.$urlPrice.'"></script>';
//try {
//    $response = Unirest::get($urlPrice);
//    $html_price = HtmlDomParser::str_get_html( $response->body );
//} catch (Exception $e) {
//    die('Ошибка при получении данных с удаленного ресурса2.');
//}
//ed($response->body);
//ed($html_price);
//
//die('asd');
$arr['taobao']['price'] = '#J_StrPrice em.tb-rmb-num';
$arr['taobao']['delivery_price'] = '#J_Carriage span';
$arr['tamll']['price'] = 'div.tm-promo-price span.tm-price';
$arr['tamll']['delivery_price'] = 'div#J_PostageToggleCont span';
$arr['tamll']['delivery_price2'] = 'div#J_PostageToggleCont em.tm-yen';

if($siteParse == 'taobao') {
    $price = $html->find('[name="current_price"]',0)->getAttribute('value');
} else {
    $price = $html->find($arr[$siteParse]['price'],0)->plaintext;
}
//print_r(htmlspecialchars($html));
//ed($price);
//ed($html);
//ed($html->find('[name="current_price"]',0)->getAttribute('value'));
//die('asd');
if($price == NULL) {
    $price = 0;
}
$delivery_price = $html->find($arr[$siteParse]['delivery_price'],0)->plaintext;
if(!is_numeric($delivery_price)) {
    $delivery_price = 0;
}
if($delivery_price == 0 and isset($arr[$siteParse]['delivery_price2'])) {
    $delivery_price = $html->find($arr[$siteParse]['delivery_price2'],0)->plaintext;
    if(!is_numeric($delivery_price)) {
        $delivery_price = 0;
    }
}

//$main_img = $html->find('.tb-booth img',0)->getAttribute('data-src');
$images = array();
//
foreach ($html->find('#J_ThumbNav img') as $element) {
    $link = $element->getAttribute('src');
//    ed($link);
    $pos = '.'.substr(strrchr($link, "."),1);
    $images[substr($link, 0, strpos($link, $pos)).$pos] = $pos;
}
$cur_id = 1; // юани
$data = array(pr_name=>'noname', pr_price=>$price, pr_cur_id=>$cur_id, pr_delivery_price=>$delivery_price, 'pi_url' => $url);
//ed($data);
//ed($images);
//die('a');
$id = $obj->db->query("INSERT INTO ?_shop_products SET ?a", $data);

//сохранение картинок
if(!empty($images)) {
    $folder = createFolderForProductImages($id);

    $i = 1;
    foreach($images as $image => $extension) {
        file_put_contents($folder.$id.'_'.$i.$extension, file_get_contents('http:'.$image));
        $data = array(pi_pr_id=>$id, pi_name=>$id.'_'.$i.$extension, pi_description=>'photo', pi_title=>'photo',
            pi_path=>str_replace(DR,'/',$folder).$id.'_'.$i.$extension);
        $obj->db->query("INSERT INTO ?_shop_product_images SET ?a", $data);
        unset($data);
        $i++;
    }
}
die("$id");
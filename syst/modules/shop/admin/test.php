<?php
/**
 * Created by PhpStorm.
 * User: barma
 * Date: 20.04.14
 * Time: 22:58
 */

function createFolderForProdectImages($id) {
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
        throw new Exception ('Папка для данного продукта уже есть!');
    }

    mkdir(DR.'product/'.$digits[0].'/'.$digits[1].'/'.$id);
}

Core::templateOff();
Loader::library('mvc');
$obj = new Controller('shop');
use Sunra\PhpSimple\HtmlDomParser;

require DR.'vendor/autoload.php';

$url = $obj->getParam('url','P','HTML',1000);
$response = Unirest::get($url);
$html = HtmlDomParser::str_get_html( $response->body );



$price = $html->find('#J_StrPrice em.tb-rmb-num',0)->plaintext;

$delivery_price = $html->find('#J_Carriage span',0)->plaintext;
if(!is_numeric($delivery_price)) {
    $delivery_price = 0;
}

//$main_img = $html->find('.tb-booth img',0)->getAttribute('data-src');

$images = array();

foreach ($html->find('#J_UlThumb img') as $element) {
    $link = $element->getAttribute('data-src');
    $pos = '.'.substr(strrchr($link, "."),1);
    $images[substr($link, 0, strpos($link, $pos)).$pos] = $pos;
}
//ed($price);
//ed($delivery_price);
//ed($images);
$cur_id = 2; // юани
$data = array(pr_name=>'noname', pr_price=>$price, pr_cur_id=>$cur_id, pr_delivery_price=>$delivery_price);
$id = $obj->db->query("INSERT INTO ?_product SET ?a", $data);


if(!empty($images)) {
    $folder = createFolderForProdectImages($id);

    $i = 1;
    foreach($images as $image => $extension) {
        file_put_contents(DR.'/poduct/'.$id.'_'.$i.$extension, file_get_contents($img));
        $data = array(pi_pr_id=>$id, pi_pr_name=>$id.'_'.$i.$extension, pi_description=>'photo', pi_title=>'photo',
            pi_photo=>DR.'/poduct/'.$id.'_'.$i.$extension);
        $obj->db->query("INSERT INTO ?_product_images SET ?a", $data);
        $i++;
    }
}
//$img = 'http://img01.taobaocdn.com/bao/uploaded/i1/T1cBkOFnFgXXXXXXXX_!!0-item_pic.jpg';
//
//
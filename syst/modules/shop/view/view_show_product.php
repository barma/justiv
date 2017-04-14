<?php
/**
 * Created by PhpStorm.
 * User: barma
 * Date: 06.06.14
 * Time: 23:51
 */
?>
<table width="100%">
<tr>
    <td><h1><?=$data['pr_name']?></h1></td><td><span class="price"><?=number_format($data['pr_price'],2)?> руб.</span></td>
</tr>
    <?if($data['pr_isnew'] == 1) {?>
        <tr><td>Новинка</td></tr>
    <?}?>
    <tr><td><img src="<?=$data['']?>"></td></tr>
<tr><td colspan="2"><?=htmlspecialchars_decode($data['pr_description'])?></td></tr>
    <tr><td colspan="2"><a href="/addtocart/<?=$data['pr_id'];?>/" class="ajaxLink">В корзину</a></td></tr>
<?
foreach ($data['images'] as $key=>$image) {
?>
    <tr><td colspan="2" align="center"><img src="<?=$image['pi_path']?>" alt="<?=$image['pi_description']?>"  title="<?=$image['pi_title']?>"></td></tr>
<?
}
?>
</table>
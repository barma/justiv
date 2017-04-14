<?php
/**
 * Created by PhpStorm.
 * User: barma
 * Date: 10.04.17
 * Time: 14:57
 */
//ed($data);
?>
<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
    <? foreach($data as $key=>$val) {?>
    <li><a tabindex="-1" href="/<?=$val['ctg_url_path']?>/"><?=$val['ctg_name']?></a></li>
    <?}?>
</ul>
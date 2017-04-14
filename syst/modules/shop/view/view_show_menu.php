<ul>
<?
foreach($data as $row) {
?>
    <li><a href="/catalog/<?=$row['ctg_url_path']?>/"><?=$row['ctg_name']?></a></li>
<?
}
?>
</ul>
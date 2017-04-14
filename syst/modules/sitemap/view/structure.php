<?
if(count($data)>1) {
    foreach($data as $row) {?>
    <url>
        <loc><?=$row['url']?></loc>
        <lastmod><?=$row['lastmod']?></lastmod>
        <changefreq><?=$row['changefreg']?></changefreq>
        <priority><?=$row['priority']?></priority>
    </url>
<?
    }
}
?>
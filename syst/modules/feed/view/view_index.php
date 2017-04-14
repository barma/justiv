<?
global $Core;
echo '<?xml version="1.0" encoding="UTF-8"?>';
?>
<rss version="2.0">
    <channel>
        <title><?= $Core->getTitle(); ?></title>
        <link><?= HN ?></link>
        <description>WEB разработка Жуйков.ру</description>
        <? if (!empty($data)) { ?>
            <? foreach ($data as $row) { ?>
                <item>
                    <title><?= $row['post_title'] ?></title>
                    <link><?= HN ?>blog/show_post.php?id=<?= $row['post_id'] ?></link>
                    <description><?= $row['post_description_text'] ?></description>
                </item>
            <? } ?>
        <? } ?>
    </channel>
</rss>
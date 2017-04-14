<table border="1" cellpadding=0 cellspacing=0>
    <? foreach ($data as $row) { ?>
        <tr>
            <td><?= $row['id'] ?></td>
            <td><?= $row['ip'] ?></td>
            <td><?= $row['url'] ?></td>
            <td><?= $row['date'] ?></td>
            <td><?= $row['query'] ?></td>
            <td><?= $row['searcher'] ?></td>
            <td><?= $row['robot'] ?></td>
            <td><?= $row['reff'] ?></td>
            <td><?= $row['request'] ?></td>
        </tr>
    <? } ?>
</table>
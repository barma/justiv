<?php

// объявляем класс постраничной разбивки
$paging = new sub_Paging();

// количество элементов на странице
$paging->__set('page_size', 50);

// пишем обычный запрос, и передаем его методу класса постраничного вывода, он его несколько видоизменяет...
$query = $paging->setQuery(
    'select `user_id`, `name`, `email`, `family`, `ban`, `lastvisit` from `user` where ban = 1 order by `user_id`'
);

// выполняем этот измененный запрос...
$BEMYSQL->select_sql($query);
include_once('view/index.php');
?>
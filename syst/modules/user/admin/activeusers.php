<?php

// объявляем класс постраничной разбивки
$paging = new sub_Paging();

// количество элементов на странице
$paging->__set('page_size', 50);

// пишем обычный запрос, и передаем его методу класса постраничного вывода, он его несколько видоизменяет...
$query = $paging->setQuery(
    'SELECT `user_id`, `name`, `email`, `family`, user.money, doublerating_code.double_money
                                FROM `user`
                                LEFT JOIN `doublerating_code`
                                USING (`user_id`)
                    WHERE user.money > 10
                                ORDER BY doublerating_code.double_money desc, user.money desc'
);

// выполняем этот измененный запрос...
$BEMYSQL->select_sql($query);
include_once('view/activeuser.php');
?>

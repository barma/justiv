<?php
/**
 * Считает количество строк в php файлах каталога
 */
$timestart = microtime();
$count = 0;

function start($dirname)
{

    global $count;

    $dir = opendir($dirname);
    while ($file = readdir($dir)) {
        if ($file != "." && $file != "..") {
            if (is_file($dirname . '/' . $file) && substr($file, -3, 3) == 'php') {
                $strings = count(file($dirname . '/' . $file));
                $count += $strings;

                //список подсчитанных файлов
                //echo $dirname . '/' . $file . ' - ' . $strings . '<br>';
            } else {
                if (is_dir($dirname . '/' . $file)) {
                    start($dirname . '/' . $file);
                }
            }

            // список файлов которые не считались
            //else
            //echo '<s>'.$dirname . '/' . $file . '</s><br>';
        }
    }
    closedir($dir);
}

start(DR); //каталог
$count -= count(file($_SERVER['SCRIPT_FILENAME'])); //если скрипт в том же каталоге, в котором считаем

?>
<style>
    .panel2 {
        background: none repeat scroll 0 0 #EFEFEF;
        border: 1px solid #D1D1D1;
        border-radius: 10px 10px 10px 10px;
        box-shadow: 0 0 10px #DDDDDD;
        margin: 15px;
        padding: 15px;
        color: #232323;
        /*
            background: none repeat scroll 0 0 #4D4D4D;
            border-color: #636363;
            border-radius: 15px 15px 15px 15px;
            border-spacing: 0;
            border-style: solid;
            border-width: 3px;
            clear: both;
            margin: 15px;
            padding: 15px;*/
    }

    .panel2 h2 {
        color: #232323;
    }
</style>
<table border="0" width="100%">
    <tr>
        <td>
            <div class='panel'><h2>Количество строк кода в проекте</h2>
                <hr>
                <br>Итого:<b><?= $count; ?></b><br>
                <? echo "Сколько это заняло времени: " . round(microtime() - $timestart, 5); ?>
            </div>
        </td>
        <td>
            <div class='panel'>
                <h2>Посетители</h2>
                <hr>
                <br><?= Loader::Module('counter/admin_main'); ?>
            </div>
        </td>
    </tr>
    <tr>
        <td>
            <div class='panel'><h2>Cторонние приложения</h2>
                <hr>
                <br>

                <p><a href="http://zhuykov.ru/awstats/cgi-bin/awstats.pl" terget="_blank">Статистика посещений
                        awstats</a></p>
            </div>
        </td>
        <td>
            <div class='panel'>
                <h2>Количество строк кода в проекте</h2>
                <hr>
                <br>asdasdasdasdada
            </div>
        </td>
    </tr>
</table>
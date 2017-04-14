<?php
/**
 * Created by PhpStorm.
 * User: barma
 * Date: 07.05.14
 * Time: 23:24
 */

class systemController extends Controller {

    public function admin_panel() {

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
    $data['timestart'] = $timestart;
    $data['count'] = $count;
    $this->load->view('view_admin_panel',$data);
    }
}
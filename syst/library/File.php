<?
/*
 * Класс для работы с файлами и директориями
 */
class File
{

    /*
     * Функция рекурсивно удаляет папку и ВСЕ её содержимое!
     */
    public function removeDirectory($dir)
    {
        if ($objs = glob($dir . "/*")) {
            foreach ($objs as $obj) {
                is_dir($obj) ? removeDirRec($obj) : unlink($obj);
            }
        }
        rmdir($dir);
    }

    /*
     * Функци выводит все файлы находящиеся в указанной директроии (рекурсивно)
     */
    public function directoryMap($source_dir, $top_level_only = false, $hidden = false)
    {
        if ($fp = @opendir($source_dir)) {
            $source_dir = rtrim($source_dir, '/') . '/';
            $filedata = array();

            while (false !== ($file = readdir($fp))) {
                if (($hidden == false && strncmp($file, '.', 1) == 0) OR ($file == '.' OR $file == '..')) {
                    continue;
                }
                if ($top_level_only == false && @is_dir($source_dir . $file)) {
                    $temp_array = array();
                    $temp_array = directory_map($source_dir . $file . '/', $top_level_only, $hidden);
                    $filedata[$file] = $temp_array;
                } else {
                    $filedata[] = $file;
                }
            }
            closedir($fp);
            return $filedata;
        } else {
            return false;
        }
    }

    /**
     * Функция возвращяет список файлов в директории
     */
    public function getListFilesInFolder($directory)
    {
        if (empty($directory) OR !is_dir($directory)) {
            return false;
        }

        $files = array();
        if ($fp = @opendir($directory)) {
            while (false !== ($file = readdir($fp))) {
                if ($file == '.' OR $file == '..') {
                    continue;
                }
                if (is_file($directory . $file)) {
                    $files[] = $file;
                }
            }
            closedir($fp);
        }

        return $files;
    }
}
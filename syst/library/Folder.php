<?php

class Folder extends Directory
{

    // Удаление папки и всего её содержимого
    public function delete($directory = '')
    {
        if (is_dir($directory)) {
            $dir = opendir($directory);
            while (($file = readdir($dir))) {

                //удаляем файлы, которые находятся в каталоге
                if (is_file("$directory/$file")) {
                    unlink("$directory/$file");
                } //удаляем каталоги, которые находятся в текущем каталоге
                else {
                    if (is_dir("$directory/$file") && $file != "." && $file != "..") {
                        $this->delete("$directory/$file");
                    }
                }
            }

            // закрываем и удаляем директории
            closedir($dir);
            rmdir($directory);
        }
    }

}

?>

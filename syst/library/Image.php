<?php

class Image
{

    protected $root = '';

    public function  __construct()
    {
        $this->root = DR;
    }

    //Обрезает изображение из центра
    public function thumb($nw = 0, $nh = 0, $source = '', $dest = '')
    {
        //$nw = 150;    // Ширина миниатюр
        //$nh = 100;    // Высота миниатюр

        $source = $this->root . '/' . $source; // Исходный файл
        $dest = $this->root . '/' . $dest; // Файл с результатом работы

        $stype = explode(".", $source);
        $stype = $stype[count($stype) - 1];

        $size = getimagesize($source);
        $w = $size[0]; // Ширина изображения
        $h = $size[1]; // Высота изображения

        switch ($stype) {
            case 'gif':
                $simg = imagecreatefromgif($source);
                break;
            case 'jpg':
                $simg = imagecreatefromjpeg($source);
                break;
            case 'png':
                $simg = imagecreatefrompng($source);
                break;
        }

        $dimg = imagecreatetruecolor($nw, $nh);
        $wm = $w / $nw;
        $hm = $h / $nh;
        $h_height = $nh / 2;
        $w_height = $nw / 2;

        if ($w > $h) {
            $adjusted_width = $w / $hm;
            $half_width = $adjusted_width / 2;
            $int_width = $half_width - $w_height;
            imagecopyresampled($dimg, $simg, -$int_width, 0, 0, 0, $adjusted_width, $nh, $w, $h);
        } else {
            if (($w < $h) || ($w == $h)) {
                $adjusted_height = $h / $wm;
                $half_height = $adjusted_height / 2;
                $int_height = $half_height - $h_height;
                imagecopyresampled($dimg, $simg, 0, -$int_height, 0, 0, $nw, $adjusted_height, $w, $h);
            } else {
                imagecopyresampled($dimg, $simg, 0, 0, 0, 0, $nw, $nh, $w, $h);
            }
        }
        imagejpeg($dimg, $dest, 100);
    }

    // Изменениме размера изображения
    public function resize($w, $h, $filename, $smallimage)
    {

        // 1. Коррекция параметров $w и $h
        // Определим коэффициент сжатия изображения
        $ratio = $w / $h;

        // Получим размеры исходного изображения
        list($width, $height) = getimagesize($filename);

        // Если размеры меньше, то масштабирования не нужно
        if (($width < $w) && ($height < $h)) {
            copy($filename, $smallimage);
            return true;
        }

        // получим коэффициент сжатия исходного изображения
        $src_ratio = $width / $height;

        // Вычисляем размеры уменьшенной копии, чтобы
        // при масштабировании сохранились
        // пропорции исходного изображения
        if ($ratio < $src_ratio) {
            $h = $w / $src_ratio;
        } else {
            $w = $h * $src_ratio;
        }

        // 2. Создание уменьшенной копии изображения
        // Создаем пустое изображение
        // размером $w x $h пикселов
        $dest_img = imagecreatetruecolor($w, $h);

        // Открываем файл, который будет подвергаться сжатию
        $ext = substr(strrchr($filename, '.'), 1);
        switch ($ext) {
            case 'jpeg':
                $src_img = imagecreatefromjpeg($filename);
                break;
            case 'jpg':
                $src_img = imagecreatefromjpeg($filename);
                break;
            case 'gif':
                $src_img = imagecreatefromgif($filename);
                break;
            case 'png':
                $src_img = imagecreatefrompng($filename);
                break;
            default :
                throw new Exception (" Не правильно указан формат файла,
		либо файл имеет некорректное название. $ext");
        }

        // Масштабируем изображение
        imagecopyresampled(
            $dest_img,
            $src_img,
            0,
            0,
            0,
            0,
            $w,
            $h,
            $width,
            $height
        );

        // Сохраняем уменьшенную копию в файл
        switch ($ext) {
            case 'jpeg':
                imagejpeg($dest_img, $smallimage);
                break;
            case 'jpg':
                imagejpeg($dest_img, $smallimage);
                break;
            case 'gif':
                imagegif($dest_img, $smallimage);
                break;
            case 'png':
                imagepng($dest_img, $smallimage);
                break;
        }

        // Чистим память от созданных изображений
        imagedestroy($dest_img);
        imagedestroy($src_img);

        return true;
    }
}

//$this->thumb(150, 100, 'for-tests/small_10_06.jpg', 'for-tests/test.jpg');
//$this->resize(150, 100, 'for-tests/small_10_06.jpg', 'for-tests/test.jpg');
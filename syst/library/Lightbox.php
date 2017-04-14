<?
class Lightbox
{

    /**
     * @example
     * <a href="/media/2013/composer/composer_bug.png" data-lightbox="image-1" title="My caption">
     *     <img src="/media/2013/composer/composer_bug.png" alt="composer bug ошибка в phpStorm linux" width="700">
     * </a>
    */
    public function __construct()
    {
        $content = " <script src='" . HN . FC . "library/lightbox/lightbox-2.6.min.js' type='text/javascript'></script>";
        $content .= "<link rel='stylesheet' href='" . HN . FC . "library/lightbox/lightbox.css' type='text/css'>";
        echo $content;
    }

}

<?php

class Core extends Template
{

    protected $menu = array();
    protected $content = '';
    protected $title = '';
    protected $keywords = '';
    protected $description = '';
    protected $charset = 'utf-8';

    public function  __construct($charset, $title = '', $keywords = '', $description = '', $separator = '')
    {

        $this->charset = $charset;
        $this->title = $title;
        $this->keywords = $keywords;
        $this->description = $description;
        $this->separator = $separator;
    }

    public function getCharset()
    {
        return $this->charset;
    }

    public function setContent($text = null)
    {
        $this->content = $text;
    }

    public function getContent()
    {
        return $this->content;
    }

    public function setTitle($text = null)
    {
        $this->title = $text;
    }

    public function addTitle($text = null)
    {
        $this->title = $text . $this->separator . $this->title;
        //echo $this->title;
    }

    public function getTitle()
    {
        return $this->title;
    }

    public function setKeywords($text = null)
    {
        $this->keywords = $text;
    }

    public function addKeywords($text = null)
    {
        $this->keywords .= $text;
    }

    public function getKeywords()
    {
        return $this->keywords;
    }

    public function setDescription($text = null)
    {
        $this->description = $text;
    }

    public function addDescription($text = null)
    {
        $this->description .= $text;
    }

    public function getDescription()
    {
        return $this->description;
    }

    public function setMenu($menu)
    {
        $this->menu = $menu;
    }

    public function getMenu()
    {
        return $this->menu;
    }

    // Функция перенаправления
    public static function redirect($path, $time = 0)
    {
        if ($path[0] == '/') {
            $path = substr($path, 1);
        }
        $path = HN . $path;

        if($time === 0) {
            header("HTTP/1.1 301 Moved Permanently");
            header("Location: $path");
        } else {
            header("HTTP/1.1 301 Moved Permanently");
            header("Refresh: $time; URL=$path");
        }
        die;
    }

    public static function e404() {

    }
}
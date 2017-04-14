<?php
class Template
{

    protected static $theme = '';
    protected static $template = 'index.php';
    protected static $isOffTemplate = false;

    public static function setTheme($theme = '')
    {
        self::$theme = $theme;
    }


    /**
     * Возвращяет используемый шаблон
     *
     * @global type $DFTEMPLATE
     * @return string
     */
    public static function getTheme()
    {
        if (empty(self::$theme)) {
            global $DFTEMPLATE;
            return $DFTEMPLATE;
        } else {
            return self::$theme;
        }
    }


    /**
     * Установка шаблона
     *
     * @param type $theme Название папки темы
     * @param type $template необязательный параметр index.php по умолчанию -
     * страница шаблона 404.php select.php etc.
     */
    public static function setTemplate($template = 'index.php')
    {

        if (empty(self::$theme->theme)) {
            global $DFTEMPLATE;
            self::$theme = $DFTEMPLATE;
        }


        if (!empty($template)) {
            self::$template = $template;
        }
        return true;
    }

    /**
     * Возвращяет страницу шаблона
     *
     * @return string
     */
    public function getTemplate()
    {
        return self::$template;
    }

    /**
     * Отключает использование шаблона
     */
    public static function templateOff()
    {
        self::$isOffTemplate = true;
    }

    /**
     * Включает использование шаблона
     */
    public static function templateOn()
    {
        self::$isOffTemplate = false;
    }

    /**
     * Возвращает ответ, использовать ли шаблон для вывода
     *
     * @return bool
     */
    public static function templateIsOff()
    {
        return self::$isOffTemplate;
    }

}
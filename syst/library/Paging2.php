<?php
class sub_Paging
{

    private $page_size = 10;
    private $start = 0;
    private $link_padding = 10;
    private $page_link_separator = ' ';
    private $next_page_text = ' следующая → ';
    private $prev_page_text = ' ← предыдущая ';
    private $cur_page;
    private $total_rows;
    private $page_var = 'p';
    private $query;

    public function __set($name, $value)
    {
        $this->$name = $value;
    }

    public function __construct($q = '')
    {
        $this->cur_page = isset($_GET[$this->page_var]) && (int)$_GET[$this->page_var] > 0 ? (int)$_GET[$this->page_var] : 1;
        $this->start = (($this->cur_page - 1) * $this->page_size) + 1;
        if ($q) {
            $this->setQuery($q);
        }
    }

// изменение и возврат запроса
    public function setQuery($setQuery)
    {

        if ($this->page_size != 0) {

            //calculate the starting row
            $start = ($this->cur_page - 1) * $this->page_size;
            //insert SQL_CALC_FOUND_ROWS and add the LIMIT
            $setQuery = preg_replace(
                    '/^SELECT\s+/i',
                    'SELECT SQL_CALC_FOUND_ROWS ',
                    $setQuery
                ) . " LIMIT {$start},{$this->page_size}";

            $this->query = $setQuery;
        }
        return $setQuery;
    }

// получение количества страниц
    public function getPage($q = '')
    {

        if ($q) {
            $this->setQuery($q);
        }

        $this->total_rows = mysql_result(mysql_query("SELECT FOUND_ROWS()"), 0);
        if ($this->page_size !== 0) {
            $this->total_pages = ceil($this->total_rows / $this->page_size);
        }
        if ($this->cur_page > $this->total_pages) {
            $this->cur_page = $this->total_pages;
        }
    }

// выводит 1 ссылку
    public function getPageLink($page = 0, $text = '')
    {

        if (!$text) {
            $text = $page;
        }

        if ($page != $this->cur_page) {
            $reg = '/((&|^)' . $this->page_var . '=)[^&#]*/';
            $url = '?' . (preg_match($reg, $_SERVER['QUERY_STRING']) ? preg_replace(
                    $reg,
                    '${1}' . $page,
                    $_SERVER['QUERY_STRING']
                ) : ($_SERVER['QUERY_STRING'] ? $_SERVER['QUERY_STRING'] . '&' : '') . $this->page_var . '=' . $page);
            return '<a href="' . $url . '">' . $text . '</a>';
        }
        return '<span>' . $text . '</span>';
    }

// выводит ссылку на следующую страницу
    public function getNextLink()
    {
        if (!isset($this->total_pages)) {
            $this->getPage();
        }
        return isset($this->total_pages) && $this->cur_page < $this->total_pages ? $this->getPageLink(
            $this->cur_page + 1,
            $this->next_page_text
        ) : '';
    }

// выволит ссыдку на предыдущую страницу
    public function getPrevLink()
    {
        if (!isset($this->total_pages)) {
            $this->getPage();
        }
        return isset($this->total_pages) && $this->cur_page > 1 ? $this->getPageLink(
            $this->cur_page - 1,
            $this->prev_page_text
        ) : '';
    }

// выводит все ссылки
    public function getPageLinks()
    {
        if (!isset($this->total_pages)) {
            $this->getPage();
        }

        $page_link_list = array();

        $start = $this->cur_page - $this->link_padding;
        if ($start < 1) {
            $start = 1;
        }
        $end = $this->cur_page + $this->link_padding - 1;
        if ($end > $this->total_pages) {
            $end = $this->total_pages;
        }

        if ($start > 1) {
            $page_link_list[] = $this->getPageLink($start - 1, $start - 2 > 0 ? '...' : '');
        }
        for ($i = $start; $i <= $end; $i++) {
            $page_link_list[] = $this->getPageLink($i);
        }
        if ($end + 1 < $this->total_pages) {
            $page_link_list[] = $this->getPageLink(
                $end + 1,
                $end + 2 == $this->total_pages ? '' : '...'
            );
        }
        if ($end + 1 <= $this->total_pages) {
            $page_link_list[] = $this->getPageLink($this->total_pages);
        }

        return implode($this->page_link_separator, $page_link_list);
    }

}

?>
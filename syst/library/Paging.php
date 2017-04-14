<link href="/sys/components/pager/paginator-blue.css" rel="stylesheet" media="all"/>
<script type="text/javascript" src="/sys/components/pager/jquery-1.3.2.pack.js"></script>
<script type="text/javascript" src="/sys/components/pager/jquery.paginator.js"></script>

<?php
class sub_Paging
{

    private $page_size = 10;
    private $start = 0;
    private $cur_page;
    private $total_rows;
//private $page_var = 'page';
    private $query;
    private $pointer = 'p';
    private $url = 'index.php?';

    public function __set($name, $value)
    {
        $this->$name = $value;
    }

    public function check($q = '')
    {
        $this->cur_page = isset($_GET[$this->pointer]) && (int)$_GET[$this->pointer] > 0 ? (int)$_GET[$this->pointer] : 1;
        $this->start = (($this->cur_page - 1) * $this->page_size) + 1;
        if ($q) {
            $this->setQuery($q);
        }
    }

// изменение и возврат запроса
    public function setQuery($setQuery)
    {
        $this->check();
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
// использовать, чтобы не обнулялос количество записей в запросе
// если будет снова использоваться mysql
    public function getPage($q = '')
    {

        if (!$q) {
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


    // выводит все ссылки
    public function getPageLinks()
    {
        if (!$this->query) {
            BeHandler(__LINE__, 'Не передан SQL запрос!');
        }

        // если в адресе передается несколько параметров,
        // заменяем тот, который используется как указатель на страницы
        // пример id=1&page=3
        $link = getenv("REQUEST_URI");
        $parseUrl = explode("&$this->pointer", $link);
        $parseUrl = explode("?$this->pointer", $parseUrl[0]);
        $this->url = $parseUrl['0'];
        if (strstr($parseUrl['0'], '?')) {
            $separator = '&';
        } else {
            $separator = '?';
        }
        $this->url .= $separator;

        if (!isset($this->total_pages)) {
            $this->getPage();
        }
        ?>
        <script type="text/javascript">
            $(document).bind('ready', function () {
                var page = /<?=$this->pointer?>=([^#&]*)/.exec(window.location.href);
                page = page ? page[1] : <?=$this->start?>;

                $('#paginator1').paginator({pagesTotal:<?=$this->total_pages?>,
                    pagesSpan: 11,
                    pageCurrent: page,
                    baseUrl: "<?=$this->url?><?=$this->pointer?>=%number%"});
            })
        </script>
        <div class="paginator" id="paginator1"></div>
    <?
    }

}

?>
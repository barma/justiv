<?
class CodeHighLight
{

    public function __construct()
    {
        $content = " <script src='" . HN . FC . "library/highlight.js/highlight.pack.js'
			type='text/javascript'></script>";
        $content .= "<link rel='stylesheet' href='" . HN . FC . "library/highlight.js/styles/github.css'
            type='text/css'>";
        //$content .= "<script>hljs.initHighlightingOnLoad();</script>";
        $content .= "<script>
        $(document).ready(function(){
        	$('pre').each(function(i,e){ hljs.highlightBlock(e,'') });
        });
        </script>";
        /*
                $content = "
                <link rel='stylesheet' href='http://yandex.st/highlightjs/7.3/styles/github.min.css'>
                <!-- tomorrow-night-eighties.css -->
                <script src='http://yandex.st/highlightjs/7.3/highlight.min.js'></script>
                <script>
                    hljs.tabReplace = '    ';
                    hljs.initHighlightingOnLoad();
                </script>";
        */
        echo $content;
    }

}

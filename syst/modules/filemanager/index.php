<!--<link rel="stylesheet" href="elfinder/js/ui-themes/base/ui.all.css" type="text/css" media="screen" title="no title"
      charset="utf-8">
<link rel="stylesheet" href="elfinder/css/elfinder.css" type="text/css" media="screen" title="no title" charset="utf-8">
<!-- <script src="elfinder/js/jquery-ui-1.7.2.custom.min.js" type="text/javascript" charset="utf-8"></script> -->
<!--<script src="elfinder/js/elfinder.min.js" type="text/javascript" charset="utf-8"></script>
<style type="text/css">
    #close, #open, #dock, #undock {
        width: 100px;
        position: relative;
        display: -moz-inline-stack;
        display: inline-block;
        vertical-align: top;
        zoom: 1;
        *display: inline;
        margin: 0 3px 3px 0;
        padding: 1px 0;
        text-align: center;
        border: 1px solid #ccc;
        background-color: #eee;
        margin: 1em .5em;
        padding: .3em .7em;
        border-radius: 5px;
        -moz-border-radius: 5px;
        -webkit-border-radius: 5px;
        cursor: pointer;
    }
</style>
<script type="text/javascript" charset="utf-8">
    $().ready(function () {

        var f = $('#finder').elfinder({
            url: '<?=FC?>modules/filemanager/elfinder/connectors/php/connector.php',
            lang: 'en',

            editorCallback: function (url) {
                if (window.console && window.console.log) {
                    window.console.log(url);
                } else {
                    alert(url);
                }

            },
            closeOnEditorCallback: true
        })
        $('#close,#open,#dock,#undock').click(function () {
            $('#finder').elfinder($(this).attr('id'));
        })

    })
</script>
<div id="finder">finder</div>-->
<link rel="stylesheet" href="elfinder2/css/elfinder.min.css" type="text/css" media="screen" title="no title" charset="utf-8">
<script src="elfinder2/js/elfinder.min.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript" src="elfinder2/js/i18n/elfinder.ru.js"></script>
<script type="text/javascript" charset="utf-8">
    $().ready(function () {

        var f = $('#finder').elfinder({
            url: '<?=FC?>modules/filemanager/elfinder2/php/connector.php',
            lang: 'en',

            editorCallback: function (url) {
                if (window.console && window.console.log) {
                    window.console.log(url);
                } else {
                    alert(url);
                }

            },
            closeOnEditorCallback: true
        })
        $('#close,#open,#dock,#undock').click(function () {
            $('#finder').elfinder($(this).attr('id'));
        })

    })
</script>
<div id="finder">finder</div>
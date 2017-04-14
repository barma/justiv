$().ready(function () {

    var f = $('#finder').elfinder({
        url: '/<?=FC?>modules/filemanager/elfinder/connectors/php/connector.php',
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

$().ready(function () {
    var opts = {
        lang: 'ru',   // set your language
        styleWithCSS: false,
        height: 500,
        toolbar: 'maxi',
        fmOpen: function (callback) {
            $('<div id=\'myelfinder\' />').elfinder({
                url: '/".FC."modules/filemanager/elfinder/connectors/php/connector.php',
                lang: 'ru',
                dialog: { width: 900, modal: true, title: 'Files' }, // открываем в диалоговом окне
                closeOnEditorCallback: true, // закрываем после выбора файла
                editorCallback: callback // передаем callback файловому менеджеру
            })
        }
    };
    $('#wysiwyg').elrte(opts);
});


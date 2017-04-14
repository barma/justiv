<?
$content = '
<script type="text/javascript" src="/syst/library/WYSIWYG/tinymce/tinymce.min.js"></script>
<script type="text/javascript">
tinymce.init({
    selector: "textarea",
    theme: "modern",
    plugins: [
        "advlist autolink lists link image charmap print preview hr anchor pagebreak",
        "searchreplace wordcount visualblocks visualchars code fullscreen",
        "insertdatetime media nonbreaking save table contextmenu directionality",
        "emoticons template paste textcolor filemanager"
    ],
    toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
    toolbar2: "print preview media | forecolor backcolor emoticons",
    image_advtab: true,
    templates: [
        {title: \'Test template 1\', content: \'Test 1\'},
        {title: \'Test template 2\', content: \'Test 2\'}
    ]
});
</script>
<!--
<script type="text/javascript" src="/syst/library/WYSIWYG/tinymce/tiny_mce.js"></script>
<script type="text/javascript" src="/syst/library/WYSIWYG/tinymce/plugins/tinybrowser/tb_tinymce.js.php"></script>
<script>
tinyMCE.init({
	mode: "textareas",
	extended_valid_elements: "code[*]",
apply_source_formatting: true,
			base: "http://barma/syst/library/WYSIWYG/tinymce/",
	theme : "advanced",
			skin : "wp_theme",
			plugins : "autolink,save,advimage,advlink,media,contextmenu,fullscreen,visualchars,template,syntaxhl",
            file_browser_callback : "tinyBrowser",
			// Theme options
			theme_advanced_buttons1 : "save,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,blockquote,link,unlink,anchor,|,image,media,code,|,fullscreen,syntaxhl",

});
</script>

<script type="text/javascript">

	$().ready(function() {
		$("textarea#wysiwyg").tinymce({
			// Location of TinyMCE script
			path: "/syst/library/WYSIWYG",
			base: "http://barma/syst/library/WYSIWYG/tinymce/",
			script_url : "/syst/library/WYSIWYG/tinymce/jscripts/tiny_mce/tiny_mce.js",

			// General options
			theme : "advanced",
			skin : "wp_theme",
			plugins : "autolink,save,advimage,advlink,media,contextmenu,fullscreen,visualchars,template,lstng",

			// Theme options
			theme_advanced_buttons1 : "save,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,blockquote,link,unlink,anchor,|,image,media,code,|,fullscreen,lstng",


			theme_advanced_toolbar_location : "top",
			theme_advanced_toolbar_align : "left",
			theme_advanced_statusbar_location : "bottom",
			theme_advanced_resizing : true,

			// Example content CSS (should be your site CSS)
			content_css : "css/content.css",

			// Drop lists for link/image/media/template dialogs
			template_external_list_url : "lists/template_list.js",
			external_link_list_url : "lists/link_list.js",
			external_image_list_url : "lists/image_list.js",
			media_external_list_url : "lists/media_list.js",

			// Replace values for the template plugin
			template_replace_values : {
				username : "Some User",
				staffid : "991234"
			}
		});
	});
</script>-->';

echo $content;
?>
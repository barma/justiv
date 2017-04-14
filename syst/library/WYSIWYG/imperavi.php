<?php
$content2 = "

<link href='/syst/templates/admin/bes/style.css' rel='stylesheet' type='text/css'/>
<script src='http://code.jquery.com/jquery-2.0.0.js'></script>
<script src='http://code.jquery.com/ui/1.10.2/jquery-ui.js'></script>
<script type='text/javascript' src='http://code.jquery.com/jquery-latest.min.js'></script>

    <script src='" . FC . "library/WYSIWYG/imperavi/redactor.js' type='text/javascript' charset='utf-8'></script>


    <link rel='stylesheet' href='" . FC . "library/WYSIWYG/imperavi/redactor.css' charset='utf-8'>
    <script type='text/javascript'>
        $(document).ready(
            function()
            {
                $('#wysiwyg').redactor({
                    focus: true,
                    autoresize: false,

                    imageUpload: '".FC."library/WYSIWYG/imperavi/scripts/image_upload.php',
                    fileUpload: '".FC."library/WYSIWYG/imperavi/scripts/file_upload.php',
                    #imageGetJson: '".FC."library/WYSIWYG/imperavi/json/data.json',
                    initCallback: function()
        {

        }
                });
            }
        );
	</script>
    ";

$content = "
    <script src='" . FC . "library/WYSIWYG/imperavi/redactor.js' type='text/javascript' charset='utf-8'></script>
    <script src='" . FC . "library/WYSIWYG/imperavi/plugins/fullscreen/fullscreen.js' type='text/javascript' charset='utf-8'></script>

    <link rel='stylesheet' href='" . FC . "library/WYSIWYG/imperavi/redactor.css' charset='utf-8'>
<script type='text/javascript'>
    $(document).ready(
        function()
        {
            $('.wysiwyg').redactor({
                maxHeight: 800,
                imageUpload: '".FC."library/WYSIWYG/imperavi/scripts/image_upload.php',
                fileUpload: '".FC."library/WYSIWYG/imperavi/scripts/file_upload.php',
                imageGetJson: '".FC."library/WYSIWYG/imperavi/json/data.json.php',
                plugins: ['fullscreen']
            });
        }
    );
</script>
    ";
echo $content;
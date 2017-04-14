<script>
    var options = {
        beforeSubmit:  testRequest,
        success:       redirectOnProductPage  // post-submit callback
    };

    function testRequest(formData, jqForm, options) {
//        alert('asd22');
    }

    function redirectOnProductPage(responseText, statusText, xhr, $form) {
//        alert('asd');
        location.replace("edit_product.php?id="+responseText);
    }

    $('.ajaxFormMy').ajaxForm(options);
</script>

<div class="list_wrapper">
<form action="parse_url.php" method="post" class="ajaxFormMy">
    <table>
        <tr><td>url</td><td><input type="text" name="url" value=""></td><td><input type="submit" value="добавить" onclick="this.style.display='none'"></td></tr>
    </table>
</form>
</div>
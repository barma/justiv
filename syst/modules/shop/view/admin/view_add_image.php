<form action="add_image.php" method="post" enctype="multipart/form-data">
    <input type="hidden" name="pr_id" value="<?=$data['pr_id']?>">
    <div class="wrapper">
        <table class="list">
            <tr><td>фото</td><td><input type="file" name="image"></td></tr>
            <tr><td>Заголок</td><td><input type="text" name="pi_title" value="<?=$data['title']?>"></td></tr>
            <tr><td>Описание</td><td><input type="text" name="pi_description" value="<?=$data['title']?>"></td></tr>
            <tr><td colspan="2" align="center"><input type="submit" value="Сохранить"></td></tr>
        </table>
    </div>
</form>
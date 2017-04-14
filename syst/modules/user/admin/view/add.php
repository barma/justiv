<form enctype='multipart/form-data' method="post">
    <? if (!empty($message)) {
        echo "<h1>$message</h1>";
    } ?>
    <? if (!empty($errors)) {
        echo "<ul>$errors</ul>";
    } ?>
    <table>
        <tr>
            <td>e-mail пользователя:</td>
            <td><input type="text" name="newemail" value="<?= $newemail; ?>">
            </td>
        </tr>
        <tr>
            <td>
                пароль пользователя:
            </td>
            <td><input type="text" name="newpassword" value="<?= $newpassword; ?>">
            </td>
        </tr>
        <tr>
            <td></td>
            <td><input type="submit" name="add" value='Сохранить'></td>
        </tr>
        <tr>
            <td><a href="<?= BES_HOST; ?>sys/modules/user/admin/index.php">к списку</a></td>
            <td></td>
        </tr>
    </table>
</form>
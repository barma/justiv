<?php
include "list_modules.php";
?>
<script type="text/javascript">
    $(document).ready(function () {
        $(".module").mouseout(function () {
            $(this).css("border", "1px solid #636363");
        });
        $(".module").mouseover(function () {
            $(this).css("border", "1px solid #2D2D2D");
        });
    });
</script>
<style type="text/css">
    .module {
        width: auto;
        padding: 5px;
        text-align: center;
        border: 1px solid #636363;
        margin: 2px;
    }
</style>
<div class="panel">
    <h2>Установленные модули</h2>
    <hr>
    <div class="panel_content">
        <table width="100%">
            <tr>
                <?
                $moduleInRow = 0;
                foreach ($modules as $module) {

                    // Если три модуля выведено, выводим новую строку
                    if ($moduleInRow == 5) {
                        echo "</tr><tr>";
                        $moduleInRow = 0;
                    }

                    ?>
                    <td>
                        <div class="module">
                            <img alt="" src="module.jpg">
                            <span><a href="<?= $module['href'] ?>"><?= $module['name'] ?></a></span>
                        </div>
                    </td>
                <?

                }
                ?>
            </tr>
        </table>
    </div>
</div>
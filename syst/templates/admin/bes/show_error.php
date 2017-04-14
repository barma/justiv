<style>
    .error, .error pre {
        width: auto;
        border: 1px solid black;
        background: #FFE7A1;
        padding: 20px;
        margin: 10px;
        color: #000;
        font-size: 16px;
    }
</style>
<div class="error">Файл: <?= $file ?></div>
<div class="error">Строка: <?= $line ?></div>
<div class="error">URL: <a href="<?= $link ?>" target="_blank"><?= $link ?></a></div>
<div class="error">Сообщение: <?= $message ?></div>
<div class="error">Дополнительная информация:
    <pre><? print_r($trace) ?></pre>
</div>
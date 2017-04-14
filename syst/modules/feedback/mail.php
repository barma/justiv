<?
Loader::library('mvc');
$obj = new Controller('feedback');

if (!empty($_POST['from']) AND !empty($_POST['text'])) {

    Core::templateOff();
    $name = $obj->getParam('from', 'P', 'TEXT', 200);
    $email = $obj->getParam('email', 'P', 'TEXT', 50);
    $text = $obj->getParam('text', 'P', 'TEXT', 1024);
    $message = "Сообщение от: " . $name . "\n\r Сообщение: " . $text;

    mail(
        "barma.net@list.ru",
        "Сообщение с сайта",
        $message,
        "From: $name \r\n"
        . "Reply-To: $email\r\n"
        . "Content-type: text/plain; charset=utf-8"
    );

    die();


}
?>
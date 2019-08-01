<?php

require_once '../objects/messages.php';

$id = $_POST['idMsg'];

$msg = new Message();
$msg->deleteMsg($id);


?>
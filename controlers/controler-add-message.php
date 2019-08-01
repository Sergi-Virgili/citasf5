<?php

require_once '../objects/messages.php';

 
//  $idCoder = '1';
//  $idTeacher = '2';
//  $text = 'enviado';
// $done = '1';
 $idCoder = $_POST['idCoder'];
 $idTeacher = $_POST['idTeacher'];
 $text = $_POST['text'];
$done = '1';

$msg = new Message();
$msg->newMessage($text, $idCoder, $idTeacher);
// $query = "INSERT INTO `messages` (`text`, `done`, `id_coders`, `id_teachers`) VALUES ( '$text', '$done', '$idCoder', '$idTeacher');";



// $execute = mysqli_query($conexion, $query);


mysqli_close( $conexion );
?>
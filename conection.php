<?php

$user = "root";
$password = "root";
$server = "localhost";
$db = "citasapp";

$conexion = mysqli_connect( $server, $user, $password ) or die ("No se ha podido conectar al servidor de Base de datos");
	
$db = mysqli_select_db( $conexion, $db ) or die ( "No se ha podido conectar a la base de datos" );



?>
<?php

require_once '../conection.php';



$userName = $_POST['userName'];


$query = "SELECT * from teachers
";

$resultado = mysqli_query( $conexion, $query );

$json = array();
while ($row = mysqli_fetch_array( $resultado )){
    $json[] = array (
        "id" => $row['id'],
        
        "teacherName" => $row['name'],
        
        
        
      
    );
};
 $jsonString = json_encode($json);
 echo $jsonString;
 mysqli_close( $conexion );
?>
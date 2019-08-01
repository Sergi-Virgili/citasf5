<?php

class Message 
{

    private $text;
    private $from;
    private $to;
    private $id_msg;
    private $time;
   // private $done;

    public function newMessage ($text, $from, $to) {
        $this->id_msg = $id_msg;
        $this->text = $text;
        $this->from = $from;
        $this->to = $to;
        $this->time = $time;
        $done = 1;

        
        require_once '../conection.php';
        $query = "INSERT INTO `messages` (`text`, `done`, `id_coders`, `id_teachers`) VALUES ( '$this->text', $done, $this->from, $this->to);";
        $execute = mysqli_query($conexion, $query);
        mysqli_close( $conexion );
    }

    public function listAll () {

        require_once '../conection.php';

        $query = "SELECT `time`, messages.id AS id, messages.text, team.name AS teamName, coders.name, teachers.name AS teacher from messages, coders, team, teachers  WHERE messages.id_coders = coders.id AND coders.id_team = team.id
        AND messages.id_teachers = teachers.id ORDER BY `time` DESC ";

        $resultado = mysqli_query( $conexion, $query );

        $json = array();

        while ($row = mysqli_fetch_array( $resultado )){

        $json[] = array (
            "id" => $row['id'],
            "text" => $row['text'],
            "from" => $row['name'],
            "team" => $row['teamName'],
            "to" => $row['teacher']
        );
        };
        mysqli_close( $conexion );
        return $json;
    }

    public function deleteMsg($id_msg) {
        require_once '../conection.php';
        $this->id_msg = $id_msg;
        $query =  "DELETE FROM `messages` WHERE `messages`.`id` = $this->id_msg";
        $execute = mysqli_query( $conexion, $query );
        mysqli_close( $conexion );
    }

};


// $msg = new Message();
// $msg->newMessage('objet text lalalal', 2, 1);

// $msg = new Message();
//  $msg->deleteMsg(6);


?>